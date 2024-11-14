import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions'; // Adjust the import path as needed

const LoginComponent = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (props.isAuthenticated) {
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } else if (props.authError) {
            setError('Failed to login. Please try again.');
        }
    }, [props.isAuthenticated, props.authError, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null); // Clear any previous error
        props.loginUser(username, password);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {props.isAuthenticated && <p className="success-message">Login Successful! Redirecting...</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    authError: state.auth.error // Assuming you have an error field in your auth reducer
});

const mapDispatchToProps = {
    loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);