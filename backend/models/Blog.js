const mongoose = require('mongoose')
const { Schema } = mongoose;
const BlogsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  title: String,
  post: String,
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