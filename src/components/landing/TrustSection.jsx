import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Check, Info } from "lucide-react";
import { trustPoints } from "../../data/landingData";

export default function TrustSection() {
  return (
    <section id="tentang" className="py-16 lg:py-24 px-4 sm:px-6 relative overflow-hidden bg-[#F6FAF9]">
      <div className="max-w-5xl mx-auto">
        
        {/* SECTION CARD CONTAINER */}
        <div className="rounded-3xl bg-white border border-[#E2ECEB] p-8 sm:p-12 shadow-[0_12px_36px_rgba(0,59,59,0.04)]">
          
          {/* Header Badge */}
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#022022]/10 text-[#022022] text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Standar Keamanan Informasi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#022022] tracking-tight">
              Komitmen Layanan & Akurasi
            </h2>
            <p className="mt-2 text-[#647777] text-xs sm:text-sm font-normal">
              WARAS dirancang untuk mendampingi warga Semarang dengan prinsip kejelasan, kecepatan, dan tanggung jawab medis.
            </p>
          </div>

          {/* 3 TRUST POINTS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {trustPoints.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.12 }}
                className="space-y-2.5 p-4 rounded-2xl bg-[#F6FAF9]/60 border border-transparent hover:border-[#37F4B4]/40 hover:bg-white transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-[#022022]/10 text-[#022022] flex items-center justify-center font-bold">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h3 className="text-base font-bold text-[#022022] leading-snug">
                  {point.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#647777] leading-relaxed">
                  {point.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* MEDICAL DISCLAIMER BANNER */}
          <div className="mt-10 pt-8 border-t border-[#F0F5F4]">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#E6F4F1]/60 border border-[#37F4B4]/40 flex items-start sm:items-center gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-[#022022] text-[#37F4B4] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                <Info className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-[#022022] font-medium leading-relaxed">
                  <span className="font-bold">Pemberitahuan Medis: </span>
                  WARAS menyediakan informasi kesehatan dan tidak menggantikan diagnosis atau konsultasi langsung dengan dokter dan tenaga medis.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
