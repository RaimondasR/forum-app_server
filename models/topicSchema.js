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
  topicMessage: {
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
  topicMsessageCount: {
    type: Number,
    default: 0
  },
  newestMessageAuthor: {
    type: String,
    required: true
  },
  newestMessageDate: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("ForumAppTopicModel", topicSchema);