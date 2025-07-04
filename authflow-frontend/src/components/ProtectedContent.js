// src/components/ProtectedContent.js
import React, { useState, useEffect } from 'react';

const ProtectedContent = ({ token, onLogout }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // useEffect hook to fetch protected data when the component mounts or token changes
  useEffect(() => {
    const fetchProtectedData = async () => {
      setIsLoading(true); // Set loading state
      setMessage(''); // Clear any previous messages
      try {
        // Send a GET request to the protected backend endpoint
        const response = await fetch('http://localhost:5000/api/protected', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // IMPORTANT: Send the JWT in the Authorization header as a Bearer token
            'Authorization': `Bearer ${token}`,
          },
        });

        const result = await response.json(); // Parse the JSON response

        if (response.ok) { // Check for successful HTTP status
          setData(result.message); // Set the protected data message
        } else {
          // Display error message from backend or a default one
          setMessage(result.message || 'Failed to fetch protected data.');
          // If the server responds with 401 (Unauthorized) or 403 (Forbidden),
          // it means the token is invalid or expired, so log the user out.
          if (response.status === 401 || response.status === 403) {
            onLogout(); // Call the logout handler from App.js
            setMessage('Your session has expired or is invalid. Please log in again.');
          }
        }
      } catch (error) {
        // Handle network errors
        setMessage('An error occurred while fetching protected data.');
        console.error('Protected content fetch error:', error);
      } finally {
        setIsLoading(false); // Reset loading state
      }
    };

    // Only fetch data if a token exists
    if (token) {
      fetchProtectedData();
    }
  }, [token, onLogout]); // Dependencies: re-run effect if token or onLogout changes

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Welcome to the Protected Area!</h2>
      {isLoading ? (
        <p className="text-gray-600">Loading protected content...</p>
      ) : data ? (
        <p className="text-lg text-green-700 mb-4">{data}</p>
      ) : (
        <p className="text-red-500 mb-4">{message}</p>
      )}

      <button
        onClick={onLogout} // Call the logout handler when button is clicked
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
      >
        Logout
      </button>
    </div>
  );
};

export default ProtectedContent;
