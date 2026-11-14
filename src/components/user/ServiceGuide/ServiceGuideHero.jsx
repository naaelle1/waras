import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass, MapPin } from "lucide-react";

export default function ServiceGuideHero({ onScrollToGuides }) {
  return (
    <div className="relative overflow-hidden rounded-4xl bg-[#022022] p-8 sm:p-12 lg:p-14 text-white shadow-xl shadow-[#022022]/20 border border-white/20">
      {/* Decorative Subtle Ambient Background */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 rounded-full bg-white/[0.02] blur-3xl pointer-events-none" />

      {/* Main Narrative Content (Full & Fitted to the Big Card) */}
      <div className="relative z-10 max-w-3xl space-y-5 sm:space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-poppins font-semibold bg-white/10 text-white backdrop-blur-md border border-white/20">
          <Compass className="w-4 h-4 text-white" />
          <span>WARAS HEALTHCARE GUIDE</span>
        </div>

        <h1 className="font-poppins font-bold text-2xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-white">
          Pahami Layanan Kesehatan dengan Lebih Mudah
        </h1>

        <p className="font-inter text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed max-w-2xl">
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white bg-gradient-to-br from-white/[0.14] via-white/[0.06] to-white/[0.02] hover:from-white/[0.22] hover:via-white/[0.10] hover:to-white/[0.04] backdrop-blur-md border border-white/20 hover:border-white/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),0_8px_20px_rgba(0,0,0,0.12)] font-poppins font-semibold text-xs sm:text-sm active:scale-[0.98] transition-all duration-200 cursor-pointer group"
          >
            <MapPin className="w-4 h-4 text-white" />
            <span>Cari Faskes</span>
          </Link>
        </div>
      </div>
    </div>
  );
}