import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Bot,
  Clock,
  ArrowLeft,
  CheckCircle2,
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

    // Simulate authentication and redirect
    setTimeout(() => {
      setIsLoading(false);
      navigate("/user/dashboard");
    }, 600);
  };

  const handleDemoLogin = () => {
    setIdentifier("nael@semarangkota.go.id");
    setPassword("password123");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/user/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFA] flex flex-col justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8 selection:bg-[#003B3B] selection:text-white">
      {/* TOP FLOATING HOME SHORTCUT */}
      <div className="max-w-5xl mx-auto w-full mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#526666] hover:text-[#003B3B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EBF5F5] text-[#003B3B]">
          <ShieldCheck className="w-3.5 h-3.5" />
          Sistem Resmi Kota Semarang
        </span>
      </div>

      {/* MAIN CONTAINER: TWO-PANEL SPLIT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-5xl mx-auto w-full rounded-3xl bg-white border border-[#E2ECEB] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
      >
        {/* LEFT BRAND PANEL (DESKTOP) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#003B3B] via-[#004242] to-[#002727] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Light in Background */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-[#DDEEEE]/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-[#DDEEEE]/15 rounded-full blur-2xl pointer-events-none" />

          {/* Top Logo & Title */}
          <div className="space-y-6 relative z-10">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-white text-[#003B3B] flex items-center justify-center font-bold text-lg shadow-sm">
                W
              </div>
              <div className="flex flex-col">
                <span className="font-poppins font-extrabold text-2xl tracking-tight text-white leading-none">
                  waras
                </span>
                <span className="text-[10px] font-semibold tracking-[0.18em] text-[#DDEEEE] uppercase mt-0.5">
                  HEALTHCARE PLATFORM
                </span>
              </div>
            </Link>

            <div className="space-y-2 pt-2">
              <h2 className="font-poppins font-bold text-xl sm:text-2xl text-white leading-snug">
                Satu Akses untuk Seluruh Layanan Kesehatan Warga.
              </h2>
              <p className="text-xs sm:text-sm text-gray-200 font-inter leading-relaxed">
                Kelola antrean faskes, konsultasikan keluhan fisik awal dengan WARAS AI, dan pantau riwayat kesehatan dengan mudah.
              </p>
            </div>

            {/* Benefit Checkpoints */}
            <div className="space-y-3 pt-2 font-inter text-xs text-gray-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#DDEEEE] shrink-0" />
                <span>Terhubung dengan 37 Puskesmas Kota Semarang</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#DDEEEE] shrink-0" />
                <span>Monitoring waktu tunggu antrean poli secara transparan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#DDEEEE] shrink-0" />
                <span>Bantuan konsultasi medis AI siap siaga 24/7</span>
              </div>
            </div>
          </div>

          {/* Bottom Citizen Quote Card */}
          <div className="mt-8 pt-6 border-t border-white/15 relative z-10 space-y-2">
            <p className="text-xs text-gray-300 italic font-inter">
              "Tidak perlu lagi berangkat subuh untuk sekadar mengantre di puskesmas. Semuanya terpantau jelas di WARAS."
            </p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px] font-bold">
                W
              </div>
              <span className="text-[11px] font-semibold text-white">Warga Semarang Selatan</span>
            </div>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EBF5F5] text-[#003B3B]">
              <UserCheck className="w-3.5 h-3.5" /> Portal Warga Semarang
            </div>
            <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-[#0D2626]">
              Selamat Datang Kembali
            </h1>
            <p className="text-xs sm:text-sm text-[#526666] font-inter">
              Masukkan email atau NIK yang terdaftar untuk mengakses dashboard kesehatan Anda.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email or NIK input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#0D2626]">
                Email atau NIK Kependudukan
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Contoh: nael@semarangkota.go.id atau 3374..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs sm:text-sm text-[#0D2626] placeholder-[#809494] focus:outline-none focus:ring-2 focus:ring-[#003B3B]/10 focus:border-[#003B3B]/40 transition-all font-inter"
                />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-[#0D2626]">
                  Kata Sandi
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-[#003B3B] hover:underline"
                >
                  Lupa kata sandi?
                </Link>
              </div>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi akun..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs sm:text-sm text-[#0D2626] placeholder-[#809494] focus:outline-none focus:ring-2 focus:ring-[#003B3B]/10 focus:border-[#003B3B]/40 transition-all font-inter"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-400 hover:text-[#0D2626] cursor-pointer"
                  aria-label="Lihat kata sandi"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#003B3B] focus:ring-[#003B3B]/20 cursor-pointer accent-[#003B3B]"
                />
                <span className="text-xs text-[#526666]">Ingat saya di peramban ini</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#003B3B] hover:bg-[#002D2D] disabled:opacity-60 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all duration-200 cursor-pointer active:scale-98"
            >
              {isLoading ? (
                <span>Memproses Masuk...</span>
              ) : (
                <>
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* QUICK DEMO LOGIN BUTTON */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#EBF5F5] hover:bg-[#DDEEEE] text-[#003B3B] border border-[#003B3B]/15 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0B6B6B]" />
              <span>Masuk Cepat sebagai Pengguna Demo (Nael)</span>
            </button>

            <div className="text-center text-xs text-[#526666] pt-1 font-inter">
              Belum memiliki akun warga?{" "}
              <Link to="/register" className="font-semibold text-[#003B3B] hover:underline">
                Daftar akun baru
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

