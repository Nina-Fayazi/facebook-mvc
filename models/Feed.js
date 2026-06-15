const mongoose = require('mongoose');

const FeedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxlength: [15, 'Name cannot be longer than 15 characters']
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        maxlength: [40, 'Message cannot be longer than 40 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feed', FeedSchema);