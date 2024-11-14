import React from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

const Navbar = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userData = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        handleClose();
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>BlogApp</Link>
                </Typography>
                {isAuthenticated ? (
                    <>
                        <Button color="inherit">
                            <Link to="/create" style={{ textDecoration: 'none', color: 'inherit' }}>Create Post</Link>
                        </Button>
                        {userData && (
                            <>
                                <Button color="inherit" onClick={handleClick}>
                                    <Avatar alt={userData.author_name} src={userData.avatar_url} />
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <Typography variant="body1">{userData.author_name}</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </>
                        )}
                    </>
                ) : (
                    <Button color="inherit">
                        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;