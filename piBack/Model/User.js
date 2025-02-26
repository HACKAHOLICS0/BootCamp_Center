var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    name: String,
    lastName: String,
    birthDate: Date,
    email: { type: String, unique: true }, // Email unique
    phone: Number,
    password: String,
    image: String,
    token: String,
    state: Number,
    googleId: { type: String, unique: true, sparse: true },
    githubId: { type: String, unique: true, sparse: true },
    authProvider: { type: String, enum: ['auth', 'github', 'local'] },
    coursepreferences: [String],
    refinterestpoints: [String],
    refmodules: [String],
    reffriends: [String],   
    typeUser: String,
   
});

module.exports = mongoose.model('User', User);
