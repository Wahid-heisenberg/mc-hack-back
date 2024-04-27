// commit.validators.js

const joi = require('joi');

// joi schema for commit creation
const createCommitSchema = joi.object({
    user: joi.string().required(),
    actionType: joi.string().valid('create', 'update', 'delete').required(),
    changes: joi.string().required(),
    section: joi.string().required()
});

// joi schema for commit update
const updateCommitSchema = joi.object({
    user: joi.string().required(),
    actionType: joi.string().valid('create', 'update', 'delete').required(),
    changes: joi.string().required(),
    section: joi.string().required()
});

module.exports = {
    createCommitSchema,
    updateCommitSchema
};
