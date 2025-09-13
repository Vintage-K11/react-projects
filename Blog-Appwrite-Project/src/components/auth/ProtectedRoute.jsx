import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/authSlice";

const ProtectedRoute = ({
  children,
  authentication = true,
  requireAdmin = false,
  redirectTo = "/login",
}) => {
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = !!user;

  if (authentication && !isAuthenticated) return <Navigate to={redirectTo} replace />;
  if (!authentication && isAuthenticated) return <Navigate to="/" replace />;
  if (requireAdmin && user?.role !== "admin") return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
