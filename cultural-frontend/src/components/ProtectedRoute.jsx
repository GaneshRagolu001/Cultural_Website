import React from "react";
import { AuthUser } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, admin }) {
  const { user } = AuthUser();

  if (!user) return <Navigate to="/login" />;

  if (admin && user.role !== "ADMIN") {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
