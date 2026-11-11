import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass, MapPin, Sparkles } from "lucide-react";

export default function ServiceGuideHero({ onScrollToGuides }) {
  return (
    <div className="relative overflow-hidden rounded-4xl bg-linear-to-br from-[#003B3B] via-[#002B2B] to-[#001F1F] p-7 sm:p-10 text-white shadow-xl shadow-[#003B3B]/10 border border-white/10">
      {/* Decorative Wave & Ambient Background */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 rounded-full bg-[#1E786E]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-72 h-72 rounded-full bg-[#005B5B]/20 blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-poppins font-bold bg-white/10 text-[#A9D6C8] backdrop-blur-md border border-white/15">
            <Compass className="w-4 h-4 text-[#A9D6C8]" />
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-[#002B2B] font-poppins font-bold text-xs sm:text-sm hover:bg-[#A9D6C8] transition-all duration-300 shadow-lg active:scale-95 cursor-pointer group"
            >
              <span>Mulai Panduan</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <Link
              to="/user/facilities"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 text-white font-poppins font-semibold text-xs sm:text-sm hover:bg-white/20 transition-all duration-300 border border-white/20 backdrop-blur-md cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#A9D6C8]" />
              <span>Cari Faskes</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Custom SVG Vector Illustration */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-full max-w-xs sm:max-w-sm p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col items-center justify-center">
            <svg viewBox="0 0 240 200" className="w-full h-auto drop-shadow-lg">
              {/* Hospital Building Base */}
              <rect x="50" y="60" width="140" height="110" rx="12" fill="#002B2B" stroke="#A9D6C8" strokeWidth="3" />
              <rect x="90" y="35" width="60" height="35" rx="8" fill="#003B3B" stroke="#A9D6C8" strokeWidth="3" />
              {/* Red Cross Medical Badge */}
              <circle cx="120" cy="52" r="12" fill="#FFFFFF" />
              <path d="M 120 45 L 120 59 M 113 52 L 127 52" stroke="#003B3B" strokeWidth="3.5" strokeLinecap="round" />
              {/* Windows Grid */}
              <rect x="68" y="80" width="22" height="20" rx="4" fill="#A9D6C8" opacity="0.8" />
              <rect x="109" y="80" width="22" height="20" rx="4" fill="#A9D6C8" opacity="0.8" />
              <rect x="150" y="80" width="22" height="20" rx="4" fill="#A9D6C8" opacity="0.8" />
              <rect x="68" y="112" width="22" height="20" rx="4" fill="#A9D6C8" opacity="0.8" />
              <rect x="150" y="112" width="22" height="20" rx="4" fill="#A9D6C8" opacity="0.8" />
              {/* Entrance Gate */}
              <rect x="104" y="125" width="32" height="45" rx="4" fill="#FFFFFF" opacity="0.9" />
              <line x1="120" y1="125" x2="120" y2="170" stroke="#002B2B" strokeWidth="2" />
              {/* Navigation Pulse Pin */}
              <g className="animate-bounce">
                <circle cx="195" cy="45" r="16" fill="#A9D6C8" opacity="0.2" />
                <circle cx="195" cy="45" r="10" fill="#A9D6C8" />
                <circle cx="195" cy="45" r="4" fill="#002B2B" />
              </g>
            </svg>
            <div className="mt-3 flex items-center gap-2 text-xs font-poppins font-medium text-[#A9D6C8]">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Sistem Navigasi Faskes Semarang</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}