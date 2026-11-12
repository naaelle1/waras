import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  KeyRound
} from "lucide-react";

export default function ForgotPassword() {
  const [identifier, setIdentifier] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMessage("Silakan masukkan email atau NIK kependudukan Anda.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
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
              Pemulihan Akses<br />Akun Pasien
            </h1>
            <p className="text-xs sm:text-sm text-teal-100/75 max-w-[210px] leading-relaxed font-inter">
              Instruksi verifikasi keamanan akan dikirimkan langsung ke kontak terdaftar Anda.
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
                  Kirim Tautan<br />Verifikasi
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
                  Cek Email<br />& Notifikasi
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
                  Buat Sandi<br />Baru yang Kuat
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
            to="/login"
            className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-[#003B3B] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Halaman Masuk</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/70 text-[#003B3B] text-xs font-semibold shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#003B3B]" />
            <span>Pemulihan Akses Resmi</span>
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
              <KeyRound className="w-3.5 h-3.5 text-[#003B3B]" />
              <span>Verifikasi Keamanan Akun</span>
            </div>
            <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Atur Ulang Kata Sandi
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-inter">
              Masukkan email atau NIK yang terdaftar. Kami akan mengirimkan tautan verifikasi untuk membuat kata sandi baru.
            </p>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isSubmitted ? (
            <div className="space-y-5 text-center py-4 bg-emerald-50/50 border border-emerald-200/80 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-poppins font-semibold text-base text-slate-900">
                  Instruksi Pemulihan Terkirim
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-inter">
                  Tautan konfirmasi telah dikirim ke alamat terkait <strong>{identifier}</strong>. Silakan periksa folder kotak masuk atau spam email Anda.
                </p>
              </div>
              <Link
                to="/login"
                className="inline-flex items-center justify-center w-full h-11 px-5 rounded-xl bg-[#003B3B] hover:bg-[#002A2A] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors"
              >
                Kembali ke Halaman Masuk
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 inline-flex items-center justify-center gap-2 px-5 rounded-xl bg-[#003B3B] hover:bg-[#002A2A] disabled:opacity-60 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all duration-200 cursor-pointer active:scale-[0.99]"
              >
                {isLoading ? (
                  <span>Mengirim Tautan...</span>
                ) : (
                  <>
                    <span>Kirim Tautan Pemulihan</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Switch to Login */}
          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 font-inter">
              Ingat kata sandi akun Anda?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#003B3B] hover:underline"
              >
                Masuk kembali
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
