const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { commentService } = require('../services');

const createComment = catchAsync(async (req, res) => {
  const { postId } = req.query;
  const { contents } = req.body;
  const userId = req.user._id;
  const comment = await commentService.createComment(postId, contents, userId);
  const response = comment.transform();
  res.status(httpStatus.CREATED).send(response);
});

const updateComment = catchAsync(async (req, res) => {
  const { commentId } = req.query;
  const userId = req.user._id;
  const comment = await commentService.updateComment(commentId, req.body, userId);
  const response = comment.transform();
  res.send(response);
});

const deleteComment = catchAsync(async (req, res) => {
  const { commentId } = req.query;
  const userId = req.user._id;
  await commentService.deleteComment(commentId, userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
