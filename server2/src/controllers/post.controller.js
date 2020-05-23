const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { postService } = require('../services');

const createPost = catchAsync(async (req, res) => {
  req.body.writer = req.user._id;
  const post = await postService.createPost(req.body);
  const response = post.transform();
  res.status(httpStatus.CREATED).send(response);
});

const getPost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.postId);
  const response = post.transform();
  res.send(response);
});

const getPosts = catchAsync(async (req, res) => {
  const posts = await postService.getPosts(req.query);
  const response = posts.map((post) => post.transform());
  res.send(response);
});

const updatePost = catchAsync(async (req, res) => {
  const post = await postService.updatePost(req.params.postId, req.body);
  res.send(post.transform());
});

const deletePost = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;
  const response = await postService.deletePost(postId, userId);
  res.status(httpStatus.NO_CONTENT).send(response);
});

module.exports = {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
};
