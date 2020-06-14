const httpStatus = require('http-status');
const { Post, Like } = require('../models');
const AppError = require('../utils/AppError');

const getLikeFromPost = async (postId, userId) => {
  const post = await Post.findById(postId).populate({
    path: 'likes',
    select: 'user',
  });
  const response = post.likes.find((like) => like.user.equals(userId));
  return response;
};

const getLikeById = async (likeId) => {
  const like = await Like.findById(likeId);
  return like;
};

const createLike = async (post, user) => {
  const updatedPost = await Post.findById(post).populate({
    path: 'likes',
    select: 'user',
  });
  updatedPost.likes.forEach((like) => {
    if (like.user.equals(user)) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Already Liked');
    }
  });
  const like = await Like.create({
    post,
    user,
  });
  await updatedPost.updateOne({ $push: { likes: like._id } });
  return like;
};

const cancelLike = async (postId, userId) => {
  const like = await getLikeFromPost(postId, userId);
  if (!like) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cannot found like');
  }
  if (like.user.equals(userId)) {
    await like.remove();
    return like;
  }
  throw new AppError(httpStatus.UNAUTHORIZED, 'Cannot cancel like');
};

module.exports = {
  getLikeById,
  createLike,
  cancelLike,
};
