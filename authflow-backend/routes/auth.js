// routes/auth.js
const express = require('express');
const router = express.Router(); // Create an Express router
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for JWT creation
const User = require('../models/User'); // Import the User model

// @route   POST /api/auth/signup
// @desc    Register user & get token
// @access  Public
router.post('/signup', async (req, res) => {
  // Destructure email, username, and password from the request body
  const { username, email, password } = req.body;

  try {
    // 1. Check if user already exists with the given email
    let user = await User.findOne({ email });
    if (user) {
      // If user exists, return a 400 Bad Request response
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // 2. Check if username is already taken
    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // 3. Create a new user instance
    user = new User({
      username,
      email,
      password, // The password will be hashed automatically by the pre-save hook in User.js
    });

    // 4. Save the user to the database
    await user.save();

    // 5. Create JWT Payload
    // The payload contains information about the user that will be encoded in the token.
    // We typically include the user's ID and email (or other identifying info, but never sensitive data like password).
    const payload = {
      user: {
        id: user.id, // Mongoose creates an 'id' virtual getter for '_id'
        email: user.email,
        username: user.username
      },
    };

    // 6. Sign the JWT
    // jwt.sign(payload, secret_key, options, callback)
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Your secret key from .env
      { expiresIn: '1h' }, // Token expiration time (e.g., 1 hour)
      (err, token) => {
        if (err) throw err; // If there's an error signing the token, throw it
        res.json({ token, message: 'User registered successfully!' }); // Send the token back to the client
      }
    );
  } catch (err) {
    // Handle server errors (e.g., database issues)
    console.error(err.message);
    res.status(500).send('Server error during signup');
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  // Destructure email and password from the request body
  const { email, password } = req.body;

  try {
    // 1. Check if user exists with the given email
    let user = await User.findOne({ email });
    if (!user) {
      // If user does not exist, return a 400 Bad Request response
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // 2. Compare the provided password with the hashed password in the database
    // We use the matchPassword method defined in the User model
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      // If passwords don't match, return a 400 Bad Request response
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // 3. Create JWT Payload (same as signup)
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      },
    };

    // 4. Sign the JWT
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, message: 'Logged in successfully!' }); // Send the token back to the client
      }
    );
  } catch (err) {
    // Handle server errors
    console.error(err.message);
    res.status(500).send('Server error during login');
  }
});

module.exports = router; // Export the router