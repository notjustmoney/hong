const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createComment = {
  body: Joi.object().keys({
    postId: Joi.string().custom(objectId).required(),
    contents: Joi.string().required(),
  }),
};

const updateComment = {
  body: Joi.object({
    commentId: Joi.string().custom(objectId).required(),
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
