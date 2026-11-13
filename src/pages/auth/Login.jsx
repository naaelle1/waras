import React, { useState } from "react";
import Logo from "../../components/common/Logo";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
  Lock,
  Mail,
  UserCheck,
  Sparkles,
  Loader2
} from "lucide-react";
import { authService } from "../../services/authService";

const STEPS = [
  {
    num: 1,
    title: (
      <>
        Masuk ke Akun
        <br />
        Warga Anda
      </>
    )
  },
  {
    num: 2,
    title: (
      <>
        Pantau Antrean
        <br />
        Faskes Terdekat
      </>
    )
  },
  {
    num: 3,
    title: (
      <>
        Konsultasi Awal
        <br />
        dengan WARAS AI
      </>
    )
  }
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.94l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }
        };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setErrorMessage("Silakan masukkan email/NIK dan kata sandi.");
      return;
    }
    setErrorMessage("");
    setIsLoading(true);

    try {
      await authService.login(identifier.trim(), password);
      navigate("/user/dashboard");
    } catch (err) {
      setErrorMessage(err.message || "Email/NIK atau kata sandi tidak sesuai.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    const demoId = "nael@semarangkota.go.id";
    const demoPw = "password123";
    setIdentifier(demoId);
    setPassword(demoPw);
    setErrorMessage("");
    setIsLoading(true);

    try {
      await authService.login(demoId, demoPw);
      navigate("/user/dashboard");
    } catch (err) {
      setErrorMessage(err.message || "Gagal masuk menggunakan akun demo.");
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
          <Link
            to="/"
            aria-label="WARAS - Beranda"
            className="inline-flex flex-col items-start gap-1.5 group w-fit"
          >
            <Logo
              tone="dark"
              className="h-9 transition-transform duration-200 group-hover:scale-105 origin-left"
            />
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
              "Satu akses terintegrasi untuk memantau antrean faskes secara langsung, verifikasi rujukan BPJS, serta konsultasi awal kesehatan 24 jam bebas biaya."
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

        {/* BOTTOM SECTION: Aligned Headline & 3 Step Bento Cards (Lega & Proporsional di Split 50:50) */}
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
                  Masuk ke akun
                  <br />
                  warga Anda
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
            to="/"
            className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-[#022022] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#022022]/5 border border-[#37F4B4]/40 text-[#022022] text-xs font-semibold shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#022022]" />
            <span>Portal Pasien Resmi</span>
          </span>
        </div>

        {/* Centered Form Container (Matching Register Structure) */}
        <motion.div
          {...fadeUp(0)}
          className="w-full max-w-md mx-auto my-auto py-4 space-y-6"
        >
          {/* Header Form */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#022022]/5 text-[#022022] border border-[#37F4B4]/30 shadow-2xs">
              <UserCheck className="w-3.5 h-3.5 text-[#022022]" />
              <span>Portal Masuk Warga</span>
            </div>
            <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Masuk ke Akun
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-inter">
              Masukkan data akun warga untuk melanjutkan ke layanan kesehatan.
            </p>
          </div>

          {/* Notification Alert Box */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email / NIK */}
            <div className="space-y-1.5">
              <label
                htmlFor="identifier"
                className="block text-xs font-semibold text-slate-800 font-inter"
              >
                Email atau NIK Kependudukan
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 absolute left-3.5 text-slate-400" />
                <input
                  id="identifier"
                  type="text"
                  autoComplete="username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="cth. nael@semarangkota.go.id"
                  className="w-full pl-10 pr-3.5 h-11 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#022022] focus:ring-4 focus:ring-[#37F4B4]/25 transition-all font-inter"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-slate-800 font-inter"
                >
                  Kata Sandi
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-[#022022] hover:underline"
                >
                  Lupa kata sandi?
                </Link>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 absolute left-3.5 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi akun"
                  className="w-full pl-10 pr-11 h-11 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#022022] focus:ring-4 focus:ring-[#37F4B4]/25 transition-all font-inter"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-400">Minimal 8 karakter.</p>
            </div>

            {/* Remember me checkbox */}
            <div className="pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#022022] focus:ring-[#37F4B4] border-slate-300 accent-[#022022] cursor-pointer"
                />
                <span className="text-xs text-slate-600 font-inter">
                  Ingat saya di perangkat ini
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 inline-flex items-center justify-center gap-2 px-5 rounded-xl bg-[#022022] hover:bg-[#033033] hover:border-[#37F4B4]/40 border border-transparent disabled:opacity-60 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.99] mt-2 group"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#37F4B4]" />
                  <span>Memproses Masuk...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Akun</span>
                  <ArrowRight className="w-4 h-4 text-[#37F4B4] group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Social / Quick Login Divider */}
          <div className="flex items-center gap-3 my-4">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">atau masuk dengan</span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Social Buttons: Google & Akun Demo */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => goToDashboard(500)}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-medium text-slate-800 transition-colors cursor-pointer disabled:opacity-60 shadow-2xs"
            >
              <GoogleIcon />
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-medium text-slate-800 transition-colors cursor-pointer disabled:opacity-60 shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-[#022022]" />
              <span>Akun Demo</span>
            </button>
          </div>

          {/* Switch to Register */}
          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 font-inter">
              Belum memiliki akun warga?{" "}
              <Link to="/register" className="font-semibold text-[#022022] hover:underline">
                Daftar akun baru
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
