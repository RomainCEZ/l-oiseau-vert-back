import mongoose from 'mongoose'
import uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userId: { type: String, required: true }
})

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);