const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const likeValidation = require('../validations/like.validation');
const likeController = require('../controllers/like.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageComment'), validate(likeValidation.createLike), likeController.createLike)
  .delete(auth('manageComment'), validate(likeValidation.cancelLike), likeController.cancelLike);

module.exports = router;
