import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Clock,
  Bot,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  ClipboardList,
  ShieldCheck
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Cari & Pilih Fasilitas Terdekat",
      desc: "Gunakan peta geospasial pintar untuk menemukan puskesmas atau rumah sakit rujukan terdekat di kecamatan Anda.",
      icon: Search,
      badge: "Peta & Filter Interaktif",
      highlight: "Tersedia 37 Puskesmas & 14 Rumah Sakit",
    },
    {
      num: "02",
      title: "Cek Status Antrean Sebelum Berangkat",
      desc: "Pantau estimasi waktu tunggu poli secara live dari rumah agar Anda tidak perlu mengantre berjam-jam di ruang tunggu.",
      icon: Clock,
      badge: "Transparansi Waktu Nyata",
      highlight: "Estimasi waktu tunggu terbarui otomatis",
    },
    {
      num: "03",
      title: "Konsultasi Cepat Bersama WARAS AI",
      desc: "Pahami gejala awal dan pastikan berkas administrasi rujukan BPJS telah lengkap sebelum tiba di fasilitas kesehatan.",
      icon: Bot,
      badge: "Bantuan AI Siaga 24/7",
      highlight: "Edukasi medis dasar & panduan rujukan",
    },
    {
      num: "04",
      title: "Kunjungan Efisien & Tepat Waktu",
      desc: "Tiba di fasilitas kesehatan pada waktu yang tepat, peroleh pelayanan medis secara tenang, nyaman, dan terarah.",
      icon: CheckCircle2,
      badge: "Hasil Terbaik untuk Warga",
      highlight: "Pelayanan publik yang bermartabat",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#F8FAFA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* EDITORIAL HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E2ECEB] text-[#003B3B] text-xs font-semibold shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0B6B6B]" />
            <span>Alur Pelayanan Mudah</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-poppins font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#0D2626] tracking-tight"
          >
            Empat Langkah Menuju Layanan Kesehatan Efisien
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-[#526666] font-inter leading-relaxed max-w-2xl mx-auto"
          >
            Dirancang sesederhana mungkin agar seluruh lapisan masyarakat Kota Semarang dapat mengakses bantuan medis dengan percaya diri.
          </motion.p>
        </div>

        {/* STEP-BY-STEP PRESENTATION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl bg-white border border-[#E2ECEB] p-6 sm:p-7 shadow-xs hover:border-[#003B3B]/35 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  {/* Step Number & Badge */}
                  <div className="flex items-center justify-between">
                    <span className="font-poppins font-extrabold text-2xl sm:text-3xl text-[#003B3B]/20 group-hover:text-[#003B3B] transition-colors">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#EBF5F5] text-[#003B3B] flex items-center justify-center font-bold group-hover:bg-[#003B3B] group-hover:text-white transition-all shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="font-poppins font-bold text-base sm:text-lg text-[#0D2626] leading-snug">
                      {step.title}
                    </h3>
                    <p className="font-inter text-xs sm:text-sm text-[#526666] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Card Tag */}
                <div className="pt-5 mt-5 border-t border-gray-100">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#003B3B]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {step.highlight}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* BOTTOM ACTION CTA BOX */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-r from-[#003B3B] to-[#002D2D] text-white p-7 sm:p-10 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center sm:text-left max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#DDEEEE]">
              Siap Menjaga Kesehatan Anda?
            </span>
            <h3 className="font-poppins font-bold text-xl sm:text-3xl text-white">
              Akses Semua Layanan Sekarang Tanpa Biaya
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 font-inter">
              Tidak perlu unduh aplikasi berat. Cukup buka melalui peramban web di smartphone atau komputer Anda.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/user/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#003B3B] font-semibold text-sm hover:bg-[#EBF5F5] transition-colors shadow-xs active:scale-95"
            >
              <span>Mulai di Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

