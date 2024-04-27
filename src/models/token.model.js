const mongoose = require('mongoose');

// Define the Mongoose schema
const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    expires_at: {
        type: Date,
        required: true
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;