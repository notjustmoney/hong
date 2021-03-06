const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { postService } = require('../services');

// create post with request data
const createPost = catchAsync(async (req, res) => {
  req.body.writer = req.user._id;
  const post = await postService.createPost(req.body);
  const response = post.transform();
  res.status(httpStatus.CREATED).send(response);
});

// search posts by request userid
const getPostsByUser = catchAsync(async (req, res) => {
  const posts = await postService.getPostsByUser(req.params.userId);
  const response = posts.map((post) => post.transform());
  res.send(response);
});

// search posts by request likeid
const getPostByLike = catchAsync(async (req, res) => {
  const post = await postService.getPostByLike(req.params.likeId);
  res.send(post);
});

// search post by request postid
const getPost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.postId);
  const response = post.transform();
  res.send(response);
});

// response all posts in database
const getPosts = catchAsync(async (req, res) => {
  const posts = await postService.getPosts(req.query);
  const response = posts.map((post) => post.transform());
  res.send(response);
});

// update post corresponding to request postid
const updatePost = catchAsync(async (req, res) => {
  const post = await postService.updatePost(req.body);
  res.send(post.transform());
});

// delete post corresponding to request postid
const deletePost = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.body;
  const response = await postService.deletePost(postId, userId);
  res.status(httpStatus.NO_CONTENT).send(response);
});

module.exports = {
  createPost,
  getPostsByUser,
  getPostByLike,
  getPost,
  getPosts,
  updatePost,
  deletePost,
};
