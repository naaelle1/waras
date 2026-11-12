import React from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, Navigation, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    label: "CARI",
    title: "Temukan kebutuhan Anda",
    description: "Ketik gejala awal yang dirasakan, cari faskes spesifik, atau pilih topik panduan medis yang Anda butuhkan.",
    icon: Search,
    accentColor: "#003D3B",
    badge: "Input Cepat",
  },
  {
    number: "02",
    label: "PAHAMI",
    title: "Dapatkan informasi yang jelas",
    description: "Sistem cerdas memfilter faskes siaga, menerjemahkan istilah medis, dan memberikan arahan SOP pertolongan awal.",
    icon: Sparkles,
    accentColor: "#005B52",
    badge: "Edukasi Tepat",
  },
  {
    number: "03",
    label: "TEMUKAN",
    title: "Arahkan diri ke layanan tepat",
    description: "Kunjungi faskes dengan navigasi rute langsung, hubungi hotline darurat 119, atau terapkan langkah mandiri secara aman.",
    icon: Navigation,
    accentColor: "#003D3B",
    badge: "Solusi Nyata",
  },
];

export default function HowItWorks() {
  return (
    <section id="panduan" className="py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden bg-[#F5F8F7]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-radial from-[#D8F5E8]/60 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D8F5E8] text-[#005B52] text-xs font-bold mb-3">
            <span>Alur Penggunaan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062E2B] tracking-tight leading-[1.15]">
            Cara Kerja WARAS, <br />
            Sesederhana Itu.
          </h2>
          <p className="mt-3 text-[#647777] text-sm sm:text-base font-normal max-w-md mx-auto">
            Hanya butuh 3 langkah singkat untuk beralih dari kebingungan ke tindakan medis yang tepat.
          </p>
        </div>

        {/* 3 STEPS HORIZONTAL WITH ANIMATED CONNECTING LINE */}
        <div className="relative">
          
          {/* Animated Connecting Line Behind Steps (Desktop) */}
          <div className="hidden lg:block absolute top-[58px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-[#D8F5E8] via-[#63D6AE] to-[#005B52]/30 -z-0">
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-[#003D3B] via-[#005B52] to-[#63D6AE]"
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
                  className="relative rounded-3xl bg-white border border-[#E2ECEB] p-7 sm:p-8 hover:border-[#63D6AE] hover:shadow-[0_20px_50px_rgba(0,61,59,0.08)] hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
                >
                  {/* GIANT TRANSPARENT BACKGROUND NUMBER */}
                  <span className="absolute -bottom-4 -right-2 text-7xl sm:text-8xl font-black text-[#003D3B]/[0.05] group-hover:text-[#005B52]/[0.09] transition-colors select-none pointer-events-none font-mono">
                    {step.number}
                  </span>

                  {/* STEP ICON & NUMBER PILL */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-[#D8F5E8] text-[#005B52] flex items-center justify-center group-hover:bg-[#003D3B] group-hover:text-[#63D6AE] transition-all duration-300 shadow-xs">
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono font-bold text-[#005B52] bg-[#D8F5E8] px-2.5 py-0.5 rounded-full">
                        {step.label}
                      </span>
                    </div>
                  </div>

                  {/* STEP TITLE */}
                  <h3 className="text-xl font-bold text-[#062E2B] group-hover:text-[#003D3B] transition-colors">
                    {step.title}
                  </h3>

                  {/* 1 SHORT SENTENCE DESCRIPTION */}
                  <p className="mt-2 text-xs sm:text-sm text-[#647777] leading-relaxed">
                    {step.description}
                  </p>

                  {/* TAG HIGHLIGHT */}
                  <div className="mt-5 pt-4 border-t border-[#F0F5F4] flex items-center gap-1.5 text-[11px] font-bold text-[#005B52]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{step.badge}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* BOTTOM HELPER BANNER */}
        <div className="mt-12 text-center">
          <Link
            to="/user/dashboard"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#003D3B] hover:text-[#005B52] transition-colors"
          >
            <span>Mulai eksplorasi panduan dan fasilitas sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}