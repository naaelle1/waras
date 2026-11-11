import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Dashboard from "../pages/user/Dashboard";
import Facilities from "../pages/user/Facilities";
import FacilityDetail from "../pages/user/FacilityDetail";
import AI from "../pages/user/AI";

// Placeholder untuk fitur lain yang akan dikembangkan selanjutnya
const HealthInfoPage = () => (
  <div className="p-6 bg-white rounded-2xl font-poppins shadow-sm">
    <h2 className="text-xl font-bold text-[#002F2F]">Info Kesehatan</h2>
    <p className="text-sm text-[#647474] mt-1">Halaman edukasi kesehatan sedang disiapkan.</p>
  </div>
);

const ReportProblemPage = () => (
  <div className="p-6 bg-white rounded-2xl font-poppins shadow-sm">
    <h2 className="text-xl font-bold text-[#002F2F]">Laporkan Kesalahan</h2>
    <p className="text-sm text-[#647474] mt-1">Halaman formulir laporan komunitas sedang disiapkan.</p>
  </div>
);

const SettingsPage = () => (
  <div className="p-6 bg-white rounded-2xl font-poppins shadow-sm">
    <h2 className="text-xl font-bold text-[#002F2F]">Settings</h2>
    <p className="text-sm text-[#647474] mt-1">Halaman pengaturan akun sedang disiapkan.</p>
  </div>
);

const ProfilePage = () => (
  <div className="p-6 bg-white rounded-2xl font-poppins shadow-sm">
    <h2 className="text-xl font-bold text-[#002F2F]">Profil Saya</h2>
    <p className="text-sm text-[#647474] mt-1">Halaman profil pengguna sedang disiapkan.</p>
  </div>
);

const HelpPage = () => (
  <div className="p-6 bg-white rounded-2xl font-poppins shadow-sm">
    <h2 className="text-xl font-bold text-[#002F2F]">Pusat Bantuan</h2>
    <p className="text-sm text-[#647474] mt-1">Halaman FAQ dan bantuan sedang disiapkan.</p>
  </div>
);

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Authenticated Layout */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Navigate to="/user/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="facilities" element={<Facilities />} />
          <Route path="facilities/:id" element={<FacilityDetail />} />
          <Route path="ai" element={<AI />} />
          <Route path="health-info" element={<HealthInfoPage />} />
          <Route path="health-info/*" element={<HealthInfoPage />} />
          <Route path="report-problem" element={<ReportProblemPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="help" element={<HelpPage />} />
        </Route>

        {/* Fallback Redirection */}
        <Route path="*" element={<Navigate to="/user/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}