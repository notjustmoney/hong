const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const postValidation = require('../validations/post.validation');
const postController = require('../controllers/post.controller');

const router = express.Router();

router
  .route('/')
  .get(postController.getPosts)
  .post(auth('createPost'), validate(postValidation.createPost), postController.createPost)
  .patch(auth('managePost'), validate(postValidation.updatePost), postController.updatePost)
  .delete(auth('managePost'), validate(postValidation.deletePost), postController.deletePost);

router.get('/:postId', validate(postValidation.getPostById), postController.getPost);

module.exports = router;
