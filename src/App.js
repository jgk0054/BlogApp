import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import BlogList from './components/BlogList/BlogList';
import BlogPost from './components/BlogPost/BlogPost';
import LoginComponent from './components/Login/LoginComponent';
import PostEditor from './components/BlogEditor/PostEditor';
import ProtectedRoute from './components/ProtectedRoute';
import RegistrationComponent from './components/Login/RegistrationComponent';
import ProfileComponent from './components/Login/ProfileComponent';
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<BlogList />} />
                <Route path="/post/:id" element={<BlogPost />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/register" element={<RegistrationComponent />} />
                <Route path="/profile" element={<ProfileComponent />} />

                <Route path="/create" element={
                    <ProtectedRoute>
                        <PostEditor />  // Use PostEditor for creating new posts
                    </ProtectedRoute>
                } />

                <Route path="/edit/:id" element={
                    <ProtectedRoute>
                        <PostEditor />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;