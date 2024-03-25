// LoginPage.js
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import '../App.css';
import BackgroundImage from '../assets/output.jpg';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const logInUser = (event) => {
        event.preventDefault(); // Prevent the form from submitting traditionally
        if (email.length === 0) {
            alert("Email has been left blank!");
            return;
        }
        if (password.length === 0) {
            alert("Password has been left blank!");
            return;
        }
        axios.post('http://127.0.0.1:5000/login', {
            email: email,
            password: password
        }).then(function (response) {
            console.log(response);
            navigate("/homepage"); // Adjust this to match your route for the homepage
        }).catch(function (error) {
            console.error('Error logging in:', error);
            if (error.response && error.response.status === 401) {
                alert("Invalid credentials");
            }
        });
    };

    return (
        <div className="login-container" style={backgroundStyle}>
            <form className="login-form" onSubmit={logInUser}>
                <h2>Sign in to us</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Username or email address"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                <button type="submit">Login</button>
                <p>First time? <Link to="/register">Create an account.</Link></p>
                <p><Link to="/">Back to Homepage.</Link></p>
            </form>
        </div>
    );
}

const backgroundStyle = {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};
