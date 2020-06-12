const httpStatus = require('http-status');
const { Hashtag, Post } = require('../models');
const AppError = require('../utils/AppError');

const getHashtagById = async (tagId) => {
  const hashtag = await Hashtag.findById(tagId);
  if (!hashtag) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  return hashtag;
};

const updateHashtag = async (post) => {
  post.tags.forEach(async (tag) => {
    const deletedTag = await Hashtag.findOne({ hashtag: tag });
    if (deletedTag) {
      const index = tag.posts.indexOf(post._id);
      if (index > -1) {
        tag.posts.splice(index, 1);
      }
      if (tag.posts.length === 0) {
        await deletedTag.remove();
      }
    }
  });
};

module.exports = {
  getHashtagById,
  updateHashtag,
};
