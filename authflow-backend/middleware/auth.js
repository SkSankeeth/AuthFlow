const jwt = require('jsonwebtoken');

// This middleware function will be used to protect routes
module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token format. Expected "Bearer <token>"' });
  }

  const token = authHeader.slice(7);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach user payload to the request
    next();
  } catch (err) {
    // Handle token verification errors
    console.error('Token verification failed:', err.message);
    res.status(401).json({ message: 'Token is not valid or has expired' });
  }
};
