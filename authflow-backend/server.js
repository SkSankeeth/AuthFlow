// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth'); // Import the auth middleware

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Define Auth Routes
app.use('/api/auth', authRoutes);

// Define a Protected Route
// This route will only be accessible if the authMiddleware successfully verifies the JWT
app.get('/api/protected', authMiddleware, (req, res) => {
  // If we reach here, it means the token was valid, and req.user contains the decoded payload
  res.json({
    message: `Welcome, ${req.user.username || req.user.email}! You have accessed protected data.`,
    userId: req.user.id,
    userEmail: req.user.email
  });
});

// Basic test route (can remain or be removed)
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));