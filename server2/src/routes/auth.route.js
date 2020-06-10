const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router
  .route('/me/:userId')
  .get(auth('manageProfile'), validate(authValidation.getUserInfo), authController.getUserInfo)
  .patch(auth('manageProfile'), validate(authValidation.updateUserInfo), authController.updateUserInfo);

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);

module.exports = router;
