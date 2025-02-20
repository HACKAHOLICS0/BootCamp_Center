const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
const User = require('../Model/User');
require('dotenv').config();
const sendEmail = require('../utils/email');

// Twilio client initialization
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Check if an email exists in the database
const checkEmailExists = async (req, res) => {
  const { email } = req.params;
  try {
    const existingUser = await User.findOne({ email });
    return res.status(200).json({ exists: !!existingUser });
  } catch (error) {
    console.error('Error during email check:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// User signup
const signup = async (req, res) => {
  const { name, lastName, birthDate, phone, email, password, role } = req.body;
  const imagePath = req.file ? req.file.path : null; // Handle image upload

  // Validate fields
  if (!name || !lastName || !birthDate || !phone || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Default role to 'user' if not provided
  const userRole = role === 'admin' ? 'admin' : 'user';

  try {
    // Check if the email or phone already exists
    const existingEmail = await User.findOne({ email });
    const existingPhone = await User.findOne({ phone });

    if (existingEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    if (existingPhone) {
      return res.status(400).json({ error: 'Phone number already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      lastName,
      birthDate,
      phone,
      email,
      typeUser: userRole,  // Set role (user/admin)
      password: hashedPassword,
      image: imagePath,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// User signin
const signin = async (req, res) => {
  const { email, password } = req.body;

  // Validate fields
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Incorrect password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set JWT token as an HTTPOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 3600000, // 1 hour
    });

    // Send user info along with the token
    res.status(200).json({
      msg: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        birthDate: user.birthDate,
        phone: user.phone,
        email: user.email,
        image: user.image,
        state: user.state,
        coursepreferences: user.coursepreferences,
        refinterestpoints: user.refinterestpoints,
        refmodules: user.refmodules,
        reffriends: user.reffriends,
        typeUser: user.typeUser,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Token authentication middleware
const authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Edit user details
const editUser = async (req, res) => {
  const { name, lastName, birthDate, phone, email, password, role } = req.body;
  const userId = req.params.id;
  const imagePath = req.file ? req.file.path : null;

  try {
    // Find user by ID
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update role if provided
    let userRole = user.role;
    if (role) {
      userRole = role === 'admin' ? 'admin' : 'user';
    }

    // Update password if provided
    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update user info
    user.name = name || user.name;
    user.lastName = lastName || user.lastName;
    user.birthDate = birthDate || user.birthDate;
    user.phone = phone || user.phone;
    user.email = email || user.email;
    user.password = hashedPassword;
    user.role = userRole;  // Update role
    user.image = imagePath || user.image;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user details by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Send verification code via SMS
const sendVerificationCode = async (req, res) => {
  const { phone } = req.body;

  try {
    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: 'Phone number not found' });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode;
    await user.save();

    await client.messages.create({
      body: `Your verification code is: ${verificationCode}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    res.status(200).json({ message: 'Verification code sent via SMS' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify the SMS code
const verifyCode = async (req, res) => {
  const { phone, code } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user || user.verificationCode !== code) {
      return res.status(400).json({ message: 'Invalid code' });
    }

    res.status(200).json({ message: 'Code verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reset password after code verification
const resetPassword = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: 'Phone number not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.verificationCode = null; // Reset the verification code
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Forgot password - send verification code via email
const forgotPasswordEmail = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode;
    await user.save();

    await sendEmail(email, 'Password Reset - Verification Code', `Your verification code is: ${verificationCode}`);

    res.status(200).json({ message: 'Verification code sent via email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reset password after email verification
const resetPasswordEmail = async (req, res) => {
  const { email, code, password } = req.body;

  try {
    if (!email || !code || !password) {
      return res.status(400).json({ message: 'Email, code, and new password are required' });
    }

    const user = await User.findOne({ email });
    if (!user || user.verificationCode !== code) {
      return res.status(400).json({ message: 'Invalid code or user not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.verificationCode = null; // Reset the verification code
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  signup,
  signin,
  authenticate,
  checkEmailExists,
  sendVerificationCode,
  verifyCode,
  resetPassword,
  forgotPasswordEmail,
  resetPasswordEmail,
  editUser,
  getUserById,
};
