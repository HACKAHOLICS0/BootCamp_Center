var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
<<<<<<< HEAD
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
=======
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
    googleId: {
        type: String,
        unique: true, // Un utilisateur GitHub doit être unique
        sparse: true, // Permet d'avoir des utilisateurs sans GitHub ID (Google, Email, etc.)
      },
    githubId: {
        type: String,
        unique: true, // Un utilisateur GitHub doit être unique
        sparse: true, // Permet d'avoir des utilisateurs sans GitHub ID (Google, Email, etc.)
      },
      authProvider: {
        type: String,
        enum: ['auth', 'github', 'local'],
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
    } ,isVerified: { 
        type: Boolean, 
        default: false  // <-- Add this field
    },  
    emailVerificationToken: {
        type: String
    }
    
});

module.exports = mongoose.model('User', User); // Avec une majuscule
>>>>>>> f7422f2b011fcbd9bdcec2e116826ff27837e8cc
