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
import transhumansSvg from "../../assets/Transhumans Experiments.svg";

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
          <div className="flex items-center gap-2.5 text-[#022022]">
            <House className="w-6 h-6 stroke-[2.2] text-[#022022]" />
            <h1 className="font-poppins font-bold text-2xl lg:text-3xl tracking-tight text-[#0D2626]">
              Dashboard
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#526666]">
            Semua informasi kesehatan, antrean fasilitas, dan layanan publik Kota Semarang dalam satu tempat.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#022022]/5 text-[#022022] border border-[#37F4B4]/30">
            <Activity className="w-3.5 h-3.5 text-[#022022]" />
            Kota Semarang • Sistem Aktif
          </span>
        </div>
      </div>

      {/* SECTION 2: WELCOME HERO BANNER */}
      <section className="relative w-full rounded-3xl bg-[#022022] border border-[#37F4B4]/20 p-6 sm:p-8 lg:p-10 text-white shadow-[0_20px_50px_rgba(2,32,34,0.3)] overflow-visible">
        {/* AMBIENT MINT GLOW ACCENTS */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#37F4B4]/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-[#37F4B4]/10 blur-[120px]" />

        {/* LAYER BACKGROUND: GELOMBANG DEKORASI FIGMA (TETAP TERPOTONG RAPI DI DALAM CARD) */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-3xl flex items-center justify-center">
          <svg
            className="w-full h-full object-cover"
            preserveAspectRatio="none"
            viewBox="0 0 1440 437"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_154_6419"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="-22"
              y="0"
              width="1526"
              height="644"
            >
              <rect
                x="-21.5717"
                y="216.55"
                width="1478.35"
                height="431.236"
                transform="rotate(-8.42308 -21.5717 216.55)"
                fill="#C4C4C4"
              />
            </mask>
            <g mask="url(#mask0_154_6419)">
              <g opacity="0.05">
                <path
                  d="M1515.04 106.21C1515.04 106.21 1479.05 144.573 1174.49 197.569C944.011 237.673 492.796 195.637 230.373 241.502C-39.7321 288.641 -0.135085 355.024 -7.1507 307.647L3.33789 378.478C3.33789 378.478 84.0207 298.473 241.502 275.771C473.097 242.507 970.597 317.04 1198.76 287.855C1421.28 259.369 1522.06 153.588 1522.06 153.588L1515.04 106.21Z"
                  fill="white"
                />
              </g>
              <g opacity="0.1">
                <path
                  d="M1465.08 92.3023C979.851 431.606 579.315 131.724 301.597 180.662C15.6588 231.092 5.94788 378.047 -1.94859 324.721L9.86135 404.475C9.86135 404.475 99.4007 357.504 259.746 323.434C841.544 199.818 924.335 522.66 1192.07 447.213C1459.81 371.766 1598.83 -1.22344 1465.08 92.3023Z"
                  fill="white"
                />
              </g>
            </g>
          </svg>
        </div>

        {/* KONTEN UTAMA DI LAYER ATAS (z-10) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Kolom Kiri: Sapaan & Tombol Pill */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-[#37F4B4]/30 px-3.5 py-1 text-xs font-medium text-teal-100 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#37F4B4]" />
              <span>Portal Kesehatan Terpadu Kota Semarang</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-poppins">
              Halo, Nael! 👋
            </h1>

            <p className="text-sm sm:text-base text-teal-100/90 leading-relaxed max-w-xl font-inter">
              Temukan fasilitas kesehatan terdekat, pantau antrean terkini secara transparan, atau konsultasikan keluhan awal dengan WARAS AI dalam beberapa detik.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/user/facilities"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#022022] shadow-sm hover:bg-[#37F4B4] hover:text-[#022022] transition-all cursor-pointer hover:shadow-md"
              >
                <Search className="w-4 h-4" />
                <span>Cari Fasilitas Kesehatan</span>
              </Link>

              <Link
                to="/user/ai"
                className="inline-flex items-center gap-2 rounded-full bg-[#022022]/80 border border-[#37F4B4]/40 px-5 py-2.5 text-xs sm:text-sm font-medium text-white backdrop-blur-md hover:bg-[#033033] hover:border-[#37F4B4]/70 transition-all cursor-pointer"
              >
                <Bot className="w-4 h-4 text-[#37F4B4]" />
                <span>Konsultasi WARAS AI</span>
              </Link>
            </div>
          </div>

          {/* KOLOM KANAN: ILUSTRASI / LOGO SVG LANGSUNG MENIMPA CARD UTAMA (TANPA CARD TAMBAHAN) */}
          <div className="lg:col-span-5 flex items-end justify-center lg:justify-end -mb-6 sm:-mb-8 lg:-mb-10 translate-y-2 pointer-events-none select-none">
            <img
              src={transhumansSvg}
              alt="Ilustrasi Layanan Medis WARAS"
              className="w-[270px] sm:w-[320px] lg:w-[365px] h-auto object-contain drop-shadow-md"
            />
          </div>
        </div>
      </section>

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
                    <div className="w-10 h-10 rounded-xl bg-[#022022]/5 text-[#022022] flex items-center justify-center mb-3 group-hover:bg-[#022022] group-hover:text-[#37F4B4] transition-all duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-poppins font-semibold text-base text-[#0D2626] mb-1 group-hover:text-[#022022] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#526666] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center text-xs font-semibold text-[#022022] group-hover:translate-x-1 transition-transform">
                    <span>Akses Layanan</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#022022] group-hover:text-[#37F4B4]" />
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
              <div className="flex items-center gap-2 text-[#022022]">
                <Bot className="w-5 h-5 text-[#022022]" />
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
                <div className="flex items-center gap-2 text-[#022022]">
                  <BookOpen className="w-5 h-5 text-[#022022]" />
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
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#022022]">
                  <Sparkles className="w-3.5 h-3.5 text-[#37F4B4]" />
                  <span>Topik Terhangat:</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {popularHealthTopics.map((topic, idx) => (
                    <Link
                      key={idx}
                      to="/user/health-info/articles"
                      className="px-2.5 py-1 rounded-lg bg-[#022022]/5 hover:bg-[#022022] text-[#022022] hover:text-[#37F4B4] border border-transparent hover:border-[#37F4B4]/30 text-[11px] font-medium transition-all"
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
      <section className="rounded-3xl bg-[#022022] border border-[#37F4B4]/20 p-6 lg:p-8 text-white shadow-[0_15px_40px_rgba(2,32,34,0.25)] relative overflow-hidden">
        {/* Ambient mint glow */}
        <div className="pointer-events-none absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-[#37F4B4]/10 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-white/10 border border-[#37F4B4]/30 text-[#37F4B4] shrink-0 shadow-inner">
              <Flag className="w-5 h-5 text-[#37F4B4]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-poppins font-semibold text-lg text-white">
                Bantu Kami Menjaga Informasi Tetap Akurat
              </h3>
              <p className="text-xs lg:text-sm text-teal-100/80 leading-relaxed max-w-2xl font-inter">
                Menemukan jam operasional yang keliru, nomor telepon tidak aktif, atau perubahan layanan di fasilitas kesehatan? Laporkan untuk pembaruan bersama warga Semarang.
              </p>
            </div>
          </div>
          <Link to="/user/report-problem" className="shrink-0">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#37F4B4] hover:bg-[#4EFEB8] text-[#022022] text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer">
              <span>Laporkan Kesalahan</span>
              <ArrowRight className="w-4 h-4 text-[#022022]" />
            </button>
          </Link>
        </div>
      </section>

      {/* SECTION 9: FOOTER */}
      <footer className="pt-6 border-t border-gray-200/60 text-xs text-[#526666] flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-[#022022]">© 2026 WARAS Healthcare Platform • Kota Semarang</p>
          <p className="text-[11px] text-[#809494] mt-0.5">
            Seluruh informasi kesehatan disediakan untuk tujuan edukatif dan tidak menggantikan pemeriksaan dokter secara langsung.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-[#526666]">
          <Link to="/user/help" className="hover:text-[#022022] transition-colors">Bantuan</Link>
          <Link to="/user/health-info/articles" className="hover:text-[#022022] transition-colors">Artikel</Link>
          <Link to="/user/facilities" className="hover:text-[#022022] transition-colors">Fasilitas</Link>
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
