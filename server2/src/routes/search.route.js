/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const express = require('express');
const validate = require('../middlewares/validate');
const searchValidation = require('../validations/search.validation');
const catchAsync = require('../utils/catchAsync');
const Hashtag = require('../models/hashtag.model');
const Post = require('../models/post.model');

const router = express.Router();

const getPostsByTag = async (tags) => {
  const posts = [];
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
  return posts;
};

router.get(
  '/tag',
  validate(searchValidation.searchByTagName),
  catchAsync(async (req, res) => {
    const { tagName } = req.body;
    const tags = await Hashtag.findOne({ hashtag: tagName });
    const posts = await getPostsByTag(tags);
    const response = posts;
    res.send(response);
  })
);

router.get(
  '/tag/:tagId',
  validate(searchValidation.searchByTagId),
  catchAsync(async (req, res) => {
    const tags = await Hashtag.findById(req.params.tagId);
    const posts = await getPostsByTag(tags);
    const response = posts;
    res.send(response);
  })
);

module.exports = router;
