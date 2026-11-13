import React, { useState } from "react";
import Logo from "../../components/common/Logo";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white text-slate-900 selection:bg-[#022022] selection:text-white">
      {/* ── PANEL KIRI: 50% FULL-HEIGHT BRANDING & EDITORIAL COMPOSITION (Senada Warna Card Dashboard #022022) ── */}
      <aside className="lg:col-span-1 bg-[#022022] text-white relative overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-10 xl:p-12 min-h-[540px] lg:min-h-screen">
        {/* Wave Pattern Overlay from Mask Group.svg at bottom (Persis Card Dashboard) */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden flex items-end justify-center">
          <img
            src="/images/mask-group.svg"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="w-full h-auto object-cover select-none"
          />
        </div>

        {/* TOP: Brand Logo & Title (Diperbesar & Warna Putih Bersih) */}
        <div className="relative z-10">
          <Link
            to="/"
            aria-label="WARAS - Beranda"
            className="inline-flex flex-col items-start gap-2 group w-fit"
          >
            <Logo
              tone="light"
              className="h-10 sm:h-11 lg:h-12 transition-transform duration-200 group-hover:scale-105 origin-left"
            />
            <span className="text-[10px] font-semibold tracking-[0.24em] text-teal-100/90 uppercase font-inter">
              HEALTHCARE PLATFORM
            </span>
          </Link>
        </div>

        {/* MIDDLE SECTION: Editorial Typography & Fluid Composition (Inspirasi Image 4) */}
        <div className="relative z-10 py-4 my-auto max-w-xl space-y-4 sm:space-y-5 animate-auth-float">
          <div className="space-y-2 sm:space-y-2.5">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-teal-100/90 uppercase font-inter block">
              PELAYANAN KESEHATAN PUBLIK KOTA SEMARANG
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-normal leading-[1.1] font-poppins text-white tracking-tight">
              Kesehatan yang
              <br />
              <span className="font-serif italic text-teal-200 font-light">inklusif</span> dan
              <br />
              <span className="font-semibold text-white">terpercaya.</span>
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-teal-100/85 leading-relaxed font-inter font-light max-w-md">
            Platform integrasi satu pintu untuk antrean faskes, rujukan rumah sakit, dan asisten medis cerdas bagi seluruh masyarakat Kota Semarang.
          </p>

          {/* Action pill button with circular companion arrow (mirip tombol Image 4) */}
          <div className="pt-1 flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#022022] hover:bg-teal-50 font-poppins font-semibold text-xs sm:text-sm shadow-md shadow-black/10 transition-all duration-200 active:scale-[0.98] group"
            >
              <span>Jelajahi Portal WARAS</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#022022] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* BOTTOM SECTION: Minimalist Flex Typography Stats with Inter Light & Underline */}
        <div className="relative z-10 pt-4 sm:pt-6 mt-auto animate-auth-float-delayed">
          <div className="flex items-start justify-between gap-4 sm:gap-8">
            <div className="flex-1 pb-2 sm:pb-2.5 border-b border-white/20 group hover:border-teal-200/50 transition-colors">
              <span className="block text-2xl sm:text-3xl lg:text-[34px] font-light font-inter text-white tracking-tight leading-none">
                37+
              </span>
              <span className="block text-[11px] sm:text-xs font-light font-inter text-teal-100/80 leading-tight pt-1.5">
                Puskesmas Siaga
              </span>
            </div>
            <div className="flex-1 pb-2 sm:pb-2.5 border-b border-white/20 group hover:border-teal-200/50 transition-colors">
              <span className="block text-2xl sm:text-3xl lg:text-[34px] font-light font-inter text-white tracking-tight leading-none">
                14
              </span>
              <span className="block text-[11px] sm:text-xs font-light font-inter text-teal-100/80 leading-tight pt-1.5">
                RS Rujukan Utama
              </span>
            </div>
            <div className="flex-1 pb-2 sm:pb-2.5 border-b border-white/20 group hover:border-teal-200/50 transition-colors">
              <span className="block text-2xl sm:text-3xl lg:text-[34px] font-light font-inter text-white tracking-tight leading-none">
                24/7
              </span>
              <span className="block text-[11px] sm:text-xs font-light font-inter text-teal-100/80 leading-tight pt-1.5">
                WARAS AI Tanggap
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── PANEL KANAN: 50% FULL-HEIGHT SPACIOUS & WIDE FORM (Pas di viewport tanpa membuat scroll) ── */}
      <main className="lg:col-span-1 bg-white min-h-screen lg:h-screen lg:overflow-hidden flex flex-col justify-between px-6 sm:px-10 lg:px-12 xl:px-16 py-6 sm:py-7">
        {/* Top Navigation Bar */}
        <div className="w-full max-w-[520px] xl:max-w-[560px] mx-auto flex items-center justify-between pb-2 sm:pb-3 animate-auth-float-soft">
          <Link
            to="/"
            className="text-xs sm:text-sm font-light text-slate-500 hover:text-[#022022] flex items-center gap-1.5 transition-colors font-inter"
          >
            <ArrowLeft className="w-4 h-4 stroke-[1.5]" />
            <span>Kembali ke Beranda</span>
          </Link>

          {/* Text Only - Tanpa card/pill, font-light & font-inter (sesuai instruksi Image 2) */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 font-inter font-light">
            <ShieldCheck className="w-4 h-4 text-slate-400 stroke-[1.5]" />
            <span>Portal Pasien Resmi</span>
          </div>
        </div>

        {/* Centered Spacious Form Container (Proporsional & Pas tanpa scroll) */}
        <div className="w-full max-w-[520px] xl:max-w-[560px] mx-auto my-auto py-2 space-y-4 sm:space-y-5 animate-auth-float">
          {/* Header Form */}
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-inter font-light text-slate-500">
              <UserCheck className="w-4 h-4 text-slate-400 stroke-[1.5]" />
              <span>Portal Masuk Warga</span>
            </div>
            <h1 className="font-inter font-light text-2xl sm:text-[32px] text-slate-900 tracking-tight leading-tight">
              Masuk ke Akun
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-inter font-light leading-relaxed">
              Masukkan data akun warga untuk melanjutkan ke layanan kesehatan terpadu.
            </p>
          </div>

          {/* Notification Alert Box */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-light font-inter flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-3 sm:space-y-3.5">
            {/* Email / NIK */}
            <div className="space-y-1 sm:space-y-1.5">
              <label
                htmlFor="identifier"
                className="block text-xs sm:text-sm font-light text-slate-700 font-inter"
              >
                Email atau NIK Kependudukan
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 absolute left-4 text-slate-400 stroke-[1.5]" />
                <input
                  id="identifier"
                  type="text"
                  autoComplete="username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="cth. nael@semarangkota.go.id"
                  className="w-full pl-11 pr-4 h-11 sm:h-11.5 rounded-2xl bg-slate-50/80 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 placeholder:font-light focus:bg-white focus:outline-none focus:border-[#022022] focus:ring-2 focus:ring-[#022022]/15 transition-all font-inter font-light"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1 sm:space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs sm:text-sm font-light text-slate-700 font-inter"
                >
                  Kata Sandi
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-light text-[#022022] hover:underline font-inter"
                >
                  Lupa kata sandi?
                </Link>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 absolute left-4 text-slate-400 stroke-[1.5]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi akun"
                  className="w-full pl-11 pr-11 h-11 sm:h-11.5 rounded-2xl bg-slate-50/80 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 placeholder:font-light focus:bg-white focus:outline-none focus:border-[#022022] focus:ring-2 focus:ring-[#022022]/15 transition-all font-inter font-light"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 stroke-[1.5]" /> : <Eye className="w-4 h-4 stroke-[1.5]" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 font-inter font-light">Minimal 8 karakter.</p>
            </div>

            {/* Remember me checkbox */}
            <div className="pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#022022] focus:ring-[#022022]/20 border-slate-300 accent-[#022022] cursor-pointer"
                />
                <span className="text-xs text-slate-600 font-inter font-light">
                  Ingat saya di perangkat ini
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 sm:h-11.5 inline-flex items-center justify-center gap-2 px-6 rounded-2xl bg-[#022022] hover:bg-[#033033] border border-[#022022] disabled:opacity-60 text-white text-xs sm:text-sm font-normal tracking-wide shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.99] mt-3 sm:mt-3.5 group font-inter"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span className="font-light">Memproses Masuk...</span>
                </>
              ) : (
                <>
                  <span className="font-light">Masuk ke Akun</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform stroke-[1.5]" />
                </>
              )}
            </button>
          </form>

          {/* Social / Quick Login Divider */}
          <div className="flex items-center gap-3 my-3.5 sm:my-4">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="text-[11px] text-slate-400 font-inter font-light">atau masuk dengan</span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Social Buttons: Google & Akun Demo */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 h-11 sm:h-11.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-light text-slate-700 transition-colors cursor-pointer disabled:opacity-60 shadow-2xs font-inter"
            >
              <GoogleIcon />
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 h-11 sm:h-11.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-light text-slate-700 transition-colors cursor-pointer disabled:opacity-60 shadow-2xs font-inter"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#022022] stroke-[1.5]" />
              <span>Akun Demo</span>
            </button>
          </div>

          {/* Switch to Register */}
          <div className="pt-3.5 sm:pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 font-inter font-light">
              Belum memiliki akun warga?{" "}
              <Link to="/register" className="font-normal text-[#022022] hover:underline underline underline-offset-4 decoration-slate-300 font-inter">
                Daftar akun baru
              </Link>
            </p>
          </div>
        </div>

        {/* Small Bottom Footer */}
        <div className="w-full max-w-[520px] xl:max-w-[560px] mx-auto text-center pt-2 text-[11px] text-slate-400 font-inter font-light">
          &copy; 2026 WARAS &mdash; Dinas Kesehatan Kota Semarang. Hak cipta dilindungi.
        </div>
      </main>
    </div>
  );
}
