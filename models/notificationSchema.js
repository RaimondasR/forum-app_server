const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  commentAuthor: {
    type: String,
    required: true  
  },
  commentedTopicId: {
    type: String,
    required: true  
  },
  commentedTopicTitle: {
    type: String,
    required: true  
  },
  topicAuthor: {
    type: String,
    required: true  
  },
  commentDate: {
    type: String,
    default: ""  
  },
  commentIsSeen: {
    type: Boolean,
    default: false  
  }
});

module.exports = mongoose.model("ForumAppNotificationModel", notificationSchema);