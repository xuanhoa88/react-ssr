import morgan from 'morgan';
import { format, transports, createLogger } from 'winston';

export default function logger({ paths, env }) {
  const logger = createLogger({
    exitOnError: false,
    transports: [
      new transports.File({
        level: 'info',
        filename: `${paths.build}/logs/access.log`
      }),
      new transports.File({
        level: 'error',
        filename: `${paths.build}/logs/error.log`,
        format: format.combine(
          format.label({ label: 'ERROR:' }),
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          format.json()
        )
      })
    ]
  });

  // add console only for development
  if (env.isDevelopment) {
    logger.add(
      new transports.Console({
        handleExceptions: true
      })
    );
  }

  // winston logger writable stream for morgan
  logger.stream = {
    write: message => {
      logger.info(message);
    }
  };

  return morgan(env.isDevelopment ? 'tiny' : 'combined', {
    stream: logger.stream,
    skip: (req, res) => res.statusCode < 400
  });
}
