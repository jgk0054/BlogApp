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

                        <Typography variant="body1" style={{ marginRight: 10 }}>{userData.user.username}</Typography>  {/* Displaying the username */}
                        <Avatar alt="User Avatar" src={userData.user.avatar_url} onClick={handleClick} style={{ cursor: 'pointer' }} />
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                                <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>Profile</Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>Settings</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </>
                ) : (
                    <>
                        <Button color="inherit">
                            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
                        </Button>
                        <Button color="inherit">
                            <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>Register</Link>
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
