const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true  
  },
  password: {
    type: String,
    required: true  
  },
  money: {
    type: Number,
    required: true,
    default: 1000  
  },
  secret: {
    type: String,
    required: true    
  }
});

module.exports = mongoose.model("fakeAppUsers", userSchema);