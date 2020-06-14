const mongoose = require('mongoose');
const { pick } = require('lodash');

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
    },
    contents: {
      type: String,
      required: true,
    },
    imgs: [
      {
        type: String,
        require: true,
      },
    ],
    link: {
      type: String,
      index: true,
      trim: true,
      require: true,
    },
    price: {
      type: Number,
      default: 0,
      required: false,
    },
    likes: [
      {
        type: Schema.ObjectId,
        ref: 'Like',
      },
    ],
    tags: [
      {
        type: Schema.ObjectId,
        ref: 'Hashtag',
      },
    ],
    comments: [
      {
        type: Schema.ObjectId,
        ref: 'Comment',
      },
    ],
    writer: {
      type: Schema.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['scrapped', 'uploaded'],
      default: 'scrapped',
    },
  },
  {
    toObject: {
      virtuals: true,
      getters: true,
    },
    toJSON: { getters: true },
  }
);

postSchema.method.toJSON = function () {
  const post = this;
  return post.toObject();
};

postSchema.methods.transform = function () {
  const post = this;
  return pick(post.toJSON(), [
    'id',
    'title',
    'contents',
    'comments',
    'imgs',
    'link',
    'price',
    'tags',
    'writer',
    'status',
    'likes',
  ]);
};

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
