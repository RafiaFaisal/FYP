import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Webcam from 'react-webcam';
import BackgroundImage from '../assets/output.jpg';
import '../App.css';

export default function HomePage() {
    const navigate = useNavigate();
    const webcamRef = useRef(null);
    const [showWebcam, setShowWebcam] = useState(false);
    const [detections, setDetections] = useState([]);
    const [showSettings, setShowSettings] = useState(false);

    const handleDemoClick = () => {
        setShowWebcam(true);
    };

    const base64ToBlob = (base64) => {
        const binaryString = window.atob(base64.split(',')[1]);
        const byteArray = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            byteArray[i] = binaryString.charCodeAt(i);
        }
        return new Blob([byteArray], { type: 'image/jpeg' });
    };

    const sendImageToBackend = useCallback(async (imageSrc) => {
        const formData = new FormData();
        formData.append('image', base64ToBlob(imageSrc), "frame.jpeg");

        try {
            // Notice the URL is now pointing to the /detect endpoint
            const response = await axios.post('https://fyp-model-d55c0f70ec1f.herokuapp.com/detect', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setDetections(response.data.detections); // Assumes response structure from Flask
        } catch (error) {
            console.error('Error sending image to backend:', error);
        }
    }, []);
 // No dependencies here

    const captureAndDetect = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        sendImageToBackend(imageSrc);
    }, [webcamRef, sendImageToBackend]); // Proper dependencies

    useEffect(() => {
        let interval;
        if (showWebcam) {
            interval = setInterval(() => {
                captureAndDetect();
            }, 5000); // Sends a frame every 5 seconds
        }
        return () => clearInterval(interval);
    }, [showWebcam, captureAndDetect]);

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="home-page" style={backgroundStyle}>
            {/* Navigation Bar */}
            <nav className="navbar">
                <span className="navbar-logo">BioSafe</span>
                <div className="navbar-links">
                    <Link to="/about">About</Link>
                    <div className="navbar-settings">
                        <button onClick={() => setShowSettings(prev => !prev)}>Settings</button>
                        {showSettings && (
                            <div className="dropdown-menu">
                                <Link to="/user-profile" onClick={() => setShowSettings(false)}>Edit Profile</Link>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <h1 className="main-title home-page-title">Welcome to Our App</h1>
            <button className="primary-button" onClick={handleDemoClick}>Start Detection</button>
            {showWebcam && <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />}
            {detections.map((det, index) => (
                <div key={index} style={{ position: 'absolute', border: '2px solid red', left: det.x1, top: det.y1, width: det.x2 - det.x1, height: det.y2 - det.y1 }}>
                    {det.label}: {Math.round(det.confidence * 100)}%
                </div>
            ))}
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
};



