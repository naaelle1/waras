import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Bot,
  Flag,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Hospital,
  Activity,
  Sparkles,
  Search,
  CheckCircle2,
  Stethoscope,
  HeartPulse
} from "lucide-react";

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="features" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* SECTION HEADER (EDITORIAL) */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5F5] text-[#003B3B] text-xs font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0B6B6B]" />
            <span>Pilar Solusi WARAS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-poppins font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#0D2626] tracking-tight"
          >
            Solusi Komprehensif untuk Navigasi Kesehatan Warga
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-[#526666] font-inter leading-relaxed max-w-2xl mx-auto"
          >
            Mengintegrasikan seluruh fasilitas kesehatan primer dan rujukan di Kota Semarang dalam satu platform yang mudah digunakan oleh siapa saja.
          </motion.p>
        </div>

        {/* BENTO GRID PRESENTATION CARDS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* CARD 1: PETA & PENCARIAN FASKES (WIDE BENTO 7 COLS) */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className="md:col-span-7 rounded-3xl bg-white border border-[#E2ECEB] p-6 sm:p-8 shadow-xs hover:border-[#003B3B]/35 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#EBF5F5] text-[#003B3B] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  37 Puskesmas & 14 RS
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#0D2626]">
                  Pencarian Faskes & Peta Interaktif
                </h3>
                <p className="text-xs sm:text-sm text-[#526666] font-inter leading-relaxed max-w-xl">
                  Temukan puskesmas atau rumah sakit rujukan terdekat berdasarkan kecamatan di Kota Semarang lengkap dengan koordinat rute, jam buka, dan kontak darurat.
                </p>
              </div>

              {/* Graphic Mockup Preview inside card */}
              <div className="pt-3">
                <div className="rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#003B3B]">
                    <Search className="w-3.5 h-3.5" />
                    <span>Filter Kecamatan Cepat:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Semua", "Banyumanik", "Tembalang", "Semarang Selatan", "Semarang Barat", "Pedurungan"].map((kec, i) => (
                      <span
                        key={i}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                          i === 0
                            ? "bg-[#003B3B] text-white border-[#003B3B]"
                            : "bg-white text-[#526666] border-[#E2ECEB]"
                        }`}
                      >
                        {kec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
              <Link
                to="/user/facilities"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#003B3B] group-hover:underline"
              >
                <span>Buka Peta Fasilitas Lengkap</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* CARD 2: REAL-TIME QUEUE MONITOR (5 COLS) */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className="md:col-span-5 rounded-3xl bg-white border border-[#E2ECEB] p-6 sm:p-8 shadow-xs hover:border-[#003B3B]/35 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#EBF5F5] text-[#003B3B] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Antrean
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#0D2626]">
                  Pantau Antrean Real-time
                </h3>
                <p className="text-xs sm:text-sm text-[#526666] font-inter leading-relaxed">
                  Ketahui estimasi waktu tunggu sebelum melangkah ke fasilitas kesehatan. Tidak perlu lagi menunggu berjam-jam di ruang tunggu.
                </p>
              </div>

              {/* Graphic queue gauge preview */}
              <div className="space-y-2 pt-2">
                <div className="p-3 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-[#0D2626]">
                    <span>Puskesmas Pandanaran</span>
                    <span className="text-emerald-700">Sepi (~10 m)</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[25%]" />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-[#0D2626]">
                    <span>RSUD K.R.M.T Wongsonegoro</span>
                    <span className="text-amber-700">Sedang (~18 m)</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[55%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
              <Link
                to="/user/facilities"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#003B3B] group-hover:underline"
              >
                <span>Lihat Semua Antrean Faskes</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* CARD 3: WARAS AI ASSISTANT (5 COLS) */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className="md:col-span-5 rounded-3xl bg-white border border-[#E2ECEB] p-6 sm:p-8 shadow-xs hover:border-[#003B3B]/35 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#003B3B] text-white flex items-center justify-center font-bold group-hover:scale-105 transition-transform shadow-xs">
                  <Bot className="w-6 h-6 text-[#DDEEEE]" />
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#EBF5F5] text-[#003B3B]">
                  Bertenaga Generative AI
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#0D2626]">
                  Konsultasi WARAS AI 24 Jam
                </h3>
                <p className="text-xs sm:text-sm text-[#526666] font-inter leading-relaxed">
                  Dapatkan penjelasan medis awal yang ramah dan mudah dipahami sebelum mengunjungi faskes, lengkap dengan rekomendasi bacaan terverifikasi.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#E2ECEB] space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#003B3B] font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Contoh Pertanyaan Populer:</span>
                </div>
                <div className="space-y-1 text-[#526666]">
                  <p className="p-1.5 rounded-lg bg-white border border-[#E2ECEB] truncate">
                    • Apa saja syarat rujukan BPJS ke rumah sakit?
                  </p>
                  <p className="p-1.5 rounded-lg bg-white border border-[#E2ECEB] truncate">
                    • Ciri-ciri fase kritis pada demam berdarah (DBD)?
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
              <Link
                to="/user/ai"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#003B3B] group-hover:underline"
              >
                <span>Mulai Konsultasi AI Sekarang</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* CARD 4: KOMUNITAS & LAPOR KESALAHAN (7 COLS) */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className="md:col-span-7 rounded-3xl bg-white border border-[#E2ECEB] p-6 sm:p-8 shadow-xs hover:border-[#003B3B]/35 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#EBF5F5] text-[#003B3B] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                  <Flag className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  Gotong Royong Data
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#0D2626]">
                  Partisipasi Warga untuk Akurasi Informasi
                </h3>
                <p className="text-xs sm:text-sm text-[#526666] font-inter leading-relaxed max-w-xl">
                  Menemukan jam operasional faskes yang keliru atau nomor kontak tidak aktif? Laporkan langsung melalui platform agar tim verifikasi segera memperbaruinya untuk seluruh warga.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="p-3 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB]">
                  <CheckCircle2 className="w-4 h-4 text-[#003B3B] mb-1" />
                  <span className="text-xs font-semibold text-[#0D2626] block">Lapor Cepat</span>
                  <span className="text-[11px] text-[#526666]">Formulir terpadu</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB]">
                  <CheckCircle2 className="w-4 h-4 text-[#003B3B] mb-1" />
                  <span className="text-xs font-semibold text-[#0D2626] block">Verifikasi Cepat</span>
                  <span className="text-[11px] text-[#526666]">Ditinjau tim dinas</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB]">
                  <CheckCircle2 className="w-4 h-4 text-[#003B3B] mb-1" />
                  <span className="text-xs font-semibold text-[#0D2626] block">Manfaat Bersama</span>
                  <span className="text-[11px] text-[#526666]">Akurasi kota Semarang</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
              <Link
                to="/user/report-problem"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#003B3B] group-hover:underline"
              >
                <span>Bantu Koreksi Informasi Faskes</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

