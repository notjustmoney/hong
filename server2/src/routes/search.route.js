/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const express = require('express');
const validate = require('../middlewares/validate');
const searchValidation = require('../validations/search.validation');
const postValidation = require('../validations/post.validation');
const postController = require('../controllers/post.controller');
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

const getPostsByTags = async (stringTags) => {
  let posts = [];
  const ParsedTags = JSON.parse(stringTags);
  const tags = Array.from(new Set(ParsedTags));
  for (const tag of tags) {
    const name = tag;
    const searchedTag = await Hashtag.findOne({ hashtag: name });
    if (searchedTag) {
      const searchedPosts = await getPostsByTag(searchedTag);
      posts = posts.concat(searchedPosts);
    }
  }

  return posts;
};

router.route('/user/:userId').get(validate(postValidation.getPostsByUser), postController.getPostsByUser);
router.route('/like/:likeId').get(validate(postValidation.getPostByLike), postController.getPostByLike);
router.get(
  '/tag',
  validate(searchValidation.searchByTagName),
  catchAsync(async (req, res) => {
    const { name } = req.query;
    const tags = await Hashtag.findOne({ hashtag: name });
    const posts = await getPostsByTag(tags);
    const response = posts;
    res.send(response);
  })
);

router.get(
  '/tags',
  validate(searchValidation.searchByTags),
  catchAsync(async (req, res) => {
    const { tags } = req.query;
    const posts = await getPostsByTags(tags);
    res.send(posts);
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
