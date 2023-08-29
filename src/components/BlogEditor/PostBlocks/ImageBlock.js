import React, { useState } from 'react';
import axios from 'axios';
import { Button, CircularProgress } from '@mui/material';

const API_URL = process.env.REACT_APP_API_URL;

const ImageBlock = ({ content, onContentChange, editing, onEditToggle }) => {
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file.type.startsWith('image/')) {
            setUploadError('Only image files are allowed.');
            return;
        }
        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(`${API_URL}/upload`, formData);
            onContentChange(response.data.imageUrl);
            setUploadSuccess(true);
            onEditToggle();
        } catch (error) {
            setUploadError('Error uploading image.');
            console.error("Error uploading image:", error);
        } finally {
            setUploading(false);
            setUploadSuccess(false);
        }
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            {content && <img src={content} alt="Uploaded content" style={{ maxWidth: '100%', height: 'auto', borderRadius: '5px' }} />}
            {editing ? (
                <div style={{ marginTop: '10px' }}>
                    {uploadSuccess && <div style={{ color: 'green' }}>Image uploaded successfully!</div>}
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="upload-button-file"
                        type="file"
                        onChange={handleImageUpload}
                    />
                    <label htmlFor="upload-button-file">
                        <Button variant="contained" color="primary" component="span" disabled={uploading}>
                            Upload Image
                        </Button>
                    </label>
                    {uploading && <CircularProgress style={{ marginLeft: '10px' }} />}
                </div>
            ) : (
                <Button onClick={onEditToggle}>Edit Image</Button>
            )}
        </div>
    );
};

export default ImageBlock;