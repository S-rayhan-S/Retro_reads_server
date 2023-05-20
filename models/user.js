const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Password should be atleast 6 characters long'],
    },
    phone:{
        type: String,
        required: [true, 'Please enter your phone number'],
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user',
    },
    avatar: {
        type: String,  
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);


