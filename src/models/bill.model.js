const mongoose = require("mongoose");
const Tax = require("./tax.model");
const billSchema = new mongoose.Schema({

    number: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },

    amount: {
        type: Number,
        required: true,
    },

    dueDate: {
        type: Date,
        required: true,
    },

    status: {
        type: String,
        enum: ['paid', 'pending'],
        default: 'pending',
    },
    
    description: {
        type: String,
        required: true,
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    taxes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tax',
    },
},


{
    timestamps: true,
}



);

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
