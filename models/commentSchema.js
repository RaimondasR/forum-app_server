const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
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
    commentDate: {
        type: Number,
        default: Date.now(),
    },
    comment: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("ForumAppCommentModel", commentSchema);