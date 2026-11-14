import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { authService } from "../services/authService";

/**
 * Route guard untuk halaman yang memerlukan autentikasi pengguna warga / admin
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const isAuth = authService.isAuthenticated();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
}
