import React, { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Eye,
  Smartphone,
  Lock,
  CheckCircle2,
  Moon,
  Sparkles,
  Download,
  Trash2,
  KeyRound,
  EyeOff,
  X,
  Volume2,
  MessageSquare,
  Mail,
  Laptop,
  Check,
  AlertTriangle,
  RotateCcw,
  Sliders,
  Loader2
} from "lucide-react";
import { useAccessibility } from "../../context/AccessibilityContext";
import { authService } from "../../services/authService";

const DEFAULT_SETTINGS = {
  notifications: {
    queueAlert: true,
    emergencyBroadcast: true,
    weeklyArticle: false,
    dinkesAnnouncements: true,
    waNotification: true,
    emailNotification: true,
    soundAlert: true,
  },
  accessibility: {
    fontSize: "normal", // "normal" | "medium" | "large"
    theme: "light",     // "light" | "system"
  },
  security: {
    twoFactorAuth: true,
  },
  privacy: {
    shareWithFaskes: true,
  }
};

const STORAGE_KEY = "waras_user_settings";

export default function Settings() {
  const {
    reducedMotion,
    highContrast,
    toggleReducedMotion,
    toggleHighContrast,
    setReducedMotion,
    setHighContrast,
  } = useAccessibility();

  const [activeTab, setActiveTab] = useState("all"); // "all" | "notifications" | "accessibility" | "security" | "privacy"
  const [settings, setSettings] = useState(() => ({
    ...DEFAULT_SETTINGS,
    accessibility: {
      ...DEFAULT_SETTINGS.accessibility,
      reducedMotion,
      highContrast,
    },
  }));
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Modal Ubah Kata Sandi
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  // Modal Konfirmasi Hapus Data AI
  const [isClearAiModalOpen, setIsClearAiModalOpen] = useState(false);

  // 1. Load settings dari localStorage saat pertama kali dimuat
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSettings((prev) => ({
          notifications: { ...prev.notifications, ...parsed.notifications },
          accessibility: { ...prev.accessibility, ...parsed.accessibility },
          security: { ...prev.security, ...parsed.security },
          privacy: { ...prev.privacy, ...parsed.privacy },
        }));
      }
    } catch (_e) {
      console.warn("Gagal memuat preferensi dari localStorage.");
    }
  }, []);

  // 2. Terapkan font scaling langsung ke DOM
  useEffect(() => {
    const root = document.documentElement;
    if (settings.accessibility.fontSize === "large") {
      root.style.fontSize = "18px";
    } else if (settings.accessibility.fontSize === "medium") {
      root.style.fontSize = "17px";
    } else {
      root.style.fontSize = "";
    }
  }, [settings.accessibility.fontSize]);

  // Handler toggle notifikasi
  const handleToggleNotification = (key) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  // Handler toggle aksesibilitas
  const handleToggleAccessibility = (key) => {
    setSettings((prev) => {
      const nextVal = !prev.accessibility[key];
      if (key === "reducedMotion") toggleReducedMotion();
      if (key === "highContrast") toggleHighContrast();
      return {
        ...prev,
        accessibility: {
          ...prev.accessibility,
          [key]: nextVal,
        },
      };
    });
  };
  // Handler ukuran font
  const handleFontSizeChange = (size) => {
    setSettings((prev) => ({
      ...prev,
      accessibility: {
        ...prev.accessibility,
        fontSize: size,
      },
    }));
  };

  // Handler toggle privasi
  const handleTogglePrivacy = (key) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key],
      },
    }));
  };

  // Simpan pengaturan ke localStorage
  const handleSaveSettings = (e) => {
    if (e) e.preventDefault();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      setToastMessage("Pengaturan preferensi Anda telah berhasil disimpan.");
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (_err) {
      setToastMessage("Gagal menyimpan ke penyimpanan lokal.");
      setSavedSuccess(true);
    }
  };

  // Reset pengaturan ke default
  const handleResetSettings = () => {
    if (window.confirm("Kembalikan semua preferensi ke pengaturan bawaan awal?")) {
      setSettings(DEFAULT_SETTINGS);
      localStorage.removeItem(STORAGE_KEY);
      setReducedMotion(false);
      setHighContrast(false);
      document.documentElement.style.fontSize = "";
      setToastMessage("Pengaturan telah dikembalikan ke kondisi bawaan awal.");
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  // Uji Coba Suara Notifikasi
  const handleTestSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (_e) {
      console.log("Audio not supported or blocked");
    }
  };

  // Submit Ubah Kata Sandi
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");

    if (!passwordForm.currentPassword.trim()) {
      setPasswordError("Silakan masukkan kata sandi Anda saat ini.");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      setPasswordError("Kata sandi baru minimal harus terdiri dari 8 karakter.");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Konfirmasi kata sandi baru tidak cocok.");
      return;
    }

    setIsSubmittingPassword(true);
    try {
      await authService.changePassword(
        passwordForm.currentPassword,
        passwordForm.newPassword
      );

      setPasswordSuccess(true);
      setTimeout(() => {
        setPasswordSuccess(false);
        setIsPasswordModalOpen(false);
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setToastMessage("Kata sandi akun warga berhasil diperbarui di sistem.");
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3500);
      }, 1200);
    } catch (err) {
      setPasswordError(err.message || "Gagal mengubah kata sandi. Periksa kata sandi saat ini.");
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  // Unduh Berkas Rekam Medis (Ekspor JSON Riwayat)
  const handleExportData = () => {
    const rawUser = localStorage.getItem("waras_auth_user");
    const user = rawUser ? JSON.parse(rawUser) : { name: "Nael Ardiansyah", nik: "3374011208980004" };

    const exportPayload = {
      platform: "WARAS - Healthcare Platform Kota Semarang",
      tanggalEkspor: new Date().toISOString(),
      pasien: {
        nama: user.name || "Nael Ardiansyah",
        nik: user.nik || "3374011208980004",
        statusBPJS: "Aktif (Kelas 1)",
        faskesPrimer: "Puskesmas Pandanaran",
        wilayah: "Kota Semarang, Jawa Tengah"
      },
      riwayatAntreanTerkini: [
        { tanggal: "2026-11-10", poli: "Poli Umum", status: "Selesai", faskes: "Puskesmas Poncol" },
        { tanggal: "2026-10-22", poli: "Poli Gigi", status: "Selesai", faskes: "Puskesmas Pandanaran" }
      ],
      preferensiSistem: settings
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Rekam_Data_WARAS_${user.nik || "3374011208980004"}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setToastMessage("Data rekam riwayat kesehatan Anda berhasil diunduh.");
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Bersihkan Chat History AI
  const handleClearAiHistory = () => {
    try {
      localStorage.removeItem("waras_ai_chat_history");
      localStorage.removeItem("waras_ai_active_session");
      setIsClearAiModalOpen(false);
      setToastMessage("Riwayat percakapan konsultasi AI telah dibersihkan.");
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (_err) {
      console.warn("Gagal menghapus riwayat AI");
    }
  };

  // Navigasi Tab Menu Pengaturan
  const tabs = [
    { id: "all", label: "Semua", icon: Sliders },
    { id: "notifications", label: "Notifikasi", icon: Bell },
    { id: "accessibility", label: "Aksesibilitas", icon: Eye },
    { id: "security", label: "Keamanan", icon: Shield },
    { id: "privacy", label: "Data & Privasi", icon: Lock },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 font-inter">
      {/* ── HEADER HALAMAN ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200/60 pb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5 text-[#022022]">
            <SettingsIcon className="w-6 h-6 stroke-[2.2] text-[#022022]" />
            <h1 className="font-poppins font-bold text-2xl lg:text-3xl tracking-tight text-[#0D2626]">
              Pengaturan Akun & Preferensi
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#526666] font-inter">
            Sesuaikan peringatan antrean, kenyamanan visual, privasi rekam medis, dan keamanan akun warga Anda.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <button
            type="button"
            onClick={handleResetSettings}
            title="Kembalikan ke bawaan"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-xs font-medium text-slate-600 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleSaveSettings}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-white bg-[#022022] hover:bg-[#033033] border border-[#022022] shadow-sm hover:shadow text-xs font-semibold active:scale-[0.98] transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </div>

      {/* ── TOAST SUKSES ── */}
      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium flex items-center justify-between gap-2 shadow-2xs animate-fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setSavedSuccess(false)}
            className="text-emerald-700 hover:text-emerald-900 p-1 rounded cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── RESPONSIVE MENU TABS ── */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-[#022022] text-white shadow-xs font-semibold"
                  : "bg-white border border-[#E2ECEB] text-[#526666] hover:bg-gray-50 hover:text-[#022022]"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#526666]"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── SECTIONS DAFTAR PENGATURAN ── */}
      <div className="space-y-6">
        {/* ── 1. SECTION NOTIFIKASI ── */}
        {(activeTab === "all" || activeTab === "notifications") && (
          <div className="bg-white rounded-3xl border border-[#E2ECEB] p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#022022]/10 text-[#022022] border border-[#022022]/15 flex items-center justify-center font-bold">
                  <Bell className="w-5 h-5 text-[#022022]" />
                </div>
                <div>
                  <h2 className="font-poppins font-bold text-base sm:text-lg text-[#0D2626]">
                    Notifikasi Layanan & Antrean
                  </h2>
                  <p className="text-xs text-[#526666]">
                    Pilih kanal dan jenis notifikasi antrean Puskesmas serta siaran resmi Dinas Kesehatan.
                  </p>
                </div>
              </div>
            </div>

            {/* Sub-Pilihan Kanal */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-medium text-[#0D2626]">Kanal WhatsApp</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.waNotification}
                  onChange={() => handleToggleNotification("waNotification")}
                  className="w-4 h-4 rounded text-[#022022] accent-[#022022] cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-[#0D2626]">Kanal Email</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.emailNotification}
                  onChange={() => handleToggleNotification("emailNotification")}
                  className="w-4 h-4 rounded text-[#022022] accent-[#022022] cursor-pointer"
                />
              </label>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB]">
                <div className="flex items-center gap-2.5">
                  <Volume2 className="w-4 h-4 text-[#022022]" />
                  <span className="text-xs font-medium text-[#0D2626]">Suara Antrean</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTestSound}
                    className="text-[11px] px-2 py-0.5 rounded-lg bg-white border border-gray-200 text-slate-600 hover:bg-gray-100 cursor-pointer"
                  >
                    Tes
                  </button>
                  <input
                    type="checkbox"
                    checked={settings.notifications.soundAlert}
                    onChange={() => handleToggleNotification("soundAlert")}
                    className="w-4 h-4 rounded text-[#022022] accent-[#022022] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* List Toggles */}
            <div className="space-y-3 pt-1">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="space-y-0.5 max-w-xl pr-3">
                  <span className="text-xs sm:text-sm font-semibold text-[#0D2626] block">
                    Peringatan Antrean Mendekat (Puskesmas & Rumah Sakit)
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#526666] block">
                    Kirimkan peringatan instan jika sisa antrean poli faskes Anda tersisa 3 nomor lagi.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.queueAlert}
                  onChange={() => handleToggleNotification("queueAlert")}
                  className="w-4.5 h-4.5 rounded text-[#022022] accent-[#022022] cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="space-y-0.5 max-w-xl pr-3">
                  <span className="text-xs sm:text-sm font-semibold text-[#0D2626] block">
                    Pemberitahuan Darurat Kesehatan Semarang
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#526666] block">
                    Peringatan siaga DBD, polusi udara, banjir genangan faskes, atau layanan IGD 24 jam.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.emergencyBroadcast}
                  onChange={() => handleToggleNotification("emergencyBroadcast")}
                  className="w-4.5 h-4.5 rounded text-[#022022] accent-[#022022] cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="space-y-0.5 max-w-xl pr-3">
                  <span className="text-xs sm:text-sm font-semibold text-[#0D2626] block">
                    Rangkuman Artikel & Panduan Kesehatan Mingguan
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#526666] block">
                    Kumpulan tips gizi keluarga, pola tidur balita, dan panduan P3K terverifikasi dokter.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.weeklyArticle}
                  onChange={() => handleToggleNotification("weeklyArticle")}
                  className="w-4.5 h-4.5 rounded text-[#022022] accent-[#022022] cursor-pointer"
                />
              </label>
            </div>
          </div>
        )}

        {/* ── 2. SECTION TAMPILAN & AKSESIBILITAS ── */}
        {(activeTab === "all" || activeTab === "accessibility") && (
          <div className="bg-white rounded-3xl border border-[#E2ECEB] p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#022022]/10 text-[#022022] border border-[#022022]/15 flex items-center justify-center font-bold">
                <Eye className="w-5 h-5 text-[#022022]" />
              </div>
              <div>
                <h2 className="font-poppins font-bold text-base sm:text-lg text-[#0D2626]">
                  Aksesibilitas & Tampilan
                </h2>
                <p className="text-xs text-[#526666]">
                  Pengaturan kontras tinggi, animasi layar, dan ukuran font untuk kenyamanan membaca.
                </p>
              </div>
            </div>

            {/* Skala Ukuran Teks */}
            <div className="p-4 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="text-xs sm:text-sm font-semibold text-[#0D2626] block">
                    Skala Ukuran Teks (Font Scaling)
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#526666] block">
                    Menyesuaikan kenyamanan ukuran teks di artikel dan kartu info faskes.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 pt-1">
                {[
                  { id: "normal", label: "Normal (100%)", desc: "Standar" },
                  { id: "medium", label: "Sedang (110%)", desc: "Direkomendasikan" },
                  { id: "large", label: "Besar (120%)", desc: "Mata Lelah / Lansia" },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => handleFontSizeChange(f.id)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      settings.accessibility.fontSize === f.id
                        ? "bg-[#022022] text-white border-[#022022] shadow-xs"
                        : "bg-white border-[#E2ECEB] text-slate-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="block text-xs sm:text-sm font-semibold">{f.label}</span>
                    <span className={`block text-[10px] mt-0.5 ${settings.accessibility.fontSize === f.id ? "text-white/80" : "text-slate-400"}`}>
                      {f.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles Aksesibilitas */}
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="space-y-0.5 max-w-xl pr-3">
                  <span className="text-xs sm:text-sm font-semibold text-[#0D2626] block">
                    Mode Kontras Tinggi (High Contrast)
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#526666] block">
                    Mempertegas garis pembatas tabel, kartu antrean, dan ketajaman teks bagi kenyamanan penglihatan.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={toggleHighContrast}
                  className="w-4.5 h-4.5 rounded text-[#022022] accent-[#022022] cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="space-y-0.5 max-w-xl pr-3">
                  <span className="text-xs sm:text-sm font-semibold text-[#0D2626] block">
                    Kurangi Efek Animasi (Reduced Motion)
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#526666] block">
                    Menonaktifkan pergerakan paralaks transisi antar halaman untuk menghemat daya dan kenyamanan visual.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={toggleReducedMotion}
                  className="w-4.5 h-4.5 rounded text-[#022022] accent-[#022022] cursor-pointer"
                />
              </label>
            </div>
          </div>
        )}

        {/* ── 3. SECTION KEAMANAN & KATA SANDI ── */}
        {(activeTab === "all" || activeTab === "security") && (
          <div className="bg-white rounded-3xl border border-[#E2ECEB] p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#022022]/10 text-[#022022] border border-[#022022]/15 flex items-center justify-center font-bold">
                <Shield className="w-5 h-5 text-[#022022]" />
              </div>
              <div>
                <h2 className="font-poppins font-bold text-base sm:text-lg text-[#0D2626]">
                  Keamanan & Kata Sandi Akun
                </h2>
                <p className="text-xs text-[#526666]">
                  Perlindungan kata sandi warga dan otentikasi verifikasi dua langkah.
                </p>
              </div>
            </div>

            {/* Kotak Ubah Sandi */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] gap-4">
              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-semibold text-[#0D2626] block">
                  Kata Sandi Akun Pasien / Warga
                </span>
                <span className="text-[11px] sm:text-xs text-[#526666] block">
                  Disarankan memperbarui kata sandi secara berkala minimal setiap 3 bulan demi keamanan data medis.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPasswordError("");
                  setIsPasswordModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#022022] text-white hover:bg-[#033033] text-xs font-semibold shadow-xs active:scale-[0.98] transition-all cursor-pointer shrink-0"
              >
                <KeyRound className="w-3.5 h-3.5 text-white" />
                <span>Ubah Sandi</span>
              </button>
            </div>

            {/* Sesi Perangkat Aktif */}
            <div className="p-4 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] space-y-3">
              <span className="text-xs sm:text-sm font-semibold text-[#0D2626] block">
                Sesi Perangkat Aktif Saat Ini
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-white border border-[#E2ECEB]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#022022]/10 flex items-center justify-center text-[#022022] shrink-0">
                    <Laptop className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">
                      Peramban Web Ini (Windows / macOS)
                    </span>
                    <span className="text-[11px] text-emerald-600 block">
                      ● Sesi Aktif Saat Ini • Kota Semarang
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setToastMessage("Sesi di perangkat lain telah ditutup.");
                    setSavedSuccess(true);
                    setTimeout(() => setSavedSuccess(false), 2500);
                  }}
                  className="text-xs text-rose-600 hover:text-rose-700 hover:underline font-medium text-left sm:text-right cursor-pointer"
                >
                  Keluar dari Perangkat Lain
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── 4. SECTION DATA & PRIVASI ── */}
        {(activeTab === "all" || activeTab === "privacy") && (
          <div className="bg-white rounded-3xl border border-[#E2ECEB] p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#022022]/10 text-[#022022] border border-[#022022]/15 flex items-center justify-center font-bold">
                <Lock className="w-5 h-5 text-[#022022]" />
              </div>
              <div>
                <h2 className="font-poppins font-bold text-base sm:text-lg text-[#0D2626]">
                  Data Medis & Privasi Kependudukan
                </h2>
                <p className="text-xs text-[#526666]">
                  Kendali unduh data rekam medis terpadu dan pembersihan riwayat asisten medis WARAS AI.
                </p>
              </div>
            </div>

            {/* Izin integrasi Faskes */}
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="space-y-0.5 max-w-xl pr-3">
                <span className="text-xs sm:text-sm font-semibold text-[#0D2626] block">
                  Izin Integrasi Data Rekam Medis Antar Faskes
                </span>
                <span className="text-[11px] sm:text-xs text-[#526666] block">
                  Izinkan dokter di 37 Puskesmas dan 14 RS Rujukan Kota Semarang melihat riwayat alergi dan obat Anda.
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.privacy.shareWithFaskes}
                onChange={() => handleTogglePrivacy("shareWithFaskes")}
                className="w-4.5 h-4.5 rounded text-[#022022] accent-[#022022] cursor-pointer"
              />
            </label>

            {/* Tindakan Ekspor Data & Bersihkan Cache */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] flex flex-col justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-xs sm:text-sm font-semibold text-[#0D2626] block">
                    Unduh Salinan Data Kesehatan
                  </span>
                  <span className="text-[11px] text-[#526666] block">
                    Unduh arsip portabel data identitas, nomor BPJS, dan riwayat kunjungan antrean (JSON).
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleExportData}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#022022]/15 text-[#022022] hover:bg-gray-50 text-xs font-semibold shadow-2xs transition-all cursor-pointer w-full"
                >
                  <Download className="w-3.5 h-3.5 text-[#022022]" />
                  <span>Unduh Arsip Data (JSON)</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] flex flex-col justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-xs sm:text-sm font-semibold text-[#0D2626] block">
                    Hapus Riwayat Konsultasi WARAS AI
                  </span>
                  <span className="text-[11px] text-[#526666] block">
                    Bersihkan riwayat percakapan gejala dan keluhan dengan asisten medis virtual.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsClearAiModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold shadow-2xs transition-all cursor-pointer w-full"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                  <span>Bersihkan Riwayat AI</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── MODAL INTERAKTIF: UBAH KATA SANDI ── */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-xl border border-gray-100 relative space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#022022]/10 flex items-center justify-center text-[#022022]">
                  <KeyRound className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-base text-[#0D2626]">
                    Ubah Kata Sandi Warga
                  </h3>
                  <p className="text-[11px] text-[#526666]">
                    Pastikan kombinasi sandi baru minimal 8 karakter.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {passwordError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-bold text-sm text-slate-800">Kata Sandi Berhasil Diperbarui!</h4>
                <p className="text-xs text-slate-500">Menyimpan dan mengamankan akun warga Anda...</p>
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
                {/* Sandi Saat Ini */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-slate-700">
                    Kata Sandi Saat Ini
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword.current ? "text" : "password"}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))}
                      placeholder="Masukkan kata sandi lama"
                      className="w-full px-3.5 pr-10 py-2.5 rounded-xl border border-[#E2ECEB] text-xs sm:text-sm focus:outline-none focus:border-[#022022] focus:ring-2 focus:ring-[#022022]/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => ({ ...p, current: !p.current }))}
                      className="absolute right-3 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    >
                      {showPassword.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Sandi Baru */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-slate-700">
                    Kata Sandi Baru
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword.new ? "text" : "password"}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
                      placeholder="Minimal 8 karakter unik"
                      className="w-full px-3.5 pr-10 py-2.5 rounded-xl border border-[#E2ECEB] text-xs sm:text-sm focus:outline-none focus:border-[#022022] focus:ring-2 focus:ring-[#022022]/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => ({ ...p, new: !p.new }))}
                      className="absolute right-3 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    >
                      {showPassword.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Konfirmasi Sandi Baru */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-slate-700">
                    Konfirmasi Kata Sandi Baru
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword.confirm ? "text" : "password"}
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                      placeholder="Ulangi kata sandi baru"
                      className="w-full px-3.5 pr-10 py-2.5 rounded-xl border border-[#E2ECEB] text-xs sm:text-sm focus:outline-none focus:border-[#022022] focus:ring-2 focus:ring-[#022022]/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => ({ ...p, confirm: !p.confirm }))}
                      className="absolute right-3 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    >
                      {showPassword.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-medium text-slate-600 hover:bg-gray-50 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingPassword}
                    className="px-5 py-2 rounded-xl bg-[#022022] text-white hover:bg-[#033033] text-xs font-semibold cursor-pointer shadow-xs disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {isSubmittingPassword ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Menyimpan...</span>
                      </>
                    ) : (
                      <span>Simpan Sandi Baru</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── MODAL KONFIRMASI: HAPUS RIWAYAT AI ── */}
      {isClearAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-xl border border-gray-100 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-poppins font-bold text-base text-[#0D2626]">
              Hapus Riwayat Konsultasi AI?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Seluruh rekaman chat konsultasi keluhan awal Anda dengan asisten medis WARAS AI di peramban ini akan dibersihkan. Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsClearAiModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-medium text-slate-600 hover:bg-gray-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleClearAiHistory}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white hover:bg-rose-700 text-xs font-semibold cursor-pointer shadow-xs"
              >
                Ya, Hapus Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
