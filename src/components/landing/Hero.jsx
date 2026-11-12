import React from "react";
import Logo from "../common/Logo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Search,
  ShieldCheck,
  Check,
  Hospital,
  Bot,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative min-h-[92vh] pt-32 pb-20 lg:pt-36 lg:pb-28 flex items-center overflow-hidden bg-[#F5F8F7]"
    >
      {/* AMBIENT BACKGROUND GLOWS (Radial Mint & Dark Teal Ambient) */}
      <div className="absolute top-[-12%] right-[-6%] w-[650px] h-[650px] rounded-full bg-radial from-[#63D6AE]/30 via-[#D8F5E8]/25 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-[2%] left-[-12%] w-[580px] h-[580px] rounded-full bg-radial from-[#005B52]/18 via-[#63D6AE]/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[40%] left-[38%] w-[420px] h-[420px] rounded-full bg-radial from-[#63D6AE]/15 to-transparent blur-2xl pointer-events-none -z-10" />

      {/* SUBTLE BACKGROUND GRID MESH */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(#003D3B 1.2px, transparent 1.2px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* LEFT SIDE: BOLD EDITORIAL HEADLINE & CTA */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* 1. Small badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#63D6AE]/60 shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#005B52] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold text-[#003D3B] tracking-wide">
                Healthcare Platform Kota Semarang
              </span>
            </motion.div>

            {/* 2. Large Bold Editorial Headline (68px - 88px desktop scale) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-[70px] xl:text-[80px] font-extrabold text-[#062E2B] leading-[1.08] tracking-tight">
                Kesehatan Lebih Mudah{" "}
                <span className="block text-[#003D3B]">
                  Diakses,
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#003D3B] via-[#005B52] to-[#003D3B]">
                  Informasi Lebih Mudah Dipahami.
                </span>
              </h1>
            </motion.div>

            {/* 3. Supporting text (max 2 short lines) */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
              className="text-[#647777] text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Temukan faskes siaga Semarang, pahami panduan medis darurat, dan konsultasikan keluhan awal bersama AI Assistant.
            </motion.p>

            {/* 4. CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
              className="pt-1 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                to="/user/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#003D3B] text-white text-sm font-bold hover:bg-[#005B52] active:scale-98 transition-all shadow-xl shadow-[#003D3B]/20 group"
              >
                <span>Mulai Sekarang</span>
                <ArrowRight className="w-4 h-4 text-[#63D6AE] transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#tentang"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-white border border-[#E2ECEB] text-[#062E2B] text-sm font-bold hover:bg-[#F5F8F7] hover:border-[#63D6AE] transition-all shadow-xs"
              >
                Pelajari WARAS
              </a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-[#647777] font-semibold"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#D8F5E8] text-[#005B52] flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span>Gratis untuk digunakan</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#D8F5E8] text-[#005B52] flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span>Informasi lebih mudah diakses</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: LAYERED PRODUCT SHOWCASE & FLOATING CARDS */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none">
              
              {/* MAIN DIGITAL INTERFACE (Layered product interface) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 rounded-3xl bg-white p-6 shadow-[0_30px_70px_-15px_rgba(0,61,59,0.15)] border border-[#E2ECEB]"
              >
                {/* Interface Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#F0F5F4]">
                  <div className="flex items-center gap-3">
                    <div className="h-10 px-2.5 rounded-xl bg-[#003D3B] flex items-center justify-center shadow-xs">
                      <Logo tone="light" className="h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#062E2B]">Halo Warga Semarang</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-[11px] text-[#647777]">Pusat Layanan Kesehatan Terpadu</p>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-[#D8F5E8] text-[#005B52] text-[10px] font-bold">
                    Siaga 24 Jam
                  </div>
                </div>

                {/* Search Bar Simulation */}
                <div className="mt-4 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#F5F8F7] border border-[#E2ECEB] text-xs text-[#647777]">
                  <Search className="w-4 h-4 text-[#005B52]" />
                  <span className="truncate">Cari RSUD, Puskesmas, atau Gejala Medis...</span>
                </div>

                {/* AI Assistant Preview Card */}
                <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-[#003D3B] via-[#004B48] to-[#002D2B] text-white space-y-2 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-[#63D6AE]/20 flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-[#63D6AE]" />
                      </div>
                      <span className="text-xs font-bold text-[#63D6AE]">WARAS AI Health Guide</span>
                    </div>
                    <span className="text-[10px] text-[#63D6AE]/80 font-mono">Real-time</span>
                  </div>
                  <p className="text-xs text-emerald-50/90 leading-relaxed font-light">
                    "Demam anak di atas 38.5Â°C? Berikan kompres hangat di dahi dan lipatan ketiak, penuhi hidrasi, dan pantau respons."
                  </p>
                </div>

                {/* Facility Result Preview */}
                <div className="mt-3.5 p-3 rounded-2xl bg-[#F5F8F7] border border-[#E2ECEB] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#E2ECEB] flex items-center justify-center text-[#003D3B]">
                      <Hospital className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#062E2B]">RSUP Dr. Kariadi</h4>
                      <p className="text-[10px] text-[#647777]">Jl. Dr. Sutomo No.16, Semarang</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-emerald-600 block">Rujukan Utama</span>
                    <span className="text-[10px] text-[#647777]">1.8 km</span>
                  </div>
                </div>
              </motion.div>

              {/* FLOATING CARD 1: RSUD KOTA SEMARANG (Top Left) */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: -20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: [0, -6, 0],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.5 },
                  x: { duration: 0.6, delay: 0.5 },
                  y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
                }}
                className="absolute -top-7 -left-4 sm:-left-8 z-20 px-4 py-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-white shadow-[0_15px_35px_rgba(0,61,59,0.15)] flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-[#D8F5E8] text-[#005B52] flex items-center justify-center shrink-0">
                  <Hospital className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#062E2B] leading-tight">RSUD Kota Semarang</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-bold text-emerald-700">Buka 24 Jam â€¢ IGD Ready</span>
                  </div>
                </div>
              </motion.div>

              {/* FLOATING CARD 2: AI ASSISTANT ONLINE (Top Right) */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: -15 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: [0, 6, 0],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.6 },
                  x: { duration: 0.6, delay: 0.6 },
                  y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 },
                }}
                className="absolute -top-5 -right-3 sm:-right-6 z-20 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-white shadow-[0_15px_35px_rgba(0,61,59,0.15)] flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-xl bg-[#003D3B] text-[#63D6AE] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#062E2B] leading-tight">WARAS AI Assistant</h4>
                  <p className="text-[10px] text-[#005B52] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Online
                  </p>
                </div>
              </motion.div>

              {/* FLOATING CARD 3: PANDUAN P3K TERVERIFIKASI (Bottom Right) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: [0, -6, 0],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.7 },
                  y: { repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 1 },
                }}
                className="absolute -bottom-6 -right-2 sm:-right-6 z-20 px-4 py-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-white shadow-[0_15px_35px_rgba(0,61,59,0.15)] flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-[#D8F5E8] text-[#005B52] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#062E2B]">Panduan P3K</h4>
                  <p className="text-[10px] text-[#647777] font-semibold">Terverifikasi Medis</p>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}