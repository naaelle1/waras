import React from "react";
import { Link } from "react-router-dom";
import { Hospital, MessageCircle, Sparkles, ArrowRight } from "lucide-react";

export default function ServiceGuideCTA() {
  return (
    <div className="rounded-3xl bg-[#022022] p-8 sm:p-10 text-white shadow-xl shadow-[#022022]/20 border border-white/20 relative overflow-hidden space-y-8">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left: Faskes Emergency CTA */}
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-poppins font-bold bg-white/10 text-white border border-white/20">
            <Hospital className="w-4 h-4" />
            <span>PENCARI FASKES</span>
          </div>

          <h3 className="font-poppins font-bold text-2xl sm:text-3xl text-white">
            Membutuhkan Bantuan Medis?
          </h3>

          <p className="font-inter text-xs sm:text-sm text-gray-200 leading-relaxed">
            Cari fasilitas kesehatan terdekat di Kota Semarang lengkap dengan jadwal layanan dan rute lokasi.
          </p>

          <Link
            to="/user/facilities"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white bg-gradient-to-br from-white/[0.18] via-white/[0.08] to-white/[0.03] hover:from-white/[0.25] hover:via-white/[0.12] hover:to-white/[0.05] backdrop-blur-md border border-white/25 hover:border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.32),0_8px_20px_rgba(0,0,0,0.12)] font-poppins font-semibold text-xs sm:text-sm active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <span>Cari Faskes Terdekat</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>
        </div>

        {/* Vertical Divider for Desktop */}
        <div className="hidden lg:block lg:col-span-1 border-l border-white/15 h-full my-auto" />

        {/* Right: AI Assistant CTA */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-poppins font-bold bg-white/10 text-white border border-white/20">
            <Sparkles className="w-4 h-4 text-teal-200 animate-pulse" />
            <span>WARAS AI ASSISTANT</span>
          </div>

          <h3 className="font-poppins font-bold text-2xl sm:text-3xl text-white">
            Masih Bingung?
          </h3>

          <p className="font-inter text-xs sm:text-sm text-gray-200 leading-relaxed">
            Sampaikan pertanyaan Anda kepada WARAS AI untuk mendapatkan arahan awal layanan kesehatan.
          </p>

          <Link
            to="/user/ai"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white bg-gradient-to-br from-teal-300/[0.15] via-[#022022]/60 to-white/[0.03] hover:from-teal-300/[0.22] hover:via-[#033033]/70 hover:to-white/[0.06] backdrop-blur-md border border-teal-200/20 hover:border-teal-200/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),0_8px_20px_rgba(0,0,0,0.12)] font-poppins font-semibold text-xs sm:text-sm active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-teal-200" />
            <span>Tanya WARAS AI</span>
          </Link>
        </div>
      </div>
    </div>
  );
}