const mongoose = require('mongoose');

// Define the commit schema
const commitSchema = new mongoose.Schema({
    // Reference to the user who made the commit
    user: {
        type: mongoose.Schema.Types.ObjectId, // Type is ObjectId
        ref: 'User', // Reference to the 'User' model
        required: true // User is required for each commit
    },
    actionType : {
        type: String, // Type is String
        enum : ['create', 'update', 'delete'], // Action type can be 'create', 'update', or 'delete'
    },
    // Description of the changes made in the commit
    changes: {
        type: String, // Type is String
        required: true // Changes description is required
    },
    section : {
        type: String, // Type is String
        required: true // Section is required
    },
    // Timestamp of the commit (defaults to the current time)

});
const Commit = mongoose.model("Commmit", commitSchema);
// Export the commit schema
module.exports = Commit;
