import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  MapPin,
  BookOpen,
  ArrowRight,
  ChevronRight,
  ShieldAlert,
  Send,
  Navigation,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function BentoFeatures() {
  return (
    <section id="fitur" className="py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden bg-white">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-radial from-[#63D6AE]/15 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        
        {/* SECTION HEADER (Wireframe aligned) */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D8F5E8] text-[#005B52] text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fitur Unggulan WARAS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062E2B] tracking-tight leading-[1.15]">
            Semua yang Anda Butuhkan, <br />
            Tanpa Harus Mencari Terpisah.
          </h2>
          <p className="mt-3 text-[#647777] text-sm sm:text-base font-normal max-w-lg mx-auto">
            Akses langsung ke asistensi medis cerdas, pemetaan faskes, panduan darurat, dan informasi terkurasi dalam satu tempat.
          </p>
        </div>

        {/* ASYMMETRIC BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 1. LARGE FEATURE: AI ASSISTANT KESEHATAN (col-span-7) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-3xl bg-[#F5F8F7] border border-[#E2ECEB] p-6 sm:p-8 flex flex-col justify-between hover:bg-white hover:border-[#63D6AE] hover:shadow-[0_20px_50px_rgba(0,61,59,0.08)] hover:-translate-y-1 transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#D8F5E8] text-[#005B52] text-xs font-bold">
                  AI Assistant Cerdas
                </span>
                <span className="text-[11px] font-mono text-[#005B52] bg-white px-2.5 py-0.5 rounded-full border border-[#E2ECEB]">
                  Konsultasi 24/7
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#062E2B] group-hover:text-[#003D3B] transition-colors">
                AI Assistant Kesehatan
              </h3>
              <p className="text-xs sm:text-sm text-[#647777] mt-1.5 leading-relaxed">
                Tanyakan keluhan atau gejala awal dan peroleh panduan penanganan pertama terstruktur sebelum ke faskes.
              </p>
            </div>

            {/* VISUAL INTERFACE: CHAT BUBBLES MOCKUP */}
            <div className="my-6 p-4 sm:p-5 rounded-2xl bg-white border border-[#E2ECEB] space-y-3 shadow-xs">
              {/* User Bubble */}
              <div className="flex justify-end">
                <div className="bg-[#003D3B] text-white p-3 rounded-2xl rounded-tr-xs text-xs max-w-[85%] shadow-xs">
                  <p>Kaki saya terkilir saat badminton pagi ini, apa langkah awalnya?</p>
                </div>
              </div>
              {/* AI Bubble */}
              <div className="flex items-start gap-2.5 max-w-[92%]">
                <div className="w-7 h-7 rounded-lg bg-[#005B52] text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                  AI
                </div>
                <div className="bg-[#F5F8F7] border border-[#E2ECEB] p-3 rounded-2xl rounded-tl-xs text-xs space-y-1">
                  <span className="text-[10px] font-bold text-[#005B52] bg-[#D8F5E8] px-2 py-0.5 rounded-full">
                    Metode R.I.C.E
                  </span>
                  <p className="text-[#062E2B] leading-relaxed">
                    Istirahatkan kaki, kompres es 15-20 menit, dan posisikan kaki lebih tinggi. Jangan dipijat keras saat masih bengkak akut.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2ECEB] flex items-center justify-between">
              <span className="text-xs text-[#647777]">Respon instan berbasis referensi medis</span>
              <Link
                to="/user/ai"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#003D3B] group-hover:text-[#005B52] transition-colors"
              >
                <span>Coba AI Assistant</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* 2. MEDIUM FEATURE: CARI FASILITAS (col-span-5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 rounded-3xl bg-[#F5F8F7] border border-[#E2ECEB] p-6 sm:p-7 flex flex-col justify-between hover:bg-white hover:border-[#63D6AE] hover:shadow-[0_20px_50px_rgba(0,61,59,0.08)] hover:-translate-y-1 transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-[#D8F5E8] text-[#005B52] text-xs font-bold">
                  Geolokasi Faskes
                </span>
                <span className="text-xs font-bold text-[#003D3B]">37+ Lokasi</span>
              </div>
              <h3 className="text-xl font-bold text-[#062E2B] group-hover:text-[#003D3B] transition-colors">
                Cari Fasilitas
              </h3>
              <p className="text-xs text-[#647777] mt-1 leading-relaxed">
                Temukan RS, Puskesmas, dan Klinik terdekat dari lokasi Anda di Kota Semarang.
              </p>
            </div>

            {/* VISUAL INTERFACE: MINI MAP & LOCATION PINS */}
            <div className="my-5 p-3.5 rounded-2xl bg-white border border-[#E2ECEB] space-y-2">
              <div className="p-2.5 rounded-xl bg-[#F5F8F7] border border-[#E2ECEB] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <div>
                    <h5 className="font-bold text-[#062E2B]">RSUD KRMT Wongsonegoro</h5>
                    <span className="text-[10px] text-[#647777]">IGD 24 Jam • Tipe B</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#003D3B] bg-white px-2 py-0.5 rounded-md border border-[#E2ECEB]">
                  2.4 km
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#F5F8F7] border border-[#E2ECEB] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  <div>
                    <h5 className="font-bold text-[#062E2B]">Puskesmas Pandanaran</h5>
                    <span className="text-[10px] text-[#647777]">Faskes Tingkat 1</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#003D3B] bg-white px-2 py-0.5 rounded-md border border-[#E2ECEB]">
                  1.1 km
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2ECEB] flex justify-end">
              <Link
                to="/user/facilities"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#003D3B] group-hover:text-[#005B52] transition-colors"
              >
                <span>Buka Direktori Peta</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* 3. MEDIUM FEATURE: PANDUAN KESEHATAN (col-span-5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 rounded-3xl bg-[#F5F8F7] border border-[#E2ECEB] p-6 sm:p-7 flex flex-col justify-between hover:bg-white hover:border-[#63D6AE] hover:shadow-[0_20px_50px_rgba(0,61,59,0.08)] hover:-translate-y-1 transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-[#D8F5E8] text-[#005B52] text-xs font-bold">
                  SOP & Darurat
                </span>
                <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-100">
                  Call 119
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#062F2F] group-hover:text-[#003D3B] transition-colors">
                Panduan Kesehatan & P3K
              </h3>
              <p className="text-xs text-[#647777] mt-1 leading-relaxed">
                Langkah pertolongan pertama terverifikasi dan panduan alur rujukan berjenjang BPJS tanpa panik.
              </p>
            </div>

            {/* VISUAL INTERFACE: STEP CARDS */}
            <div className="my-5 space-y-2">
              <div className="p-2.5 rounded-xl bg-white border border-[#E2ECEB] flex items-center gap-2.5 text-xs">
                <span className="w-5 h-5 rounded-md bg-[#003D3B] text-white flex items-center justify-center font-bold text-[10px]">
                  1
                </span>
                <span className="text-[#062E2B] font-medium">Ketahui tingkat kedaruratan korban</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#E2ECEB] flex items-center gap-2.5 text-xs">
                <span className="w-5 h-5 rounded-md bg-[#005B52] text-white flex items-center justify-center font-bold text-[10px]">
                  2
                </span>
                <span className="text-[#062E2B] font-medium">Terapkan tindakan P3K yang terverifikasi</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#E2ECEB] flex items-center gap-2.5 text-xs">
                <span className="w-5 h-5 rounded-md bg-[#63D6AE] text-[#003D3B] flex items-center justify-center font-bold text-[10px]">
                  3
                </span>
                <span className="text-[#062E2B] font-medium">Hubungi hotline ambulans jika gawat</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2ECEB] flex justify-end">
              <Link
                to="/user/health-info/guides"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#003D3B] group-hover:text-[#005B52] transition-colors"
              >
                <span>Lihat Semua Panduan</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* 4. WIDE FEATURE: INFORMASI & ARTIKEL (col-span-7) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 rounded-3xl bg-[#F5F8F7] border border-[#E2ECEB] p-6 sm:p-8 flex flex-col justify-between hover:bg-white hover:border-[#63D6AE] hover:shadow-[0_20px_50px_rgba(0,61,59,0.08)] hover:-translate-y-1 transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-[#D8F5E8] text-[#005B52] text-xs font-bold">
                  Edukasi Medis
                </span>
                <span className="text-[11px] text-[#647777]">Dokter Reviewed</span>
              </div>
              <h3 className="text-2xl font-bold text-[#062E2B] group-hover:text-[#003D3B] transition-colors">
                Informasi & Artikel Medis
              </h3>
              <p className="text-xs sm:text-sm text-[#647777] mt-1.5 leading-relaxed">
                Artikel kesehatan preventif dan kuratif yang ditulis dengan bahasa yang mudah dipahami seluruh kalangan keluarga.
              </p>
            </div>

            {/* VISUAL INTERFACE: ARTICLE PREVIEW CARDS */}
            <div className="my-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-[#E2ECEB] space-y-1.5">
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Kedaruratan
                </span>
                <h5 className="text-xs font-bold text-[#062E2B] line-clamp-1">
                  Pertolongan Pertama Tersedak
                </h5>
                <p className="text-[11px] text-[#647777] line-clamp-2">
                  Manuver Heimlich dan tindakan mandiri menangani sumbatan jalan napas.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#E2ECEB] space-y-1.5">
                <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 text-[10px] font-bold">
                  Penyakit Tropis
                </span>
                <h5 className="text-xs font-bold text-[#062E2B] line-clamp-1">
                  Fase Kritis Demam Berdarah
                </h5>
                <p className="text-[11px] text-[#647777] line-clamp-2">
                  Gejala tanda bahaya saat suhu tubuh turun pada hari ke-3 hingga ke-5.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2ECEB] flex items-center justify-between">
              <span className="text-xs text-[#647777]">Diperbarui secara berkala</span>
              <Link
                to="/user/health-info/articles"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#003D3B] group-hover:text-[#005B52] transition-colors"
              >
                <span>Baca Artikel Terlengkap</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
