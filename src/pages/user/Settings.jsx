import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Eye,
  Smartphone,
  Lock,
  CheckCircle2,
  Moon,
  Sparkles
} from "lucide-react";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    queueAlert: true,
    emergencyBroadcast: true,
    weeklyArticle: false,
    dinkesAnnouncements: true,
  });

  const [accessibility, setAccessibility] = useState({
    reducedMotion: false,
    highContrast: false,
    largerText: false,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleToggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleToggleAccessibility = (key) => {
    setAccessibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 font-inter">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-poppins font-bold text-2xl text-[#0D2626]">
            Pengaturan Akun & Preferensi
          </h1>
          <p className="text-xs sm:text-sm text-[#526666] mt-1">
            Sesuaikan preferensi notifikasi antrean, aksesibilitas tampilan, dan keamanan data Anda.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveSettings}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#022022] hover:bg-[#033033] text-[#37F4B4] border border-[#37F4B4]/25 text-xs font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Simpan Perubahan</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Pengaturan preferensi Anda telah berhasil disimpan.</span>
        </div>
      )}

      {/* SECTIONS */}
      <div className="space-y-6">
        {/* NOTIFICATIONS */}
        <div className="bg-white rounded-3xl border border-[#E2ECEB] p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3">
            <div className="w-9 h-9 rounded-xl bg-[#022022]/10 text-[#022022] border border-[#37F4B4]/25 flex items-center justify-center font-bold">
              <Bell className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="font-poppins font-bold text-base text-[#0D2626]">
                Notifikasi Layanan & Antrean
              </h2>
              <p className="text-xs text-[#526666]">
                Kelola pesan peringatan yang dikirimkan ke nomor WhatsApp dan email Anda.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="space-y-0.5 max-w-lg">
                <span className="text-xs font-bold text-[#0D2626] block">
                  Peringatan Antrean Mendekat (Puskesmas)
                </span>
                <span className="text-[11px] text-[#526666] block">
                  Dapatkan notifikasi jika antrean poli Anda tersisa 3 nomor lagi.
                </span>
              </div>
              <input
                type="checkbox"
                checked={notifications.queueAlert}
                onChange={() => handleToggleNotification("queueAlert")}
                className="w-4 h-4 rounded text-[#022022] accent-[#022022] cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="space-y-0.5 max-w-lg">
                <span className="text-xs font-bold text-[#0D2626] block">
                  Pemberitahuan Darurat Kesehatan Semarang
                </span>
                <span className="text-[11px] text-[#526666] block">
                  Peringatan siaga DBD, cuaca ekstrem, atau layanan puskesmas darurat 24 jam.
                </span>
              </div>
              <input
                type="checkbox"
                checked={notifications.emergencyBroadcast}
                onChange={() => handleToggleNotification("emergencyBroadcast")}
                className="w-4 h-4 rounded text-[#022022] accent-[#022022] cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="space-y-0.5 max-w-lg">
                <span className="text-xs font-bold text-[#0D2626] block">
                  Rangkuman Artikel Kesehatan Mingguan
                </span>
                <span className="text-[11px] text-[#526666] block">
                  Kumpulan tips nutrisi, pola tidur, dan panduan P3K keluarga terverifikasi dokter.
                </span>
              </div>
              <input
                type="checkbox"
                checked={notifications.weeklyArticle}
                onChange={() => handleToggleNotification("weeklyArticle")}
                className="w-4 h-4 rounded text-[#022022] accent-[#022022] cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* ACCESSIBILITY */}
        <div className="bg-white rounded-3xl border border-[#E2ECEB] p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3">
            <div className="w-9 h-9 rounded-xl bg-[#022022]/10 text-[#022022] border border-[#37F4B4]/25 flex items-center justify-center font-bold">
              <Eye className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="font-poppins font-bold text-base text-[#0D2626]">
                Aksesibilitas & Tampilan
              </h2>
              <p className="text-xs text-[#526666]">
                Kenyamanan visual saat membaca artikel dan grafik antrean.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="space-y-0.5 max-w-lg">
                <span className="text-xs font-bold text-[#0D2626] block">
                  Kurangi Efek Animasi (Reduced Motion)
                </span>
                <span className="text-[11px] text-[#526666] block">
                  Menonaktifkan pergerakan paralaks 3D dan transisi melayang untuk kenyamanan peramban.
                </span>
              </div>
              <input
                type="checkbox"
                checked={accessibility.reducedMotion}
                onChange={() => handleToggleAccessibility("reducedMotion")}
                className="w-4 h-4 rounded text-[#022022] accent-[#022022] cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="space-y-0.5 max-w-lg">
                <span className="text-xs font-bold text-[#0D2626] block">
                  Mode Kontras Tinggi (High Contrast)
                </span>
                <span className="text-[11px] text-[#526666] block">
                  Mempertegas garis pembatas tabel dan kartu antrean faskes.
                </span>
              </div>
              <input
                type="checkbox"
                checked={accessibility.highContrast}
                onChange={() => handleToggleAccessibility("highContrast")}
                className="w-4 h-4 rounded text-[#022022] accent-[#022022] cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* SECURITY & DATA */}
        <div className="bg-white rounded-3xl border border-[#E2ECEB] p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3">
            <div className="w-9 h-9 rounded-xl bg-[#022022]/10 text-[#022022] border border-[#37F4B4]/25 flex items-center justify-center font-bold">
              <Shield className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="font-poppins font-bold text-base text-[#0D2626]">
                Keamanan & Akun
              </h2>
              <p className="text-xs text-[#526666]">
                Perlindungan data riwayat konsultasi dan privasi kependudukan.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#0D2626] block">
                Kata Sandi Akun Warga
              </span>
              <span className="text-[11px] text-[#526666] block">
                Terakhir diubah 30 hari yang lalu melalui portal verifikasi.
              </span>
            </div>
            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-white border border-[#E2ECEB] text-xs font-semibold text-[#022022] hover:bg-[#022022]/5 shadow-2xs cursor-pointer"
            >
              Ubah Sandi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

