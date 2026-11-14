import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "../components/common/ScrollToTop";

// Layouts & Public Pages
import UserLayout from "../layouts/UserLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import Home from "../pages/landing/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

// Route Guards
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

// User Dashboard Pages
import Dashboard from "../pages/user/Dashboard";
import Facilities from "../pages/user/Facilities";
import FacilityDetail from "../pages/user/FacilityDetail";
import AI from "../pages/user/AI";
import Articles from "../pages/user/Articles";
import ArticleDetail from "../pages/user/ArticleDetail";
import MedicalTerms from "../pages/user/MedicalTerms";
import HealthGuide from "../pages/user/HealthGuide";
import ServicesGuide from "../pages/user/ServicesGuide";
import ReportProblem from "../pages/user/ReportProblem";
import Profile from "../pages/user/Profile";
import Settings from "../pages/user/Settings";
import Help from "../pages/user/Help";

// Admin Dashboard Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageFacilities from "../pages/admin/ManageFacilities";
import ManageArticles from "../pages/admin/ManageArticles";
import ManageQueues from "../pages/admin/ManageQueues";
import ManageReports from "../pages/admin/ManageReports";
import AdminSettings from "../pages/admin/AdminSettings";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Halaman Publik Landing Page & Otentikasi (Animasi Floating Up CSS) */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Portal Aplikasi Dashboard Pengguna WARAS */}
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/user/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="facilities" element={<Facilities />} />
          <Route path="facilities/:id" element={<FacilityDetail />} />
          <Route path="ai" element={<AI />} />
          
          {/* Sub-Rute Info Kesehatan */}
          <Route path="health-info" element={<Navigate to="/user/health-info/articles" replace />} />
          <Route path="health-info/articles" element={<Articles />} />
          <Route path="health-info/articles/:id" element={<ArticleDetail />} />
          <Route path="health-info/guides" element={<HealthGuide />} />
          <Route path="health-info/medical-terms" element={<MedicalTerms />} />
          <Route path="health-info/terms" element={<Navigate to="/user/health-info/medical-terms" replace />} />
          <Route path="health-info/services" element={<ServicesGuide />} />

          {/* Rute Fitur Tambahan & Akun */}
          <Route path="report-problem" element={<ReportProblem />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="help" element={<Help />} />
        </Route>

        {/* Portal Aplikasi Dashboard Admin WARAS */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="facilities" element={<ManageFacilities />} />
          <Route path="articles" element={<ManageArticles />} />
          <Route path="queues" element={<ManageQueues />} />
          <Route path="reports" element={<ManageReports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Fallback Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
