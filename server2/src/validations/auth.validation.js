const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');
const { password } = require('./custom.validation');

const getUserInfo = {
  params: Joi.object().keys({
    userId: Joi.custom(objectId),
  }),
};

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    passwordConfirmation: Joi.string().required(),
    name: Joi.string().required(),
    nickname: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

module.exports = {
  getUserInfo,
  register,
  login,
  refreshTokens,
  forgotPassword,
  resetPassword,
};
