import React, { useState, useEffect } from "react";
import { User, Bell, Shield, Settings, Eye, EyeOff, CheckCircle2, KeyRound, AlertTriangle, Save } from "lucide-react";

function Toggle({ enabled, onChange, label }) {
  return (
    <label className="flex items-center justify-between cursor-pointer py-1">
      <span className="text-sm text-[#022022]">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0 ${
          enabled ? "bg-[#37F4B4]" : "bg-[#E2ECEB]"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </label>
  );
}

const ADMIN_SETTINGS_KEY = "waras_admin_settings";

export default function AdminSettings() {
  const [profile, setProfile] = useState({
    name: "Admin Dinkes Semarang",
    email: "admin@waras.semarangkota.go.id",
    phone: "0812-3456-7890",
  });

  const [notifications, setNotifications] = useState({
    newReport: true,
    newUser: true,
    systemAlert: true,
    weeklyDigest: false,
  });

  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [toastMessage, setToastMessage] = useState("");
  const [toastSuccess, setToastSuccess] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(ADMIN_SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.profile) setProfile(parsed.profile);
        if (parsed.notifications) setNotifications(parsed.notifications);
        if (parsed.maintenanceMode !== undefined) setMaintenanceMode(parsed.maintenanceMode);
      }
    } catch (_e) {
      console.warn("Gagal memuat pengaturan admin.");
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastSuccess(true);
    setTimeout(() => setToastSuccess(false), 3000);
  };

  const updateNotification = (key, value) => {
    setNotifications((prev) => {
      const next = { ...prev, [key]: value };
      try {
        localStorage.setItem(ADMIN_SETTINGS_KEY, JSON.stringify({ profile, notifications: next, maintenanceMode }));
      } catch (_e) {}
      return next;
    });
  };

  const handleMaintenanceToggle = (value) => {
    setMaintenanceMode(value);
    try {
      localStorage.setItem(ADMIN_SETTINGS_KEY, JSON.stringify({ profile, notifications, maintenanceMode: value }));
      showToast(value ? "Mode pemeliharaan sistem diaktifkan." : "Mode pemeliharaan dinonaktifkan.");
    } catch (_e) {}
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem(ADMIN_SETTINGS_KEY, JSON.stringify({ profile, notifications, maintenanceMode }));
      showToast("Data profil administrator berhasil disimpan.");
    } catch (_e) {}
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!passwords.current) {
      alert("Masukkan kata sandi saat ini.");
      return;
    }
    if (passwords.new.length < 8) {
      alert("Kata sandi baru minimal 8 karakter.");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      alert("Konfirmasi kata sandi baru tidak cocok.");
      return;
    }

    setPasswords({ current: "", new: "", confirm: "" });
    showToast("Kata sandi administrator berhasil diperbarui.");
  };

  return (
    <div className="space-y-6 font-inter max-w-4xl mx-auto pb-10">
      {/* Header */}
      <div className="border-b border-gray-200/60 pb-4">
        <h1 className="text-2xl font-bold text-[#022022] font-poppins">
          Pengaturan Administrator Sistem
        </h1>
        <p className="text-[#566E70] text-sm mt-1">
          Kelola profil administrator, notifikasi pemantauan, keamanan sandi, dan status operasional sistem WARAS.
        </p>
      </div>

      {toastSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium flex items-center gap-2 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Profil Admin */}
      <form onSubmit={handleSaveProfile} className="bg-white border border-[#E2ECEB] rounded-2xl shadow-xs p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#E6FEFF] flex items-center justify-center">
            <User className="w-5 h-5 text-[#022022]" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-[#022022] font-poppins">
              Profil Administrator
            </h2>
            <p className="text-xs text-[#566E70]">Identitas resmi pengelola sistem pelayanan kesehatan.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#566E70] uppercase tracking-wide mb-1.5">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E2ECEB] text-sm text-[#022022] focus:outline-none focus:ring-2 focus:ring-[#37F4B4]/40 focus:border-[#37F4B4] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#566E70] uppercase tracking-wide mb-1.5">
              Email Resmi
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E2ECEB] text-sm text-[#022022] focus:outline-none focus:ring-2 focus:ring-[#37F4B4]/40 focus:border-[#37F4B4] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#566E70] uppercase tracking-wide mb-1.5">
              No. Telepon / WhatsApp
            </label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E2ECEB] text-sm text-[#022022] focus:outline-none focus:ring-2 focus:ring-[#37F4B4]/40 focus:border-[#37F4B4] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#566E70] uppercase tracking-wide mb-1.5">
              Peran Akun
            </label>
            <input
              type="text"
              value="Super Admin (Dinas Kesehatan Kota Semarang)"
              disabled
              className="w-full px-4 py-2.5 rounded-xl border border-[#E2ECEB] text-sm text-[#566E70] bg-[#F8FAFA] cursor-not-allowed"
            />
          </div>
        </div>
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#022022] text-white hover:bg-[#033033] transition-colors text-xs font-semibold cursor-pointer shadow-xs"
          >
            <Save className="w-3.5 h-3.5 text-[#37F4B4]" />
            <span>Simpan Profil</span>
          </button>
        </div>
      </form>

      {/* Notifikasi */}
      <div className="bg-white border border-[#E2ECEB] rounded-2xl shadow-xs p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#E6FEFF] flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#022022]" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-[#022022] font-poppins">
              Peringatan Sistem & Notifikasi
            </h2>
            <p className="text-xs text-[#566E70]">Atur parameter peringatan masuk dari warga dan puskesmas.</p>
          </div>
        </div>
        <div className="space-y-3 divide-y divide-gray-100">
          <Toggle
            label="Laporan kesalahan data/faskes masuk dari warga"
            enabled={notifications.newReport}
            onChange={(v) => updateNotification("newReport", v)}
          />
          <Toggle
            label="Pendaftaran akun warga baru"
            enabled={notifications.newUser}
            onChange={(v) => updateNotification("newUser", v)}
          />
          <Toggle
            label="Peringatan antrean puskesmas penuh / melebihi kapasitas"
            enabled={notifications.systemAlert}
            onChange={(v) => updateNotification("systemAlert", v)}
          />
          <Toggle
            label="Ringkasan statistik mingguan via email resmi"
            enabled={notifications.weeklyDigest}
            onChange={(v) => updateNotification("weeklyDigest", v)}
          />
        </div>
      </div>

      {/* Keamanan */}
      <form onSubmit={handlePasswordChange} className="bg-white border border-[#E2ECEB] rounded-2xl shadow-xs p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#E6FEFF] flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#022022]" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-[#022022] font-poppins">
              Keamanan Kata Sandi Administrator
            </h2>
            <p className="text-xs text-[#566E70]">Perbarui kredensial akses masuk panel kontrol.</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-[#566E70] uppercase tracking-wide mb-1.5">
              Password Saat Ini
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={passwords.current}
                onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))}
                placeholder="Masukkan kata sandi saat ini"
                className="w-full px-4 py-2.5 pr-11 rounded-xl border border-[#E2ECEB] text-sm text-[#022022] placeholder:text-[#566E70] focus:outline-none focus:ring-2 focus:ring-[#37F4B4]/40 focus:border-[#37F4B4] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#566E70] hover:text-[#022022] p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#566E70] uppercase tracking-wide mb-1.5">
                Password Baru
              </label>
              <input
                type="password"
                value={passwords.new}
                onChange={(e) => setPasswords((p) => ({ ...p, new: e.target.value }))}
                placeholder="Minimal 8 karakter"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E2ECEB] text-sm text-[#022022] placeholder:text-[#566E70] focus:outline-none focus:ring-2 focus:ring-[#37F4B4]/40 focus:border-[#37F4B4] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#566E70] uppercase tracking-wide mb-1.5">
                Konfirmasi Password Baru
              </label>
              <input
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
                placeholder="Konfirmasi password baru"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E2ECEB] text-sm text-[#022022] placeholder:text-[#566E70] focus:outline-none focus:ring-2 focus:ring-[#37F4B4]/40 focus:border-[#37F4B4] transition-all"
              />
            </div>
          </div>
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#022022] text-white hover:bg-[#033033] transition-colors text-xs font-semibold cursor-pointer shadow-xs"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#37F4B4]" />
              <span>Perbarui Kata Sandi</span>
            </button>
          </div>
        </div>
      </form>

      {/* Sistem */}
      <div className="bg-white border border-[#E2ECEB] rounded-2xl shadow-xs p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#E6FEFF] flex items-center justify-center">
            <Settings className="w-5 h-5 text-[#022022]" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-[#022022] font-poppins">
              Status Operasional Sistem
            </h2>
            <p className="text-xs text-[#566E70]">Kendali mode pemeliharaan dan status koneksi API.</p>
          </div>
        </div>
        <div className="space-y-4">
          <Toggle
            label="Mode Pemeliharaan (Maintenance Mode)"
            enabled={maintenanceMode}
            onChange={handleMaintenanceToggle}
          />
          {maintenanceMode && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs sm:text-sm text-amber-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>Mode pemeliharaan sedang aktif. Akses publik akan dialihkan sementara.</span>
            </div>
          )}

          <div className="border-t border-[#E2ECEB] pt-4">
            <h3 className="text-xs font-bold text-[#022022] uppercase tracking-wider mb-2.5">
              Konfigurasi API Endpoint
            </h3>
            <div className="space-y-2.5 bg-[#F8FAFA] rounded-xl p-3.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#566E70]">API Base URL</span>
                <span className="text-[#022022] font-mono">http://localhost:5000/api</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#566E70]">Status Layanan</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Online (Local & Turso Fallback)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#566E70]">Versi Platform</span>
                <span className="text-[#022022] font-mono">WARAS v2.4 (Semarang)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
