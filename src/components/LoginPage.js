import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Initialize as an empty string
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
        console.log("Sending login request..."); // Debug log
        const response = await fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ useremail: email, password }),
        });

        console.log("Response status:", response.status); // Debug log

        const contentType = response.headers.get('Content-Type');
        let responseData;

        if (contentType && contentType.includes('application/json')) {
            responseData = await response.json();
        } else {
            responseData = await response.text();
        }

        console.log("Response data:", responseData); // Debug log

        if (response.ok) {
            const token = responseData.token;
            localStorage.setItem('jwtToken', token);
            navigate('/dashboard');
        } else {
            // Handle the case where the error message might be an object
            const errorMessage = typeof responseData === 'string' ? responseData : responseData.error || 'Login failed!';
            setError(errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
        setError('An unexpected error occurred.');
    }
};


  const handleForgotPassword = () => {
    navigate('/passwordchange');
  };

  return (
    <div className="container">
      <header>Login Page</header>
      <form onSubmit={handleLogin} className="form">
        <div className="input-box">
          <label>Email Address</label>
          <input
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>} {/* Display error message */}
        <button type="submit">Login</button>
      </form>
      <button onClick={handleForgotPassword} className="forgot-password-button">
        Forgot Password?
      </button>
    </div>
  );
};

export default LoginPage;
