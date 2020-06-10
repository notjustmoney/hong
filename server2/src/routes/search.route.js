/* eslint-disable no-await-in-loop */
const express = require('express');
const validate = require('../middlewares/validate');
const searchValidation = require('../validations/search.validation');
const catchAsync = require('../utils/catchAsync');
const Hashtag = require('../models/hashtag.model');
const Post = require('../models/post.model');

const router = express.Router();

router.get(
  '/:tagId',
  validate(searchValidation.searchByTagId),
  catchAsync(async (req, res) => {
    const tags = await Hashtag.findById(req.params.tagId);
    const posts = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const elem of tags.posts) {
      const post = await Post.findById(elem)
        .populate({
          path: 'comments',
          select: 'contents writer createdAt',
          populate: {
            path: 'writer',
            select: 'profile',
          },
        })
        .populate({
          path: 'tags',
          select: 'hashtag',
        })
        .populate({
          path: 'writer',
          select: 'profile',
        });
      posts.push(post);
    }
    const response = posts;
    res.send(response);
  })
);

module.exports = router;
