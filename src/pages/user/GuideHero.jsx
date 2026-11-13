import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Hospital, ShieldAlert, Sparkles } from "lucide-react";

export default function GuideHero({ heroData, onOpenModal }) {
  if (!heroData) return null;

  const renderIllustration = (type) => {
    if (type === "thermometer") {
      return (
        <svg viewBox="0 0 200 200" className="w-40 sm:w-48 h-40 sm:h-48 drop-shadow-md">
          <circle cx="110" cy="115" r="55" fill="#FFCBB4" stroke="#022022" strokeWidth="4" />
          <circle cx="92" cy="108" r="5" fill="#022022" />
          <circle cx="128" cy="108" r="5" fill="#022022" />
          <path d="M 96 132 Q 110 120 124 132" fill="none" stroke="#022022" strokeWidth="4" strokeLinecap="round" />
          <rect x="80" y="70" width="55" height="20" rx="6" fill="#A4D8EC" stroke="#022022" strokeWidth="3" />
          <line x1="88" y1="78" x2="128" y2="78" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />
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
        <svg viewBox="0 0 200 200" className="w-40 sm:w-48 h-40 sm:h-48 drop-shadow-md">
          <path d="M 60 30 L 60 110 Q 60 150 110 150 L 160 150 Q 170 150 170 140 L 170 120 Q 120 120 100 80 L 100 30 Z" fill="#FFD0BC" stroke="#022022" strokeWidth="4" />
          <path d="M 70 80 C 50 60 60 30 90 40 C 120 30 130 60 110 80 Z" fill="#69BDE0" stroke="#022022" strokeWidth="4" />
          <polygon points="85,30 95,30 98,20 82,20" fill="#022022" stroke="#022022" strokeWidth="2" />
          <circle cx="50" cy="70" r="4" fill="#A4D8EC" />
          <circle cx="125" cy="75" r="5" fill="#A4D8EC" />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 200 200" className="w-40 sm:w-48 h-40 sm:h-48 drop-shadow-md">
        <circle cx="100" cy="65" r="32" fill="#FFCBB4" stroke="#022022" strokeWidth="4" />
        <path d="M 85 58 Q 92 68 98 58" fill="none" stroke="#022022" strokeWidth="3" />
        <circle cx="112" cy="55" r="4" fill="#022022" />
        <circle cx="100" cy="76" r="7" fill="#022022" />
        <path d="M 60 150 Q 60 110 100 110 Q 140 110 140 150 Z" fill="#4B7BEC" stroke="#022022" strokeWidth="4" />
        <path d="M 75 115 Q 90 95 100 105" fill="none" stroke="#FFCBB4" strokeWidth="10" strokeLinecap="round" />
        <path d="M 125 115 Q 110 95 100 105" fill="none" stroke="#FFCBB4" strokeWidth="10" strokeLinecap="round" />
      </svg>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      {/* LEFT SIDE: Hero Guide Card */}
      <div className="lg:col-span-8 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 p-6 sm:p-8 shadow-[0_12px_40px_rgba(2,32,34,0.06)] flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#37F4B4]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-poppins font-bold bg-[#022022]/10 text-[#022022] border border-[#37F4B4]/25">
              <Sparkles className="w-3.5 h-3.5 text-[#022022]" />
              PANDUAN UTAMA
            </span>
          </div>

          <h2 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-[#022022] leading-tight tracking-tight">
            {heroData.title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center pt-2">
            <div className="sm:col-span-5 flex justify-center items-center">
              {renderIllustration(heroData.illustration)}
            </div>

            <div className="sm:col-span-7 space-y-4">
              {heroData.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3.5 group/step">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#022022] text-[#37F4B4] font-poppins font-bold text-xs shrink-0 mt-0.5 shadow-sm shadow-[#022022]/20">
                    {idx + 1}
                  </span>
                  <p className="font-poppins font-bold text-sm sm:text-base text-[#022022] leading-snug">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-gray-200/60 flex items-center justify-end">
          <button
            onClick={() => onOpenModal(heroData)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white bg-gradient-to-br from-[#023b3b] via-[#022022] to-[#011414] hover:from-[#034d4d] hover:via-[#033033] hover:to-[#022022] backdrop-blur-md border border-[#022022]/80 hover:border-[#37F4B4]/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.28),0_6px_16px_rgba(2,32,34,0.16)] font-poppins font-semibold text-xs sm:text-sm active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Lihat Detail Langkah Selengkapnya</span>
            <ArrowRight className="w-4 h-4 text-[#37F4B4]" />
          </button>
        </div>
      </div>

      {/* RIGHT SIDE: Rich Emergency CTA Panel */}
      <div className="lg:col-span-4 rounded-3xl bg-[#022022] border border-[#37F4B4]/25 p-7 text-white shadow-xl shadow-[#022022]/20 flex flex-col justify-between relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" viewBox="0 0 300 400" preserveAspectRatio="none">
          <path d="M -50 150 Q 50 300 350 200 T 400 350 L 400 400 L -50 400 Z" fill="#37F4B4" />
          <path d="M -50 220 Q 100 100 350 280 L 350 400 L -50 400 Z" fill="#37F4B4" />
        </svg>

        <div className="absolute top-0 right-0 w-40 h-40 bg-[#37F4B4]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-[#37F4B4]">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>

          <h3 className="font-poppins font-extrabold text-2xl sm:text-3xl leading-snug tracking-tight text-white uppercase">
            PERLU BANTUAN MEDIS SEGERA? <br />
            <span className="text-[#37F4B4]">CARI ATAU HUBUNGI FASKES TERDEKAT</span>
          </h3>
        </div>

        <div className="relative z-10 pt-8">
          <Link
            to="/user/facilities"
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-white bg-gradient-to-br from-white/[0.18] via-white/[0.08] to-white/[0.03] hover:from-white/[0.25] hover:via-white/[0.12] hover:to-white/[0.05] backdrop-blur-md border border-white/25 hover:border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.32),0_8px_20px_rgba(0,0,0,0.12)] font-poppins font-bold text-sm active:scale-[0.98] transition-all duration-200 cursor-pointer group"
          >
            <Hospital className="w-5 h-5 text-white" />
            <span>CARI FASKES</span>
            <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}