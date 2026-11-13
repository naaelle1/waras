import React, { useState } from "react";
import { User, Bell, Shield, Settings, Eye, EyeOff } from "lucide-react";

function Toggle({ enabled, onChange, label }) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm text-[#022022]">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
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

export default function AdminSettings() {
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

  const updateNotification = (key, value) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 font-inter max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#022022] font-poppins">
          Pengaturan Admin
        </h1>
        <p className="text-[#566E70] text-sm mt-1">
          Kelola profil, notifikasi, keamanan, dan pengaturan sistem.
        </p>
      </div>

      {/* Profil Admin */}
      <div className="bg-white border border-[#E2ECEB] rounded-2xl shadow-xs p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#E6FEFF] flex items-center justify-center">
            <User className="w-5 h-5 text-[#022022]" />
          </div>
          <h2 className="text-lg font-semibold text-[#022022] font-poppins">
            Profil Admin
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#566E70] uppercase tracking-wide mb-1.5">
              Nama Lengkap
            </label>
            <input
              type="text"
              defaultValue="Admin WARAS"
              className="w-full px-4 py-2.5 rounded-xl border border-[#E2ECEB] text-sm text-[#022022] focus:outline-none focus:ring-2 focus:ring-[#37F4B4]/40 focus:border-[#37F4B4] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#566E70] uppercase tracking-wide mb-1.5">
              Email
            </label>
            <input
              type="email"
              defaultValue="admin@waras.id"
              className="w-full px-4 py-2.5 rounded-xl border border-[#E2ECEB] text-sm text-[#022022] focus:outline-none focus:ring-2 focus:ring-[#37F4B4]/40 focus:border-[#37F4B4] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#566E70] uppercase tracking-wide mb-1.5">
              No. Telepon
            </label>
            <input
              type="tel"
              defaultValue="081234567890"
              className="w-full px-4 py-2.5 rounded-xl border border-[#E2ECEB] text-sm text-[#022022] focus:outline-none focus:ring-2 focus:ring-[#37F4B4]/40 focus:border-[#37F4B4] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#566E70] uppercase tracking-wide mb-1.5">
              Role
            </label>
            <input
              type="text"
              defaultValue="Super Admin"
              disabled
              className="w-full px-4 py-2.5 rounded-xl border border-[#E2ECEB] text-sm text-[#566E70] bg-[#F8FAFA] cursor-not-allowed"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="px-5 py-2.5 rounded-xl bg-[#022022] text-white hover:bg-[#033033] transition-colors text-sm font-medium">
            Simpan Profil
          </button>
        </div>
      </div>

      {/* Notifikasi */}
      <div className="bg-white border border-[#E2ECEB] rounded-2xl shadow-xs p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#E6FEFF] flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#022022]" />
          </div>
          <h2 className="text-lg font-semibold text-[#022022] font-poppins">
            Notifikasi
          </h2>
        </div>
        <div className="space-y-4">
          <Toggle
            label="Laporan masuk baru"
            enabled={notifications.newReport}
            onChange={(v) => updateNotification("newReport", v)}
          />
          <Toggle
            label="Pengguna baru terdaftar"
            enabled={notifications.newUser}
            onChange={(v) => updateNotification("newUser", v)}
          />
          <Toggle
            label="Peringatan sistem"
            enabled={notifications.systemAlert}
            onChange={(v) => updateNotification("systemAlert", v)}
          />
          <Toggle
            label="Ringkasan mingguan via email"
            enabled={notifications.weeklyDigest}
            onChange={(v) => updateNotification("weeklyDigest", v)}
          />
        </div>
      </div>

      {/* Keamanan */}
      <div className="bg-white border border-[#E2ECEB] rounded-2xl shadow-xs p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#E6FEFF] flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#022022]" />
          </div>
          <h2 className="text-lg font-semibold text-[#022022] font-poppins">
            Keamanan
          </h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#566E70] uppercase tracking-wide mb-1.5">
              Password Saat Ini
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={passwords.current}
                onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))}
                placeholder="Masukkan password saat ini"
                className="w-full px-4 py-2.5 pr-11 rounded-xl border border-[#E2ECEB] text-sm text-[#022022] placeholder:text-[#566E70] focus:outline-none focus:ring-2 focus:ring-[#37F4B4]/40 focus:border-[#37F4B4] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#566E70] hover:text-[#022022]"
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
                placeholder="Masukkan password baru"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E2ECEB] text-sm text-[#022022] placeholder:text-[#566E70] focus:outline-none focus:ring-2 focus:ring-[#37F4B4]/40 focus:border-[#37F4B4] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#566E70] uppercase tracking-wide mb-1.5">
                Konfirmasi Password
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
          <div className="flex justify-end">
            <button className="px-5 py-2.5 rounded-xl bg-[#022022] text-white hover:bg-[#033033] transition-colors text-sm font-medium">
              Ubah Password
            </button>
          </div>
        </div>
      </div>

      {/* Sistem */}
      <div className="bg-white border border-[#E2ECEB] rounded-2xl shadow-xs p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#E6FEFF] flex items-center justify-center">
            <Settings className="w-5 h-5 text-[#022022]" />
          </div>
          <h2 className="text-lg font-semibold text-[#022022] font-poppins">
            Sistem
          </h2>
        </div>
        <div className="space-y-5">
          <Toggle
            label="Mode Maintenance"
            enabled={maintenanceMode}
            onChange={setMaintenanceMode}
          />
          {maintenanceMode && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-700">
              ⚠️ Mode maintenance aktif. Pengguna tidak dapat mengakses platform.
            </div>
          )}

          <div className="border-t border-[#E2ECEB] pt-4">
            <h3 className="text-sm font-semibold text-[#022022] mb-3">
              Konfigurasi API
            </h3>
            <div className="space-y-3 bg-[#F8FAFA] rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#566E70] uppercase tracking-wide">API URL</span>
                <span className="text-sm text-[#022022] font-mono">https://api.waras.id/v1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#566E70] uppercase tracking-wide">Status</span>
                <span className="inline-flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Aktif
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#566E70] uppercase tracking-wide">Versi</span>
                <span className="text-sm text-[#022022] font-mono">v1.4.2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#566E70] uppercase tracking-wide">Uptime</span>
                <span className="text-sm text-[#022022]">99.9%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
