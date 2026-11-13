import React, { useState } from "react";
import Logo from "../../components/common/Logo";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { authService } from "../../services/authService";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Lock,
  Mail,
  User,
  Phone,
  FileText,
  UserPlus
} from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    nik: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (errorMessage) setErrorMessage("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !formData.fullName.trim() ||
      !formData.nik.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      setErrorMessage("Silakan lengkapi seluruh formulir pendaftaran.");
      return;
    }

    if (formData.nik.length < 16) {
      setErrorMessage("NIK kependudukan harus terdiri dari 16 digit angka.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage("Kata sandi minimal harus 8 karakter.");
      return;
    }

    if (!formData.termsAccepted) {
      setErrorMessage("Anda harus menyetujui ketentuan privasi data kesehatan.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      await authService.register(formData);
      setSuccessMessage("Pendaftaran akun berhasil! Mengalihkan ke dashboard warga...");
      setTimeout(() => {
        navigate("/user/dashboard");
      }, 700);
    } catch (err) {
      setErrorMessage(err.message || "Gagal melakukan pendaftaran. Silakan periksa kembali data Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white text-slate-900 selection:bg-[#003B3B] selection:text-white">
      {/* â”€â”€ PANEL KIRI: FULL-HEIGHT BRANDING & STEP CARDS (lg:col-span-5) â”€â”€ */}
      <aside className="lg:col-span-5 bg-[#031b17] text-white relative overflow-hidden flex flex-col justify-between p-8 sm:p-12 lg:p-14 min-h-[540px] lg:min-h-screen">
        {/* Ambient Organic Glow Layers - Exact Match to Reference */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 75% 45%, rgba(13, 148, 136, 0.32) 0%, rgba(5, 150, 105, 0.16) 35%, rgba(3, 27, 23, 0.95) 75%)"
          }}
        />
        <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-teal-500/15 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full bg-emerald-500/20 blur-[120px]" />

        {/* Wave Pattern Overlay from Mask Group.svg */}
        <img
          src="/images/mask-group.svg"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute inset-0 w-full h-full object-cover select-none"
        />

        {/* TOP: Brand Logo & Title */}
        <div className="relative z-10">
          <Link to="/" aria-label="WARAS - Beranda" className="inline-flex flex-col items-start gap-1.5 group w-fit">
            <Logo tone="dark" className="h-9 transition-transform duration-200 group-hover:scale-105 origin-left" />
            <span className="text-[10px] font-semibold tracking-[0.2em] text-teal-200/90 uppercase">
              HEALTHCARE PLATFORM
            </span>
          </Link>
        </div>

        {/* BOTTOM SECTION: Aligned Headline & 3 Step Bento Cards */}
        <div className="relative z-10 pt-12 mt-auto">
          {/* Header & Subtitle placed side-by-side or stacked cleanly */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold leading-tight font-poppins text-white tracking-tight">
              Mulai Layanan<br />Kesehatan
            </h1>
            <p className="text-xs sm:text-sm text-teal-100/75 max-w-[210px] leading-relaxed font-inter">
              Lengkapi 3 langkah mudah untuk registrasi akun pasien warga.
            </p>
          </div>

          {/* 3 Step Bento Cards Row */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
            {/* Step 1: Active White Card */}
            <div className="bg-white text-slate-900 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 shadow-xl shadow-black/20 flex flex-col justify-between min-h-[118px] transition-transform duration-200 hover:-translate-y-0.5">
              <div className="w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center text-[11px] font-bold shadow-2xs">
                1
              </div>
              <div className="pt-3">
                <p className="text-xs sm:text-[13px] font-bold text-slate-950 leading-snug font-poppins">
                  Isi Identitas<br />KTP & NIK
                </p>
              </div>
            </div>

            {/* Step 2: Glassmorphism Inactive Card */}
            <div className="bg-white/[0.08] backdrop-blur-md border border-white/12 text-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 flex flex-col justify-between min-h-[118px] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/[0.12]">
              <div className="w-6 h-6 rounded-full bg-white/15 text-white/80 flex items-center justify-center text-[11px] font-semibold">
                2
              </div>
              <div className="pt-3">
                <p className="text-xs sm:text-[13px] font-semibold text-white/95 leading-snug font-poppins">
                  Verifikasi<br />Faskes Semarang
                </p>
              </div>
            </div>

            {/* Step 3: Glassmorphism Inactive Card */}
            <div className="bg-white/[0.08] backdrop-blur-md border border-white/12 text-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 flex flex-col justify-between min-h-[118px] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/[0.12]">
              <div className="w-6 h-6 rounded-full bg-white/15 text-white/80 flex items-center justify-center text-[11px] font-semibold">
                3
              </div>
              <div className="pt-3">
                <p className="text-xs sm:text-[13px] font-semibold text-white/95 leading-snug font-poppins">
                  Akses Antrean<br />& Rekam Medis
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* â”€â”€ PANEL KANAN: FULL-HEIGHT CLEAN FORM (lg:col-span-7) â”€â”€ */}
      <main className="lg:col-span-7 bg-white min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-14">
        {/* Top Navigation Bar */}
        <div className="w-full flex items-center justify-between pb-6">
          <Link
            to="/login"
            className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-[#003B3B] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Halaman Masuk</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/70 text-[#003B3B] text-xs font-semibold shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#003B3B]" />
            <span>Registrasi Pasien Resmi</span>
          </span>
        </div>

        {/* Centered Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-lg mx-auto my-auto py-4 space-y-5"
        >
          {/* Header Form */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-[#003B3B] border border-teal-200/60 shadow-2xs">
              <UserPlus className="w-3.5 h-3.5 text-[#003B3B]" />
              <span>Pendaftaran Warga Baru</span>
            </div>
            <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Buat Akun Baru
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-inter">
              Isi data diri Anda sesuai identitas KTP yang berlaku di wilayah Kota Semarang.
            </p>
          </div>

          {/* Notification Alert Box */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-3.5">
            {/* Row 1: Nama Lengkap & NIK */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-800 font-inter">
                  Nama Lengkap
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 absolute left-3.5 text-slate-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Sesuai KTP"
                    className="w-full pl-10 pr-3.5 h-11 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#003B3B] focus:ring-4 focus:ring-[#003B3B]/10 transition-all font-inter"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-800 font-inter">
                  NIK Kependudukan (16 Digit)
                </label>
                <div className="relative flex items-center">
                  <FileText className="w-4 h-4 absolute left-3.5 text-slate-400" />
                  <input
                    type="text"
                    name="nik"
                    maxLength={16}
                    value={formData.nik}
                    onChange={handleChange}
                    placeholder="3374xxxxxxxxxxxx"
                    className="w-full pl-10 pr-3.5 h-11 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#003B3B] focus:ring-4 focus:ring-[#003B3B]/10 transition-all font-inter"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Email & Nomor HP */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-800 font-inter">
                  Alamat Email Aktif
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 absolute left-3.5 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                    className="w-full pl-10 pr-3.5 h-11 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#003B3B] focus:ring-4 focus:ring-[#003B3B]/10 transition-all font-inter"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-800 font-inter">
                  Nomor WhatsApp / HP
                </label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 absolute left-3.5 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0812xxxxxxxx"
                    className="w-full pl-10 pr-3.5 h-11 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#003B3B] focus:ring-4 focus:ring-[#003B3B]/10 transition-all font-inter"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Kata Sandi & Konfirmasi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-800 font-inter">
                  Kata Sandi Baru
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 absolute left-3.5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min. 8 karakter"
                    className="w-full pl-10 pr-9 h-11 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#003B3B] focus:ring-4 focus:ring-[#003B3B]/10 transition-all font-inter"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-800 font-inter">
                  Konfirmasi Sandi
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 absolute left-3.5 text-slate-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Ulangi kata sandi"
                    className="w-full pl-10 pr-9 h-11 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#003B3B] focus:ring-4 focus:ring-[#003B3B]/10 transition-all font-inter"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms and conditions checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 rounded text-[#003B3B] focus:ring-[#003B3B] border-slate-300"
                />
                <span className="text-xs text-slate-600 leading-relaxed font-inter">
                  Saya menyatakan data di atas adalah benar sesuai KTP resmi dan menyetujui ketentuan integrasi data rekam medis terpadu Kota Semarang.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 inline-flex items-center justify-center gap-2 px-5 rounded-xl bg-[#003B3B] hover:bg-[#002A2A] disabled:opacity-60 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all duration-200 cursor-pointer active:scale-[0.99] mt-2"
            >
              {isLoading ? (
                <span>Memproses Pendaftaran...</span>
              ) : (
                <>
                  <span>Daftar Akun WARAS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 font-inter">
              Sudah memiliki akun terdaftar?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#003B3B] hover:underline"
              >
                Masuk ke akun
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Small Bottom Footer */}
        <div className="w-full text-center pt-6 text-[11px] text-slate-400 font-inter">
          &copy; 2026 WARAS &mdash; Dinas Kesehatan Kota Semarang. Hak cipta dilindungi.
        </div>
      </main>
    </div>
  );
}
