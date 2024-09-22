// src/api/v1/models/userModel.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    nickname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rank: { type: String, required: true },
    branch: { type: String, required: true },
    date_joined: { type: Date, default: Date.now },
    last_login: { type: Date }
})

const User = model('users', userSchema);

export default User;
