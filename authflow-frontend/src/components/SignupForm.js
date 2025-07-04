// src/components/SignupForm.js
import React, { useState } from 'react';

const SignupForm = ({ onAuthSuccess, setMessage }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(''); // Clear any previous messages

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json(); // Parse the JSON response from the server

      if (response.ok) {
        onAuthSuccess(data.token);
      } else {
        // --- START OF CHANGES ---
        // Check if the backend provided a specific validation error message.
        // Mongoose validation errors often come under `data.message` or `data.errors`.
        // Your specific error "User validation failed: password: Path `password` (`12345`) is shorter than the minimum allowed length (6)."
        // is likely coming as part of `data.message` in the backend's JSON response if it's a generic 500 error,
        // OR as a specific `message` field if you're explicitly sending it from the backend with a 400 status.

        let errorMessage = 'Signup failed. Please try again.'; // Default message

        // If the backend sends a 'message' field in its error response, use that.
        if (data.message) {
          errorMessage = data.message;
        }

        // Specifically check for validation error details.
        // Although your backend currently sends a generic `Server error` for validation failures,
        // a more robust backend might send structured validation errors.
        // For now, let's just make sure we capture `data.message` effectively.

        // If the error message from the backend specifically mentions "shorter than the minimum allowed length",
        // we can make it even more user-friendly.
        if (errorMessage.includes('shorter than the minimum allowed length (6)')) {
          errorMessage = 'Password must be at least 6 characters long.';
        } else if (errorMessage.includes('email already exists')) {
            errorMessage = 'A user with this email already exists.';
        } else if (errorMessage.includes('username is already taken')) {
            errorMessage = 'This username is already taken.';
        }


        setMessage(errorMessage); // Set the specific or default error message
        // --- END OF CHANGES ---
      }
    } catch (error) {
      setMessage('A network error occurred. Please check your internet connection and try again.');
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-username">
          Username
        </label>
        <input
          className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="signup-username"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="signup-email"
          type="email"
          placeholder="your@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="signup-password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? 'Signing Up...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignupForm;
