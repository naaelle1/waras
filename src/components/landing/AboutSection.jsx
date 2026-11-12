import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  MapPin,
  Bot,
  Hospital,
  ShieldCheck,
  ArrowRight,
  Compass,
  CheckCircle2,
  HeartPulse,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <section
      id="tentang"
      className="py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden bg-[#003D3B] text-white"
    >
      {/* AMBIENT MINT GLOWS & GRADIENT RHYTHM */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-radial from-[#63D6AE]/20 via-[#005B52]/30 to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-radial from-[#63D6AE]/15 via-transparent to-transparent blur-3xl pointer-events-none -z-0" />

      {/* Grid Pattern Mesh */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none -z-0"
        style={{
          backgroundImage: `linear-gradient(#63D6AE 1px, transparent 1px), linear-gradient(90deg, #63D6AE 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* EDITORIAL SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT: EDITORIAL ASYMMETRIC TEXT & BRAND INTRODUCTION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#63D6AE] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inisiatif Digital Kota Semarang</span>
            </div>

            {/* Very Large Editorial Heading (48px - 64px) */}
            <h2 className="text-3xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-extrabold text-white leading-[1.1] tracking-tight">
              WARAS Bukan Sekadar <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#63D6AE] via-emerald-200 to-[#63D6AE]">
                Platform Kesehatan.
              </span>
            </h2>

            {/* Concise Supporting Text */}
            <p className="text-emerald-100/80 text-base sm:text-lg font-normal leading-relaxed max-w-xl">
              WARAS hadir untuk menyederhanakan akses informasi kesehatan dan membantu masyarakat menemukan langkah yang tepat secara cepat, aman, dan tanpa kebingungan.
            </p>

            {/* Large Visual Stat / Pillar Element */}
            <div className="pt-2 border-t border-white/10 space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-black text-[#63D6AE] font-mono">
                  01
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white">
                    Satu Platform Terpadu
                  </h4>
                  <p className="text-xs text-emerald-200/70">
                    Untuk Berbagai Akses & Informasi Kesehatan Semarang
                  </p>
                </div>
              </div>

              {/* 3 Visual Pillars */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="block text-[11px] font-mono text-[#63D6AE]">01</span>
                  <span className="text-xs font-bold text-white block mt-0.5">INFORMASI</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="block text-[11px] font-mono text-[#63D6AE]">02</span>
                  <span className="text-xs font-bold text-white block mt-0.5">PANDUAN</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="block text-[11px] font-mono text-[#63D6AE]">03</span>
                  <span className="text-xs font-bold text-white block mt-0.5">FASILITAS</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/user/facilities"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#63D6AE] hover:text-white transition-colors"
              >
                <span>Pelajari integrasi seluruh faskes Semarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* RIGHT: ABSTRACT HEALTHCARE UI COMPOSITION (Visual > Text) */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div className="relative w-full max-w-lg">
              
              {/* Central Abstract Health Hub Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-6 sm:p-7 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.3)] space-y-5"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#63D6AE] text-[#003D3B] flex items-center justify-center font-bold text-xs">
                      <HeartPulse className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">WARAS Ecosystem</h4>
                      <p className="text-[10px] text-emerald-200/70">Terintegrasi Kota Semarang</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#63D6AE]/20 text-[#63D6AE] text-[10px] font-mono font-bold border border-[#63D6AE]/30">
                    Live System
                  </span>
                </div>

                {/* AI Interaction Bubble in Dark UI */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2">
                    <Bot className="w-3.5 h-3.5 text-[#63D6AE]" />
                    <span className="text-[11px] font-bold text-[#63D6AE]">Bantuan Awal Cepat</span>
                  </div>
                  <p className="text-xs text-emerald-100/90 leading-relaxed font-light">
                    “Langsung dapatkan panduan pertolongan pertama dan arahan faskes siaga tanpa harus bingung mencari di internet.”
                  </p>
                </div>

                {/* Location Pins & Stats Mini Strip */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-2xl font-black text-white font-mono block">37+</span>
                    <span className="text-[11px] text-emerald-200/80 font-medium">Puskesmas Siaga</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-2xl font-black text-white font-mono block">18+</span>
                    <span className="text-[11px] text-emerald-200/80 font-medium">RS Rujukan Utama</span>
                  </div>
                </div>
              </motion.div>

              {/* FLOATING CARD 1: FASKES STATUS */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-4 sm:-right-6 p-3.5 rounded-2xl bg-[#004D4A]/90 backdrop-blur-xl border border-white/20 shadow-xl flex items-center gap-3 z-20"
              >
                <div className="w-8 h-8 rounded-xl bg-[#63D6AE] text-[#003D3B] flex items-center justify-center shrink-0">
                  <Hospital className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white leading-tight">IGD 24 Jam</h5>
                  <p className="text-[10px] text-emerald-200">Semarang Siaga Bencana</p>
                </div>
              </motion.div>

              {/* FLOATING CARD 2: VERIFIED INFORMATION */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-6 -left-4 sm:-left-6 p-3.5 rounded-2xl bg-[#004D4A]/90 backdrop-blur-xl border border-white/20 shadow-xl flex items-center gap-3 z-20"
              >
                <div className="w-8 h-8 rounded-xl bg-white/20 text-[#63D6AE] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white leading-tight">Medis Terverifikasi</h5>
                  <p className="text-[10px] text-emerald-200">Bahasa Ringkas & Ramah</p>
                </div>
              </motion.div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
