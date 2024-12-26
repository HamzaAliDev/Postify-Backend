const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for comments
const commentSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
}, { timestamps: true });

const postSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String },
    imgUrl: { type: String, required: true },
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
    comments: [commentSchema], // Nested comments schema
}, { timestamps: true })

const Post = mongoose.model("Post", postSchema);
module.exports = Post;