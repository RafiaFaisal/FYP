// RegisterPage.js
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import '../App.css'; // Check that this path is correct
import BackgroundImage from '../assets/output.jpg'; // Check that this path is correct

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const registerUser = (event) => {
        event.preventDefault(); // This will prevent the default form submit event
        axios.post('http://127.0.0.1:5000/signup', {
            username,
            email,
            password
        })
            .then((response) => {
                console.log(response);
                navigate("/homepage"); // Adjust as per your route for the homepage
            })
            .catch((error) => {
                console.error('Error registering:', error);
                if (error.response && error.response.status === 401) {
                    alert("Invalid credentials");
                }
            });
    };

    return (
        <div style={backgroundStyle}>
            <form className="register-form" onSubmit={registerUser}>
                <h2>Join us</h2>
                <h5>Create your personal account</h5>
                <div className="form-group">
                    <label>Username</label><br />
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email address</label><br />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password</label><br />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                
                <button type="submit">Register</button>

                <footer>
                    <Link to="/">Back to Homepage</Link>
                </footer>
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
