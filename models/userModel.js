const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    bio: { type: String, default: 'Postify user' },
    photoUrl: { type: String, default: '' },
    followings: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
    followers: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
    roles: { type: [String], default: ['user'] },
    status: { type: String, default: 'active' },
    emailVerified: { type: Boolean, default: false },
}, { timestamps: true })

const User = mongoose.model("User", userSchema)
module.exports = User