const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    password: String,
    score: Number,
    WPM: Number,
    accuracy: Number,
})

var user = mongoose.model('user', userSchema)

module.exports = user;