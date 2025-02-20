const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verificationCode: { type: String, default: null }, // Temporary code for email/phone verification
    verificationCodeExpires: { type: Date, default: null }, // Expiry time for verification code
    resetToken: { type: String, default: null }, // Temporary password reset token
    resetTokenExpires: { type: Date, default: null }, // Expiry time for reset token
    image: { type: String, default: null }, // User profile image (URL or path)
    birthDate: { type: Date, required: true }, // User birth date
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // User role (user, admin)
    isVerified: { type: Boolean, default: false }, // To track if the user has verified email/phone
    coursepreferences: { type: [String], default: [] }, // Optional: User's preferred courses
    refinterestpoints: { type: [String], default: [] }, // Optional: User's reference interest points
    refmodules: { type: [String], default: [] }, // Optional: User's reference modules
    reffriends: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] }, // Reference to friends
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Create an index for fast searching based on email and phone
userSchema.index({ email: 1, phone: 1 });

module.exports = mongoose.model('User', userSchema);
