import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContentBlock from './PostBlocks/ContentBlock';
import { useParams } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, CircularProgress, Typography } from '@mui/material';

const API_URL = process.env.REACT_APP_API_URL;

const PostEditor = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [blocks, setBlocks] = useState([]);
    const [newBlockType, setNewBlockType] = useState('paragraph');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch post details if postId is provided
    useEffect(() => {
        if (id) {
            setLoading(true);
            axios.get(`${API_URL}/blogs/${id}`)
                .then(response => {
                    setTitle(response.data.title);
                    setBlocks(JSON.parse(response.data.body));
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching post:", err);
                    setError("Error fetching the post. Please try again.");
                    setLoading(false);
                });
        }
    }, [id]);

    const addBlock = (type) => {
        setBlocks([...blocks, { type, data: '' }]);
    };

    const updateBlock = (index, updatedBlock) => {
        const newBlocks = [...blocks];
        newBlocks[index] = updatedBlock;
        setBlocks(newBlocks);
    };

    const removeBlock = (index) => {
        const newBlocks = [...blocks];
        newBlocks.splice(index, 1);
        setBlocks(newBlocks);
    };

    const handleSubmit = async () => {
        console.info(blocks)
        const token = localStorage.getItem('token');  // Fetch token from local storage
        const headers = {
            Authorization: `Bearer ${token}`
        };

        setLoading(true);

        try {
            let response;
            if (id) {
                // Update post
                response = await axios.put(`${API_URL}/blogs/${id}`, { title, blocks }, { headers });
            } else {
                // Create new post
                response = await axios.post(`${API_URL}/blogs`, { title, blocks }, { headers });
            }

            if (response.status === 200 || response.status === 201) {
                console.log("Post operation successful:", response.data);
                window.location.href = `${API_URL}/blogs/${response.data.id}`; // Redirect to the post view
            } else {
                setError("Unexpected response from the server. Please try again.");
            }
        } catch (error) {
            console.error("Error during post operation:", error);
            setError("Error during post operation. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            {loading && <CircularProgress />}
            {error && <Typography variant="h6" color="error">{error}</Typography>}

            {/* Title Input */}
            <TextField
                fullWidth
                variant="outlined"
                label="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ marginBottom: '20px' }}
            />



            {/* Display Current Blocks */}
            {blocks.map((block, index) => (
                <div key={index}>
                    <ContentBlock
                        block={block}
                        onUpdate={(updatedBlock) => updateBlock(index, updatedBlock)}
                        onRemove={() => removeBlock(index)}
                    />
                </div>
            ))}

            {/* Block Type Selector and Add Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <Select
                    value={newBlockType}
                    onChange={(e) => setNewBlockType(e.target.value)}
                    variant="outlined"
                >
                    <MenuItem value="paragraph">Paragraph</MenuItem>
                    <MenuItem value="image">Image</MenuItem>
                </Select>
                <Button variant="contained" color="primary" onClick={() => addBlock(newBlockType)}>
                    Add Block
                </Button>
            </div>

            <Button variant="contained" color="secondary" onClick={handleSubmit}>
                Submit
            </Button>
        </div>

    );
};

export default PostEditor;
