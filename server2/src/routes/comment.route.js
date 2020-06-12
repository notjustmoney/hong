const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const commentValidation = require('../validations/comment.validation');
const commentController = require('../controllers/comment.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('createComment'), validate(commentValidation.createComment), commentController.createComment)
  .delete(auth('manageComment'), validate(commentValidation.deleteCommnet), commentController.deleteComment)
  .patch(auth('manageComment'), validate(commentValidation.updateComment), commentController.updateComment);

module.exports = router;
