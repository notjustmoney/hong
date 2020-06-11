const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object().keys({
    title: Joi.string(),
    contents: Joi.string().required(),
    imgs: Joi.array().required(),
    link: Joi.string().required(),
    price: Joi.string(),
    tags: Joi.string(),
  }),
};

const getPostsByUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
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
    status: Joi.string(),
  }).min(1),
};

const deletePost = {
  params: Joi.object({
    postId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPost,
  getPostsByUser,
  updatePost,
  deletePost,
};
