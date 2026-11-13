import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass, MapPin, Sparkles } from "lucide-react";

export default function ServiceGuideHero({ onScrollToGuides }) {
  return (
    <div className="relative overflow-hidden rounded-4xl bg-[#022022] p-7 sm:p-10 text-white shadow-xl shadow-[#022022]/20 border border-white/20">
      {/* Decorative Wave & Ambient Background */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-72 h-72 rounded-full bg-teal-700/10 blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-poppins font-bold bg-white/10 text-white backdrop-blur-md border border-white/20">
            <Compass className="w-4 h-4 text-teal-200" />
            <span>WARAS HEALTHCARE GUIDE</span>
          </div>

          <h1 className="font-poppins font-bold text-2xl sm:text-4xl leading-tight tracking-tight text-white">
            Pahami Layanan Kesehatan dengan Lebih Mudah
          </h1>

          <p className="font-inter text-xs sm:text-base text-gray-200 leading-relaxed max-w-xl">
            Temukan panduan praktis untuk memilih fasilitas kesehatan, mempersiapkan dokumen kunjungan, dan memahami alur pelayanan medis sesuai kebutuhan Anda.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={onScrollToGuides}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white bg-gradient-to-br from-white/[0.18] via-white/[0.08] to-white/[0.03] hover:from-white/[0.25] hover:via-white/[0.12] hover:to-white/[0.05] backdrop-blur-md border border-white/25 hover:border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.32),0_8px_20px_rgba(0,0,0,0.12)] font-poppins font-semibold text-xs sm:text-sm active:scale-[0.98] transition-all duration-200 cursor-pointer group"
            >
              <span>Mulai Panduan</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              to="/user/facilities"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white bg-gradient-to-br from-teal-300/[0.15] via-[#022022]/60 to-white/[0.03] hover:from-teal-300/[0.22] hover:via-[#033033]/70 hover:to-white/[0.06] backdrop-blur-md border border-teal-200/20 hover:border-teal-200/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),0_8px_20px_rgba(0,0,0,0.12)] font-poppins font-semibold text-xs sm:text-sm active:scale-[0.98] transition-all duration-200 cursor-pointer group"
            >
              <MapPin className="w-4 h-4 text-white" />
              <span>Cari Faskes</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Custom SVG Vector Illustration */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-full max-w-xs sm:max-w-sm p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col items-center justify-center">
            <svg viewBox="0 0 240 200" className="w-full h-auto drop-shadow-lg">
              {/* Hospital Building Base */}
              <rect x="50" y="60" width="140" height="110" rx="12" fill="#022022" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
              <rect x="90" y="35" width="60" height="35" rx="8" fill="#033033" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
              {/* Red Cross Medical Badge */}
              <circle cx="120" cy="52" r="12" fill="#FFFFFF" />
              <path d="M 120 45 L 120 59 M 113 52 L 127 52" stroke="#022022" strokeWidth="3.5" strokeLinecap="round" />
              {/* Windows Grid */}
              <rect x="68" y="80" width="22" height="20" rx="4" fill="#E6FEFF" opacity="0.8" />
              <rect x="109" y="80" width="22" height="20" rx="4" fill="#E6FEFF" opacity="0.8" />
              <rect x="150" y="80" width="22" height="20" rx="4" fill="#E6FEFF" opacity="0.8" />
              <rect x="68" y="112" width="22" height="20" rx="4" fill="#E6FEFF" opacity="0.8" />
              <rect x="150" y="112" width="22" height="20" rx="4" fill="#E6FEFF" opacity="0.8" />
              {/* Entrance Gate */}
              <rect x="104" y="125" width="32" height="45" rx="4" fill="#FFFFFF" opacity="0.9" />
              <line x1="120" y1="125" x2="120" y2="170" stroke="#022022" strokeWidth="2" />
              {/* Navigation Pulse Pin */}
              <g className="animate-bounce">
                <circle cx="195" cy="45" r="16" fill="#14b8a6" opacity="0.2" />
                <circle cx="195" cy="45" r="10" fill="#14b8a6" />
                <circle cx="195" cy="45" r="4" fill="#022022" />
              </g>
            </svg>
            <div className="mt-3 flex items-center gap-2 text-xs font-poppins font-medium text-teal-200">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Sistem Navigasi Faskes Semarang</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}