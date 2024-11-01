import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './OtpVerificationPage.css';

const OtpVerificationPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, otp })
      });

      if (response.ok) {
        navigate('/reenter-password', { state: { email } });
      } else {
        alert('Invalid OTP!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <header>OTP Verification</header>
      <form onSubmit={handleVerifyOtp} className="form">
        <div className="input-box">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <label>Enter OTP</label>
          <input
            type="text"
            placeholder="Enter the OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default OtpVerificationPage;
