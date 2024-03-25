import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from "./pages/LandingPage";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Homepage from './pages/Homepage';
import About from './pages/About'; // Assuming you have an About component
import UserProfile from './pages/UserProfile'; // Assuming you have a UserProfile component
import ForgetPasswordPage from './pages/ForgetPasswordPage';

function App() {
  return (
    <div className="vh-100 gradient-custom">
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/forget-password" element={<ForgetPasswordPage />} />

          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

