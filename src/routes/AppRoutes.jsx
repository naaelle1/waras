import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
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

const ServicesGuidePlaceholder = () => (
  <div className="p-6 bg-white/70 backdrop-blur-md rounded-2xl font-poppins shadow-sm">
    <h2 className="text-xl font-bold text-[#002B2C]">Panduan Layanan</h2>
    <p className="text-sm text-[#5F6F70] mt-1">Halaman panduan layanan rujukan faskes sedang disiapkan.</p>
  </div>
);

const ReportProblemPage = () => (
  <div className="p-6 bg-white/70 backdrop-blur-md rounded-2xl font-poppins shadow-sm">
    <h2 className="text-xl font-bold text-[#002B2C]">Laporkan Kesalahan</h2>
    <p className="text-sm text-[#5F6F70] mt-1">Halaman formulir laporan komunitas sedang disiapkan.</p>
  </div>
);

const SettingsPage = () => (
  <div className="p-6 bg-white/70 backdrop-blur-md rounded-2xl font-poppins shadow-sm">
    <h2 className="text-xl font-bold text-[#002B2C]">Settings</h2>
    <p className="text-sm text-[#5F6F70] mt-1">Halaman pengaturan akun sedang disiapkan.</p>
  </div>
);

const ProfilePage = () => (
  <div className="p-6 bg-white/70 backdrop-blur-md rounded-2xl font-poppins shadow-sm">
    <h2 className="text-xl font-bold text-[#002B2C]">Profil Saya</h2>
    <p className="text-sm text-[#5F6F70] mt-1">Halaman profil pengguna sedang disiapkan.</p>
  </div>
);

const HelpPage = () => (
  <div className="p-6 bg-white/70 backdrop-blur-md rounded-2xl font-poppins shadow-sm">
    <h2 className="text-xl font-bold text-[#002B2C]">Pusat Bantuan</h2>
    <p className="text-sm text-[#5F6F70] mt-1">Halaman FAQ dan bantuan sedang disiapkan.</p>
  </div>
);

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<UserLayout />}>
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

          <Route path="report-problem" element={<ReportProblem />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="help" element={<HelpPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/user/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}