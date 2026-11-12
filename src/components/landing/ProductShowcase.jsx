import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  ShieldCheck,
  Send,
  Navigation,
  PhoneCall,
  Search,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Bot,
  Hospital,
} from "lucide-react";
import { Link } from "react-router-dom";
import { productShowcaseSlides } from "../../data/landingData";

export default function ProductShowcase() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Chat interaction simulation for Slide 1
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "user",
      text: "Anak saya panas 38.5°C sejak sore, apa tindakan awal sebelum ke faskes?",
      time: "19:20",
    },
    {
      sender: "ai",
      text: "Langkah awal: 1) Berikan kompres air hangat di lipatan ketiak/paha. 2) Kenakan pakaian tipis dan jaga suhu ruangan sejuk. 3) Berikan cairan ekstra (air putih/ASI). Jika disertai kejang atau lemas tidak mau minum, segera ke IGD terdekat.",
      time: "19:20",
    },
  ]);

  const quickPrompts = [
    "Pertolongan tersedak",
    "Tensi darah tinggi",
    "Jadwal IGD 24 Jam",
  ];

  return (
    <section id="showcase" className="py-20 lg:py-28 px-4 sm:px-6 relative overflow-hidden bg-[#F6FAF9]">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-radial from-[#8FE3C1]/20 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDF8EC] text-[#006B5E] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Product Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062F2F] tracking-tight leading-[1.2]">
            Lihat Cara Kerja WARAS Secara Nyata.
          </h2>
          <p className="mt-3 text-[#647777] text-sm sm:text-base font-normal max-w-lg mx-auto">
            Jelajahi antarmuka interaktif yang dirancang bersih, cepat, dan mudah dipahami dalam situasi mendesak sekalipun.
          </p>
        </div>

        {/* MAIN PRODUCT SHOWCASE CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: INTERACTIVE FEATURE SELECTOR TABS */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            {productShowcaseSlides.map((slide, index) => {
              const isActive = activeSlide === index;
              return (
                <div
                  key={slide.id}
                  onClick={() => setActiveSlide(index)}
                  className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-300 border text-left ${
                    isActive
                      ? "bg-white border-[#8FE3C1] shadow-[0_12px_32px_rgba(0,59,59,0.08)] scale-[1.02]"
                      : "bg-white/60 border-transparent hover:bg-white/80 hover:border-[#E2ECEB]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-[#DDF8EC] text-[#006B5E]"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span className="text-[11px] font-semibold text-[#006B5E]">
                      {slide.badge}
                    </span>
                  </div>

                  <h3
                    className={`text-base sm:text-lg font-bold transition-colors ${
                      isActive ? "text-[#003B3B]" : "text-[#062F2F]"
                    }`}
                  >
                    {slide.title}
                  </h3>

                  <p className="mt-1.5 text-xs sm:text-sm text-[#647777] leading-relaxed">
                    {slide.description}
                  </p>

                  {isActive && (
                    <div className="mt-3.5 pt-3 border-t border-[#F0F5F4] flex items-center justify-between text-xs font-semibold text-[#003B3B]">
                      <span>Sedang Ditampilkan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: DYNAMIC PRODUCT UI MOCKUP WINDOW */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="rounded-3xl bg-white border border-[#E2ECEB] shadow-[0_20px_50px_rgba(0,59,59,0.1)] overflow-hidden">
              
              {/* Window Header / Browser Bar */}
              <div className="px-5 py-3.5 bg-[#003B3B] text-white flex items-center justify-between border-b border-emerald-950/20">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 text-xs font-mono text-emerald-100/70 hidden sm:inline">
                    waras.semarangkota.go.id / {productShowcaseSlides[activeSlide].id}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#8FE3C1] font-bold bg-white/10 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8FE3C1] animate-pulse" />
                  Live Preview
                </div>
              </div>

              {/* Dynamic Screen Content with AnimatePresence */}
              <div className="p-5 sm:p-7 min-h-[460px] bg-white flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  {/* SLIDE 1: AI ASSISTANT SIMULATION */}
                  {activeSlide === 0 && (
                    <motion.div
                      key="slide-ai"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-[#F0F5F4]">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-[#003B3B] text-[#8FE3C1] flex items-center justify-center font-bold text-xs">
                            <Bot className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#062F2F]">WARAS AI Consultant</h4>
                            <p className="text-[10px] text-[#647777]">Asisten Cerdas Penanganan Awal</p>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-100">
                          Aktif 24/7
                        </span>
                      </div>

                      {/* Chat Stream */}
                      <div className="space-y-3 text-xs max-h-[250px] overflow-y-auto pr-1">
                        {chatMessages.map((msg, i) => (
                          <div
                            key={i}
                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[85%] p-3.5 rounded-2xl ${
                                msg.sender === "user"
                                  ? "bg-[#003B3B] text-white rounded-tr-xs"
                                  : "bg-[#F6FAF9] border border-[#E2ECEB] text-[#062F2F] rounded-tl-xs"
                              }`}
                            >
                              <p className="leading-relaxed">{msg.text}</p>
                              <span
                                className={`text-[9px] block mt-1 ${
                                  msg.sender === "user" ? "text-white/60 text-right" : "text-[#647777]"
                                }`}
                              >
                                {msg.time}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Quick Prompt Chips */}
                      <div className="pt-2">
                        <span className="text-[11px] font-medium text-[#647777] block mb-1.5">
                          Contoh pertanyaan cepat:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {quickPrompts.map((prompt, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setChatMessages((prev) => [
                                  ...prev,
                                  { sender: "user", text: prompt, time: "19:21" },
                                  {
                                    sender: "ai",
                                    text: `Berikut rekomendasi dan langkah panduan cepat mengenai "${prompt}". Tetap prioritaskan keselamatan dan hubungi medis jika darurat.`,
                                    time: "19:21",
                                  },
                                ]);
                              }}
                              className="px-2.5 py-1 rounded-full bg-[#F6FAF9] hover:bg-[#DDF8EC] hover:text-[#006B5E] text-[#062F2F] text-[11px] font-medium border border-[#E2ECEB] transition-colors"
                            >
                              + {prompt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value="Tulis keluhan atau gejala di sini..."
                          className="flex-1 px-3.5 py-2 rounded-xl bg-[#F6FAF9] border border-[#E2ECEB] text-xs text-gray-400"
                        />
                        <Link
                          to="/user/ai"
                          className="px-3.5 py-2 rounded-xl bg-[#003B3B] text-white text-xs font-bold flex items-center gap-1 hover:bg-[#006B5E] transition-colors"
                        >
                          <span>Kirim</span>
                          <Send className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}

                  {/* SLIDE 2: FASILITAS KESEHATAN DIRECTORY SIMULATION */}
                  {activeSlide === 1 && (
                    <motion.div
                      key="slide-faskes"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-3.5"
                    >
                      {/* Search & Filter Header */}
                      <div className="flex gap-2">
                        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F6FAF9] border border-[#E2ECEB] text-xs">
                          <Search className="w-3.5 h-3.5 text-[#006B5E]" />
                          <span className="text-[#062F2F] font-medium">Semarang Tengah & Selatan</span>
                        </div>
                        <span className="px-3 py-2 rounded-xl bg-[#DDF8EC] text-[#006B5E] text-xs font-bold">
                          3 Faskes Dekat
                        </span>
                      </div>

                      {/* Filter Badges */}
                      <div className="flex gap-1.5 text-[11px]">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#003B3B] text-white font-medium">
                          Semua Faskes
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-[#647777] font-medium">
                          IGD 24 Jam
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-[#647777] font-medium">
                          BPJS Ready
                        </span>
                      </div>

                      {/* Mockup Facility List */}
                      <div className="space-y-2.5">
                        <div className="p-3.5 rounded-2xl bg-[#F6FAF9] border border-[#8FE3C1]/50 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#DDF8EC] text-[#006B5E] flex items-center justify-center font-bold">
                              <Hospital className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="text-xs font-bold text-[#062F2F]">RSUP Dr. Kariadi</h4>
                                <span className="px-1.5 py-0.5 rounded-sm bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                                  Tipe A
                                </span>
                              </div>
                              <p className="text-[10px] text-[#647777]">Jl. Dr. Sutomo No.16, Semarang</p>
                              <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
                                ✓ IGD 24 Jam Siaga
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-bold text-[#003B3B] block">1.8 km</span>
                            <Link
                              to="/user/facilities"
                              className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-[#006B5E] hover:underline"
                            >
                              <span>Rute</span>
                              <Navigation className="w-2.5 h-2.5" />
                            </Link>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-[#F6FAF9] border border-[#E2ECEB] flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white border border-[#E2ECEB] text-[#003B3B] flex items-center justify-center font-bold">
                              <Hospital className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="text-xs font-bold text-[#062F2F]">Puskesmas Pandanaran</h4>
                                <span className="px-1.5 py-0.5 rounded-sm bg-blue-100 text-blue-800 text-[9px] font-bold">
                                  Tingkat 1
                                </span>
                              </div>
                              <p className="text-[10px] text-[#647777]">Jl. Pandanaran No.79, Semarang</p>
                              <span className="text-[10px] text-amber-600 font-semibold block mt-0.5">
                                Buka s/d 14.00 WIB
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-bold text-[#003B3B] block">1.1 km</span>
                            <Link
                              to="/user/facilities"
                              className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-[#006B5E] hover:underline"
                            >
                              <span>Rute</span>
                              <Navigation className="w-2.5 h-2.5" />
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Link
                          to="/user/facilities"
                          className="w-full py-2.5 rounded-xl bg-[#003B3B] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#006B5E] transition-colors"
                        >
                          <span>Buka Peta Interaktif Lengkap</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}

                  {/* SLIDE 3: INFORMASI KESEHATAN SIMULATION */}
                  {activeSlide === 2 && (
                    <motion.div
                      key="slide-articles"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-3.5"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-[#F0F5F4]">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-[#006B5E]" />
                          <h4 className="text-xs font-bold text-[#062F2F]">Artikel & Glosarium Terkurasi</h4>
                        </div>
                        <span className="text-[10px] text-[#006B5E] font-bold bg-[#DDF8EC] px-2.5 py-0.5 rounded-full">
                          Dokter Reviewed
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="p-4 rounded-2xl bg-[#F6FAF9] border border-[#E2ECEB] space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              Kedaruratan Medis
                            </span>
                            <span className="text-[10px] text-[#647777]">3 menit baca</span>
                          </div>
                          <h5 className="text-sm font-bold text-[#062F2F]">
                            Pertolongan Pertama Tersedak: Manuver Heimlich yang Benar
                          </h5>
                          <p className="text-xs text-[#647777] leading-relaxed">
                            Panduan langkah demi langkah menangani sumbatan jalan napas pada orang dewasa dan anak-anak sebelum bantuan tiba.
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#F6FAF9] border border-[#E2ECEB] space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 text-[10px] font-bold">
                              Pencegahan DBD
                            </span>
                            <span className="text-[10px] text-[#647777]">4 menit baca</span>
                          </div>
                          <h5 className="text-sm font-bold text-[#062F2F]">
                            Fase Kritis Demam Berdarah dan Gejala yang Wajib Diwaspadai
                          </h5>
                          <p className="text-xs text-[#647777] leading-relaxed">
                            Mengenali tanda bahaya saat demam turun pada hari ke-3 hingga ke-5 untuk mencegah dengue shock syndrome.
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Link
                          to="/user/health-info/articles"
                          className="w-full py-2.5 rounded-xl bg-[#003B3B] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#006B5E] transition-colors"
                        >
                          <span>Jelajahi Arsip Artikel Kesehatan</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}

                  {/* SLIDE 4: PANDUAN LAYANAN SIMULATION */}
                  {activeSlide === 3 && (
                    <motion.div
                      key="slide-guide"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-[#F0F5F4]">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-[#006B5E]" />
                          <h4 className="text-xs font-bold text-[#062F2F]">Alur Panduan Rujukan & BPJS</h4>
                        </div>
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                          SOP Terverifikasi
                        </span>
                      </div>

                      {/* Workflow steps */}
                      <div className="space-y-2.5">
                        <div className="p-3 rounded-xl bg-[#F6FAF9] border border-[#E2ECEB] flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-[#003B3B] text-white flex items-center justify-center font-bold text-xs shrink-0">
                            1
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-[#062F2F]">Kunjungan FKTP (Faskes Tingkat 1)</h5>
                            <p className="text-[11px] text-[#647777]">Datangi Puskesmas/Klinik terdaftar dengan membawa KTP & KIS.</p>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-[#F6FAF9] border border-[#E2ECEB] flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-[#006B5E] text-white flex items-center justify-center font-bold text-xs shrink-0">
                            2
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-[#062F2F]">Pemeriksaan & Surat Rujukan</h5>
                            <p className="text-[11px] text-[#647777]">Bila memerlukan spesialis, dokter faskes 1 menerbitkan surat rujukan berjenjang.</p>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-[#F6FAF9] border border-[#E2ECEB] flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-[#8FE3C1] text-[#003B3B] flex items-center justify-center font-bold text-xs shrink-0">
                            3
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-[#062F2F]">Kunjungan Rumah Sakit Lanjutan</h5>
                            <p className="text-[11px] text-[#647777]">Tunjukkan barcode rujukan di loket pendaftaran RS rujukan yang ditunjuk.</p>
                          </div>
                        </div>
                      </div>

                      {/* Emergency Callout */}
                      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#003B3B] to-[#004D4D] text-white flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-[#8FE3C1]">Kondisi Gawat Darurat?</p>
                          <p className="text-[10px] text-emerald-100/80">Langsung ke IGD RS terdekat tanpa surat rujukan.</p>
                        </div>
                        <a
                          href="tel:119"
                          className="px-3 py-1.5 rounded-lg bg-[#8FE3C1] text-[#003B3B] text-xs font-bold flex items-center gap-1 shrink-0"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>119</span>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Status bar */}
                <div className="pt-4 border-t border-[#F0F5F4] flex items-center justify-between text-[11px] text-[#647777]">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Terhubung dengan Database Faskes Semarang
                  </span>
                  <Link
                    to="/user/dashboard"
                    className="font-bold text-[#003B3B] hover:text-[#006B5E] transition-colors"
                  >
                    Buka Dashboard →
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
