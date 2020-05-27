const express = require('express');
const validate = require('../middlewares/validate');
const searchValidation = require('../validations/search.validation');
const catchAsync = require('../utils/catchAsync');
const Hashtag = require('../models/hashtag.model');

const router = express.Router();

router.get(
  '/:tagId',
  validate(searchValidation.searchByTagId),
  catchAsync(async (req, res) => {
    const tags = await Hashtag.findById(req.params.tagId);
    const response = tags;
    res.send(response);
  })
);

module.exports = router;
