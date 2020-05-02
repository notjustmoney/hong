const mongoose = require('mongoose');
const { Schema } = mongoose;

const Post = new Schema({
  author: { type: String, required: true },
  product: { type: String, required: true },
  price: Number,
  images: [],
  body: String,
  comments: [{
      author: { type: mongoose.Schema.Types.ObjectId, ref},
      body: { type: String, required: true },
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  like: Number,
  tags: [String],
  link: String,
  hidden: Boolean,
});

module.exports = mongoose.model('Post', Post);