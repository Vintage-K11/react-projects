// src/components/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

// Temporary demo wrapper
// Later, replace `isAuthenticated` with real Redux/auth logic
const ProtectedRoute = ({ children, authentication = true }) => {
  const isAuthenticated = false; // demo: always false for now

  if (authentication && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!authentication && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
