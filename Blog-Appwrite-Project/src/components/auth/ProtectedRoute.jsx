// src/components/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/authSlice";

const ProtectedRoute = ({ children, authentication = true, requireAdmin = false }) => {
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = !!user;

  // Redirect non-authenticated users trying to access protected routes
  if (authentication && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Prevent logged-in users from accessing login/signup
  if (!authentication && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Restrict admin-only routes
  if (requireAdmin && user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
