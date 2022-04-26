const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  topicId: {
    type: String,
    required: true    
  },
  topicTitle: {
    type: String,
    required: true  
  },
  topicCreatorName: {
    type: String,
    required: true  
  },
  topicSummaryText: {
    type: String,
    required: true  
  },
  topicImage: {
    type: String,
    default: ""  
  },
  topicCreationDate: {
    type: Number,
    required: true
  },
  topicCommentsCount: {
    type: Number,
    default: 0
  },
  newestCommentAuthor: {
    type: String,
    required: true
  },
  newestCommentDate: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("ForumAppTopicModel", topicSchema);