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
const { loggers } = require('winston');

const router = express.Router();

function powerSet(str) {
  const obj = {};
  // This loop is to take out all duplicate number/letter
  for (var i = 0; i < str.length; i++) {
    obj[str[i]] = true;
  }
  // variable array will have no duplicates
  const array = Object.keys(obj);
  const result = [[]];
  for (var i = 0; i < array.length; i++) {
    // this line is crucial! It prevents us from infinite loop
    const len = result.length;
    for (let x = 0; x < len; x++) {
      result.push(result[x].concat(array[i]));
    }
  }
  return result;
}

const getPostsByTag = async (tags) => {
  
  const transformedTags = powerSet(tags.hashtag);
  // promise all
  Hashtag.find({
    $text: {
      $search: tags.hashtag,
      $caseSensitive: false,
    },
  })
    .then((products) => console.log(products))
    .catch((e) => console.error(e));
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
