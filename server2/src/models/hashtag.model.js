const mongoose = require('mongoose');
const { omit } = require('lodash');

const { Schema } = mongoose;
const hashtagSchema = new Schema(
  {
    hashtag: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  {
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

hashtagSchema.methods.toJSON = function () {
  const hashtag = this;
  return omit(hashtag.toObject(), ['_id']);
};

hashtagSchema.methods.getTag = function () {
  const hashtag = this;
  return omit(hashtag.toJSON(), ['_id', 'posts']);
};

const Hashtag = mongoose.model('Hashtag', hashtagSchema);
module.exports = Hashtag;
