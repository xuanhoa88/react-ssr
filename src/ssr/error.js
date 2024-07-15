import httpStatus from 'http-status';

export default function error({ env }) {
  return (err, _req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }

    let { statusCode, message } = err;
    if (env.isProduction && !err.isOperational) {
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    res.status(statusCode).send({
      code: statusCode,
      message,
      ...(env.isDevelopment && { stack: err.stack })
    });
  };
}
