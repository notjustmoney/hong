const httpStatus = require('http-status');
const { Hashtag } = require('../models');
const AppError = require('../utils/AppError');

const getHashtagById = async (tagId) => {
  const hashtag = await Hashtag.findById(tagId);
  if (!hashtag) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  return hashtag;
};

const updateHashtag = async (post) => {
  post.tags.forEach(async (tagId) => {
    const deletedTag = await Hashtag.findById(tagId);
    if (deletedTag) {
      const index = deletedTag.posts.indexOf(post._id);
      if (index > -1) {
        deletedTag.posts.splice(index, 1);
      }
      if (deletedTag.posts.length === 0) {
        await deletedTag.remove();
      }
    }
  });
};

module.exports = {
  getHashtagById,
  updateHashtag,
};
