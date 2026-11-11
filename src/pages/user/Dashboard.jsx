import React from "react";
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
  Sparkles
} from "lucide-react";

import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import QueueStatus from "../../components/user/QueueStatus";
import FacilityCard from "../../components/user/FacilityCard";
import ArticleCard from "../../components/user/ArticleCard";
import AIChat from "../../components/user/AIChat";
import MapComponent from "../../components/user/MapComponent";

// Menggunakan alias 'facilities as facilitiesData'
import { facilities as facilitiesData } from "../../data/facilities";
import { articlesData } from "../../data/articles";
import { queueData } from "../../data/queueData";

export default function Dashboard() {
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
      title: "Tanya AI",
      desc: "Dapatkan panduan dan informasi kesehatan dalam bahasa mudah.",
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

  return (
    <div className="space-y-8">
      {/* SECTION 1: PAGE TITLE */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[#003B3B]">
          <House className="w-6 h-6 stroke-[2.2]" />
          <h1 className="font-poppins font-bold text-2xl lg:text-3xl tracking-tight text-[#062F30]">
            Dashboard
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#5F6F70]">
          Semua informasi kesehatan dan layanan dalam satu tempat.
        </p>
      </div>

      {/* SECTION 2: WELCOME HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-[#003B3B] text-white p-6 lg:p-9 shadow-lg">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-[#004D4D] opacity-60 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-48 h-48 rounded-full bg-[#DDEEEE] opacity-10 blur-xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#DDEEEE]/20 text-[#DDEEEE] border border-[#DDEEEE]/30">
              <Sparkles className="w-3.5 h-3.5" /> Layanan Kesehatan Semarang
            </span>
            <h2 className="font-poppins font-bold text-2xl lg:text-4xl leading-tight">
              Hallo, Nael!
            </h2>
            <p className="text-xs lg:text-sm text-gray-200 font-inter max-w-xl leading-relaxed">
              Temukan layanan kesehatan, cek ketersediaan antrean, dan dapatkan informasi kesehatan terpercaya hanya dalam beberapa langkah.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/user/facilities">
                <Button variant="secondary" leftIcon={Search}>
                  Fasilitas Kesehatan
                </Button>
              </Link>
              <Link to="/user/ai">
                <Button variant="outline" className="text-white border-white/30 hover:bg-white/10" leftIcon={Bot}>
                  Tanya AI
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-xs h-48 lg:h-52 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 flex flex-col items-center justify-center p-5 text-center shadow-inner">
              <div className="w-14 h-14 rounded-2xl bg-[#DDEEEE] text-[#003B3B] flex items-center justify-center mb-3 shadow-md">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <p className="font-poppins font-semibold text-sm text-white">Platform Kesehatan Terintegrasi</p>
              <p className="text-xs text-gray-300 mt-1">Solusi cepat & akurat untuk warga Semarang</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: QUICK ACCESS */}
      <section className="space-y-4">
        <div>
          <h3 className="font-poppins font-semibold text-xl text-[#003B3B]">Akses Cepat</h3>
          <p className="text-xs text-[#5F6F70]">Pilih fitur utama yang ingin Anda akses dengan cepat.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickAccessItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link key={idx} to={item.path}>
                <Card hoverEffect className="h-full flex flex-col justify-between group">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#DDEEEE] text-[#003B3B] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-poppins font-semibold text-base text-[#062F30] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#5F6F70] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center text-xs font-semibold text-[#003B3B] group-hover:translate-x-1 transition-transform">
                    <span>Akses</span>
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
            <h3 className="font-poppins font-semibold text-xl text-[#003B3B]">Status Antrian Hari Ini</h3>
            <p className="text-xs text-[#5F6F70]">Pantau estimasi dan kondisi antrean fasilitas secara transparan.</p>
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
            <h3 className="font-poppins font-semibold text-xl text-[#003B3B]">Fasilitas Kesehatan Terdekat</h3>
            <p className="text-xs text-[#5F6F70]">Temukan pusat layanan kesehatan di sekitar Kota Semarang.</p>
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
          <div className="lg:col-span-5">
            <MapComponent facilities={facilitiesData} />
          </div>
        </div>
      </section>

      {/* SECTION 6 & 7: AI ASSISTANT PREVIEW & INFO KESEHATAN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 space-y-4">
          <div>
            <h3 className="font-poppins font-semibold text-xl text-[#003B3B]">Tanya WARAS AI</h3>
            <p className="text-xs text-[#5F6F70]">Konsultasi awal & penjelasan medis yang ramah.</p>
          </div>
          <AIChat />
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-poppins font-semibold text-xl text-[#003B3B]">Info Kesehatan</h3>
              <p className="text-xs text-[#5F6F70]">Edukasi dan tips seputar gaya hidup sehat.</p>
            </div>
            <Link to="/user/health-info">
              <Button variant="ghost" size="sm" rightIcon={ArrowRight}>
                Lihat Semua Artikel
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {articlesData.slice(0, 2).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 8: COMMUNITY PARTICIPATION / REPORT */}
      <section className="rounded-3xl bg-[#DDEEEE]/60 border border-[#DDEEEE] p-6 lg:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-[#003B3B] text-white shrink-0">
              <Flag className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-poppins font-semibold text-lg text-[#003B3B]">
                Bantu Kami Menjaga Informasi Tetap Akurat
              </h3>
              <p className="text-xs lg:text-sm text-[#062F30] leading-relaxed max-w-2xl">
                Menemukan jam operasional yang keliru, nomor telepon tidak aktif, atau perubahan layanan di fasilitas kesehatan? Laporkan untuk pembaruan bersama.
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
      <footer className="pt-6 border-t border-gray-200/60 text-xs text-[#5F6F70] flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-[#003B3B]">© 2026 WARAS Healthcare Platform</p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Seluruh informasi kesehatan tidak menggantikan penanganan medis profesional langsung.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-[#5F6F70]">
          <Link to="/user/help" className="hover:text-[#003B3B]">Bantuan</Link>
          <a href="#" className="hover:text-[#003B3B]">Privasi</a>
          <a href="#" className="hover:text-[#003B3B]">Kontak</a>
        </div>
      </footer>
    </div>
  );
}