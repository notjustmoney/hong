const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService } = require('../services');

// get user json in login status
const getUserInfo = catchAsync(async (req, res) => {
  const jwtUserId = req.user._id.toString();
  const { userId } = req.params;
  if (jwtUserId !== userId) {
    // if logged in user info doesn't match with request user info
    // response forbidden status code with message
    const response = { msg: `You cannot access others profile management page` };
    res.status(httpStatus.FORBIDDEN).send(response);
  } else {
    // if logged in user info match with request user info
    // repsonse 200 status code with user json
    const user = await userService.getUserById(userId);
    const response = { user: user.transform() };
    res.send(response);
  }
});

// update user in login status
const updateUserInfo = catchAsync(async (req, res) => {
  const jwtUserId = req.user._id.toString();
  const { userId } = req.body;
  if (jwtUserId !== userId) {
    // if logged in user info doesn't match with request user info
    // response forbidden status code with message
    const response = { msg: `You cannot access others profile management page` };
    res.status(httpStatus.FORBIDDEN).send(response);
  } else {
    // if logged in user info match with request user info
    // update matched user data with request body
    const user = await userService.updateUserInfo(req.body);
    const response = { user: user.transform() };
    res.send(response);
  }
});

// register user to database
const register = catchAsync(async (req, res) => {
  // create user document with request body
  // and generate authentication token with created user id
  // response created 201 status code and user info
  const user = await userService.createUser(req.body);
  const tokens = await authService.generateAuthTokens(user.id);
  const response = { user: user.transform(), tokens };
  res.status(httpStatus.CREATED).send(response);
});

// login with jwt
const login = catchAsync(async (req, res) => {
  // login from request email and password
  // and generate authentication bearer token
  // if success to login, response 200 status code with user info and token
  const user = await authService.loginUser(req.body.email, req.body.password);
  const tokens = await authService.generateAuthTokens(user.id);
  const response = { user: user.transform(), tokens };
  res.send(response);
});

// refresh jwt
const refreshTokens = catchAsync(async (req, res) => {
  // if success to certificate authentication, refresh tokens
  // response 200 status code with tokens
  const tokens = await authService.refreshAuthTokens(req.body.refreshToken);
  const response = { ...tokens };
  res.send(response);
});

// generate resetPasswordToken
const forgotPassword = catchAsync(async (req, res) => {
  // genereate resetPassword from request Email
  // this must add certification with stmp service
  // if success to generate token, response 200 status code with token
  const resetPasswordToken = await authService.generateResetPasswordToken(req.body.email);
  const response = { resetPasswordToken };
  res.send(response);
});

// reset password by resetPasswordToken
const resetPassword = catchAsync(async (req, res) => {
  // reset password from token and new password
  // if success to reset, response 200 status code
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getUserInfo,
  updateUserInfo,
  register,
  login,
  refreshTokens,
  forgotPassword,
  resetPassword,
};
