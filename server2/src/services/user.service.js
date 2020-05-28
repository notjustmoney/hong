const httpStatus = require('http-status');
const { pick } = require('lodash');
const AppError = require('../utils/AppError');
const { User } = require('../models');
const { getQueryOptions } = require('../utils/service.util');

const checkDuplicateEmail = async (email, excludeUserId) => {
  const user = await User.findOne({ email, _id: { $ne: excludeUserId } });
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email already exists');
  }
};

const checkDuplicateNickname = async (nickname, excludeUserId) => {
  const user = await User.findOne({ 'profile.nickname': nickname, _id: { $ne: excludeUserId } });
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Nickname alread exists');
  }
};

const createUser = async (userBody) => {
  await checkDuplicateEmail(userBody.email);
  await checkDuplicateNickname(userBody.nickname);
  const user = await User.create({
    profile: {
      name: userBody.name,
      nickname: userBody.nickname,
    },
    email: userBody.email,
    password: userBody.password,
    passwordConfirmation: userBody.passwordConfirmation,
    role: userBody.role,
  });
  return user;
};

const getUsers = async (query) => {
  const filter = pick(query, ['name', 'role']);
  const options = getQueryOptions(query);
  const users = await User.find(filter, null, options);
  return users;
};

const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'No user found with input email');
  }
  return user;
};

// set default updateBody.email = origin email
const updateUser = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (updateBody.nickname) {
    await checkDuplicateNickname(updateBody.nickname, userId);
  }
  if (updateBody.email) {
    await checkDuplicateEmail(updateBody.email, userId);
  }
  user.isReset = true;
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const updateUserPassword = async (userId, newPassword) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  user.password = newPassword;
  await user.save();
  return user;
};

const deleteUser = async (userId) => {
  const user = await getUserById(userId);
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  updateUserPassword,
  deleteUser,
};
