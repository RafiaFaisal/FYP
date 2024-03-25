import React, { useState } from 'react';
import axios from 'axios';
import BackgroundImage from '../assets/output.jpg'; // Ensure this path is correct
import '../App.css'; // Ensure this path is correct

function UserProfile() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:5000/update_account', {
                username,
                email,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            setMessage(response.data.message);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.error);
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    };


    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                const response = await axios.post('http://127.0.0.1:5000/delete_account', {}, {
                    withCredentials: true
                });

                setMessage(response.data.message);
                // Here you might want to redirect the user to the login page
                // or update the app state to reflect that the user is logged out.
            } catch (error) {
                if (error.response) {
                    setMessage(error.response.data.error);
                } else {
                    setMessage('An error occurred. Please try again.');
                }
            }
        }
    };


    const containerStyle = {
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div style={containerStyle}>
            <div className="user-profile-form">
                <h2 className="text-center">Edit Profile</h2>
                {message && <p className="text-center message">{message}</p>}
                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="primary-button">Update Profile</button>
                        <button type="button" className="secondary-button" onClick={handleDelete}>
                            Delete Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserProfile;
