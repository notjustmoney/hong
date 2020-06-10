/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const AppError = require('../utils/AppError');
const { Post, Hashtag } = require('../models');
const { getQueryOptions } = require('../utils/service.util');

const getPostById = async (postId) => {
  const post = await Post.findById(postId)
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
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }
  return post;
};

const createPost = async (postBody) => {
  const _id = mongoose.Types.ObjectId();
  const tags = [];
  for (const elem of postBody.tags) {
    // eslint-disable-next-line no-await-in-loop
    let tag = await Hashtag.findOne({ hashtag: elem });
    if (tag) {
      // if tag exists
      tag.posts.push(_id);
      tag.save();
    } else {
      // if tag doesn't exists
      // eslint-disable-next-line no-await-in-loop
      tag = await Hashtag.create({
        hashtag: elem,
        posts: [_id],
      });
    }
    tags.push(tag._id);
  }
  const post = await Post.create({
    _id,
    title: postBody.title,
    contents: postBody.contents,
    imgs: postBody.imgs,
    link: postBody.link,
    price: postBody.price,
    writer: postBody.writer,
    tags,
  });
  return post;
};

const getPosts = async (query) => {
  const options = getQueryOptions(query);
  const posts = await Post.find(query, null, options)
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
  return posts;
};

const updatePost = async (postId, body) => {
  const updateBody = body;
  const post = await getPostById(postId);
  const diff = post.tags.map((x) => x.hashtag).filter((elem) => !body.tags.includes(elem));
  for (const elem of diff) {
    const tag = await Hashtag.findOne({ hashtag: elem });
    tag.posts.remove(postId);
    if (tag.posts.length === 0) {
      await Hashtag.deleteOne({ hashtag: elem });
    }
  }
  if (body.tags) {
    const tags = [];
    for (const elem of body.tags) {
      // eslint-disable-next-line no-await-in-loop
      let tag = await Hashtag.findOne({ hashtag: elem });
      if (!tag) {
        tag = await Hashtag.create({
          hashtag: elem,
          posts: [postId],
        });
      } else {
        tag.posts.push(postId);
        await tag.save();
      }
      tags.push(tag._id);
    }
    updateBody.tags = tags;
  }
  Object.assign(post, updateBody);
  await post.save();
  return post;
};

const deletePost = async (postId, userId) => {
  try {
    const post = await getPostById(postId);
    if (post.writer._id.equals(userId)) {
      await post.remove();
      return post;
    }
    throw new AppError(httpStatus.UNAUTHORIZED, `Post delete failed`);
  } catch (e) {
    throw new AppError(httpStatus.NOT_FOUND, `Post not found: ${e}`);
  }
};

module.exports = {
  createPost,
  getPostById,
  getPosts,
  updatePost,
  deletePost,
};
