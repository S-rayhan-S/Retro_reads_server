const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter book title'],
    },
    author: {
        type: String,
        required: [true, 'Please enter book author'],
    },
    publicationYear: {
        type: String,
        required: [true, 'Please enter book publication year'],
    },
    publisher: {
        type: String,
        required: [true, 'Please enter book publisher'],
    },
    description: {
        type: String,
        required: [true, 'Please enter book description'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter book price'],
    },
    ISBN: {
        type: String,
        required: [true, 'Please enter book ISBN'],
    },
    category: {
        type: String,
        required: [true, 'Please enter book category'],
        default: 'Uncategorized'
    },
    condition: {
        type: String,
        enum: ['new', 'used'],
        default: 'new',
    },
    listingType: {
        type: String,
        enum: ['sell', 'rent'],
        default: 'sell',
    },
    status: {
        type: String,
        enum: ['available', 'sold','rented'],
        default: 'available',
    },
    image: {
        type: String,
    },
    addBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required : true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Book', bookSchema);