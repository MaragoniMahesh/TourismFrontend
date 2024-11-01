import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReenterPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
  
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      alert('All fields are required!');
      return;
    }
  
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    console.log('Email:', email);
    console.log('New Password:', password);
  
    try {
      const response = await fetch('http://localhost:8080/api/users/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ useremail: email, newPassword: password })
      });
  
      console.log('Response status:', response.status);
      console.log('Response body:', await response.text());
  
      if (response.ok) {
        alert('Password changed successfully!');
        navigate('/LoginPage');
      } else {
        alert('Failed to change password!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  return (
    <div className="container">
      <header>Re-enter Password</header>
      <form onSubmit={handleChangePassword} className="form">
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
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <label>Confirm New Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ReenterPasswordPage;
