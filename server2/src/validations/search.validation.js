const Joi = require('@hapi/joi');
const { objectid } = require('./custom.validation');

const searchByTagId = {
  params: Joi.object({
    tagId: Joi.string().custom(objectid),
  }),
};

module.exports = {
  searchByTagId,
};
