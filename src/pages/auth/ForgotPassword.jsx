import React, { useState } from "react";
import Logo from "../../components/common/Logo";
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
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white text-slate-900 selection:bg-[#022022] selection:text-[#37F4B4]">
      {/* ── PANEL KIRI: 50% FULL-HEIGHT BRANDING & STEP CARDS ── */}
      <aside className="lg:col-span-1 bg-[#022022] text-white relative overflow-hidden flex flex-col justify-between p-8 sm:p-10 lg:p-12 xl:p-14 min-h-[560px] lg:min-h-screen">
        {/* Layered rich teal gradient background kombinasi #022022 dan aksen glow #37F4B4 */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_35%,rgba(55,244,180,0.18)_0%,#053638_40%,#022022_85%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_15%_100%,rgba(55,244,180,0.08)_0%,transparent_70%)]" />

        {/* Wave Pattern Overlay from Mask Group.svg at bottom */}
        <img
          src="/images/mask-group.svg"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute bottom-0 inset-x-0 w-full h-auto select-none z-[1] opacity-70"
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
              "Pemulihan akses akun warga terenkripsi dengan verifikasi resmi Dinkes untuk keamanan data riwayat medis Anda."
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
                  Kirim tautan
                  <br />
                  verifikasi
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
                  Cek email &
                  <br />
                  notifikasi
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
                  Buat sandi
                  <br />
                  baru yang kuat
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#022022]/5 text-[#022022] border border-[#37F4B4]/30 shadow-2xs">
              <KeyRound className="w-3.5 h-3.5 text-[#022022]" />
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
            <div className="space-y-5 text-center py-4 bg-[#022022]/5 border border-[#37F4B4]/40 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-full bg-[#37F4B4]/20 text-[#022022] flex items-center justify-center mx-auto border border-[#37F4B4]/40">
                <CheckCircle2 className="w-6 h-6 text-[#022022]" />
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
                className="inline-flex items-center justify-center w-full h-11 px-5 rounded-xl bg-[#022022] hover:bg-[#033033] hover:border-[#37F4B4]/40 border border-transparent text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors"
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
                    className="w-full pl-10 pr-4 h-11 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#022022] focus:ring-4 focus:ring-[#37F4B4]/25 transition-all font-inter"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 inline-flex items-center justify-center gap-2 px-5 rounded-xl bg-[#022022] hover:bg-[#033033] hover:border-[#37F4B4]/40 border border-transparent disabled:opacity-60 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all duration-200 cursor-pointer active:scale-[0.99] group"
              >
                {isLoading ? (
                  <span>Mengirim Tautan...</span>
                ) : (
                  <>
                    <span>Kirim Tautan Pemulihan</span>
                    <ArrowRight className="w-4 h-4 text-[#37F4B4] group-hover:translate-x-0.5 transition-transform" />
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
                className="font-semibold text-[#022022] hover:text-[#033033] hover:underline"
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
