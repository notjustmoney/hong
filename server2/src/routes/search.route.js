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
    const tags = await Hashtag.findById(req.params.tagId).populate({
      path: 'posts',
      select: 'id title contents comments imgs link price tags writer',
      populate: {
        path: 'writer',
        select: 'profile',
      },
    });
    const response = tags;
    res.send(response);
  })
);

module.exports = router;
