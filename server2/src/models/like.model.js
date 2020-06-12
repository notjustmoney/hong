const mongoose = require('mongoose');
const { omit, pick } = require('lodash');

const { Schema } = mongoose;
const likeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  },
  {
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

likeSchema.methods.toJSON = function () {
  const like = this;
  return omit(like.toObject(), ['_id']);
};

likeSchema.methods.transform = function () {
  const like = this;
  return pick(like.toJSON(), ['user', 'post', 'id']);
};

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
