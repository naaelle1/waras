import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  BookOpen,
  ArrowRight,
  PhoneCall,
  Activity,
  HeartPulse,
  Navigation,
  ShieldCheck,
  Search,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function BentoFeatures() {
  const [aidImageError, setAidImageError] = useState(false);

  return (
    <section id="fitur" className="py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden bg-[#022022]/[0.02]">
      {/* BACKGROUND WING WATERMARK */}
      <div className="absolute top-1/2 left-[-15%] -translate-y-1/2 w-[700px] h-auto pointer-events-none opacity-[0.05] select-none -z-0">
        <img src="/Wing.svg" alt="" className="w-full h-auto object-contain" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* SECTION HEADER (Clean Light Typography) */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#022022]/10 border border-[#37F4B4]/30 text-[#022022] text-xs font-medium mb-3">
            <Activity className="w-3.5 h-3.5 text-[#022022]" />
            <span>Fokus Layanan Utama</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#022022] tracking-tight leading-[1.15]">
            Kemudahan Informasi Medis, <br />
            <span className="font-normal text-[#022022]">
              Tanpa Kebingungan & Keraguan.
            </span>
          </h2>
          <p className="mt-3 text-[#022022]/70 text-sm sm:text-base font-light max-w-lg mx-auto">
            Dirancang secara bersih untuk memberikan pertolongan nyata: lokasi faskes siaga, panduan medis darurat, dan kontak darurat resmi Kota Semarang.
          </p>
        </div>

        {/* ASYMMETRIC BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* CARD 1: PETA & DIREKTORI FASKES KOTA SEMARANG (col-span-7) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-3xl bg-white border border-[#37F4B4]/20 p-6 sm:p-8 flex flex-col justify-between hover:shadow-[0_20px_45px_rgba(2,32,34,0.08)] hover:border-[#37F4B4]/40 transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#022022]/10 text-[#022022] text-xs font-medium border border-[#37F4B4]/25">
                  Direktori Siaga
                </span>
                <span className="text-[11px] font-mono text-[#022022] bg-[#022022]/10 px-2.5 py-0.5 rounded-full border border-[#37F4B4]/20">
                  37 Puskesmas & RS
                </span>
              </div>
              <h3 className="text-2xl font-normal text-[#022022] group-hover:text-[#022022] transition-colors">
                Pemetaan Faskes & Rute Darurat
              </h3>
              <p className="text-xs sm:text-sm text-[#022022]/70 font-light mt-1.5 leading-relaxed">
                Temukan lokasi Puskesmas terdekat dan Rumah Sakit rujukan dengan status operasional IGD 24 Jam, nomor telepon aktif, dan panduan rute navigasi langsung.
              </p>
            </div>

            {/* VISUAL TEASER: CLEAN FASKES LISTING */}
            <div className="my-6 p-4 rounded-2xl bg-[#022022]/5 border border-[#37F4B4]/20 space-y-2.5">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#37F4B4]/15 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#022022]/10 text-[#022022] flex items-center justify-center font-semibold text-xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-medium text-[#022022]">RSUD KRMT Wongsonegoro</h5>
                    <p className="text-[10px] font-light text-[#022022]/60">Semarang Selatan • IGD Siaga 24 Jam</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#022022] bg-[#022022]/10 px-2 py-0.5 rounded-full">1.2 km</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#37F4B4]/15 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#022022]/10 text-[#022022] flex items-center justify-center font-semibold text-xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-medium text-[#022022]">Puskesmas Pandanaran</h5>
                    <p className="text-[10px] font-light text-[#022022]/60">Semarang Selatan • Pelayanan Dasar & Vaksin</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#022022] bg-[#022022]/10 px-2 py-0.5 rounded-full">0.9 km</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#022022]/10 flex items-center justify-between">
              <span className="text-xs font-light text-[#022022]/65">Terhubung peta interaktif Kota Semarang</span>
              <Link
                to="/user/facilities"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#022022] group-hover:text-[#033033] transition-colors"
              >
                <span>Buka Peta Faskes</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#37F4B4] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* CARD 2: PANDUAN P3K DENGAN SLOT GAMBAR ELEMEN MEDIS (col-span-5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 rounded-3xl bg-white border border-[#37F4B4]/20 p-6 sm:p-8 flex flex-col justify-between hover:shadow-[0_20px_45px_rgba(2,32,34,0.08)] hover:border-[#37F4B4]/40 transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#022022]/10 text-[#022022] text-xs font-medium border border-[#37F4B4]/25">
                  Pertolongan Pertama
                </span>
                <ShieldCheck className="w-4 h-4 text-[#022022]" />
              </div>
              <h3 className="text-2xl font-normal text-[#022022] group-hover:text-[#022022] transition-colors">
                Panduan Darurat P3K
              </h3>
              <p className="text-xs sm:text-sm text-[#022022]/70 font-light mt-1.5 leading-relaxed">
                Instruksi langkah demi langkah penanganan awal sebelum tenaga medis tiba, mulai dari luka bakar, tersedak, hingga pingsan.
              </p>
            </div>

            {/* DESIGNATED IMAGE SLOT / MEDICAL FIRST AID ELEMENT */}
            <div className="my-6 p-4 rounded-2xl bg-gradient-to-b from-[#022022]/10 to-white border border-[#37F4B4]/20 flex flex-col items-center justify-center min-h-[140px] text-center relative overflow-hidden">
              {!aidImageError ? (
                <img
                  src="/images/elements/first-aid.png"
                  alt="Kotak P3K Medis"
                  onError={() => setAidImageError(true)}
                  className="max-h-24 w-auto object-contain drop-shadow-md z-10 transition-transform group-hover:scale-105"
                />
              ) : (
                /* Fallback First Aid Kit Vector Illustration */
                <div className="flex flex-col items-center z-10">
                  <div className="w-16 h-14 rounded-xl bg-[#022022] text-white flex items-center justify-center relative shadow-sm group-hover:scale-105 transition-transform">
                    {/* Handle */}
                    <div className="absolute -top-3 w-8 h-4 border-2 border-[#022022] rounded-t-lg bg-transparent" />
                    {/* Medical Cross */}
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <div className="absolute w-5 h-2 bg-[#37F4B4] rounded-xs" />
                      <div className="absolute h-5 w-2 bg-[#37F4B4] rounded-xs" />
                    </div>
                  </div>
                  <span className="mt-2 text-[10px] font-mono uppercase text-[#022022] tracking-wider">
                    Slot Elemen: Kotak P3K
                  </span>
                </div>
              )}
              <span className="text-[11px] font-light text-[#022022]/60 mt-1 z-10">
                Standar Penanganan Medis Aman
              </span>
            </div>

            <div className="pt-3 border-t border-[#022022]/10 flex items-center justify-between">
              <span className="text-xs font-light text-[#022022]/65">Langkah aman & tervalidasi</span>
              <Link
                to="/user/health-info/guides"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#022022] group-hover:text-[#033033] transition-colors"
              >
                <span>Lihat Panduan</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#37F4B4] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* CARD 3: ISTILAH MEDIS LENGKAP A-Z (col-span-6) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="lg:col-span-6 rounded-3xl bg-white border border-[#37F4B4]/20 p-6 sm:p-8 flex flex-col justify-between hover:shadow-[0_20px_45px_rgba(2,32,34,0.08)] hover:border-[#37F4B4]/40 transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#022022]/10 text-[#022022] text-xs font-medium border border-[#37F4B4]/25">
                  Glosarium Awam
                </span>
                <BookOpen className="w-4 h-4 text-[#022022]" />
              </div>
              <h3 className="text-xl font-normal text-[#022022] group-hover:text-[#022022] transition-colors">
                Kamus Medis A - Z Bahasa Awam
              </h3>
              <p className="text-xs sm:text-sm text-[#022022]/70 font-light mt-1.5 leading-relaxed">
                Pahami arti diagnosa, nama obat, serta singkatan resep dokter tanpa bingung oleh jargon teknis kesehatan.
              </p>
            </div>

            <div className="my-5 p-3 rounded-xl bg-[#022022]/5 border border-[#37F4B4]/20 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white border border-[#37F4B4]/20 flex items-center justify-center text-xs font-mono font-bold text-[#022022]">
                A-Z
              </span>
              <span className="text-xs font-light text-[#022022]/80">
                1.480+ Istilah medis disederhanakan dalam bahasa Indonesia sehari-hari.
              </span>
            </div>

            <div className="pt-3 border-t border-[#022022]/10 flex items-center justify-between">
              <span className="text-xs font-light text-[#022022]/65">Cari istilah & singkatan</span>
              <Link
                to="/user/health-info/medical-terms"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#022022] group-hover:text-[#033033] transition-colors"
              >
                <span>Buka Kamus Medis</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#37F4B4] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* CARD 4: HOTLINE DARURAT 119 SEMARANG (col-span-6) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="lg:col-span-6 rounded-3xl bg-[#022022] border border-[#37F4B4]/25 text-white p-6 sm:p-8 flex flex-col justify-between shadow-lg shadow-[#022022]/15 group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-white/10 text-[#37F4B4] text-xs font-medium border border-[#37F4B4]/30">
                  Hotline Tanggap Darurat
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#37F4B4] animate-ping" />
              </div>
              <h3 className="text-xl font-normal text-white">
                Pusat Panggilan Ambulans 119
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-light mt-1.5 leading-relaxed">
                Layanan darurat terpadu Kota Semarang (PSC 119). Langsung terhubung untuk penjemputan pasien kritis dan bantuan medis darurat.
              </p>
            </div>

            <div className="my-5 p-4 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#37F4B4] text-[#022022] flex items-center justify-center font-bold">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/70 block">Nomor Cepat</span>
                  <span className="text-2xl font-light font-mono text-white">119</span>
                </div>
              </div>
              <a
                href="tel:119"
                className="px-4 py-2 rounded-full bg-[#37F4B4] text-[#022022] text-xs font-medium hover:bg-white transition-colors"
              >
                Panggil Sekarang
              </a>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/70 font-light">
              <span>Siaga 24 Jam • Bebas Pulsa</span>
              <span className="text-[#37F4B4] font-medium">PSC Kota Semarang</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
