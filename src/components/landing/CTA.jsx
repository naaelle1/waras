import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-4 sm:px-8 lg:px-12 py-20 bg-white border-t border-[#022022]/10">
      <div className="max-w-[1480px] mx-auto">
        
        {/* CLEAN SEAMLESS CTA CONTAINER (Seiras dengan halaman di atasnya, tanpa warna nabrak & tanpa tag pengganggu) */}
        <div className="relative rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-b from-[#F5FCFC] to-[#EDF9F9] border border-[#022022]/10 p-10 sm:p-14 lg:p-16 text-center overflow-hidden">
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#022022] tracking-tight leading-[1.15]">
              Layanan Kesehatan Publik, <br />
              <span className="font-normal text-[#022022]">Untuk Kita Semua.</span>
            </h2>

            <p className="text-[#022022]/70 text-sm sm:text-base font-light max-w-lg mx-auto leading-relaxed">
              Mulai temukan fasilitas siaga terdekat, panduan darurat terverifikasi, dan nomor darurat 119 sekarang juga tanpa biaya.
            </p>

            <div className="pt-3">
              <Link
                to="/user/facilities"
                className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-[#022022] text-white text-xs sm:text-sm font-medium hover:bg-[#033033] border border-transparent active:scale-95 transition-all shadow-sm group"
              >
                <span>Cari Fasilitas Kesehatan</span>
                <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <p className="text-[11px] text-[#022022]/55 font-light pt-2">
              100% Layanan Terbuka • Gratis Tanpa Biaya • Terhubung Resmi Kota Semarang
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
