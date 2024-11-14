# Frontend README

## Project
**Blogging Application - Frontend**

## Libraries/Frameworks
- React
- Material-UI
- Axios
- react-router-dom

## Key Components

### RegistrationComponent.js
- **Purpose**: Handles user registration.
- **Features**:
  - Contains input fields for username, password, author name, author URL, role, and profile picture.
  - Uses axios for API calls.
  - Image upload functionality with backend integration.

### LoginComponent.js
- **Purpose**: Handles user login.
- **Features**:
  - Contains input fields for username and password.
  - Uses axios for API calls.
  - Redirects to the landing page after successful login.
  - Token-based authentication integrated with local storage.

### BlogList.js
- **Purpose**: Displays a list of blog posts.
- **Features**:
  - Fetches posts from the backend upon component mount.
  - Uses Material-UI for a Grid2-based layout of blog posts.

### BlogPost.js
- **Purpose**: Displays details of a single blog post.
- **Features**:
  - Fetches post details from the backend based on URL parameters.
  - Dynamic content rendering with support for different content types.

### CreatePost.js
- **Purpose**: Interface for creating a new blog post.
- **Features**:
  - Dynamically add content blocks of type paragraph or image.
  - Post submission integrated with the backend.

### EditPost.js (Proposed)
- **Purpose**: Interface for editing an existing blog post.
- **Features**:
  - Load existing blog post data for editing.
  - Dynamically add or remove content blocks of type paragraph or image.
  - Update the blog post in the backend upon submission.

### ContentRenderer.js
- **Purpose**: Renders dynamic content based on type.
- **Features**:
  - Supports rendering of paragraphs, images, buttons, and social links.

### ProtectedRoute.js
- **Purpose**: Protects certain routes based on user authentication.
- **Features**:
  - Redirects to the login page if the user is not authenticated.

### Navbar.js
- **Purpose**: Provides main navigation for the app.
- **Features**:
  - Contains links to Home, Login, Register, and Create Post (for authenticated users).
  - Integrated with backend to display user profile details.

### App.js
- **Purpose**: Main app layout and routing.
- **Features**:
  - Central routing logic for the application.
  - Consistent Navbar displayed across different routes.

## Recommendations & Observations
- **General**:
  - Monitor the app's re-render behavior, especially in development mode. React's Strict Mode and Concurrent Mode could influence rendering behavior.
  - For enhanced security, consider alternatives to the `eval` function used in ContentRenderer.js.
- **LoginComponent.js**:
  - Consider using Axios consistently across the app for API requests.
- **BlogList.js**:
  - Enhance the loading state with a more visual component like a spinner.
- **CreatePost.js**:
  - Extend the error handling to provide feedback to users during post creation.
  - Consider refactoring CreatePost.js to make it reusable for both creating and editing blog posts.

## Future Enhancements
- User profile and settings page.
- Commenting system for blog posts.
- Enhanced search and filter functionalities.
