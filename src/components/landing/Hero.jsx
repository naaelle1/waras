import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
  Bot,
  ShieldCheck,
  Hospital,
  Activity,
  Search,
  CheckCircle2,
  ChevronRight,
  Users
} from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax and scroll scale transforms
  const mockupScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const mockupRotateX = useTransform(scrollYProgress, [0, 1], [5, 0]);
  const floatingCardY1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const floatingCardY2 = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const floatingCardY3 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative pt-28 sm:pt-36 pb-20 sm:pb-32 overflow-hidden"
    >
      {/* AMBIENT BACKGROUND GLOW (SLOW DRIFT) */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-tr from-[#EBF5F5] via-[#DDEEEE]/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-10 w-72 h-72 bg-[#DDEEEE]/40 rounded-full blur-2xl pointer-events-none -z-10"
      />
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-20 left-10 w-80 h-80 bg-[#E0F0F0]/50 rounded-full blur-2xl pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO EDITORIAL HEADER (STAGGERED REVEAL) */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2ECEB] shadow-2xs select-none"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-[#003B3B] font-inter">
              Portal Kesehatan Terpadu Kota Semarang
            </span>
            <span className="text-xs text-[#809494]">•</span>
            <span className="text-xs font-medium text-[#526666]">Terintegrasi Faskes</span>
          </motion.div>

          {/* Staggered Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-poppins font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#0D2626] tracking-tight leading-[1.15]"
          >
            Layanan Kesehatan Semarang,{" "}
            <span className="text-[#003B3B] relative inline-block">
              Lebih Cepat,
              <span className="absolute left-0 bottom-1 w-full h-2 bg-[#EBF5F5] -z-10 rounded-full" />
            </span>{" "}
            Akurat & Terbuka.
          </motion.h1>

          {/* Editorial Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base lg:text-lg text-[#526666] font-inter leading-relaxed max-w-2xl mx-auto"
          >
            Pantau antrean puskesmas secara real-time, temukan fasilitas kesehatan terdekat beserta rutenya, dan dapatkan panduan awal keluhan Anda bersama asisten AI terpercaya.
          </motion.p>

          {/* Dual CTAs with Hover Interaction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <Link
              to="/user/dashboard"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#003B3B] hover:bg-[#002D2D] text-white font-semibold text-sm shadow-xs hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <span>Akses Dashboard Warga</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="#features"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-[#F8FAFA] text-[#003B3B] border border-[#E2ECEB] font-semibold text-sm transition-all duration-200 cursor-pointer shadow-2xs"
            >
              <Search className="w-4 h-4 text-[#0B6B6B]" />
              <span>Jelajahi Fitur</span>
            </a>
          </motion.div>

          {/* Trust points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 text-xs text-[#526666] font-inter"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#003B3B]" /> 37 Puskesmas Kota Semarang
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#003B3B]" /> 14 Rumah Sakit Rujukan
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#003B3B]" /> Konsultasi AI 24 Jam
            </span>
          </motion.div>
        </div>

        {/* 3D INTERACTIVE HERO CANVAS & FLOATING SATELLITE CARDS */}
        <div className="relative mt-12 sm:mt-16 max-w-5xl mx-auto [perspective:1400px]">
          {/* MAIN PERSPECTIVE PRESENTATION CANVAS */}
          <motion.div
            style={{
              scale: mockupScale,
              y: mockupY,
              rotateX: mockupRotateX,
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative rounded-2xl sm:rounded-3xl bg-white border border-[#E2ECEB] shadow-xl overflow-hidden transition-shadow duration-300"
          >
            {/* Window Browser Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#F8FAFA] border-b border-[#E2ECEB]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-[#E2ECEB] text-[11px] font-mono text-[#526666] max-w-xs truncate shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>waras.semarangkota.go.id/dashboard</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#003B3B]">
                <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                <span className="hidden sm:inline">Live Antrean</span>
              </div>
            </div>

            {/* MOCKUP INTERIOR PREVIEW (COMPACT HEALTH DASHBOARD) */}
            <div className="p-4 sm:p-7 bg-[#F8FAFA] space-y-5 select-none">
              {/* Mockup Hero Banner Inside Canvas */}
              <div className="rounded-2xl bg-gradient-to-r from-[#003B3B] to-[#004848] text-white p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1 max-w-md">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/15 text-[#DDEEEE]">
                    <Sparkles className="w-3 h-3" /> Dashboard Kesehatan Warga
                  </div>
                  <h3 className="font-poppins font-bold text-lg sm:text-xl">
                    Halo, Warga Semarang! 👋
                  </h3>
                  <p className="text-xs text-gray-200 line-clamp-2">
                    Pantau kondisi antrean faskes secara real-time dan gunakan WARAS AI untuk konsultasi keluhan awal Anda.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 shrink-0">
                  <div className="p-2 rounded-xl bg-white/10 text-center min-w-[80px]">
                    <span className="text-sm font-bold block">37</span>
                    <span className="text-[10px] text-gray-300">Puskesmas</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/10 text-center min-w-[80px]">
                    <span className="text-sm font-bold block">14</span>
                    <span className="text-[10px] text-gray-300">RS Rujukan</span>
                  </div>
                </div>
              </div>

              {/* Mockup 2-Column Split: Antrean & AI Snippet */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Antrean Monitor */}
                <div className="md:col-span-7 bg-white p-4 rounded-xl border border-[#E2ECEB] space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#003B3B]" />
                      <span className="text-xs font-semibold text-[#0D2626]">Status Antrean Faskes Hari Ini</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                      Live
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F8FAFA] border border-[#E2ECEB]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#EBF5F5] text-[#003B3B] flex items-center justify-center font-bold text-xs">
                          <Hospital className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#0D2626]">Puskesmas Pandanaran</p>
                          <p className="text-[10px] text-[#526666]">Poli Umum • Semarang Selatan</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-emerald-700 block">3 Antrean</span>
                        <span className="text-[10px] text-[#809494]">~10 Menit</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F8FAFA] border border-[#E2ECEB]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#EBF5F5] text-[#003B3B] flex items-center justify-center font-bold text-xs">
                          <Hospital className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#0D2626]">RSUD K.R.M.T Wongsonegoro</p>
                          <p className="text-[10px] text-[#526666]">IGD & Rujukan Utama</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-amber-700 block">6 Antrean</span>
                        <span className="text-[10px] text-[#809494]">~18 Menit</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Assistant Preview Snippet */}
                <div className="md:col-span-5 bg-white p-4 rounded-xl border border-[#E2ECEB] flex flex-col justify-between space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-[#003B3B]" />
                      <span className="text-xs font-semibold text-[#0D2626]">WARAS AI Assistant</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded-lg bg-[#EBF5F5] text-[#003B3B] font-medium leading-relaxed">
                      "Anak saya demam 38°C sejak kemarin, apa langkah pertolongan pertamanya?"
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#F8FAFA] border border-[#E2ECEB] text-[#0D2626] leading-relaxed text-[11px]">
                      <strong className="text-[#003B3B] block mb-0.5">Saran WARAS AI:</strong>
                      Berikan kompres hangat di dahi/lipatan ketiak, jaga hidrasi cukup, dan catat riwayat demam sebelum ke faskes.
                    </div>
                  </div>

                  <div className="pt-1">
                    <div className="w-full py-1.5 px-3 rounded-lg bg-[#F8FAFA] border border-[#E2ECEB] text-[11px] text-[#809494] flex items-center justify-between">
                      <span>Tanyakan keluhan kesehatan...</span>
                      <ArrowRight className="w-3 h-3 text-[#003B3B]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FLOATING SATELLITE CARD 1 (TOP RIGHT: LIVE QUEUE BADGE) */}
          <motion.div
            style={{ y: floatingCardY1 }}
            animate={{
              y: [-6, 6, -6],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="hidden sm:flex absolute -top-8 -right-6 lg:-right-10 z-20 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-[#E2ECEB] shadow-lg max-w-xs items-center gap-3 select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0 border border-emerald-200">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#0D2626]">Puskesmas Halmahera</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <p className="text-[11px] text-[#526666]">Antrean: <strong>4 Orang</strong> • Est. 12 Menit</p>
            </div>
          </motion.div>

          {/* FLOATING SATELLITE CARD 2 (BOTTOM LEFT: AI ASSISTANT PILL) */}
          <motion.div
            style={{ y: floatingCardY2 }}
            animate={{
              y: [8, -8, 8],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="hidden sm:flex absolute -bottom-6 -left-6 lg:-left-10 z-20 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-[#E2ECEB] shadow-lg max-w-xs items-center gap-3 select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#003B3B] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Bot className="w-5 h-5 text-[#DDEEEE]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#0D2626]">WARAS Assistant</span>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                  Siaga 24/7
                </span>
              </div>
              <p className="text-[11px] text-[#526666]">Analisis gejala & edukasi medis ramah</p>
            </div>
          </motion.div>

          {/* FLOATING SATELLITE CARD 3 (BOTTOM RIGHT: VERIFIED BPJS & DINKES) */}
          <motion.div
            style={{ y: floatingCardY3 }}
            animate={{
              y: [-8, 8, -8],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="hidden md:flex absolute -bottom-8 right-12 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#E2ECEB] shadow-lg items-center gap-2.5 select-none"
          >
            <ShieldCheck className="w-5 h-5 text-[#003B3B]" />
            <span className="text-xs font-semibold text-[#0D2626]">
              Terverifikasi Fasilitas Kesehatan Kota Semarang
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

