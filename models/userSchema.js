const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: {
    type: String,
    required: true    
  },
  userName: {
    type: String,
    required: true  
  },
  password: {
    type: String,
    required: true  
  },
  image: {
    type: String,
    default: "https://pixy.org/src/30/thumbs350/301929.jpg"  
  },
  registrationDate: {
    type: Number,
    required: true
  },
  topicsCount: {
    type: Number,
    default: 0
  },
  messagesCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("ForumAppUserModel", userSchema);