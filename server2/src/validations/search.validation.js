const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const searchByTagId = {
  params: Joi.object({
    tagId: Joi.string().custom(objectId).required(),
  }),
};

const searchByTagName = {
  query: Joi.object({
    name: Joi.string().required(),
  }),
};

module.exports = {
  searchByTagId,
  searchByTagName,
};
