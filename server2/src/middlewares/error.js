const httpStatus = require('http-status');
const AppError = require('../utils/AppError');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if(!(error instanceof AppError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new AppError(statusCode, message, false, err.stack)
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  
  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ... { stack: err.message }
  };

  console.log(err);

  // Add Logger

  res.status(statusCode).send(response);
}

module.exports = {
  errorConverter,
  errorHandler,
};