import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './PasswordChangePage.css';

const PasswordChangePage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      // First, check if the email exists
      const response = await fetch('http://localhost:8080/api/users/check-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })  // Ensure the key matches the DTO field
      });
      
      if (!response.ok) {
        alert('Email not found!');
        return;
      }

      // If email exists, send OTP
      const otpResponse = await fetch('http://localhost:8080/api/users/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (otpResponse.ok) {
        navigate('/otp-verification', { state: { email } });
      } else {
        alert('Failed to send OTP!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending the OTP.');
    }
  };

  return (
    <div className="container">
      <header>Forgot Password</header>
      <form onSubmit={handleSendOtp} className="form">
        <div className="input-box">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
};

export default PasswordChangePage;
