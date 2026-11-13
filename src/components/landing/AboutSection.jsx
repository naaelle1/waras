import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, HeartPulse, Hospital, ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="tentang" className="scroll-mt-20 px-4 sm:px-8 lg:px-12 py-20 bg-white border-t border-[#022022]/10">
      <div className="max-w-[1480px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT: MINIMAL EDITORIAL NARRATIVE */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-wider text-[#022022] font-semibold">
              TENTANG PLATFORM WARAS
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-light text-[#022022] leading-[1.15] tracking-tight">
              Satu Wadah untuk <br />
              <span className="font-normal text-[#022022]">Kepastian Informasi Kesehatan</span> Warga.
            </h2>

            <p className="text-sm sm:text-base font-light text-[#022022]/70 leading-relaxed max-w-xl">
              Ketika situasi darurat atau keluhan kesehatan terjadi, kepanikan sering kali diperparah oleh lokasi faskes yang tidak pasti dan istilah medis yang membingungkan. WARAS hadir memberikan kejelasan: fasilitas mana yang sedang siaga, nomor darurat yang harus dihubungi, dan pertolongan pertama yang harus dilakukan.
            </p>

            <div className="pt-2">
              <Link
                to="/user/facilities"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[#022022] bg-white/80 hover:bg-white backdrop-blur-md border border-[#022022]/15 hover:border-[#022022]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_12px_rgba(2,32,34,0.05)] text-xs sm:text-sm font-medium transition-all duration-200 active:scale-[0.98] select-none group"
              >
                <span>Eksplorasi seluruh fasilitas kesehatan Semarang</span>
                <ArrowRight className="w-4 h-4 text-[#022022] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* RIGHT: 3 CORE PUBLIC HEALTH PILLARS */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-6 rounded-3xl bg-[#022022]/5 border border-[#022022]/10 flex flex-col justify-between">
              <span className="text-2xl sm:text-3xl font-light font-mono text-[#022022]">01</span>
              <div className="mt-4">
                <h4 className="text-sm font-normal text-[#022022]">Akurasi Faskes</h4>
                <p className="text-[11px] font-light text-[#022022]/60 mt-1">Data lokasi, nomor kontak, & IGD siaga terintegrasi resmi.</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#022022]/5 border border-[#022022]/10 flex flex-col justify-between">
              <span className="text-2xl sm:text-3xl font-light font-mono text-[#022022]">02</span>
              <div className="mt-4">
                <h4 className="text-sm font-normal text-[#022022]">Bahasa Awam</h4>
                <p className="text-[11px] font-light text-[#022022]/60 mt-1">Panduan P3K dan glosarium medis praktis bebas jargon.</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#022022] border border-[#022022] text-white flex flex-col justify-between shadow-sm">
              <span className="text-2xl sm:text-3xl font-light font-mono text-white">03</span>
              <div className="mt-4">
                <h4 className="text-sm font-normal text-white">Siaga Publik</h4>
                <p className="text-[11px] font-light text-white/70 mt-1">Hotline 119 dan rute ambulans tanpa dipungut biaya.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
