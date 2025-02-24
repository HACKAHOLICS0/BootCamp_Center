var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    googleId: {  // Google OAuth ID (useful for login and mapping)
        type: String,
        unique: true,  // Ensure it's unique to prevent duplicate accounts
        sparse: true,   // Allows for documents without this field (non-Google users)
    },
    name: {
        type: String,
        required: true,  // You can make it required depending on your logic
    },
    lastName: {
        type: String,
    },
    birthDate: {
        type: Date,
    },
    email: {
        type: String,
        required: true,
        unique: true,  // Ensure email is unique for non-Google users
    },
    phone: {
        type: Number,
    },
    password: {
        type: String,
        required: true,  // Required if you're using local authentication
    },
    image: {
        type: String,
    },
    token: {
        type: String,
    },
    state: {
        type: Number,
        default: 1,  // Default value, you can change this to match your app's state logic
    },
    coursepreferences: {
        type: [String],
    },
    refinterestpoints: {
        type: [String],
    },
    refmodules: {
        type: [String],
    },
    reffriends: {
        type: [String],
    },
    typeUser: {
        type: String,
    },
});

module.exports = mongoose.model('User', UserSchema);
