// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ProtectedContent from './components/ProtectedContent';

const App = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFront, setShowFront] = useState(true);

  const flipTimeoutRef = useRef(null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (activeTab === 'protected') {
      setIsFlipped(false);
      setShowFront(true);
      if (flipTimeoutRef.current) {
        clearTimeout(flipTimeoutRef.current);
        flipTimeoutRef.current = null;
      }
    }
  }, [activeTab]);

  useEffect(() => {
    return () => {
      if (flipTimeoutRef.current) {
        clearTimeout(flipTimeoutRef.current);
      }
    };
  }, []);

  const handleAuthSuccess = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    setMessage('Authentication successful!');
    setActiveTab('protected');
    setIsFlipped(false);
    setShowFront(true);
    if (flipTimeoutRef.current) {
      clearTimeout(flipTimeoutRef.current);
      flipTimeoutRef.current = null;
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setMessage('Logged out successfully.');
    setActiveTab('login');
    setIsFlipped(false);
    setShowFront(true);
    if (flipTimeoutRef.current) {
      clearTimeout(flipTimeoutRef.current);
      flipTimeoutRef.current = null;
    }
  };

  const handleTabChange = (tabName) => {
    if (flipTimeoutRef.current) {
      clearTimeout(flipTimeoutRef.current);
      flipTimeoutRef.current = null;
    }

    if (tabName === 'login' && activeTab === 'signup') {
      setIsFlipped(false);
      setShowFront(true);
    } else if (tabName === 'signup' && activeTab === 'login') {
      setIsFlipped(true);
      flipTimeoutRef.current = setTimeout(() => {
        setShowFront(false);
      }, 300);
    }
    setActiveTab(tabName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 overflow-hidden font-inter text-gray-800">
      <style>
        {`
        /* Import Google Font - Inter */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        body {
          font-family: 'Inter', sans-serif;
        }

        /* Basic card flip styles */
        .flip-card-container {
          perspective: 1000px;
          width: 100%;
          height: 100%;
          position: relative;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          transform-style: preserve-3d;
        }

        .flip-card-inner.flipped {
          transform: rotateY(180deg);
        }

        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          min-height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          padding: 0;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }

        /* New Age UI Enhancements */
        .card-glow {
          background: linear-gradient(145deg, #ffffff, #f7f9fc);
          border: 1px solid rgba(220, 230, 240, 0.5);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08), 0 0 0 3px rgba(100, 149, 237, 0.1);
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .card-glow:hover {
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12), 0 0 0 4px rgba(100, 149, 237, 0.2);
          transform: translateY(-5px);
        }

        /* Button hover effects */
        .tab-button {
          transition: all 0.3s ease-in-out;
          border: 1px solid transparent;
          font-weight: 500;
          letter-spacing: 0.025em;
          transform: translateZ(0);
        }
        .tab-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.18);
        }
        .tab-button.active {
          background-image: linear-gradient(to right, #6a5acd, #4a90e2);
          box-shadow: 0 5px 20px rgba(106, 90, 205, 0.5);
          color: white;
          border-color: transparent;
          transform: translateY(-1px);
        }
        .tab-button.inactive {
          background-color: #eef2f6;
          color: #64748b;
          border-color: #d1d5db;
        }

        /* Input focus effects */
        input {
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease-in-out;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
        }
        input:focus {
          border-color: #6a5acd;
          box-shadow: 0 0 0 4px rgba(106, 90, 205, 0.25), inset 0 1px 3px rgba(0, 0, 0, 0.1);
          outline: none;
        }

        /* Form specific padding to ensure consistent inner spacing */
        .form-content-wrapper {
          width: 100%;
          padding: 0 2rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: center;
        }

        /* Message box animation */
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        /* Submit button styling */
        .submit-button {
          background-image: linear-gradient(to right, #4a90e2, #6a5acd);
          color: white;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 5px 15px rgba(74, 144, 226, 0.4);
          transition: all 0.3s ease-in-out;
          border: none;
          cursor: pointer;
        }
        .submit-button:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 20px rgba(74, 144, 226, 0.5);
        }
        .submit-button:active {
          transform: translateY(0) scale(0.98);
          box-shadow: 0 2px 5px rgba(74, 144, 226, 0.3);
        }
        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }
        `}
      </style>

      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md min-h-[520px] flex flex-col card-glow">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 tracking-wide">AuthFlow</h1>

        {message && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-md relative mb-4 w-full animate-fade-in">
            <span className="block sm:inline">{message}</span>
          </div>
        )}

        {!token ? (
          <>
            <div className="flex justify-center mb-6 w-full">
              <button
                className={`px-4 py-2 rounded-l-lg tab-button ${
                  activeTab === 'login'
                    ? 'active'
                    : 'inactive'
                }`}
                onClick={() => handleTabChange('login')}
              >
                Login
              </button>
              <button
                className={`px-4 py-2 rounded-r-lg tab-button ${
                  activeTab === 'signup'
                    ? 'active'
                    : 'inactive'
                }`}
                onClick={() => handleTabChange('signup')}
              >
                Sign Up
              </button>
            </div>

            <div className="flip-card-container flex-grow">
              <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
                <div className="flip-card-front">
                  {(showFront && activeTab === 'login') && (
                    <div className="form-content-wrapper">
                      <LoginForm onAuthSuccess={handleAuthSuccess} setMessage={setMessage} />
                    </div>
                  )}
                  {!(showFront && activeTab === 'login') && <div className="flex-grow"></div>}
                </div>

                <div className="flip-card-back">
                  {(!showFront && activeTab === 'signup') && (
                    <div className="form-content-wrapper">
                      <SignupForm onAuthSuccess={handleAuthSuccess} setMessage={setMessage} />
                    </div>
                  )}
                  {!( !showFront && activeTab === 'signup') && <div className="flex-grow"></div>}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center">
            <ProtectedContent token={token} onLogout={handleLogout} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
