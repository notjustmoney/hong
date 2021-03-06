const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { likeService } = require('../services');

// like on the post corresponding to request postid
const createLike = catchAsync(async (req, res) => {
  const { postId } = req.body;
  const userId = req.user._id;
  const response = await likeService.createLike(postId, userId);
  res.status(httpStatus.CREATED).send(response);
});

// unlikne on the post corresponding to request postid
const cancelLike = catchAsync(async (req, res) => {
  const { postId } = req.body;
  const userId = req.user._id;
  await likeService.cancelLike(postId, userId);
  res.send({ msg: 'like canceled' });
});

module.exports = {
  createLike,
  cancelLike,
};
