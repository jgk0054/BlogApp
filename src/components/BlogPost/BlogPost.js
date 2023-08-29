import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress, Avatar, Grid } from '@mui/material';
import axios from 'axios';
import ContentRenderer from './ContentRenderer';

const API_URL = process.env.REACT_APP_API_URL;

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${API_URL}/blogs/${id}`);
                setPost(response.data);
            } catch (err) {
                setError(err);
            }
        };
        fetchPost();
    }, [id]);

    if (error) {
        return <Typography variant="h6" color="error">Failed to load post. Please try again later.</Typography>;
    }

    if (!post) {
        return <CircularProgress />;
    }

    return (
        <Card style={{ margin: '20px 0' }}>
            <CardContent>
                <Typography variant="h4" gutterBottom align="center">
                    {post.title}
                </Typography>
                <Grid container justifyContent="center" alignItems="center" spacing={1}>
                    <Grid item xs></Grid>
                    <Grid item>
                        <Avatar
                            alt="Author Avatar"
                            src={post.user.avatar_url}
                        />
                    </Grid>
                    <Grid item xs></Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" align="center">{post.user.author_name}</Typography>
                    </Grid>
                </Grid>

                <ContentRenderer content={JSON.parse(post.body)} />
            </CardContent>
        </Card>
    );
}

export default BlogPost;
