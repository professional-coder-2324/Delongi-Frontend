import React from 'react';
import { Navigate, Route, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const location = useLocation();

  if (isAuthenticated) {
    return children;
  } else {
    return (
      <Navigate to="/login" replace={true} state={{ from: location }} />
    );
  }
};

export default ProtectedRoute;
