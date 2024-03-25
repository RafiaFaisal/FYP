import React from 'react'
import { Link } from 'react-router-dom'
import BackgroundImage from '../assets/output.jpg';
import '../App.css';

export default function ForgetPasswordPage() {
    return (
        <div className="login-container" style={backgroundStyle}> 
            <form className="login-form" action="/login"> {/* Use the same form class as the login page */}
                <h2>Reset your password</h2>
                <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email address"
                />
                <button id="sub_btn" type="submit">Send password reset email</button>
                <footer>
                    <p>First time? <Link to="/register">Create an account</Link>.</p>
                    <p><Link to="/">Back to Homepage</Link>.</p>
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
