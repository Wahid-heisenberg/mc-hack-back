const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    description: {
        type: String,
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    status: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },

    dueDate: {
        type: Date,
        required: true,
    },

});


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;


