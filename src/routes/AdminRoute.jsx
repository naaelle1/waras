import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { authService } from "../services/authService";

/**
 * Route guard khusus untuk portal Administrator Dinkes WARAS
 * Menolak akses pengguna biasa dan mengarahkannya kembali ke dashboard warga
 */
export default function AdminRoute({ children }) {
  const location = useLocation();
  const isAuth = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (currentUser?.role !== "admin") {
    return <Navigate to="/user/dashboard" replace />;
  }

  return children ? children : <Outlet />;
}
