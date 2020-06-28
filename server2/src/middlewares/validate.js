const Joi = require('@hapi/joi');
const httpStatus = require('http-status');
const { pick } = require('lodash');
const AppError = require('../utils/AppError');

const validate = (schema) => (req, res, next) => {
  // select one of params, query, body from transfered schema object
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req.body, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    // if error occured, create error message and response AppError
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new AppError(httpStatus.BAD_REQUEST, errorMessage));
  }
  // assing request object with validated value
  Object.assign(req, value);
  return next();
};

module.exports = validate;
