import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Corrected path
import BackgroundImage from '../assets/output.jpg';
import Illustration from '../assets/undraw_mobile_encryption_re_yw3o.svg'; // Path to your downloaded illustration

export default function LandingPage() {
    return (
        <header style={HeaderStyle}>
            <h1 className="main-title">BioSafe</h1> {/* Title at the top */}
            <div className="content-container">
                <img src={Illustration} alt="Secure Authentication" className="landing-illustration" /> {/* Illustration in the middle */}
                <div className="buttons">
                    <Link to="/login">
                        <button className="primary-button">Log In</button>
                    </Link>
                    <Link to="/register">
                        <button className="primary-button" id="reg_btn">Register</button>
                    </Link>
                </div>
            </div>
        </header>
    )
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage}) center / cover no-repeat`
}
