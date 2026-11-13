import React, { useState } from "react";
import Logo from "../../components/common/Logo";
import { Link } from "react-router-dom";
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
          <Link to="/" aria-label="WARAS - Beranda" className="inline-flex flex-col items-start gap-2 group w-fit">
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
              PEMULIHAN AKSES AKUN RESMI
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-normal leading-[1.1] font-poppins text-white tracking-tight">
              Akses akun
              <br />
              yang <span className="font-serif italic text-teal-200 font-light">aman</span> &
              <br />
              <span className="font-semibold text-white">terverifikasi.</span>
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-teal-100/85 leading-relaxed font-inter font-light max-w-md">
            Pulihkan kendali akun warga Anda dengan protokol enkripsi terverifikasi Dinas Kesehatan Kota Semarang.
          </p>

          {/* Action pill button with circular companion arrow */}
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
            to="/login"
            className="text-xs sm:text-sm font-light text-slate-500 hover:text-[#022022] flex items-center gap-1.5 transition-colors font-inter"
          >
            <ArrowLeft className="w-4 h-4 stroke-[1.5]" />
            <span>Kembali ke Halaman Masuk</span>
          </Link>

          {/* Text Only - Tanpa card/pill, font-light & font-inter (sesuai instruksi Image 2) */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 font-inter font-light">
            <ShieldCheck className="w-4 h-4 text-slate-400 stroke-[1.5]" />
            <span>Pemulihan Akses Resmi</span>
          </div>
        </div>

        {/* Centered Form Container (Render langsung tanpa lag motion.div agar anti-blank) */}
        <div className="w-full max-w-[520px] xl:max-w-[560px] mx-auto my-auto py-4 sm:py-6 space-y-4 sm:space-y-5 animate-auth-float">
          {/* Header Form */}
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-inter font-light text-slate-500">
              <KeyRound className="w-4 h-4 text-slate-400 stroke-[1.5]" />
              <span>Verifikasi Keamanan Akun</span>
            </div>
            <h1 className="font-inter font-light text-3xl sm:text-[34px] text-slate-900 tracking-tight leading-tight">
              Atur Ulang Kata Sandi
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-inter font-light leading-relaxed pt-0.5">
              Masukkan email atau NIK yang terdaftar. Kami akan mengirimkan tautan verifikasi untuk membuat kata sandi baru.
            </p>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-light font-inter flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isSubmitted ? (
            <div className="space-y-4 text-center py-5 bg-[#022022]/5 border border-[#022022]/15 rounded-3xl p-5 sm:p-6">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-inter font-normal text-base sm:text-lg text-slate-900">
                  Instruksi Pemulihan Terkirim
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-inter font-light">
                  Tautan konfirmasi telah dikirim ke alamat terkait <strong>{identifier}</strong>. Silakan periksa folder kotak masuk atau spam email Anda.
                </p>
              </div>
              <Link
                to="/login"
                className="inline-flex items-center justify-center w-full h-11 sm:h-11.5 px-6 rounded-2xl bg-[#022022] hover:bg-[#033033] border border-[#022022] text-white text-xs sm:text-sm font-normal tracking-wide shadow-xs transition-colors font-inter"
              >
                Kembali ke Halaman Masuk
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-light text-slate-700 font-inter">
                  Email atau NIK Kependudukan
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 absolute left-3.5 text-slate-400 stroke-[1.5]" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      if (errorMessage) setErrorMessage("");
                    }}
                    placeholder="nama@email.com atau NIK 16 digit"
                    className="w-full pl-10 pr-4 h-11 sm:h-11.5 rounded-2xl bg-slate-50/80 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 placeholder:font-light focus:bg-white focus:outline-none focus:border-[#022022] focus:ring-2 focus:ring-[#022022]/15 transition-all font-inter font-light"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 sm:h-11.5 inline-flex items-center justify-center gap-2 px-6 rounded-2xl bg-[#022022] hover:bg-[#033033] border border-[#022022] disabled:opacity-60 text-white text-xs sm:text-sm font-normal tracking-wide shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.99] mt-3 sm:mt-3.5 group font-inter"
              >
                {isLoading ? (
                  <span className="font-light">Mengirim Tautan...</span>
                ) : (
                  <>
                    <span className="font-light">Kirim Tautan Pemulihan</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform stroke-[1.5]" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Switch to Login */}
          <div className="pt-3.5 sm:pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 font-inter font-light">
              Ingat kata sandi akun Anda?{" "}
              <Link
                to="/login"
                className="font-normal text-[#022022] hover:underline underline underline-offset-4 decoration-slate-300 font-inter"
              >
                Masuk kembali
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
