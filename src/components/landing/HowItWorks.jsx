import React from "react";
import { motion } from "framer-motion";
import { Search, Compass, Navigation, ArrowRight, ShieldCheck, HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    label: "CARI",
    title: "Tentukan Kebutuhan Anda",
    description: "Ketik keluhan awal yang dirasakan, cari fasilitas kesehatan spesifik, atau buka panduan darurat yang dibutuhkan.",
    icon: Search,
    badge: "Pencarian Cepat",
  },
  {
    number: "02",
    label: "PAHAMI",
    title: "Dapatkan Panduan Jelas",
    description: "Sistem menyajikan faskes terdekat yang siap melayani, menerjemahkan istilah medis, dan memberikan arahan pertolongan pertama.",
    icon: Compass,
    badge: "Petunjuk Teruji",
  },
  {
    number: "03",
    label: "TINDAK",
    title: "Langkah Penanganan Tepat",
    description: "Kunjungi faskes dengan panduan rute peta, hubungi ambulans darurat 119, atau lakukan perawatan mandiri secara terarah.",
    icon: Navigation,
    badge: "Solusi Pasti",
  },
];

export default function HowItWorks() {
  return (
    <section id="panduan" className="py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden bg-white">
      {/* BACKGROUND WING WATERMARK */}
      <div className="absolute top-1/2 right-[-15%] -translate-y-1/2 w-[700px] h-auto pointer-events-none opacity-[0.05] select-none -z-0">
        <img src="/Wing.svg" alt="" className="w-full h-auto object-contain" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#022022]/10 border border-[#37F4B4]/30 text-[#022022] text-xs font-medium mb-3">
            <HeartPulse className="w-3.5 h-3.5 text-[#022022]" />
            <span>Alur Penggunaan Mudah</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#022022] tracking-tight leading-[1.15]">
            Tiga Langkah Sederhana <br />
            <span className="font-normal text-[#022022]">
              Menuju Penanganan Tepat.
            </span>
          </h2>
          <p className="mt-3 text-[#022022]/70 text-sm sm:text-base font-light max-w-md mx-auto">
            Tidak ada tahapan yang rumit. Akses informasi penting dalam hitungan detik tanpa hambatan teknis.
          </p>
        </div>

        {/* 3 STEPS HORIZONTAL WITH CONNECTING LINE */}
        <div className="relative">
          
          {/* Animated Connecting Line Behind Steps (Desktop) */}
          <div className="hidden lg:block absolute top-[58px] left-[15%] right-[15%] h-0.5 bg-[#022022]/10 -z-0">
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-[#022022] via-[#022022] to-[#37F4B4]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.18 }}
                  className="relative rounded-3xl bg-white border border-[#37F4B4]/20 p-7 sm:p-8 hover:border-[#37F4B4]/50 hover:shadow-[0_20px_45px_rgba(2,32,34,0.08)] hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
                >
                  {/* GIANT TRANSPARENT BACKGROUND NUMBER */}
                  <span className="absolute -bottom-4 -right-2 text-7xl sm:text-8xl font-extralight text-[#022022]/[0.06] group-hover:text-[#022022]/[0.1] transition-colors select-none pointer-events-none font-mono">
                    {step.number}
                  </span>

                  {/* STEP ICON & NUMBER PILL */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#022022]/10 text-[#022022] flex items-center justify-center group-hover:bg-[#022022] group-hover:text-[#37F4B4] transition-all duration-300 shadow-2xs">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <span className="text-[11px] font-mono font-medium text-[#022022] bg-[#022022]/10 px-2.5 py-0.5 rounded-full border border-[#37F4B4]/25">
                      {step.label}
                    </span>
                  </div>

                  {/* STEP TITLE */}
                  <h3 className="text-xl font-normal text-[#022022] group-hover:text-[#022022] transition-colors">
                    {step.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mt-2 text-xs sm:text-sm text-[#022022]/70 font-light leading-relaxed">
                    {step.description}
                  </p>

                  {/* TAG HIGHLIGHT */}
                  <div className="mt-6 pt-4 border-t border-[#022022]/10 flex items-center gap-1.5 text-[11px] font-medium text-[#022022]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#37F4B4]" />
                    <span>{step.badge}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* BOTTOM HELPER BANNER */}
        <div className="mt-14 text-center">
          <Link
            to="/user/dashboard"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#022022] hover:text-[#033033] transition-colors group"
          >
            <span>Mulai eksplorasi seluruh panduan kesehatan sekarang</span>
            <ArrowRight className="w-4 h-4 text-[#37F4B4] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
