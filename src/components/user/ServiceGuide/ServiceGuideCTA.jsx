import React from "react";
import { Link } from "react-router-dom";
import { Hospital, MessageCircle, Sparkles, ArrowRight } from "lucide-react";

export default function ServiceGuideCTA() {
  return (
    <div className="rounded-3xl bg-[#022022] p-8 sm:p-10 text-white shadow-xl shadow-[#022022]/20 border border-[#37F4B4]/25 relative overflow-hidden space-y-8">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#37F4B4]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left: Faskes Emergency CTA */}
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-poppins font-bold bg-white/10 text-[#37F4B4] border border-[#37F4B4]/30">
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#37F4B4] text-[#022022] font-poppins font-bold text-xs sm:text-sm hover:bg-white transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>Cari Faskes Terdekat</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Vertical Divider for Desktop */}
        <div className="hidden lg:block lg:col-span-1 border-l border-white/15 h-full my-auto" />

        {/* Right: AI Assistant CTA */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-poppins font-bold bg-white/10 text-[#37F4B4] border border-[#37F4B4]/30">
            <Sparkles className="w-4 h-4 text-[#37F4B4] animate-pulse" />
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 text-white font-poppins font-bold text-xs sm:text-sm hover:bg-white/20 transition-all border border-[#37F4B4]/30 shadow-md active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#37F4B4]" />
            <span>Tanya WARAS AI</span>
          </Link>
        </div>
      </div>
    </div>
  );
}