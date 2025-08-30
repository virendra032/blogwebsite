const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        default: 'pending' // pending, approved, rejected
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Blog', blogSchema);
