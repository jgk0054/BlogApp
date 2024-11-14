import React, { useState, useEffect } from 'react';
import { Card, CardActionArea, CardContent, Typography, Grid2, Avatar, Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const API_URL = process.env.REACT_APP_API_URL;

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        axios.get(`${API_URL}/blogs/`)
            .then(response => {
                setPosts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;

    const getFirstParagraph = (body) => {
        const parsedBody = JSON.parse(body);
        const firstParagraph = parsedBody.find(item => item.type === 'paragraph');
        return firstParagraph ? firstParagraph.data : '';
    };

    return (
        <Grid2 container direction="column" alignItems="center" spacing={4}>
            {posts.map(post => (
                <Grid2 item xs={12} key={post.id} style={{ width: '100%' }}>
                    <Card>
                        <CardActionArea component={Link} to={`/post/${post.id}`}>
                            <CardContent style={{ textAlign: 'center' }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {post.title}
                                </Typography>
                                <Grid2 container justifyContent="center" alignItems="center" spacing={1}>
                                    <Grid2 item>
                                        <Avatar
                                            alt="Author Avatar"
                                            src={post.avatar_url}
                                        />
                                    </Grid2>
                                    <Grid2 item xs={12}>
                                        <Typography variant="body2" align="center">{post.author_name}</Typography>
                                    </Grid2>
                                </Grid2>
                                <Typography variant="body2" color="text.secondary" style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                                    {getFirstParagraph(post.body)}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        {/* Conditionally display the Edit button if the post author is the currently signed-in user */}
                        {user && user.id === post.author_id && (
                            <Button component={Link} to={`/edit/${post.id}`}>Edit</Button>
                        )}
                    </Card>
                </Grid2>
            ))}
        </Grid2>
    );
}

export default BlogList;