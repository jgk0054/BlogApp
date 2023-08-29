import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Select,
    MenuItem,
    CircularProgress,
    Typography,
    Card,
    CardContent,
    CardActions,
    Avatar
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../actions/authActions';


const API_URL = process.env.REACT_APP_API_URL;

const ProfileComponent = () => {
    const [username, setUsername] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorURL, setAuthorURL] = useState('');
    const [avatarURL, setAvatarURL] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userData = useSelector(state => state.auth.user.user);

    useEffect(() => {
        setLoading(true);
        console.info(userData)
        setUsername(userData.username)
        setAuthorName(userData.author_name)
        setAuthorURL(userData.author_url)
        setAvatarURL(userData.avatar_url)

        setLoading(false);
    }, []);

    const handleImageUpload = async (event) => {
        setLoading(true);
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(`${API_URL}/upload`, formData);
            setAvatarURL(response.data.imageUrl);
        } catch (error) {
            setError('Error uploading image.');
        } finally {
            setLoading(false);
        }
    };

    const handleProfileUpdate = async () => {
        // Update profile logic here
        setLoading(true);
        // ...
        setLoading(false);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Card variant="outlined">
                <CardContent>
                    {loading && <CircularProgress />}
                    {error && <Typography color="error">{error}</Typography>}

                    <Avatar src={avatarURL} alt="Profile Picture" style={{ width: '100px', height: '100px', margin: 'auto' }} />
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="upload-button-file"
                        type="file"
                        onChange={handleImageUpload}
                    />
                    <label htmlFor="upload-button-file">
                        <Button variant="contained" color="primary" component="span" style={{ margin: '20px' }}>
                            Upload Image
                        </Button>
                    </label>

                    <TextField
                        style={{ marginBottom: '20px' }} fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <TextField
                        style={{ marginBottom: '20px' }} fullWidth label="Author Name" value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
                    <TextField
                        style={{ marginBottom: '20px' }} fullWidth label="Author URL" value={authorURL} onChange={(e) => setAuthorURL(e.target.value)} />

                    {/* <Select value={role} onChange={(e) => setRole(e.target.value)} fullWidth style={{ marginTop: '20px' }}>
                        <MenuItem value="commenter">Commenter</MenuItem>
                        <MenuItem value="publisher">Publisher</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </Select> */}
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="secondary" onClick={handleProfileUpdate}>
                        Update Profile
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default ProfileComponent;
