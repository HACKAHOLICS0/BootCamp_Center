var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Complaint Schema
var complaintSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.'],
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['open', 'in-progress', 'resolved'],  // Define the possible status values
        default: 'open',  // Default status is 'open'
    },
});

// Create the Complaint model
var Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
