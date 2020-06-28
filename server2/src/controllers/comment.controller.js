const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { commentService } = require('../services');

// create comment to post in login status
const createComment = catchAsync(async (req, res) => {
  const { postId, contents } = req.body;
  const userId = req.user._id;
  // create comment with request contents to request post
  // if logged in user is valid, response 201 status code with created comment
  const comment = await commentService.createComment(postId, contents, userId);
  const response = comment.transform();
  res.status(httpStatus.CREATED).send(response);
});

// update comment with request body in login status
const updateComment = catchAsync(async (req, res) => {
  const updateBody = req.body;
  const userId = req.user._id;
  const comment = await commentService.updateComment(updateBody, userId);
  const response = comment.transform();
  res.send(response);
});

// delete comment corresponding to request comment id
const deleteComment = catchAsync(async (req, res) => {
  const { commentId } = req.body;
  const userId = req.user._id;
  await commentService.deleteComment(commentId, userId);
  res.send({ msg: 'comment deleted' });
});

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
