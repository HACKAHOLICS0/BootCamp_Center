var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    name : {
        type:String
    },
    lastName : {
        type:String
    },
    birthDate : {
        type:Date
    },
    email : {
        type:String
    },
    phone : {
        type:Number
    },
    password : {
        type:String
    },
    image : {
        type:String
    },
    token : {
        type:String
    },
    state : {
        type:Number
    },
    coursepreferences : {
        type:[String]
    },
    refinterestpoints : {
        type:[String]
    },
    refmodules : {
        type:[String]
    },
    reffriends : {
        type:[String]
    },   
    typeUser : {
        type:String,
    } ,
    isVerified: { 
        type: Boolean, 
        default: false  // <-- Add this field
    },  
    emailVerificationToken: {
        type: String
    },
    verificationCode: {
        type: String
    },
});

module.exports = mongoose.model('user',User);