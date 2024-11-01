import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage'; 
import PasswordChangePage from './components/PasswordChangePage';
import OtpVerificationPage from './components/OtpVerificationPage';
import ReenterPasswordPage from './components/ReenterPasswordPage';
import Home from './components/Home';
import Settings from './components/Settings'; 
import Profile from './components/Profile';
import Recommendations from './components/Recommendations'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import PostPage from './components/PostPage';
import AddPostPage from './components/AddPostPage';


function App() {

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/passwordchange" element={<PasswordChangePage />} />
        <Route path="/otp-verification" element={<OtpVerificationPage />} />
        <Route path="/reenter-password" element={<ReenterPasswordPage />} />

        <Route path="/Home" element={<Home />} />
        <Route path="/Recommendations" element={<Recommendations />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/PostPage" element={<PostPage />} />
        <Route path="/addpost" element={<AddPostPage />} />
        

      </Routes>
    </Router>

    
  );
  
}

export default App;
