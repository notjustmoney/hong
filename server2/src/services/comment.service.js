const httpStatus = require('http-status');
const { Post, Comment } = require('../models');
const AppError = require('../utils/AppError');

const getCommentById = async (commentId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  return comment;
};

const createComment = async (postId, contents, userId) => {
  const comment = await Comment.create({
    post: postId,
    writer: userId,
    contents,
  });

  const post = await Post.findOneAndUpdate({ _id: postId }, { $push: { comments: comment._id } });
  if (!post) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Cannot found or push comments to post');
  }
  return comment;
};

const updateComment = async (updateBody, userId) => {
  const { commentId } = updateBody;
  const comment = await getCommentById(commentId);
  if (comment.writer._id.equals(userId)) {
    Object.assign(comment, updateBody);
    comment.save();
    return comment;
  }
  throw new AppError(httpStatus.UNAUTHORIZED, 'Cannot update comment');
};

const deleteComment = async (commentId, userId) => {
  const comment = await getCommentById(commentId);
  if (comment.writer._id.equals(userId)) {
    await comment.remove();
    return comment;
  }
  throw new AppError(httpStatus.UNAUTHORIZED, 'Cannot delete comment');
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getCommentById,
};
