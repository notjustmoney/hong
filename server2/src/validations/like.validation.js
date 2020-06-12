const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createLike = {
  body: Joi.object().keys({
    postId: Joi.custom(objectId).required(),
    userId: Joi.custom(objectId).required(),
  }),
};

const cancelLike = {
  body: Joi.object().keys({
    postId: Joi.custom(objectId).required(),
    userId: Joi.custom(objectId).required(),
  }),
};

module.exports = {
  createLike,
  cancelLike,
};
