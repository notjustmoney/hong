const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const postValidation = require('../validations/post.validation');
const postController = require('../controllers/post.controller');
const commentValidation = require('../validations/comment.validation');
const commentController = require('../controllers/comment.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('createPost'), validate(postValidation.createPost), postController.createPost)
  .get(postController.getPosts);

router
  .route('/comment')
  .post(auth('createComment'), validate(commentValidation.createComment), commentController.createComment)
  .delete(auth('manageComment'), validate(commentValidation.deleteCommnet), commentController.deleteComment)
  .patch(auth('manageComment'), validate(commentValidation.updateComment), commentController.updateComment);

router
  .route('/:postId')
  .get(postController.getPost)
  .delete(auth('managePost'), validate(postValidation.deletePost), postController.deletePost)
  .patch(auth('managePost'), validate(postValidation.updatePost), postController.updatePost);

module.exports = router;
