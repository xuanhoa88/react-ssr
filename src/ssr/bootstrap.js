import 'isomorphic-fetch';
import chalk from 'chalk';
import url from 'url';
import dotenvFlow from 'dotenv-flow';
import * as env from '../../shared/env';
import * as paths from '../../shared/paths';
import provider from './provider';

// Load config to process env
dotenvFlow.config({ path: paths.cwd });

const { PORT = 3000, HOST = 'localhost', HTTPS = false } = process.env;

export default function bootstrap() {
  const app = provider({ env, paths });

  const connectionListener = () => {
    const openTarget = url.format({
      protocol: HTTPS ? 'https' : 'http',
      hostname:
        !HOST || HOST === '0.0.0.0' || HOST === '::' ? 'localhost' : HOST,
      port: PORT
    });
    console.log(chalk.cyan(`App is now running at ${openTarget}`));
  };

  // use webpack compiler for development
  // otherwise, use built server side renderer instead
  if (env.isDevelopment) {
    new Promise(resolve => {
      const { default: createWebpackMiddlewares } = require('./webpack');
      const webpackMiddlewareInstances = createWebpackMiddlewares();
      app.register(Object.values(webpackMiddlewareInstances));
      resolve(webpackMiddlewareInstances);
    }).then(({ dev }) => {
      dev.waitUntilValid(() => app.expose(PORT, connectionListener));
    });
  } else {
    const { default: serverRenderer } = require('./renderer');
    app.register(serverRenderer());
    app.expose(PORT, connectionListener);
  }
  return app;
}
