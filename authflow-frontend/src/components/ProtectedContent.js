// src/components/ProtectedContent.js
import React, { useState, useEffect } from 'react';

const ProtectedContent = ({ token, onLogout }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProtectedData = async () => {
      setIsLoading(true);
      setMessage('');
      try {
        const response = await fetch('http://localhost:5000/api/protected', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Send JWT in Authorization header
          },
        });

        const result = await response.json();

        if (response.ok) {
          setData(result.message);
        } else {
          setMessage(result.message || 'Failed to fetch protected data.');
          if (response.status === 401 || response.status === 403) {
            onLogout();
            setMessage('Your session has expired or is invalid. Please log in again.');
          }
        }
      } catch (error) {
        setMessage('An error occurred while fetching protected data.');
        console.error('Protected content fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchProtectedData();
    }
  }, [token, onLogout]);

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
        onClick={onLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
      >
        Logout
      </button>
    </div>
  );
};

export default ProtectedContent;
