import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Hospital,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Clock,
  Activity,
  PhoneCall
} from "lucide-react";
import Logo from "../../common/Logo";

export default function GuideHero({ heroData, onOpenModal }) {
  if (!heroData) return null;

  return (
    <div className="relative group overflow-hidden rounded-2xl bg-white border border-[#E2ECEB] shadow-xs transition-all duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-85">
        
        {/* LEFT SIDE: Hero Guide Details (Solid, structured, filled layout) */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Header Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#022022] text-white border border-white/20 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  PANDUAN UTAMA
                </span>
                {heroData.type && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#022022]/5 text-[#022022] border border-[#022022]/10">
                    <Activity className="w-3 h-3 text-[#022022]" />
                    {heroData.type}
                  </span>
                )}
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#526666]">
                <Clock className="w-3.5 h-3.5 text-[#809494]" />
                Tanggap 1–3 Menit
              </span>
            </div>

            {/* Title & Description Lead */}
            <div className="space-y-2">
              <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-[#0D2626] leading-tight tracking-tight">
                {heroData.title}
              </h2>
              {heroData.fullDetails?.description && (
                <p className="font-inter text-xs sm:text-sm text-[#526666] leading-relaxed line-clamp-2">
                  {heroData.fullDetails.description}
                </p>
              )}
            </div>

            {/* Structured 3-Step Progression Grid */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs font-semibold text-[#526666] uppercase tracking-wider font-poppins">
                <span>3 Langkah Cepat Penanganan</span>
                <span className="text-[11px] font-normal normal-case text-[#809494]">
                  Ikuti secara berurutan
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {heroData.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-gray-50/70 hover:bg-gray-50 border border-gray-100 hover:border-[#022022]/20 transition-all flex flex-col justify-between gap-2.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#022022] text-white font-poppins font-bold text-xs shadow-2xs">
                        {idx + 1}
                      </span>
                      <span className="text-[11px] font-semibold text-[#809494] font-poppins">
                        Langkah {idx + 1}
                      </span>
                    </div>
                    <p className="font-inter font-medium text-xs sm:text-[13px] text-[#0D2626] leading-snug">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action button inside Left Panel */}
          <div className="pt-5 mt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-medium text-[#526666]">
              <CheckCircle2 className="w-4 h-4 text-[#022022]" />
              <span>Prosedur Medis Terstandarisasi</span>
            </div>

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
        <div className="lg:col-span-5 bg-[#022022] border-t lg:border-t-0 lg:border-l border-white/10 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden space-y-6">
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

          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-teal-100">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-100 border border-white/15 backdrop-blur-sm">
                <ShieldAlert className="w-3.5 h-3.5 text-teal-200" />
                Layanan Darurat
              </span>
              <span>•</span>
              <span className="text-teal-100/80">Siaga 24 Jam</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-poppins font-bold text-xl sm:text-2xl leading-snug tracking-tight text-white">
                Perlu Bantuan Medis Segera?
              </h3>

              <p className="font-inter text-xs sm:text-sm text-teal-100/90 leading-relaxed">
                Cari fasilitas kesehatan terdekat di Kota Semarang lengkap dengan kontak IGD dan rute navigasi darurat.
              </p>
            </div>

            {/* Quick Hotline Pill */}
            <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-teal-100">
                <PhoneCall className="w-4 h-4 text-teal-200" />
                <span className="font-medium">Hotline IGD Semarang</span>
              </div>
              <span className="font-bold text-teal-200 font-poppins tracking-wide">
                112 / 119
              </span>
            </div>
          </div>

          <div className="relative z-10 pt-5 mt-4 border-t border-white/15 flex items-center justify-between">
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
