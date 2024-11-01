// src/components/LandingPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LandingPage.css'; // Import the CSS file for styling

const LandingPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(true);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:8080/register', { username, email, password });
      alert('Registration successful. Please log in.');
      setIsRegistering(false); // Switch to login form
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', { email, password });
      if (response.data.success) {
        navigate('/home');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error(error);
      alert('Login failed. Please try again.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isRegistering) {
      await handleRegister();
    } else {
      await handleLogin();
    }
  };

  return (
    <div className="landing-page">
      <div className="background-image">
        <div className="overlay">
          <div className="content">
            <h1>Discover Amazing Destinations</h1>
            <p>Explore the world’s most beautiful cities and hidden gems. Let us help you find your next adventure!</p>
            <blockquote>
              <p>"The world is a book and those who do not travel read only one page."</p>
              <footer>- Saint Augustine</footer>
            </blockquote>
            <form onSubmit={handleSubmit} className="auth-form">
              {isRegistering && (
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
              )}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            </form>
            <button onClick={() => setIsRegistering(!isRegistering)} className="toggle-button">
              {isRegistering ? 'Switch to Login' : 'Switch to Register'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
