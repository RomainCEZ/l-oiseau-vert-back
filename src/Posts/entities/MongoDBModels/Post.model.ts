import mongoose from 'mongoose'
import uniqueValidator = require('mongoose-unique-validator');

const postSchema = new mongoose.Schema({
    postId: { type: String, required: true, unique: true },
    authorId: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Number, required: true },
    comments: { type: Array, required: true },
})

postSchema.plugin(uniqueValidator);

export default mongoose.model('Post', postSchema);