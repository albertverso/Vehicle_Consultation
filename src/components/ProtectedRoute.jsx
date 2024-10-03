import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from '../services/authService';

const ProtectedRoute = ({ children }) => {
  const isAuth = isAuthenticated();

    if (!isAuth) {
        return <Navigate to="/Home" />;
    }

    return children;
};

export default ProtectedRoute;