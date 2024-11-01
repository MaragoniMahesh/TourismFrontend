import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Create your CSS file for styling

const Profile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    gender: 'Male',
    dateOfBirth: '',
    profilePicBase64: '', // Change to Base64
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Get JWT token from localStorage
        const response = await fetch('http://localhost:8080/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile({
            ...data,
            profilePicBase64: data.profilePicBase64 ? `data:image/jpeg;base64,${data.profilePicBase64}` : '' // Handle Base64 image
          });
        } else {
          console.error('Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleBackToDashboard = () => {
    navigate('/dashboard'); // Navigate to the dashboard page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <header>
        Profile Page
        <button onClick={handleBackToDashboard} className="back-button">Back </button>
      </header>
      <div className="profile-card">
        {profile.profilePicBase64 && (
          <img src={profile.profilePicBase64} alt="Profile" className="profile-pic" />
        )}
        <div className="profile-info">
          <h2>{profile.username}</h2>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phone}</p>
          <p>Address: {profile.address}</p>
          <p>Gender: {profile.gender}</p>
          <p>Date of Birth: {new Date(profile.dateOfBirth).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
