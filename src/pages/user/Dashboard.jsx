import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  House,
  MapPin,
  Clock,
  Bot,
  Flag,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Search,
  Sparkles,
  Hospital,
  Activity
} from "lucide-react";

import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import QueueStatus from "../../components/user/QueueStatus";
import FacilityCard from "../../components/user/FacilityCard";
import ArticleCard from "../../components/user/ArticleCard";
import DashboardAIConsultation from "../../components/user/DashboardAIConsultation";
import ArticleDetailModal from "../../components/user/ArticleDetailModal";
import MapComponent from "../../components/user/MapComponent";

import { facilities as facilitiesData } from "../../data/facilities";
import { articlesData } from "../../data/articles";
import { queueData } from "../../data/queueData";

export default function Dashboard() {
  const [selectedArticleModal, setSelectedArticleModal] = useState(null);

  const quickAccessItems = [
    {
      title: "Fasilitas Kesehatan",
      desc: "Cari puskesmas, rumah sakit, dan layanan kesehatan terdekat.",
      icon: MapPin,
      path: "/user/facilities"
    },
    {
      title: "Cek Antrian",
      desc: "Lihat informasi status dan ketersediaan antrean terkini.",
      icon: Clock,
      path: "/user/facilities"
    },
    {
      title: "Tanya WARAS AI",
      desc: "Dapatkan panduan dan penjelasan keluhan kesehatan awal.",
      icon: Bot,
      path: "/user/ai"
    },
    {
      title: "Laporkan Kesalahan",
      desc: "Bantu kami menjaga akurasi informasi fasilitas di Semarang.",
      icon: Flag,
      path: "/user/report-problem"
    }
  ];

  const popularHealthTopics = [
    "Pencegahan DBD",
    "Gula Darah",
    "P3K Mandiri",
    "Kesehatan Mental",
    "Pola Tidur Sehat"
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* SECTION 1: PAGE TITLE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/60 pb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5 text-[#003B3B]">
            <House className="w-6 h-6 stroke-[2.2]" />
            <h1 className="font-poppins font-bold text-2xl lg:text-3xl tracking-tight text-[#0D2626]">
              Dashboard
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#526666]">
            Semua informasi kesehatan, antrean fasilitas, dan layanan publik Kota Semarang dalam satu tempat.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EBF5F5] text-[#003B3B] border border-[#003B3B]/10">
            <Activity className="w-3.5 h-3.5 text-[#0B6B6B]" />
            Kota Semarang • Sistem Aktif
          </span>
        </div>
      </div>

      {/* SECTION 2: WELCOME HERO BANNER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#003B3B] via-[#004242] to-[#002D2D] text-white p-6 lg:p-8 shadow-sm">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#DDEEEE] border border-white/20">
              <Sparkles className="w-3.5 h-3.5" /> Portal Kesehatan Terpadu Kota Semarang
            </span>
            <h2 className="font-poppins font-bold text-2xl lg:text-4xl leading-tight">
              Halo, Nael! 👋
            </h2>
            <p className="text-xs lg:text-sm text-gray-200 font-inter max-w-xl leading-relaxed">
              Temukan fasilitas kesehatan terdekat, pantau antrean terkini secara transparan, atau konsultasikan keluhan awal dengan WARAS AI dalam beberapa detik.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/user/facilities">
                <Button variant="secondary" leftIcon={Search}>
                  Cari Fasilitas Kesehatan
                </Button>
              </Link>
              <Link to="/user/ai">
                <Button
                  variant="outline"
                  className="text-white border-white/30 hover:bg-white/10"
                  leftIcon={Bot}
                >
                  Konsultasi WARAS AI
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-5 text-white shadow-inner space-y-3">
              <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#DDEEEE]">
                  Kesiapan Layanan Medis
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Data
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5 pt-0.5">
                <div className="bg-white/10 rounded-xl p-2.5">
                  <span className="text-xl sm:text-2xl font-bold font-poppins block text-white">37</span>
                  <span className="text-[11px] text-gray-200">Puskesmas Aktif</span>
                </div>
                <div className="bg-white/10 rounded-xl p-2.5">
                  <span className="text-xl sm:text-2xl font-bold font-poppins block text-white">14</span>
                  <span className="text-[11px] text-gray-200">RS Rujukan</span>
                </div>
                <div className="bg-white/10 rounded-xl p-2.5">
                  <span className="text-xl sm:text-2xl font-bold font-poppins block text-white">~15 m</span>
                  <span className="text-[11px] text-gray-200">Rata-rata Antrean</span>
                </div>
                <div className="bg-white/10 rounded-xl p-2.5">
                  <span className="text-xl sm:text-2xl font-bold font-poppins block text-white">24/7</span>
                  <span className="text-[11px] text-gray-200">WARAS AI Siaga</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: QUICK ACCESS */}
      <section className="space-y-4">
        <div>
          <h3 className="font-poppins font-semibold text-xl text-[#0D2626]">Akses Cepat</h3>
          <p className="text-xs text-[#526666]">Pilih menu utama yang sering digunakan warga.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickAccessItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link key={idx} to={item.path}>
                <Card hoverEffect className="h-full flex flex-col justify-between group">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#EBF5F5] text-[#003B3B] flex items-center justify-center mb-3 group-hover:bg-[#003B3B] group-hover:text-white transition-all duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-poppins font-semibold text-base text-[#0D2626] mb-1 group-hover:text-[#003B3B] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#526666] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center text-xs font-semibold text-[#003B3B] group-hover:translate-x-1 transition-transform">
                    <span>Akses Layanan</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: STATUS ANTRIAN HARI INI */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-poppins font-semibold text-xl text-[#0D2626]">Status Antrian Hari Ini</h3>
            <p className="text-xs text-[#526666]">Pantau estimasi dan kondisi antrean fasilitas secara transparan.</p>
          </div>
          <Link to="/user/facilities">
            <Button variant="ghost" size="sm" rightIcon={ArrowRight}>
              Lihat Semua Antrian
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {queueData.map((q) => (
            <QueueStatus key={q.id} item={q} />
          ))}
        </div>
      </section>

      {/* SECTION 5: FASILITAS KESEHATAN TERDEKAT & MAP PREVIEW */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-poppins font-semibold text-xl text-[#0D2626]">Fasilitas Kesehatan Terdekat</h3>
            <p className="text-xs text-[#526666]">Temukan pusat layanan kesehatan di sekitar Kota Semarang.</p>
          </div>
          <Link to="/user/facilities">
            <Button variant="ghost" size="sm" rightIcon={ArrowRight}>
              Lihat Semua Fasilitas
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {facilitiesData.slice(0, 2).map((facility) => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
          </div>
          <div className="lg:col-span-5 h-full">
            <MapComponent facilities={facilitiesData} className="h-full min-h-[380px]" />
          </div>
        </div>
      </section>

      {/* SECTION 6 & 7: TANYA WARAS AI & INFO KESEHATAN (SEMPURNA & BALANCED) */}
      <section className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* KOLOM KIRI: TANYA WARAS AI */}
          <div className="lg:col-span-5 flex flex-col h-full space-y-3">
            <div>
              <div className="flex items-center gap-2 text-[#003B3B]">
                <Bot className="w-5 h-5 text-[#003B3B]" />
                <h3 className="font-poppins font-semibold text-xl text-[#0D2626]">
                  Tanya WARAS AI
                </h3>
              </div>
              <p className="text-xs text-[#526666]">
                Konsultasi gejala awal & panduan kesehatan instan.
              </p>
            </div>

            <div className="flex-1">
              <DashboardAIConsultation />
            </div>
          </div>

          {/* KOLOM KANAN: INFO KESEHATAN TERKINI */}
          <div className="lg:col-span-7 flex flex-col h-full space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#003B3B]">
                  <BookOpen className="w-5 h-5 text-[#003B3B]" />
                  <h3 className="font-poppins font-semibold text-xl text-[#0D2626]">
                    Info Kesehatan Terkini
                  </h3>
                </div>
                <p className="text-xs text-[#526666]">
                  Edukasi medis terverifikasi dan tips pola hidup sehat.
                </p>
              </div>

              <Link to="/user/health-info/articles">
                <Button variant="ghost" size="sm" rightIcon={ArrowRight}>
                  Lihat Semua Artikel
                </Button>
              </Link>
            </div>

            <div className="flex-1 flex flex-col justify-between space-y-3">
              {/* 2 KARTU ARTIKEL PILIHAN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                {articlesData.slice(0, 2).map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onReadMore={(art) => setSelectedArticleModal(art)}
                  />
                ))}
              </div>

              {/* STRIP TOPIK POPULER AGAR KETINGGIAN KOLOM KANAN SELARAS SEMPURNA */}
              <div className="p-3.5 rounded-xl bg-white border border-[#E2ECEB] flex flex-wrap items-center justify-between gap-2 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#003B3B]">
                  <Sparkles className="w-3.5 h-3.5 text-[#0B6B6B]" />
                  <span>Topik Terhangat:</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {popularHealthTopics.map((topic, idx) => (
                    <Link
                      key={idx}
                      to="/user/health-info/articles"
                      className="px-2.5 py-1 rounded-lg bg-[#EBF5F5] hover:bg-[#DDEEEE] text-[#003B3B] text-[11px] font-medium transition-colors"
                    >
                      #{topic}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 8: COMMUNITY PARTICIPATION / REPORT */}
      <section className="rounded-2xl bg-[#EBF5F5] border border-[#003B3B]/15 p-6 lg:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-xl bg-[#003B3B] text-white shrink-0 shadow-xs">
              <Flag className="w-5 h-5 text-[#EBF5F5]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-poppins font-semibold text-lg text-[#003B3B]">
                Bantu Kami Menjaga Informasi Tetap Akurat
              </h3>
              <p className="text-xs lg:text-sm text-[#2B3E3E] leading-relaxed max-w-2xl font-inter">
                Menemukan jam operasional yang keliru, nomor telepon tidak aktif, atau perubahan layanan di fasilitas kesehatan? Laporkan untuk pembaruan bersama warga Semarang.
              </p>
            </div>
          </div>
          <Link to="/user/report-problem" className="shrink-0">
            <Button variant="primary" rightIcon={ArrowRight}>
              Laporkan Kesalahan
            </Button>
          </Link>
        </div>
      </section>

      {/* SECTION 9: FOOTER */}
      <footer className="pt-6 border-t border-gray-200/60 text-xs text-[#526666] flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-[#003B3B]">© 2026 WARAS Healthcare Platform • Kota Semarang</p>
          <p className="text-[11px] text-[#809494] mt-0.5">
            Seluruh informasi kesehatan disediakan untuk tujuan edukatif dan tidak menggantikan pemeriksaan dokter secara langsung.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-[#526666]">
          <Link to="/user/help" className="hover:text-[#003B3B] transition-colors">Bantuan</Link>
          <Link to="/user/health-info/articles" className="hover:text-[#003B3B] transition-colors">Artikel</Link>
          <Link to="/user/facilities" className="hover:text-[#003B3B] transition-colors">Fasilitas</Link>
        </div>
      </footer>

      {/* ARTICLE READER MODAL */}
      <ArticleDetailModal
        isOpen={!!selectedArticleModal}
        article={selectedArticleModal}
        onClose={() => setSelectedArticleModal(null)}
      />
    </div>
  );
}
