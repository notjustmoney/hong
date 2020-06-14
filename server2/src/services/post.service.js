/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const commentService = require('./comment.service');
const likeService = require('./like.service');
const hashtagService = require('./hashtag.service');
const AppError = require('../utils/AppError');
const { Post, Hashtag, Like } = require('../models');
const { getQueryOptions } = require('../utils/service.util');

const getPostsByUser = async (userId) => {
  const posts = await Post.find({ writer: userId })
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
    })
    .populate({
      path: 'likes',
      select: 'user',
      populate: {
        path: 'user',
        select: 'profile',
      },
    });
  return posts;
};

const getPostByLike = async (likeId) => {
  const like = await Like.findById(likeId).populate({
    path: 'post',
    select: 'id',
  });
  if (like) {
    const post = await Post.findById(like.post.id)
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
      })
      .populate({
        path: 'likes',
        select: 'user',
        populate: {
          path: 'user',
          select: 'profile',
        },
      });
    return post;
  }
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
    })
    .populate({
      path: 'likes',
      select: 'user',
      populate: {
        path: 'user',
        select: 'profile',
      },
    });
  return posts;
};

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

const updatePost = async (body) => {
  const updateBody = body;
  const { postId } = body;
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
        if (!tag.posts.includes(postId)) tag.posts.push(postId);
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
  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, `Post not found`);
  }
  if (post.writer._id.equals(userId)) {
    if (post.comments.length > 0) {
      post.comments.forEach(async (commentId) => {
        const comment = await commentService.getCommentById(commentId);
        await comment.remove();
      });
    }
    if (post.likes.length > 0) {
      post.likes.forEach(async (likeId) => {
        const like = await likeService.getLikeById(likeId);
        if (like) {
          await like.remove();
        }
      });
    }
    await hashtagService.updateHashtag(post);
    await post.remove();
    return post;
  }
};

module.exports = {
  createPost,
  getPostsByUser,
  getPostByLike,
  getPostById,
  getPosts,
  updatePost,
  deletePost,
};
