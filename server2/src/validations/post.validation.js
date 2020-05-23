const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    contents: Joi.string().required(),
    imgs: Joi.array().required(),
    link: Joi.string().required(),
    price: Joi.string(),
    tags: Joi.string(),
  }),
};

const updatePost = {
  params: Joi.object({
    postId: Joi.required().custom(objectId),
  }),
  body: Joi.object({
    title: Joi.string(),
    contents: Joi.string(),
    price: Joi.number(),
    tags: Joi.array(),
  }).min(1),
};

const deletePost = {
  params: Joi.object({
    postId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
};
