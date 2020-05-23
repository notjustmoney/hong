const mongoose = require('mongoose');
const { pick, omit } = require('lodash');

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    contents: {
      type: String,
    },
    writer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    post: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Post',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

commentSchema.methods.toJSON = function () {
  const comment = this;
  return omit(comment.toObject(), ['_id']);
};

commentSchema.methods.transform = function () {
  const comment = this;
  return pick(comment.toJSON(), ['writer', 'contents', 'createdAt', 'updatedAt']);
};

commentSchema.pre('save', async function (next) {
  const comment = this;
  comment.updatedAt = Date.now;
  next();
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
