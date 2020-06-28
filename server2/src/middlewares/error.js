const httpStatus = require('http-status');
const AppError = require('../utils/AppError');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof AppError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new AppError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...{ stack: err.message },
  };
  // Add Logger

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
