import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to Our Site</h1>
      <p>Your inspiring quote goes here.</p>
      <Link to="/RegisterPage" style={styles.button}>Register</Link>
      <Link to="/LoginPage" style={styles.button}>Login</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
  },
};

export default HomePage;
