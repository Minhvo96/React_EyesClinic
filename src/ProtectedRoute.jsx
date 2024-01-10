// ProtectedRoute.js

import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {

  const navigate = useNavigate();
  // Use the useAuth hook to get user information
  const { user, loading } = useAuth();

  if (loading) {
    // Loading state, you may show a loading spinner here
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to the login page if the user is not authenticated
    // Use navigate to redirect to the login page
    navigate('/login');
    return null;
  }

  // Check if the user has the required roles
  const hasRequiredRoles = roles.every(role => user.roles.includes(role));

  if (!hasRequiredRoles) {
    // Redirect to a unauthorized page or show a forbidden message
    return <div>Unauthorized</div>;
  }

  // Render the protected component
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default ProtectedRoute;
