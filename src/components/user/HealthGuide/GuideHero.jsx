import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Hospital, ShieldAlert, Sparkles } from "lucide-react";
import Logo from "../../common/Logo";

export default function GuideHero({ heroData, onOpenModal }) {
  if (!heroData) return null;

  // Custom inline SVG Vector Illustrations matching the reference design
  const renderIllustration = (type) => {
    if (type === "thermometer") {
      return (
        <svg viewBox="0 0 200 200" className="w-36 sm:w-44 h-36 sm:h-44 drop-shadow-sm select-none">
          {/* Fever Face with Thermometer & Patch */}
          <circle cx="110" cy="115" r="55" fill="#FFCBB4" stroke="#022022" strokeWidth="4" />
          {/* Eyes & Sad Mouth */}
          <circle cx="92" cy="108" r="5" fill="#022022" />
          <circle cx="128" cy="108" r="5" fill="#022022" />
          <path d="M 96 132 Q 110 120 124 132" fill="none" stroke="#022022" strokeWidth="4" strokeLinecap="round" />
          {/* Cooling Gel Patch on forehead */}
          <rect x="80" y="70" width="55" height="20" rx="6" fill="#A4D8EC" stroke="#022022" strokeWidth="3" />
          <line x1="88" y1="78" x2="128" y2="78" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />
          {/* Thermometer in mouth */}
          <g transform="rotate(-35 70 125)">
            <rect x="25" y="120" width="80" height="18" rx="9" fill="#FFFFFF" stroke="#022022" strokeWidth="3" />
            <circle cx="34" cy="129" r="6" fill="#FF5A5A" />
            <rect x="34" y="127" width="40" height="4" fill="#FF5A5A" />
            <text x="52" y="122" fontSize="9" fontWeight="bold" fill="#022022">39.5°C</text>
          </g>
        </svg>
      );
    }

    if (type === "ankle") {
      return (
        <svg viewBox="0 0 200 200" className="w-36 sm:w-44 h-36 sm:h-44 drop-shadow-sm select-none">
          {/* Ankle with Ice Pack */}
          <path d="M 60 30 L 60 110 Q 60 150 110 150 L 160 150 Q 170 150 170 140 L 170 120 Q 120 120 100 80 L 100 30 Z" fill="#FFD0BC" stroke="#022022" strokeWidth="4" />
          {/* Ice Bag */}
          <path d="M 70 80 C 50 60 60 30 90 40 C 120 30 130 60 110 80 Z" fill="#69BDE0" stroke="#022022" strokeWidth="4" />
          <polygon points="85,30 95,30 98,20 82,20" fill="#022022" stroke="#022022" strokeWidth="2" />
          {/* Ice Drops / Bubbles */}
          <circle cx="50" cy="70" r="4" fill="#A4D8EC" />
          <circle cx="125" cy="75" r="5" fill="#A4D8EC" />
        </svg>
      );
    }

    // Default Choking / Heimlich illustration
    return (
      <svg viewBox="0 0 200 200" className="w-36 sm:w-44 h-36 sm:h-44 drop-shadow-sm select-none">
        {/* Person Choking Graphic */}
        <circle cx="100" cy="65" r="32" fill="#FFCBB4" stroke="#022022" strokeWidth="4" />
        <path d="M 85 58 Q 92 68 98 58" fill="none" stroke="#022022" strokeWidth="3" />
        <circle cx="112" cy="55" r="4" fill="#022022" />
        {/* Open mouth choking */}
        <circle cx="100" cy="76" r="7" fill="#022022" />
        {/* Body and hands on throat */}
        <path d="M 60 150 Q 60 110 100 110 Q 140 110 140 150 Z" fill="#4B7BEC" stroke="#022022" strokeWidth="4" />
        <path d="M 75 115 Q 90 95 100 105" fill="none" stroke="#FFCBB4" strokeWidth="10" strokeLinecap="round" />
        <path d="M 125 115 Q 110 95 100 105" fill="none" stroke="#FFCBB4" strokeWidth="10" strokeLinecap="round" />
      </svg>
    );
  };

  return (
    <div className="relative group overflow-hidden rounded-2xl bg-white border border-[#E2ECEB] shadow-xs transition-all duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-85">
        
        {/* LEFT SIDE: Hero Guide Details (Matching FeaturedArticle Visual Panel) */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#022022] text-white border border-white/20 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                PANDUAN UTAMA
              </span>
              {heroData.type && (
                <span className="text-xs font-medium text-[#526666]">
                  {heroData.type}
                </span>
              )}
            </div>

            <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-[#0D2626] leading-tight tracking-tight">
              {heroData.title}
            </h2>

            {/* Graphic + Numbered Steps Row */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-center pt-1">
              {/* Illustration Column */}
              <div className="sm:col-span-5 flex justify-center items-center py-1">
                {renderIllustration(heroData.illustration)}
              </div>

              {/* Steps Column */}
              <div className="sm:col-span-7 space-y-3">
                {heroData.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#022022] text-white font-poppins font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                      {idx + 1}
                    </span>
                    <p className="font-poppins font-semibold text-xs sm:text-sm text-[#0D2626] leading-snug">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action button inside Left Panel */}
          <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-end">
            <button
              type="button"
              onClick={() => onOpenModal && onOpenModal(heroData)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#022022] text-white font-semibold text-xs sm:text-sm hover:bg-[#033033] border border-[#022022] transition-colors shadow-xs active:scale-[0.98] cursor-pointer group/btn"
            >
              <span>Lihat Detail Langkah Selengkapnya</span>
              <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: Emergency CTA Panel (Matching FeaturedArticle Dark Right Panel) */}
        <div className="lg:col-span-5 bg-[#022022] border-t lg:border-t-0 lg:border-l border-white/10 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Wave Pattern Overlay from mask-group.svg (Persis Card Dashboard & FeaturedArticle) */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden flex items-end justify-center">
            <img
              src="/images/mask-group.svg"
              alt=""
              aria-hidden="true"
              draggable={false}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/Mask Group.svg";
              }}
              className="w-full h-full object-cover object-bottom select-none pointer-events-none opacity-90"
            />
          </div>

          <div className="relative z-10 space-y-3.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-teal-100">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-100 border border-white/15 backdrop-blur-sm">
                <ShieldAlert className="w-3.5 h-3.5 text-teal-200" />
                Layanan Darurat
              </span>
              <span>•</span>
              <span className="text-teal-100/80">Siaga 24 Jam</span>
            </div>

            <h3 className="font-poppins font-bold text-xl sm:text-2xl leading-snug tracking-tight text-white">
              Perlu Bantuan Medis Segera?
            </h3>

            <p className="font-inter text-xs sm:text-sm text-teal-100/90 leading-relaxed">
              Cari fasilitas kesehatan terdekat di Kota Semarang lengkap dengan kontak IGD dan rute navigasi darurat.
            </p>
          </div>

          <div className="relative z-10 pt-6 mt-4 border-t border-white/15 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-7 px-2 rounded-full bg-white/15 flex items-center justify-center">
                <Logo tone="light" className="h-3.5" />
              </div>
              <span className="text-xs font-medium text-teal-100/90">Faskes Semarang</span>
            </div>

            <Link
              to="/user/facilities"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white bg-gradient-to-br from-white/[0.18] via-white/[0.08] to-white/[0.03] hover:from-white/[0.25] hover:via-white/[0.12] hover:to-white/[0.05] backdrop-blur-md border border-white/25 hover:border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.32),0_8px_20px_rgba(0,0,0,0.12)] font-semibold text-xs sm:text-sm active:scale-[0.98] transition-all duration-200 cursor-pointer group/btn"
            >
              <Hospital className="w-4 h-4 text-teal-200" />
              <span>Cari Faskes</span>
              <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
