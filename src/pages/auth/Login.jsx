import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Eye, EyeOff, ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import Logo from "../../components/common/Logo";

const STEPS = [
  { num: 1, title: "Masuk ke akun warga Anda" },
  { num: 2, title: "Pantau antrean faskes terdekat" },
  { num: 3, title: "Konsultasi awal dengan WARAS AI" },
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.94l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
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
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
        };

  const goToDashboard = (delay) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/user/dashboard");
    }, delay);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setErrorMessage("Silakan masukkan email/NIK dan kata sandi.");
      return;
    }
    setErrorMessage("");
    goToDashboard(600);
  };

  const handleDemoLogin = () => {
    setIdentifier("nael@semarangkota.go.id");
    setPassword("password123");
    setErrorMessage("");
    goToDashboard(400);
  };

  const inputClass =
    "w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-sm text-[#0D2626] placeholder-[#9AACAC] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#003B3B]/10 focus:border-[#003B3B]/40 transition-all";

  return (
    <div className="min-h-screen w-full bg-white lg:grid lg:grid-cols-2 lg:p-4 selection:bg-[#003B3B] selection:text-white">
      {/* ================= LEFT: BRAND PANEL (DESKTOP) ================= */}
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden rounded-3xl p-10 xl:p-12 text-white bg-[#002424]">
        {/* Layered gradient background (no images, stays on-brand) */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_35%,#0B6B6B_0%,#004242_38%,#002424_75%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_15%_100%,rgba(221,238,238,0.14)_0%,transparent_70%)]" />
        {/* Wave Pattern Overlay from Mask Group.svg */}
        <img
          src="/images/mask-group.svg"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute inset-0 w-full h-full object-cover select-none"
        />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/" aria-label="WARAS - Beranda">
            <Logo tone="dark" className="h-9" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Beranda
          </Link>
        </div>

        {/* Bottom content */}
        <div className="relative z-10 space-y-8">
          <motion.div
            {...fadeUp(0.1)}
            className="flex flex-col 2xl:flex-row 2xl:items-end gap-4 2xl:gap-10"
          >
            <h2 className="font-poppins font-semibold text-4xl xl:text-[44px] leading-[1.1] tracking-tight shrink-0">
              Mulai Peduli
              <br />
              Kesehatanmu
            </h2>
            <p className="text-sm text-[#CFE3E3] leading-relaxed max-w-sm 2xl:pb-1.5">
              Satu akun untuk mengakses 37 Puskesmas dan 14 rumah sakit rujukan di Kota Semarang.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-3">
            {STEPS.map((step, i) => {
              const active = i === 0;
              return (
                <motion.div
                  key={step.num}
                  {...fadeUp(0.2 + i * 0.08)}
                  className={`rounded-2xl p-4 xl:p-5 min-h-[128px] flex flex-col justify-between transition-colors ${
                    active
                      ? "bg-white text-[#0D2626]"
                      : "bg-white/[0.08] border border-white/10 text-white/80 backdrop-blur-sm"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      active ? "bg-[#003B3B] text-white" : "bg-white/15 text-white"
                    }`}
                  >
                    {step.num}
                  </span>
                  <span className="text-[13px] font-medium leading-snug">{step.title}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </aside>

      {/* ================= RIGHT: FORM ================= */}
      <main className="min-h-screen lg:min-h-0 flex flex-col">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-5 pt-5">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#526666] hover:text-[#003B3B]"
          >
            <ArrowLeft className="w-4 h-4" />
            Beranda
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-5 sm:px-8 py-10">
          <div className="w-full max-w-[400px]">
            {/* Logo + heading */}
            <motion.div {...fadeUp(0)} className="text-center mb-7">
              <Logo className="h-10 mx-auto mb-5" />
              <h1 className="font-poppins font-semibold text-2xl text-[#0D2626] tracking-tight">
                Masuk ke Akun
              </h1>
              <p className="text-sm text-[#526666] mt-1.5">
                Masukkan data akun warga untuk melanjutkan.
              </p>
            </motion.div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <motion.form {...fadeUp(0.05)} onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="identifier" className="block text-xs font-semibold text-[#0D2626]">
                  Email atau NIK
                </label>
                <input
                  id="identifier"
                  type="text"
                  autoComplete="username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="cth. nael@semarangkota.go.id"
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-xs font-semibold text-[#0D2626]">
                    Kata Sandi
                  </label>
                  <Link to="/forgot-password" className="text-xs font-medium text-[#003B3B] hover:underline">
                    Lupa kata sandi?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi"
                    className={`${inputClass} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg text-[#809494] hover:text-[#0D2626] cursor-pointer"
                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-[#809494]">Minimal 8 karakter.</p>
              </div>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#003B3B] cursor-pointer"
                />
                <span className="text-xs text-[#526666]">Ingat saya di perangkat ini</span>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-[#003B3B] hover:bg-[#002D2D] disabled:opacity-70 text-white text-sm font-semibold transition-colors cursor-pointer active:scale-[0.99]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Masuk"
                )}
              </button>
            </motion.form>

            <div className="flex items-center gap-3 my-6">
              <span className="h-px flex-1 bg-[#E2ECEB]" />
              <span className="text-xs text-[#809494]">atau masuk dengan</span>
              <span className="h-px flex-1 bg-[#E2ECEB]" />
            </div>

            {/* Social / quick */}
            <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => goToDashboard(500)}
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 h-11 rounded-xl border border-[#E2ECEB] bg-white hover:bg-[#F8FAFA] text-sm font-medium text-[#0D2626] transition-colors cursor-pointer disabled:opacity-60"
              >
                <GoogleIcon />
                Google
              </button>
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 h-11 rounded-xl border border-[#E2ECEB] bg-white hover:bg-[#F8FAFA] text-sm font-medium text-[#0D2626] transition-colors cursor-pointer disabled:opacity-60"
              >
                <Sparkles className="w-4 h-4 text-[#0B6B6B]" />
                Akun Demo
              </button>
            </motion.div>

            <p className="text-center text-xs text-[#526666] mt-6">
              Belum punya akun?{" "}
              <Link to="/register" className="font-semibold text-[#003B3B] hover:underline">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-[11px] text-[#9AACAC] pb-5 px-5">
          © 2026 WARAS • Dinas Kesehatan Kota Semarang
        </p>
      </main>
    </div>
  );
}
