const mongoose = require('mongoose')
const { Schema } = mongoose;
const BlogsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    default: "Anonymous",
    ref: "user",
  },
  title: String,
  post: String,
  body: String,
  date: {
    type: Date,
    default: Date.now,
  },
  categories: [
    {
      type: String,
    },
  ],
});
module.exports = mongoose.model('blog',BlogsSchema)