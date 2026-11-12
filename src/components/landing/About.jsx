import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Heart,
  Users,
  Building2,
  Sparkles,
  ArrowRight,
  BookOpen,
  MapPin,
  CheckCircle2
} from "lucide-react";

export default function About() {
  const values = [
    {
      title: "Transparansi Pelayanan",
      desc: "Menghadirkan keterbukaan informasi antrean dan operasional fasilitas publik tanpa biaya perantara.",
      icon: ShieldCheck,
    },
    {
      title: "Edukasi Medis Bahasa Ramah",
      desc: "Menerjemahkan istilah medis rumit ke dalam bahasa sehari-hari yang mudah dicerna seluruh keluarga.",
      icon: Heart,
    },
    {
      title: "Gotong Royong Komunitas",
      desc: "Mendorong partisipasi warga dalam menjaga akurasi informasi fasilitas di seluruh penjuru Semarang.",
      icon: Users,
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* EDITORIAL SPLIT: TENTANG WARAS & MISI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-5"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5F5] text-[#003B3B] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#0B6B6B]" />
              <span>Tentang Inisiatif WARAS</span>
            </div>

            <h2 className="font-poppins font-extrabold text-2xl sm:text-4xl text-[#0D2626] tracking-tight leading-tight">
              Mewujudkan Warga Semarang yang Sehat, Tenang, dan Terlayani.
            </h2>

            <p className="text-sm sm:text-base text-[#526666] font-inter leading-relaxed">
              WARAS (Warga Responsif & Akses Sehat) lahir dari kebutuhan nyata masyarakat akan platform terpusat yang menghubungkan warga dengan 37 Puskesmas dan 14 Rumah Sakit di seluruh Kota Semarang.
            </p>

            <p className="text-xs sm:text-sm text-[#526666] font-inter leading-relaxed">
              Dengan mengawinkan teknologi pemetaan geospasial, pelacakan antrean real-time, dan kecerdasan buatan medis dasar, kami berkomitmen memotong kebingungan dan birokrasi yang melelahkan.
            </p>

            <div className="pt-2">
              <Link
                to="/user/facilities"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#003B3B] hover:bg-[#002D2D] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors"
              >
                <span>Lihat Jaringan Fasilitas Semarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* RIGHT SIDE: VALUES CARDS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-4"
          >
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white border border-[#E2ECEB] shadow-xs flex items-start gap-4 hover:border-[#003B3B]/30 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#EBF5F5] text-[#003B3B] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-poppins font-semibold text-base text-[#0D2626]">
                      {v.title}
                    </h3>
                    <p className="font-inter text-xs sm:text-sm text-[#526666] leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

