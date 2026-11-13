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
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white text-slate-900 selection:bg-[#022022] selection:text-[#37F4B4]">
      {/* ── PANEL KIRI: 50% FULL-HEIGHT BRANDING & STEP CARDS ── */}
      <aside className="lg:col-span-1 bg-[#022022] text-white relative overflow-hidden flex flex-col justify-between p-8 sm:p-10 lg:p-12 xl:p-14 min-h-[560px] lg:min-h-screen">
        {/* Layered rich teal gradient background kombinasi #022022 dan aksen glow #37F4B4 */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_35%,rgba(55,244,180,0.18)_0%,#053638_40%,#022022_85%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_15%_100%,rgba(55,244,180,0.12)_0%,transparent_70%)]" />

        {/* Wave Pattern Overlay from Mask Group.svg at bottom */}
        <img
          src="/images/mask-group.svg"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute bottom-0 inset-x-0 w-full h-auto select-none z-[1]"
        />

        {/* TOP: Brand Logo & Title */}
        <div className="relative z-10">
          <Link to="/" aria-label="WARAS - Beranda" className="inline-flex flex-col items-start gap-1.5 group w-fit">
            <Logo tone="dark" className="h-9 transition-transform duration-200 group-hover:scale-105 origin-left" />
            <span className="text-[10px] font-semibold tracking-[0.2em] text-[#37F4B4] uppercase">
              HEALTHCARE PLATFORM
            </span>
          </Link>
        </div>

        {/* MIDDLE SECTION: Mengisi area tengah dengan Widget Jaringan Layanan Kesehatan Semarang */}
        <div className="relative z-10 py-6 my-auto max-w-lg">
          <div className="rounded-2xl bg-white/[0.06] backdrop-blur-md border border-[#37F4B4]/20 p-5 sm:p-6 space-y-4 shadow-xl shadow-black/15">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#37F4B4] animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#37F4B4]">
                  Layanan Terpadu Warga Semarang
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#37F4B4]/15 text-[#37F4B4] border border-[#37F4B4]/30">
                Resmi Dinkes
              </span>
            </div>

            <p className="text-xs sm:text-sm text-teal-50/90 leading-relaxed font-inter">
              "Pendaftaran akun pasien terintegrasi langsung dengan database faskes Kota Semarang untuk kenyamanan antrean dan rekam medis."
            </p>

            <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-white/10 text-center">
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-[#37F4B4]/15">
                <span className="block text-base sm:text-lg font-bold font-poppins text-white">37</span>
                <span className="text-[10px] text-teal-200/80 font-medium">Puskesmas</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-[#37F4B4]/15">
                <span className="block text-base sm:text-lg font-bold font-poppins text-white">14</span>
                <span className="text-[10px] text-teal-200/80 font-medium">RS Rujukan</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-[#37F4B4]/15">
                <span className="block text-base sm:text-lg font-bold font-poppins text-white">24/7</span>
                <span className="text-[10px] text-teal-200/80 font-medium">WARAS AI</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Aligned Headline & 3 Step Bento Cards */}
        <div className="relative z-10 pt-4 mt-auto space-y-5 sm:space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold leading-[1.12] font-poppins text-white tracking-tight">
              Mulai Peduli
              <br />
              Kesehatanmu
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/80 leading-relaxed font-inter max-w-md">
              Satu akun untuk mengakses 37 Puskesmas dan 14 rumah sakit rujukan di Kota Semarang.
            </p>
          </div>

          {/* 3 Step Bento Cards Row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {/* Step 1: Active White Card with #37F4B4 accent */}
            <div className="bg-white text-slate-900 rounded-2xl sm:rounded-[22px] p-4 sm:p-5 shadow-xl shadow-black/20 flex flex-col justify-between min-h-[125px] sm:min-h-[135px] transition-transform duration-200 hover:-translate-y-0.5 border-2 border-[#37F4B4]/60">
              <div className="w-7 h-7 rounded-full bg-[#022022] text-[#37F4B4] flex items-center justify-center text-xs font-bold shadow-2xs">
                1
              </div>
              <div className="pt-3">
                <p className="text-xs sm:text-sm font-semibold text-[#022022] leading-snug font-poppins">
                  Daftar akun
                  <br />
                  warga baru
                </p>
              </div>
            </div>

            {/* Step 2: Glassmorphism Inactive Card */}
            <div className="bg-white/[0.07] backdrop-blur-md border border-[#37F4B4]/15 text-white rounded-2xl sm:rounded-[22px] p-4 sm:p-5 flex flex-col justify-between min-h-[125px] sm:min-h-[135px] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/[0.12] hover:border-[#37F4B4]/30">
              <div className="w-7 h-7 rounded-full bg-white/15 text-[#37F4B4] flex items-center justify-center text-xs font-semibold">
                2
              </div>
              <div className="pt-3">
                <p className="text-xs sm:text-sm font-medium text-white/95 leading-snug font-poppins">
                  Pantau antrean
                  <br />
                  faskes terdekat
                </p>
              </div>
            </div>

            {/* Step 3: Glassmorphism Inactive Card */}
            <div className="bg-white/[0.07] backdrop-blur-md border border-[#37F4B4]/15 text-white rounded-2xl sm:rounded-[22px] p-4 sm:p-5 flex flex-col justify-between min-h-[125px] sm:min-h-[135px] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/[0.12] hover:border-[#37F4B4]/30">
              <div className="w-7 h-7 rounded-full bg-white/15 text-[#37F4B4] flex items-center justify-center text-xs font-semibold">
                3
              </div>
              <div className="pt-3">
                <p className="text-xs sm:text-sm font-medium text-white/95 leading-snug font-poppins">
                  Konsultasi awal
                  <br />
                  dengan WARAS AI
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── PANEL KANAN: 50% FULL-HEIGHT CLEAN FORM ── */}
      <main className="lg:col-span-1 bg-white min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-14">
        {/* Top Navigation Bar */}
        <div className="w-full flex items-center justify-between pb-6">
          <Link
            to="/login"
            className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-[#022022] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Halaman Masuk</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#022022]/5 border border-[#37F4B4]/40 text-[#022022] text-xs font-semibold shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#022022]" />
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#022022]/5 text-[#022022] border border-[#37F4B4]/30 shadow-2xs">
              <UserPlus className="w-3.5 h-3.5 text-[#022022]" />
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
                    className="w-full pl-10 pr-3.5 h-11 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#022022] focus:ring-4 focus:ring-[#37F4B4]/25 transition-all font-inter"
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
                    className="w-full pl-10 pr-3.5 h-11 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#022022] focus:ring-4 focus:ring-[#37F4B4]/25 transition-all font-inter"
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
                    className="w-full pl-10 pr-3.5 h-11 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#022022] focus:ring-4 focus:ring-[#37F4B4]/25 transition-all font-inter"
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
                    className="w-full pl-10 pr-3.5 h-11 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#022022] focus:ring-4 focus:ring-[#37F4B4]/25 transition-all font-inter"
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
                    className="w-full pl-10 pr-9 h-11 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#022022] focus:ring-4 focus:ring-[#37F4B4]/25 transition-all font-inter"
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
                    className="w-full pl-10 pr-9 h-11 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#022022] focus:ring-4 focus:ring-[#37F4B4]/25 transition-all font-inter"
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
                  className="mt-0.5 w-4 h-4 rounded text-[#022022] focus:ring-[#37F4B4] accent-[#022022] border-slate-300"
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
              className="w-full h-11 inline-flex items-center justify-center gap-2 px-5 rounded-xl bg-[#022022] hover:bg-[#033033] hover:border-[#37F4B4]/40 border border-transparent disabled:opacity-60 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all duration-200 cursor-pointer active:scale-[0.99] mt-2 group"
            >
              {isLoading ? (
                <span>Memproses Pendaftaran...</span>
              ) : (
                <>
                  <span>Daftar Akun WARAS</span>
                  <ArrowRight className="w-4 h-4 text-[#37F4B4] group-hover:translate-x-0.5 transition-transform" />
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
                className="font-semibold text-[#022022] hover:text-[#033033] hover:underline"
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
