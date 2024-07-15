import chalk from 'chalk';
import express from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import xss from 'xss-clean';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import { createProxyMiddleware } from 'http-proxy-middleware';
import logger from './logger';
import error from './error';

export default function provider({ env, paths }) {
  const app = express();

  // could add more middlewares here where applicable
  app.use(logger({ paths, env }));

  // set security HTTP headers
  app.use(helmet({ contentSecurityPolicy: false }));

  // protect against HTTP Parameter Pollution attacks
  app.use(hpp());

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  // parse application/json
  app.use(bodyParser.json());

  // sanitize request data
  app.use(xss());

  // gzip compression
  app.use(compression());

  // enable cors
  app.use(cors());
  app.options('*', cors());

  // serve static files
  app.use(express.static(paths.build));

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://jsonplaceholder.typicode.com',
      changeOrigin: true
    })
  );

  // handle error
  app.use(error({ env }));

  return {
    register() {
      app.use(...arguments);
      return app;
    },
    expose() {
      const server = app.listen(...arguments);
      server.on('error', err => {
        switch (err.code) {
          case 'EACCES':
            console.error(
              chalk.red('Not enough privileges to run app server.')
            );
            return process.exit(1);

          case 'EADDRINUSE':
            console.error(
              chalk.red(`${server.address().port} is already in use.`)
            );
            return process.exit(1);

          default:
            throw err;
        }
      });

      // handle server shutdown, gracefully
      [
        ['unhandledRejection', 1],
        ['uncaughtException', 1],
        ['SIGINT', 0],
        ['SIGTERM', 0],
        ['SIGHUP', 0]
      ].forEach(([signal, exitCode]) =>
        process.on(signal, () => server.close(() => process.exit(exitCode)))
      );

      return server;
    }
  };
}
