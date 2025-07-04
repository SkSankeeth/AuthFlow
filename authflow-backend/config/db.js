// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser and useUnifiedTopology are options to avoid deprecation warnings
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...'); // Log success message
  } catch (err) {
    console.error(err.message); // Log error message
    process.exit(1); // Exit the process with a failure code if connection fails
  }
};

module.exports = connectDB; // Export the connectDB function