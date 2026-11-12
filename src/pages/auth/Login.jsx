import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  Lock,
  Mail,
  UserCheck
} from "lucide-react";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setErrorMessage("Silakan masukkan email/NIK dan kata sandi.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    // Simulasi autentikasi dan redirect ke dashboard
    setTimeout(() => {
      setIsLoading(false);
      navigate("/user/dashboard");
    }, 600);
  };

  const handleDemoLogin = () => {
    setIdentifier("nael@semarangkota.go.id");
    setPassword("password123");
    setErrorMessage("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/user/dashboard");
    }, 400);
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white text-slate-900 selection:bg-[#003B3B] selection:text-white">
      {/* ── PANEL KIRI: FULL-HEIGHT BRANDING & STEP CARDS (lg:col-span-5) ── */}
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

        {/* Subtle Background Geometric Texture */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "36px 36px"
          }}
        />

        {/* TOP: Brand Logo & Title */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group w-fit">
            <div className="w-10 h-10 rounded-xl bg-white text-[#003B3B] font-black flex items-center justify-center text-lg shadow-sm transition-transform duration-200 group-hover:scale-105">
              W
            </div>
            <div className="flex flex-col">
              <span className="font-poppins font-extrabold text-2xl tracking-tight text-white leading-none">
                waras
              </span>
              <span className="text-[10px] font-semibold tracking-[0.2em] text-teal-200/90 uppercase mt-0.5">
                HEALTHCARE PLATFORM
              </span>
            </div>
          </Link>
        </div>

        {/* BOTTOM SECTION: Aligned Headline & 3 Step Bento Cards */}
        <div className="relative z-10 pt-12 mt-auto">
          {/* Header & Subtitle placed side-by-side or stacked cleanly */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold leading-tight font-poppins text-white tracking-tight">
              Satu Akses<br />untuk Warga
            </h1>
            <p className="text-xs sm:text-sm text-teal-100/75 max-w-[210px] leading-relaxed font-inter">
              Kelola antrean 37 Puskesmas dan konsultasi medis terpadu.
            </p>
          </div>

          {/* 3 Step Bento Cards Row */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
            {/* Card 1: Highlighted Active White Card */}
            <div className="bg-white text-slate-900 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 shadow-xl shadow-black/20 flex flex-col justify-between min-h-[118px] transition-transform duration-200 hover:-translate-y-0.5">
              <div className="w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center text-[11px] font-bold shadow-2xs">
                1
              </div>
              <div className="pt-3">
                <p className="text-xs sm:text-[13px] font-bold text-slate-950 leading-snug font-poppins">
                  37 Faskes<br />Terintegrasi
                </p>
              </div>
            </div>

            {/* Card 2: Glassmorphism Inactive Card */}
            <div className="bg-white/[0.08] backdrop-blur-md border border-white/12 text-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 flex flex-col justify-between min-h-[118px] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/[0.12]">
              <div className="w-6 h-6 rounded-full bg-white/15 text-white/80 flex items-center justify-center text-[11px] font-semibold">
                2
              </div>
              <div className="pt-3">
                <p className="text-xs sm:text-[13px] font-semibold text-white/95 leading-snug font-poppins">
                  Pantau Antrean<br />Real-time
                </p>
              </div>
            </div>

            {/* Card 3: Glassmorphism Inactive Card */}
            <div className="bg-white/[0.08] backdrop-blur-md border border-white/12 text-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 flex flex-col justify-between min-h-[118px] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/[0.12]">
              <div className="w-6 h-6 rounded-full bg-white/15 text-white/80 flex items-center justify-center text-[11px] font-semibold">
                3
              </div>
              <div className="pt-3">
                <p className="text-xs sm:text-[13px] font-semibold text-white/95 leading-snug font-poppins">
                  Asisten Medis<br />Siaga 24 Jam
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── PANEL KANAN: FULL-HEIGHT CLEAN FORM (lg:col-span-7) ── */}
      <main className="lg:col-span-7 bg-white min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-14">
        {/* Top Navigation Bar */}
        <div className="w-full flex items-center justify-between pb-6">
          <Link
            to="/"
            className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-[#003B3B] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/70 text-[#003B3B] text-xs font-semibold shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#003B3B]" />
            <span>Sistem Resmi Kota Semarang</span>
          </span>
        </div>

        {/* Centered Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-md mx-auto my-auto py-4 space-y-6"
        >
          {/* Header Form */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-[#003B3B] border border-teal-200/60 shadow-2xs">
              <UserCheck className="w-3.5 h-3.5 text-[#003B3B]" />
              <span>Portal Warga Semarang</span>
            </div>
            <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Selamat Datang Kembali
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-inter">
              Masukkan email atau NIK yang terdaftar untuk mengakses dashboard kesehatan Anda.
            </p>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Input Identifier */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-800 font-inter">
                Email atau NIK Kependudukan
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 absolute left-3.5 text-slate-400" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  placeholder="nama@email.com atau NIK 16 digit"
                  className="w-full pl-10 pr-4 h-11 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#003B3B] focus:ring-4 focus:ring-[#003B3B]/10 transition-all font-inter"
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-800 font-inter">
                  Kata Sandi
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-[#003B3B] hover:underline"
                >
                  Lupa kata sandi?
                </Link>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 absolute left-3.5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  placeholder="Masukkan kata sandi akun"
                  className="w-full pl-10 pr-10 h-11 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#003B3B] focus:ring-4 focus:ring-[#003B3B]/10 transition-all font-inter"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
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

            {/* Remember Me */}
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#003B3B] focus:ring-[#003B3B] border-slate-300"
                />
                <span className="text-xs text-slate-600 font-inter">
                  Ingat perangkat ini selama 30 hari
                </span>
              </label>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 inline-flex items-center justify-center gap-2 px-5 rounded-xl bg-[#003B3B] hover:bg-[#002A2A] disabled:opacity-60 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all duration-200 cursor-pointer active:scale-[0.99]"
            >
              {isLoading ? (
                <span>Memverifikasi Masuk...</span>
              ) : (
                <>
                  <span>Masuk ke Akun WARAS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full py-2.5 px-3.5 rounded-xl border border-teal-200 bg-teal-50/50 hover:bg-teal-50 text-[#003B3B] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#003B3B]" />
              <span>Gunakan Akun Demo Pengujian (1-Klik)</span>
            </button>
          </div>

          {/* Switch to Register */}
          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 font-inter">
              Belum memiliki akun WARAS?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#003B3B] hover:underline"
              >
                Daftar sekarang
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
