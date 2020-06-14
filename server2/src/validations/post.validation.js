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

const getPostById = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
};

const getPostsByUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const getPostByLike = {
  params: Joi.object().keys({
    likeId: Joi.string().custom(objectId),
  }),
};

const updatePost = {
  body: Joi.object({
    postId: Joi.required().custom(objectId),
    title: Joi.string(),
    contents: Joi.string(),
    price: Joi.number(),
    tags: Joi.array(),
    status: Joi.string(),
  }).min(1),
};

const deletePost = {
  body: Joi.object({
    postId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPost,
  getPostById,
  getPostsByUser,
  getPostByLike,
  updatePost,
  deletePost,
};
