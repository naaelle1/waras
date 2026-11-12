import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Bot,
  Hospital,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Users,
  Activity,
  HeartPulse,
  CheckCircle2
} from "lucide-react";

import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import HowItWorks from "../../components/landing/HowItWorks";
import About from "../../components/landing/About";
import Footer from "../../components/landing/Footer";

import { queueData } from "../../data/queueData";
import { facilities } from "../../data/facilities";

export default function Home() {
  const impactStats = [
    {
      value: "37",
      label: "Puskesmas Terhubung",
      desc: "Menjangkau 16 kecamatan di seluruh pelosok Kota Semarang.",
    },
    {
      value: "14",
      label: "Rumah Sakit Rujukan",
      desc: "Lengkap dengan nomor kontak darurat dan informasi IGD.",
    },
    {
      value: "24/7",
      label: "WARAS AI Siap Membantu",
      desc: "Konsultasi keluhan awal dan panduan rujukan kapan saja.",
    },
    {
      value: "100%",
      label: "Akses Terbuka & Bebas Biaya",
      desc: "Inisiatif kesehatan publik untuk seluruh warga tanpa pungutan.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFA] text-[#0D2626] font-inter selection:bg-[#003B3B] selection:text-white">
      {/* 1. FLOATING NAVIGATION BAR */}
      <Navbar />

      {/* 2. HERO SECTION WITH 3D PERSPECTIVE & FLOATING CARDS */}
      <Hero />

      {/* 3. IMPACT NUMBERS (SCROLL-TRIGGERED STATS PRESENTATION) */}
      <section className="py-12 border-y border-[#E2ECEB] bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {impactStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="space-y-1.5"
              >
                <span className="font-poppins font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#003B3B] block">
                  {stat.value}
                </span>
                <h3 className="font-poppins font-bold text-sm sm:text-base text-[#0D2626]">
                  {stat.label}
                </h3>
                <p className="text-xs text-[#526666] leading-relaxed">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURES BENTO GRID (SECTION PRESENTATION CARDS) */}
      <Features />

      {/* 5. HOW IT WORKS (STEP-BY-STEP INTERACTIVE FLOW) */}
      <HowItWorks />

      {/* 6. LIVE FASILITAS & ANTREAN SPOTLIGHT */}
      <section id="faskes" className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EBF5F5] text-[#003B3B]">
                <Activity className="w-3.5 h-3.5 text-[#0B6B6B]" />
                Pantau Langsung
              </span>
              <h2 className="font-poppins font-extrabold text-2xl sm:text-4xl text-[#0D2626] tracking-tight">
                Kondisi Antrean Fasilitas Saat Ini
              </h2>
              <p className="text-xs sm:text-sm text-[#526666] leading-relaxed">
                Data antrean faskes Kota Semarang diperbarui secara berkala agar Anda dapat menyesuaikan waktu keberangkatan dengan tenang.
              </p>
            </div>

            <Link
              to="/user/facilities"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#003B3B] hover:text-[#002D2D] transition-colors shrink-0"
            >
              <span>Lihat Semua 37 Faskes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {queueData.map((q, idx) => {
              const isCrowded = q.queueStatus === "Ramai";
              const isModerate = q.queueStatus === "Sedang";

              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="rounded-3xl bg-white border border-[#E2ECEB] p-6 shadow-xs hover:border-[#003B3B]/35 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-[#EBF5F5] text-[#003B3B] flex items-center justify-center font-bold">
                          <Hospital className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h3 className="font-poppins font-semibold text-sm text-[#0D2626] line-clamp-1">
                            {q.facilityName}
                          </h3>
                          <p className="text-xs text-[#526666]">{q.service}</p>
                        </div>
                      </div>

                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                          isCrowded
                            ? "bg-rose-50 text-rose-800 border-rose-200"
                            : isModerate
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : "bg-emerald-50 text-emerald-800 border-emerald-200"
                        }`}
                      >
                        {q.queueStatus}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isCrowded
                            ? "bg-rose-500 w-[80%]"
                            : isModerate
                            ? "bg-amber-500 w-[50%]"
                            : "bg-emerald-500 w-[20%]"
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-xs">
                      <div>
                        <span className="text-[11px] text-[#809494] block">Antrean</span>
                        <strong className="text-[#0D2626]">{q.currentQueue} Orang</strong>
                      </div>
                      <div>
                        <span className="text-[11px] text-[#809494] block">Estimasi Tunggu</span>
                        <strong className="text-[#0D2626]">{q.estimatedWait}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-gray-100">
                    <Link
                      to={`/user/facilities/${q.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#003B3B] hover:underline"
                    >
                      <span>Lihat Rincian Faskes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. WARAS AI CONSULTATION SHOWCASE */}
      <section id="ai" className="py-20 sm:py-28 bg-[#F0F5F5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-[#E2ECEB] p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5F5] text-[#003B3B] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#0B6B6B]" />
                <span>Kecerdasan Buatan Medis</span>
              </div>

              <h2 className="font-poppins font-extrabold text-2xl sm:text-4xl text-[#0D2626] tracking-tight">
                Punya Keluhan Kesehatan? Tanyakan pada WARAS AI
              </h2>

              <p className="text-sm sm:text-base text-[#526666] font-inter leading-relaxed">
                Asisten virtual pintar kami dilatih untuk mendengarkan gejala Anda, memberikan rekomendasi pertolongan pertama berbasis panduan medis terpercaya, serta mengarahkan ke faskes rujukan yang relevan di Semarang.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#0D2626]">
                  <CheckCircle2 className="w-4 h-4 text-[#003B3B] shrink-0" />
                  <span>Penjelasan tanpa istilah teknis yang membingungkan.</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#0D2626]">
                  <CheckCircle2 className="w-4 h-4 text-[#003B3B] shrink-0" />
                  <span>Dukungan informasi alur rujukan BPJS dan administrasi faskes.</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#0D2626]">
                  <CheckCircle2 className="w-4 h-4 text-[#003B3B] shrink-0" />
                  <span>Rekomendasi bacaan artikel kesehatan terverifikasi.</span>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  to="/user/ai"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#003B3B] hover:bg-[#002D2D] text-white font-semibold text-sm shadow-xs transition-colors"
                >
                  <Bot className="w-4 h-4" />
                  <span>Mulai Percakapan AI Gratis</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* AI Interactive Chat Card Mockup */}
            <div className="lg:col-span-5 bg-[#F8FAFA] rounded-2xl border border-[#E2ECEB] p-5 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between border-b border-[#E2ECEB] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#003B3B] text-white flex items-center justify-center font-bold text-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-xs text-[#0D2626]">WARAS Assistant</h3>
                    <span className="text-[10px] text-emerald-600 font-semibold">Siaga 24/7</span>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="space-y-2.5 text-xs font-inter">
                <div className="p-3 rounded-xl bg-[#003B3B] text-white rounded-tr-xs ml-6">
                  "Bagaimana cara membedakan demam biasa dengan gejala demam berdarah (DBD)?"
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#E2ECEB] text-[#0D2626] rounded-tl-xs mr-6 space-y-1.5 shadow-2xs">
                  <span className="font-semibold text-[#003B3B] block">Penjelasan Medis Awal:</span>
                  <p className="text-[11px] text-[#526666] leading-relaxed">
                    Demam DBD biasanya mendadak tinggi (39-40°C), disertai nyeri di belakang bola mata dan nyeri sendi hebat. Waspadai fase hari ke-3 s.d ke-5 saat demam mulai turun karena merupakan masa kritis kebocoran plasma.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/user/ai?q=Ciri%20fase%20kritis%20DBD"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-xl bg-[#EBF5F5] hover:bg-[#DDEEEE] text-[#003B3B] text-xs font-semibold transition-colors"
                >
                  <span>Coba Pertanyaan Ini di AI →</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. ABOUT & MISSION */}
      <About />

      {/* 9. FOOTER */}
      <Footer />
    </div>
  );
}
