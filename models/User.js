// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true } // Note: Store hashed passwords in production
});

module.exports = mongoose.model('User', userSchema);
