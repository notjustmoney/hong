const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const searchByTagId = {
  params: Joi.object({
    tagId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  searchByTagId,
};
