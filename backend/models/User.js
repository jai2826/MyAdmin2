const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: String,  
  password:String,
  role:{
    type:String,
    default:"Author"
  },
  date: {
    type: Date,
    default: Date.now,
  },
  
});
const User = mongoose.model("user", UserSchema);
// User.createIndexes();
module.exports = User



// officeid:Number,
// blogs: