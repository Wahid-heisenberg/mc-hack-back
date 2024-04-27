const mongoose = require("mongoose");

const taxSchema = new mongoose.Schema({
    /*
    Name: The name or title of the tax.
Description: A detailed description of the tax.
Type: The type of tax (e.g., income tax, sales tax, value-added tax).
Rate: The tax rate, expressed as a percentage.
Effective Date: The date when the tax rate becomes effective.
Expiration Date: The date when the tax rate expires or is no longer valid.
Applicable Entity: The entity to which the tax applies (e.g., project, company).
Currency: The currency in which the tax is calculated.
Status: The status of the tax (e.g., active, inactive).
    */ 

    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },

    description: {
        type: String,
        required: true,
    },

    type: {
        type: String,
        required: true,
    },

    rate: {
        type: Number,
        required: true,
    },

    effectiveDate: {
        type: Date,
        required: true,
    },

    expirationDate: {
        type: Date,
        required: true,
    },

    applicableEntity: {
        type: String,
        required: true,
    },

    currency: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        required: true,
    },

});

const Tax = mongoose.model('Tax', taxSchema);

module.exports = Tax;