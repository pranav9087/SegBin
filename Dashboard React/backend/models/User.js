const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        minlength: 3
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        minlength: 3
    },
});


module.exports = mongoose.model('User', userSchema);