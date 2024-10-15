// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const ProtectedRoute = ({ element, ...rest }) => {
  const { user } = useUser();

  return (
    <Route
      {...rest}
      element={user ? element : <Navigate to="/" replace />}
    />
  );
};

export default ProtectedRoute;
