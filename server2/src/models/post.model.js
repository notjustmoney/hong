const mongoose = require('mongoose');
const { pick } = require('lodash');

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
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
    likes: {
      type: Number,
      default: 0,
    },
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
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

postSchema.method.toJSON = function () {
  const post = this;
  return post.toObject();
};

// postSchema.pre('save', async function (next) {
//   const post = this;
//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

postSchema.methods.transform = function () {
  const post = this;
  return pick(post.toJSON(), ['id', 'title', 'contents', 'comments', 'imgs', 'link', 'price', 'tags', 'writer', 'status']);
};

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
