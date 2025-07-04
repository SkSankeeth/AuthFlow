// src/components/LoginForm.js
import React, { useState } from 'react';

const LoginForm = ({ onAuthSuccess, setMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true); // Set loading state to true
    setMessage(''); // Clear any previous messages

    try {
      // Send a POST request to your backend's login endpoint
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indicate that the body is JSON
        },
        body: JSON.stringify({ email, password }), // Convert form data to JSON string
      });

      const data = await response.json(); // Parse the JSON response from the server

      if (response.ok) { // Check if the HTTP status code is in the 200s
        onAuthSuccess(data.token); // Call the success handler from App.js with the token
      } else {
        // If response is not OK, display the error message from the backend or a default one
        setMessage(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      // Catch network errors or other unexpected issues
      setMessage('An error occurred during login. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false); // Reset loading state regardless of success or failure
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login-email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="login-email"
          type="email"
          placeholder="your@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required // HTML5 validation for required field
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login-password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="login-password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required // HTML5 validation for required field
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out disabled:opacity-50"
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? 'Logging In...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;
