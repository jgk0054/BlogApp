import React, { useState } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const RegistrationComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorURL, setAuthorURL] = useState('');
    const [role, setRole] = useState('commenter');
    const [profilePic, setProfilePic] = useState(null);
    const [avatarURL, setAvatarURL] = useState('');

    const handleImageChange = (e) => {
        setProfilePic(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append('image', profilePic);

        try {
            const response = await axios.post(`${API_URL}/upload`, formData);
            if (response.data.imageUrl) {
                setAvatarURL(response.data.imageUrl);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            username,
            password,
            author: {
                name: authorName,
                url: authorURL
            },
            avatarURL,
            role
        };

        try {
            const response = await axios.post(`${API_URL}/auth/register`, userData);

            if (response.data && response.status === 200) {
            } else {
                console.error("Error during registration:", response.data.message);
            }
        } catch (error) {
            console.error("Error occurred during registration:", error);
        }
    };

    return (
        <div className="registration-container">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Author Name:</label>
                    <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Author URL:</label>
                    <input
                        type="url"
                        value={authorURL}
                        onChange={(e) => setAuthorURL(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label>Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="commenter">Commenter</option>
                        <option value="publisher">Publisher</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>Profile Picture:</label>
                    <input type="file" onChange={handleImageChange} />
                    <button type="button" onClick={handleImageUpload}>Upload Image</button>
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegistrationComponent;
