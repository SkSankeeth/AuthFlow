// middleware/auth.js
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

// This middleware function will be used to protect routes
module.exports = function (req, res, next) {
  // 1. Get token from header
  // The token is typically sent in the 'Authorization' header as 'Bearer TOKEN_STRING'
  const authHeader = req.header('Authorization');

  // Check if the Authorization header exists
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // 2. Extract the token (remove 'Bearer ' prefix)
  // Ensure the header starts with 'Bearer '
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token format. Expected "Bearer <token>"' });
  }

  const token = authHeader.slice(7); // Get the token string after "Bearer "

  // 3. Verify token
  try {
    // jwt.verify(token, secretKey) will decode the token if it's valid
    // and throw an error if it's invalid (e.g., expired, tampered)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user payload to the request object
    // This makes user information (like user.id, user.email) available
    // in subsequent route handlers that use this middleware.
    req.user = decoded.user;
    next(); // Call next() to pass control to the next middleware or route handler
  } catch (err) {
    // Handle token verification errors
    console.error('Token verification failed:', err.message);
    // If the token is invalid (e.g., expired, malformed, or wrong secret),
    // send a 401 Unauthorized response.
    res.status(401).json({ message: 'Token is not valid or has expired' });
  }
};