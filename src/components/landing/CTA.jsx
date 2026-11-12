import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, HeartPulse } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-4 sm:px-8 lg:px-12 py-16 bg-white">
      <div className="max-w-[1480px] mx-auto">
        
        {/* BIG ROUNDED CTA CARD (Matching Reference Aesthetic) */}
        <div className="relative rounded-[2.5rem] bg-[#014751] p-10 sm:p-14 lg:p-16 text-white shadow-[0_20px_50px_rgba(1,71,81,0.18)] overflow-hidden text-center">
          
          {/* MASK GROUP.SVG BACKGROUND */}
          <div className="absolute inset-x-0 bottom-0 w-full pointer-events-none select-none z-0 opacity-20">
            <img
              src="/Mask Group.svg"
              alt=""
              className="w-full h-auto object-cover object-bottom"
            />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#37F4B4] text-xs font-mono uppercase tracking-wider border border-white/15">
              <HeartPulse className="w-3.5 h-3.5" />
              <span>Platform Publik Kota Semarang</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-light text-white tracking-tight leading-[1.12]">
              Layanan Kesehatan Publik <br />
              <span className="font-normal text-[#37F4B4]">Untuk Kita Semua.</span>
            </h2>

            <p className="text-white/80 text-sm sm:text-base font-light max-w-md mx-auto leading-relaxed">
              Mulai temukan fasilitas siaga terdekat, panduan darurat terverifikasi, dan nomor darurat 119 sekarang juga tanpa biaya.
            </p>

            <div className="pt-2">
              <Link
                to="/user/facilities"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#37F4B4] text-[#022022] text-xs sm:text-sm font-medium shadow-md hover:bg-white active:scale-95 transition-all group"
              >
                <span>Cari Fasilitas Kesehatan</span>
                <ArrowRight className="w-4 h-4 text-[#022022] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <p className="text-[11px] text-white/60 font-light">
              100% Layanan Terbuka • Gratis Tanpa Biaya • Resmi Kota Semarang
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
