const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createComment = {
  query: Joi.object({
    postId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    contents: Joi.string().required(),
  }),
};

const updateComment = {
  query: Joi.object({
    commentId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object({
    contents: Joi.string().required(),
  }),
};

const deleteComment = {
  query: Joi.object({
    commentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
