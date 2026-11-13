import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  HeartPulse,
  Clock,
  Edit3,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Eye,
  EyeOff,
  QrCode,
  Printer,
  Download,
  Share2,
  Copy,
  FileText,
  Check,
  Activity,
  Sparkles,
  Hospital,
  AlertTriangle,
  ChevronRight,
  Info,
  ExternalLink,
  X,
  Lock,
  ArrowRight,
  Stethoscope,
  Pill,
  BadgeAlert
} from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showNik, setShowNik] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'identity' | 'medical' | 'visits'
  const [showQrModal, setShowQrModal] = useState(false);
  const [selectedVisitModal, setSelectedVisitModal] = useState(null);
  const [copiedField, setCopiedField] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form Profile State
  const [profileData, setProfileData] = useState({
    name: "Nael Ardiansyah",
    nik: "3374011208980004",
    kk: "3374012005080012",
    birthPlace: "Semarang",
    birthDate: "12 Agustus 1998",
    gender: "Laki-laki",
    bloodType: "O+",
    rhesus: "Positif (+)",
    religion: "Islam",
    maritalStatus: "Belum Kawin",
    occupation: "Karyawan Swasta / IT Specialist",
    email: "nael@semarangkota.go.id",
    phone: "0812-3456-7890",
    address: "Jl. Pandanaran No. 42, RT 03 / RW 02",
    kelurahan: "Mugassari",
    district: "Semarang Selatan",
    city: "Kota Semarang",
    postalCode: "50249",
    // Kontak Darurat
    emergencyName: "Siti Rahmawati",
    emergencyRelation: "Ibu Kandung",
    emergencyPhone: "0813-9876-5432",
    // BPJS
    bpjsNumber: "0001239845124",
    bpjsStatus: "Aktif (Kelas 1)",
    bpjsType: "Pekerja Penerima Upah (PPU)",
    faskesPrimer: "Puskesmas Pandanaran",
    faskesCode: "0134B001",
    faskesAddress: "Jl. Pandanaran No. 79, Kota Semarang",
    // Rekam Medis Ringkas
    height: "172 cm",
    weight: "68 kg",
    bmi: "23.0 (Ideal)",
    bloodPressure: "118/78 mmHg",
    bloodSugar: "94 mg/dL",
    allergies: "Alergi Antibiotik Golongan Penisilin / Amoksisilin",
    medicalNotes: "Riwayat maag ringan terkontrol. Hindari konsumsi obat anti-inflamasi (NSAID) saat perut kosong.",
    vaccineStatus: "Vaksinasi Lengkap (Booster 2)",
  });

  // Draft state saat edit
  const [editForm, setEditForm] = useState({ ...profileData });

  // Riwayat Kunjungan Faskes
  const recentVisits = [
    {
      id: "VISIT-2026-10",
      faskes: "Puskesmas Pandanaran",
      poly: "Poli Umum",
      doctor: "dr. Tri Wahyuni",
      date: "12 Okt 2026",
      time: "09:15 WIB",
      type: "Rawat Jalan",
      status: "Selesai",
      diagnosis: "Faringitis Akut & Kelelahan Fisik Ringan",
      vitals: { bp: "118/78 mmHg", temp: "36.8°C", pulse: "76 bpm" },
      medications: [
        "Paracetamol 500mg (3x1 tab sesudah makan)",
        "Vitamin B Kompleks & C (1x1 tab pagi)",
        "Cetirizine 10mg (1x1 tab malam jika gatal/batuk)"
      ],
      notes: "Edukasi hidrasi minimal 2.5 liter/hari dan istirahat cukup selama 3 hari. Kontrol kembali jika keluhan bertambah."
    },
    {
      id: "VISIT-2026-09",
      faskes: "RSUD K.R.M.T. Wongsonegoro",
      poly: "Poli Spesialis Mata",
      doctor: "dr. Maya Indah, Sp.M",
      date: "15 Sep 2026",
      time: "10:30 WIB",
      type: "Rujukan Faskes 1",
      status: "Selesai",
      diagnosis: "Pemeriksaan Visus & Refraksi Mata (Astigmatisme Ringan)",
      vitals: { bp: "120/80 mmHg", temp: "36.6°C", pulse: "74 bpm" },
      medications: [
        "Tetes Mata Artifisial (Lubricant 3x sehari)",
        "Resep Kacamata Komputer Anti-Radiasi OD -1.25 OS -1.50"
      ],
      notes: "Surat Rujukan berlaku hingga 15 Desember 2026. Lakukan istirahat mata aturan 20-20-20 saat bekerja dengan layar."
    },
    {
      id: "VISIT-2026-07",
      faskes: "Puskesmas Pandanaran",
      poly: "Poli Skrining PTM & Laboratorium",
      doctor: "dr. Hendro Prasetyo",
      date: "20 Jul 2026",
      time: "08:00 WIB",
      type: "Skrining Berkala Dinkes",
      status: "Selesai",
      diagnosis: "Pemeriksaan Profil Metabolik & Skrining Diabetes Melitus",
      vitals: { bp: "116/76 mmHg", temp: "36.5°C", pulse: "72 bpm" },
      medications: [
        "Tidak memerlukan obat resep medis (Hasil laboratorium optimal)"
      ],
      notes: "Kadar gula darah puasa 94 mg/dL dan profil lipid dalam ambang aman standar Kemenkes RI."
    }
  ];

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleStartEditing = () => {
    setEditForm({ ...profileData });
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setEditForm({ ...profileData });
    setIsEditing(false);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileData({ ...editForm });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const maskedNik = showNik
    ? profileData.nik
    : `${profileData.nik.slice(0, 6)} ****** ${profileData.nik.slice(-4)}`;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-14 font-inter text-[#0D2626]">
      {/* SECTION BREADCRUMB & PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200/60 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#526666] mb-1">
            <Link to="/user/dashboard" className="hover:text-[#003B3B] transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[#003B3B]">Profil Warga</span>
          </div>
          <h1 className="font-poppins font-bold text-2xl sm:text-3xl tracking-tight text-[#0D2626]">
            Profil Saya & Rekam Layanan
          </h1>
          <p className="text-xs sm:text-sm text-[#526666] mt-0.5">
            Integrasi identitas kependudukan NIK Kota Semarang, kartu digital BPJS Kesehatan, dan riwayat pemeriksaan faskes.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#EBF5F5] text-[#003B3B] border border-[#003B3B]/15">
            <ShieldCheck className="w-4 h-4 text-[#0B6B6B]" />
            Dukcapil & BPJS Terhubung
          </span>
        </div>
      </div>

      {/* TOAST SUCCESS ALERT */}
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-[#0D2626]">Pembaruan Data Berhasil Disimpan</p>
              <p className="text-xs text-emerald-800 font-normal mt-0.5">
                Data kontak dan profil kesehatan Anda telah diperbarui ke sistem WARAS.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSavedSuccess(false)}
            className="text-emerald-700 hover:text-emerald-900 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* SECTION HERO BANNER - CITIZEN CARD */}
      <section className="relative w-full overflow-hidden rounded-3xl bg-[#003B3B] p-6 sm:p-8 text-white shadow-[0_20px_50px_rgba(0,59,59,0.15)]">
        {/* SVG Decorative Curves (Consistent with Dashboard Hero) */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden opacity-20">
          <svg
            className="w-full h-full object-cover"
            preserveAspectRatio="none"
            viewBox="0 0 1440 437"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1465.08 92.3023C979.851 431.606 579.315 131.724 301.597 180.662C15.6588 231.092 5.94788 378.047 -1.94859 324.721L9.86135 404.475C9.86135 404.475 99.4007 357.504 259.746 323.434C841.544 199.818 924.335 522.66 1192.07 447.213C1459.81 371.766 1598.83 -1.22344 1465.08 92.3023Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Avatar and Basic Citizen Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative group">
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-white text-[#003B3B] flex items-center justify-center font-bold font-poppins text-3xl sm:text-4xl shadow-md border-2 border-white/30 shrink-0">
                {profileData.name.charAt(0)}
              </div>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#003B3B] flex items-center justify-center text-white shadow-xs" title="Akun Warga Aktif">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/15 text-[#DDEEEE] backdrop-blur-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#37F4B4]" /> NIK Terverifikasi Dukcapil
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#0B6B6B]/60 text-white border border-white/10">
                  {profileData.district}
                </span>
              </div>

              <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-white tracking-tight">
                {profileData.name}
              </h2>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-teal-100/85">
                <span className="flex items-center gap-1.5 font-mono">
                  <User className="w-3.5 h-3.5 text-teal-300" />
                  NIK: {maskedNik}
                </span>
                <button
                  type="button"
                  onClick={() => setShowNik(!showNik)}
                  className="text-[11px] underline text-teal-200 hover:text-white transition-colors cursor-pointer"
                >
                  {showNik ? "Sembunyikan" : "Tampilkan"}
                </button>
                <span className="text-white/40">•</span>
                <span className="flex items-center gap-1">
                  <Hospital className="w-3.5 h-3.5 text-teal-300" />
                  {profileData.faskesPrimer}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-all duration-200 cursor-pointer shadow-xs"
            >
              <QrCode className="w-4 h-4 text-teal-200" />
              <span>Kartu Pasien QR</span>
            </button>

            {!isEditing ? (
              <button
                type="button"
                onClick={handleStartEditing}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#003B3B] hover:bg-[#EBF5F5] font-semibold text-xs transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
              >
                <Edit3 className="w-4 h-4" />
                <span>Perbarui Data</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCancelEditing}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/80 hover:bg-rose-600 text-white font-semibold text-xs transition-all duration-200 cursor-pointer shadow-xs"
              >
                <X className="w-4 h-4" />
                <span>Batal Ubah</span>
              </button>
            )}
          </div>
        </div>

        {/* QUICK METRICS PILL BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 mt-6 border-t border-white/15 text-xs">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-teal-200 block uppercase font-medium tracking-wider">Status BPJS</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <strong className="text-white font-semibold text-xs truncate">{profileData.bpjsStatus}</strong>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-teal-200 block uppercase font-medium tracking-wider">Golongan Darah</span>
            <strong className="text-white font-semibold text-xs mt-0.5 block">{profileData.bloodType} ({profileData.rhesus})</strong>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-teal-200 block uppercase font-medium tracking-wider">Faskes Tingkat 1</span>
            <strong className="text-white font-semibold text-xs mt-0.5 block truncate">{profileData.faskesPrimer}</strong>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-teal-200 block uppercase font-medium tracking-wider">Kunjungan Terakhir</span>
            <strong className="text-white font-semibold text-xs mt-0.5 block">12 Okt 2026 (Poli Umum)</strong>
          </div>
        </div>
      </section>

      {/* FILTER TABS */}
      <div className="flex items-center gap-1.5 p-1.5 bg-[#EBF5F5]/60 rounded-2xl border border-[#E2ECEB] w-full sm:w-fit overflow-x-auto text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "all"
              ? "bg-[#003B3B] text-white shadow-xs font-bold"
              : "text-[#526666] hover:text-[#003B3B] hover:bg-white/60"
          }`}
        >
          Semua Data Terpadu
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("identity")}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "identity"
              ? "bg-[#003B3B] text-white shadow-xs font-bold"
              : "text-[#526666] hover:text-[#003B3B] hover:bg-white/60"
          }`}
        >
          Data Kependudukan & KTP
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("medical")}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "medical"
              ? "bg-[#003B3B] text-white shadow-xs font-bold"
              : "text-[#526666] hover:text-[#003B3B] hover:bg-white/60"
          }`}
        >
          BPJS & Rekam Medis
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("visits")}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "visits"
              ? "bg-[#003B3B] text-white shadow-xs font-bold"
              : "text-[#526666] hover:text-[#003B3B] hover:bg-white/60"
          }`}
        >
          Riwayat Pelayanan ({recentVisits.length})
        </button>
      </div>

      {/* 2-COLUMN MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: IDENTITAS & FORM (7 COLS) */}
        <div className="lg:col-span-7 space-y-6">
          {/* CARD 1: IDENTITAS UTAMA (Visible in 'all' and 'identity') */}
          {(activeTab === "all" || activeTab === "identity") && (
            <div className="bg-white rounded-3xl border border-[#E2ECEB] p-6 sm:p-7 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#EBF5F5] text-[#003B3B] flex items-center justify-center font-bold">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-bold text-base text-[#0D2626]">
                      Identitas Kependudukan & Kontak
                    </h3>
                    <p className="text-xs text-[#526666]">
                      Data primer sesuai Kartu Tanda Penduduk (KTP) Kota Semarang.
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Terverifikasi
                </span>
              </div>

              {/* FORM MODE vs VIEW MODE */}
              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">Mode Edit Profil Aktif:</strong>
                      <p className="mt-0.5 text-[11px] text-amber-800">
                        NIK dan Nomor Kartu Keluarga terkunci otomatis sesuai basis data Disdukcapil Kota Semarang. Anda dapat memperbarui nama, nomor kontak, dan alamat domisili.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#526666]">
                        Nama Lengkap Sesuai KTP <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs font-semibold text-[#0D2626] focus:outline-none focus:border-[#003B3B] focus:ring-2 focus:ring-[#003B3B]/10 transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-[#526666]">
                          NIK (16 Digit)
                        </label>
                        <span className="text-[10px] text-gray-400 flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Terkunci
                        </span>
                      </div>
                      <input
                        type="text"
                        disabled
                        value={editForm.nik}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-100 border border-[#E2ECEB] text-xs font-mono font-medium text-gray-500 cursor-not-allowed select-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#526666]">
                        Alamat Email Aktif <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs font-semibold text-[#0D2626] focus:outline-none focus:border-[#003B3B] focus:ring-2 focus:ring-[#003B3B]/10 transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#526666]">
                        Nomor WhatsApp / HP <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs font-semibold text-[#0D2626] focus:outline-none focus:border-[#003B3B] focus:ring-2 focus:ring-[#003B3B]/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-[#526666]">
                        Alamat Jalan / RT / RW
                      </label>
                      <input
                        type="text"
                        value={editForm.address}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs font-semibold text-[#0D2626] focus:outline-none focus:border-[#003B3B] focus:ring-2 focus:ring-[#003B3B]/10 transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#526666]">
                        Kecamatan
                      </label>
                      <select
                        value={editForm.district}
                        onChange={(e) => setEditForm({ ...editForm, district: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs font-semibold text-[#0D2626] focus:outline-none focus:border-[#003B3B] focus:ring-2 focus:ring-[#003B3B]/10 transition-all"
                      >
                        <option value="Semarang Selatan">Semarang Selatan</option>
                        <option value="Semarang Tengah">Semarang Tengah</option>
                        <option value="Semarang Barat">Semarang Barat</option>
                        <option value="Semarang Timur">Semarang Timur</option>
                        <option value="Semarang Utara">Semarang Utara</option>
                        <option value="Banyumanik">Banyumanik</option>
                        <option value="Gajahmungkur">Gajahmungkur</option>
                        <option value="Candisari">Candisari</option>
                        <option value="Pedurungan">Pedurungan</option>
                        <option value="Tembalang">Tembalang</option>
                        <option value="Ngaliyan">Ngaliyan</option>
                        <option value="Mijen">Mijen</option>
                        <option value="Gunungpati">Gunungpati</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs font-bold text-[#0D2626] mb-3">Kontak Darurat Keluarga</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#526666]">Nama Kerabat</label>
                        <input
                          type="text"
                          value={editForm.emergencyName}
                          onChange={(e) => setEditForm({ ...editForm, emergencyName: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs font-semibold text-[#0D2626]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#526666]">Hubungan</label>
                        <input
                          type="text"
                          value={editForm.emergencyRelation}
                          onChange={(e) => setEditForm({ ...editForm, emergencyRelation: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs font-semibold text-[#0D2626]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#526666]">No. Telepon Darurat</label>
                        <input
                          type="tel"
                          value={editForm.emergencyPhone}
                          onChange={(e) => setEditForm({ ...editForm, emergencyPhone: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs font-semibold text-[#0D2626]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={handleCancelEditing}
                      className="px-4 py-2.5 rounded-xl border border-[#E2ECEB] text-xs font-semibold text-[#526666] hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#003B3B] hover:bg-[#002D2D] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      Simpan Perubahan Data
                    </button>
                  </div>
                </form>
              ) : (
                /* READ-ONLY STRUCTURED CITIZEN DATA */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] space-y-1">
                      <span className="text-[11px] font-semibold text-[#526666] block">
                        Nomor Induk Kependudukan (NIK)
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs sm:text-sm font-bold text-[#0D2626]">
                          {maskedNik}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setShowNik(!showNik)}
                            className="p-1 text-gray-500 hover:text-[#003B3B] transition-colors cursor-pointer"
                            title={showNik ? "Sembunyikan NIK" : "Lihat NIK"}
                          >
                            {showNik ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCopy(profileData.nik, "nik")}
                            className="p-1 text-gray-500 hover:text-[#003B3B] transition-colors cursor-pointer"
                            title="Salin NIK"
                          >
                            {copiedField === "nik" ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] space-y-1">
                      <span className="text-[11px] font-semibold text-[#526666] block">
                        Nomor Kartu Keluarga (KK)
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs sm:text-sm font-bold text-[#0D2626]">
                          3374 0120 **** 0012
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(profileData.kk, "kk")}
                          className="p-1 text-gray-500 hover:text-[#003B3B] transition-colors cursor-pointer"
                          title="Salin No KK"
                        >
                          {copiedField === "kk" ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] space-y-1">
                      <span className="text-[11px] font-semibold text-[#526666] flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#003B3B]" /> Alamat Email Terdaftar
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-[#0D2626]">
                        {profileData.email}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] space-y-1">
                      <span className="text-[11px] font-semibold text-[#526666] flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#003B3B]" /> Nomor WhatsApp / Seluler
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-[#0D2626]">
                        {profileData.phone}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] space-y-1">
                    <span className="text-[11px] font-semibold text-[#526666] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#003B3B]" /> Alamat Domisili KTP
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-[#0D2626] leading-relaxed">
                      {profileData.address}, Kel. {profileData.kelurahan}, Kec. {profileData.district}, {profileData.city} ({profileData.postalCode})
                    </p>
                  </div>

                  {/* INFO KONTAK DARURAT */}
                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-amber-700" /> Kontak Darurat Warga
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        {profileData.emergencyRelation}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <p className="font-semibold text-[#0D2626]">
                        {profileData.emergencyName}
                      </p>
                      <a
                        href={`tel:${profileData.emergencyPhone}`}
                        className="font-mono font-bold text-[#003B3B] hover:underline"
                      >
                        {profileData.emergencyPhone}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CARD 2: RIWAYAT KUNJUNGAN FASKES (Visible in 'all' and 'visits') */}
          {(activeTab === "all" || activeTab === "visits") && (
            <div className="bg-white rounded-3xl border border-[#E2ECEB] p-6 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#EBF5F5] text-[#003B3B] flex items-center justify-center font-bold">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-bold text-base text-[#0D2626]">
                      Riwayat Pelayanan & Kunjungan Faskes
                    </h3>
                    <p className="text-xs text-[#526666]">
                      Catatan kunjungan terakhir Anda di Puskesmas & Rumah Sakit Kota Semarang.
                    </p>
                  </div>
                </div>

                <Link
                  to="/user/facilities"
                  className="text-xs font-semibold text-[#003B3B] hover:underline inline-flex items-center gap-1"
                >
                  <span>Cek Jadwal Poli</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3.5">
                {recentVisits.map((visit) => (
                  <div
                    key={visit.id}
                    onClick={() => setSelectedVisitModal(visit)}
                    className="p-4 rounded-2xl bg-[#F8FAFA] hover:bg-[#EBF5F5]/40 border border-[#E2ECEB] hover:border-[#003B3B]/30 transition-all cursor-pointer group space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#003B3B]/10 text-[#003B3B]">
                            {visit.poly}
                          </span>
                          <span className="text-xs text-[#526666] font-medium">
                            {visit.date} • {visit.time}
                          </span>
                        </div>
                        <h4 className="font-poppins font-bold text-sm text-[#0D2626] group-hover:text-[#003B3B] transition-colors">
                          {visit.faskes}
                        </h4>
                        <p className="text-xs text-[#526666]">
                          Dokter Pemeriksa: <span className="font-semibold text-[#0D2626]">{visit.doctor}</span>
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> {visit.status}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between text-xs">
                      <span className="text-[#526666] truncate max-w-xs sm:max-w-md">
                        Diagnosa: <strong className="text-[#0D2626] font-medium">{visit.diagnosis}</strong>
                      </span>
                      <span className="text-[11px] font-bold text-[#003B3B] group-hover:translate-x-0.5 transition-transform shrink-0 flex items-center gap-1">
                        Detail <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: KARTU BPJS & HEALTH VITALS (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          {/* CARD 3: KARTU BPJS KESEHATAN DIGITAL (Visible in 'all' and 'medical') */}
          {(activeTab === "all" || activeTab === "medical") && (
            <div className="space-y-4">
              {/* VIRTUAL JKN-KIS CARD */}
              <div className="relative rounded-3xl bg-linear-to-br from-[#0B6B6B] via-[#004242] to-[#002727] text-white p-6 sm:p-7 shadow-lg overflow-hidden border border-white/20">
                {/* Hologram & Background Decor */}
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-300/10 rounded-full blur-xl pointer-events-none" />

                {/* Card Top Row */}
                <div className="flex items-center justify-between border-b border-white/20 pb-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <HeartPulse className="w-4 h-4 text-emerald-300" />
                    </div>
                    <div>
                      <span className="font-poppins font-bold text-xs tracking-wider uppercase block">
                        BPJS Kesehatan
                      </span>
                      <span className="text-[9px] text-teal-200 tracking-widest block uppercase">
                        Kartu Indonesia Sehat
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-[#002727] font-bold text-[10px] shadow-xs">
                    {profileData.bpjsStatus}
                  </span>
                </div>

                {/* Chip & Monospace Number */}
                <div className="py-4 space-y-2 relative z-10">
                  <div className="flex items-center justify-between">
                    {/* Golden Chip Visual */}
                    <div className="w-10 h-7 rounded-md bg-linear-to-tr from-amber-400 via-amber-200 to-amber-500 border border-amber-300 shadow-xs flex items-center justify-center">
                      <div className="w-6 h-4 border border-amber-600/40 rounded-xs" />
                    </div>
                    <span className="text-[10px] font-mono text-teal-200/90 tracking-widest uppercase">
                      PPU KOTA SEMARANG
                    </span>
                  </div>

                  <div className="space-y-0.5 pt-1">
                    <span className="text-[10px] text-teal-200 uppercase tracking-widest block font-medium">
                      Nomor Peserta JKN
                    </span>
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-base sm:text-lg font-bold tracking-widest text-white">
                        {profileData.bpjsNumber.replace(/(\d{4})(\d{4})(\d{5})/, "$1 $2 $3")}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleCopy(profileData.bpjsNumber, "bpjs")}
                        className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                        title="Salin Nomor BPJS"
                      >
                        {copiedField === "bpjs" ? (
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Patient Name & Primary Faskes */}
                <div className="pt-3 border-t border-white/15 grid grid-cols-2 gap-2 text-xs relative z-10">
                  <div>
                    <span className="text-[9px] text-teal-200 block uppercase">Nama Peserta</span>
                    <strong className="text-white font-semibold text-xs truncate block mt-0.5">
                      {profileData.name}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-teal-200 block uppercase">Faskes Tingkat 1</span>
                    <strong className="text-white font-semibold text-xs truncate block mt-0.5" title={profileData.faskesPrimer}>
                      {profileData.faskesPrimer}
                    </strong>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTON PINDAH FASKES / INFO */}
              <div className="p-4 rounded-2xl bg-[#EBF5F5] border border-[#003B3B]/15 text-xs flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="font-bold text-[#003B3B] block">Ingin Ubah Faskes Tingkat 1?</span>
                  <p className="text-[11px] text-[#526666]">
                    Perubahan puskesmas domisili dapat dilakukan via aplikasi Mobile JKN.
                  </p>
                </div>
                <Link
                  to="/user/facilities"
                  className="px-3 py-1.5 rounded-xl bg-[#003B3B] text-white font-semibold text-[11px] hover:bg-[#002D2D] transition-colors shrink-0"
                >
                  Cari Faskes
                </Link>
              </div>
            </div>
          )}

          {/* CARD 4: PARAMETER FISIK & REKAM MEDIS (Visible in 'all' and 'medical') */}
          {(activeTab === "all" || activeTab === "medical") && (
            <div className="bg-white rounded-3xl border border-[#E2ECEB] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="w-9 h-9 rounded-xl bg-[#EBF5F5] text-[#003B3B] flex items-center justify-center font-bold">
                  <Activity className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-sm text-[#0D2626]">
                    Kondisi Fisik & Catatan Klinis
                  </h3>
                  <p className="text-[11px] text-[#526666]">
                    Ringkasan skrining kesehatan Puskesmas Pandanaran
                  </p>
                </div>
              </div>

              {/* Vitals Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] space-y-0.5">
                  <span className="text-[10px] text-[#526666] font-medium block">Tekanan Darah</span>
                  <span className="font-bold text-[#0D2626] block text-sm">{profileData.bloodPressure}</span>
                  <span className="text-[10px] font-semibold text-emerald-700">Optimal</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] space-y-0.5">
                  <span className="text-[10px] text-[#526666] font-medium block">Gula Darah Puasa</span>
                  <span className="font-bold text-[#0D2626] block text-sm">{profileData.bloodSugar}</span>
                  <span className="text-[10px] font-semibold text-emerald-700">Normal (Aman)</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] space-y-0.5">
                  <span className="text-[10px] text-[#526666] font-medium block">Tinggi / Berat Badan</span>
                  <span className="font-bold text-[#0D2626] block text-sm">{profileData.height} / {profileData.weight}</span>
                  <span className="text-[10px] font-semibold text-emerald-700">BMI {profileData.bmi}</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] space-y-0.5">
                  <span className="text-[10px] text-[#526666] font-medium block">Status Imunisasi</span>
                  <span className="font-bold text-[#0D2626] block text-xs truncate">Vaksin Lengkap</span>
                  <span className="text-[10px] font-semibold text-emerald-700">Booster 2 Aktif</span>
                </div>
              </div>

              {/* Riwayat Alergi - Peringatan Tegas */}
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Riwayat Alergi Obat</span>
                </div>
                <p className="text-xs font-semibold text-[#0D2626] pl-5">
                  {profileData.allergies}
                </p>
              </div>

              {/* Catatan Dokter */}
              <div className="p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] space-y-1 text-xs">
                <span className="font-semibold text-[#526666] block text-[11px]">
                  Catatan Riwayat Medis:
                </span>
                <p className="text-[#0D2626] leading-relaxed">
                  {profileData.medicalNotes}
                </p>
              </div>
            </div>
          )}

          {/* CARD 5: BANTUAN & INTEGRASI LAYANAN WARAS */}
          <div className="bg-white rounded-3xl border border-[#E2ECEB] p-6 shadow-xs space-y-3.5">
            <h4 className="font-poppins font-bold text-sm text-[#0D2626]">
              Layanan Terkait Warga
            </h4>

            <div className="space-y-2 text-xs">
              <Link
                to="/user/ai"
                className="flex items-center justify-between p-3 rounded-2xl bg-[#F8FAFA] hover:bg-[#EBF5F5] border border-[#E2ECEB] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#003B3B]/10 text-[#003B3B] flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#0D2626] group-hover:text-[#003B3B] transition-colors block">
                      Konsultasi WARAS AI
                    </span>
                    <span className="text-[11px] text-[#526666]">Tanyakan analisis awal keluhan Anda</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                to="/user/report-problem"
                className="flex items-center justify-between p-3 rounded-2xl bg-[#F8FAFA] hover:bg-[#EBF5F5] border border-[#E2ECEB] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#0D2626] group-hover:text-[#003B3B] transition-colors block">
                      Koreksi Data / Lapor Kendala
                    </span>
                    <span className="text-[11px] text-[#526666]">Bila NIK atau BPJS tidak sesuai</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: KARTU PASIEN QR DIGITAL KOTA SEMARANG */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#E2ECEB] shadow-2xl max-w-md w-full p-6 sm:p-7 space-y-5 relative">
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <span className="text-[11px] font-bold text-[#003B3B] uppercase tracking-wider px-3 py-1 bg-[#EBF5F5] rounded-full inline-block">
                Pemerintah Kota Semarang
              </span>
              <h3 className="font-poppins font-bold text-xl text-[#0D2626]">
                Kartu Berobat Digital WARAS
              </h3>
              <p className="text-xs text-[#526666]">
                Tunjukkan QR Code ini ke petugas loket pendaftaran di 37 Puskesmas Kota Semarang untuk check-in instan.
              </p>
            </div>

            {/* QR Code Container */}
            <div className="p-6 rounded-3xl bg-[#F8FAFA] border-2 border-dashed border-[#003B3B]/20 flex flex-col items-center justify-center space-y-3">
              <div className="w-44 h-44 bg-white p-3 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center relative">
                {/* Simulated QR Code with Lucide SVG */}
                <QrCode className="w-36 h-36 text-[#003B3B]" strokeWidth={1.5} />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-9 h-9 rounded-lg bg-[#003B3B] text-white flex items-center justify-center font-bold text-xs shadow-md">
                    W
                  </div>
                </div>
              </div>

              <div className="text-center space-y-0.5">
                <span className="font-mono text-sm font-bold text-[#0D2626] tracking-wider block">
                  {profileData.nik}
                </span>
                <span className="text-xs text-[#526666] font-medium block">
                  {profileData.name} • {profileData.bloodType}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-teal-50/60 border border-teal-100 text-[11px] text-[#003B3B] flex items-center gap-2">
              <Info className="w-4 h-4 text-[#003B3B] shrink-0" />
              <span>Valid untuk antrean poli rawat jalan seluruh Puskesmas & RSUD Kota Semarang.</span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#E2ECEB] text-xs font-semibold text-[#0D2626] hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Kartu</span>
              </button>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#003B3B] hover:bg-[#002D2D] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <span>Tutup</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: DETAIL RESEP & HASIL PEMERIKSAAN KUNJUNGAN */}
      {selectedVisitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#E2ECEB] shadow-2xl max-w-lg w-full p-6 sm:p-7 space-y-5 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedVisitModal(null)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#003B3B] uppercase tracking-wider px-2.5 py-0.5 bg-[#EBF5F5] rounded-full inline-block">
                {selectedVisitModal.poly} • {selectedVisitModal.type}
              </span>
              <h3 className="font-poppins font-bold text-xl text-[#0D2626]">
                {selectedVisitModal.faskes}
              </h3>
              <p className="text-xs text-[#526666]">
                Tanggal Kunjungan: {selectedVisitModal.date} ({selectedVisitModal.time})
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] space-y-1">
              <span className="text-[11px] font-semibold text-[#526666] block">Dokter Penanggung Jawab:</span>
              <p className="text-sm font-bold text-[#0D2626]">{selectedVisitModal.doctor}</p>
            </div>

            {/* Vitals */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-center">
                <span className="text-[10px] text-gray-500 block">Tensi</span>
                <strong className="text-xs text-[#0D2626] font-bold">{selectedVisitModal.vitals.bp}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-center">
                <span className="text-[10px] text-gray-500 block">Suhu Tubuh</span>
                <strong className="text-xs text-[#0D2626] font-bold">{selectedVisitModal.vitals.temp}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-center">
                <span className="text-[10px] text-gray-500 block">Denyut Nadi</span>
                <strong className="text-xs text-[#0D2626] font-bold">{selectedVisitModal.vitals.pulse}</strong>
              </div>
            </div>

            {/* Diagnosis */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#526666]">Diagnosa Medis:</span>
              <div className="p-3 rounded-xl bg-[#EBF5F5] border border-[#003B3B]/10 text-xs font-bold text-[#003B3B]">
                {selectedVisitModal.diagnosis}
              </div>
            </div>

            {/* Resep Obat */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-[#526666] flex items-center gap-1.5">
                <Pill className="w-3.5 h-3.5 text-[#003B3B]" /> Resep Terapi & Anjuran Obat:
              </span>
              <div className="p-3 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] space-y-2">
                {selectedVisitModal.medications.map((med, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#0D2626]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#003B3B] mt-1.5 shrink-0" />
                    <span>{med}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Catatan Dokter */}
            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-900 space-y-1">
              <strong className="block font-bold">Catatan Edukasi Pasien:</strong>
              <p className="text-[11px] text-amber-800">{selectedVisitModal.notes}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedVisitModal(null)}
                className="px-5 py-2.5 rounded-xl bg-[#003B3B] hover:bg-[#002D2D] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Tutup Ringkasan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
