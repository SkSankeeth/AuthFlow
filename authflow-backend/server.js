// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Define Auth Routes
app.use('/api/auth', authRoutes);

// Define a Protected Route
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({
    message: `Welcome, ${req.user.username || req.user.email}! You have accessed protected data.`,
    userId: req.user.id,
    userEmail: req.user.email
  });
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
