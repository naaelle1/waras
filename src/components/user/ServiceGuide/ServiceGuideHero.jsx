import React from "react";
import { ArrowRight, Compass, MapPin } from "lucide-react";
import GlassButton from "../../ui/GlassButton";

export default function ServiceGuideHero({ onScrollToGuides }) {
  return (
    <section className="relative w-full rounded-2xl sm:rounded-3xl bg-[#022022] border border-white/10 p-5 sm:p-8 lg:p-10 text-white shadow-[0_20px_50px_rgba(2,32,34,0.3)] overflow-hidden lg:overflow-visible">
      {/* LAYER BACKGROUND: GELOMBANG DEKORASI FIGMA (TETAP TERPOTONG RAPI DI DALAM CARD) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl sm:rounded-3xl flex items-center justify-center">
        <svg
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
          viewBox="0 0 1440 437"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask_service_guide_hero"
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
          <g mask="url(#mask_service_guide_hero)">
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
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1 text-xs font-medium text-teal-100 backdrop-blur-sm">
            <Compass className="w-3.5 h-3.5 text-teal-200" />
            <span>WARAS Healthcare Guide</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-poppins">
            Pahami Layanan Kesehatan dengan Lebih Mudah
          </h1>

          <p className="text-sm sm:text-base text-teal-100/90 leading-relaxed max-w-xl font-inter">
            Temukan panduan praktis untuk memilih fasilitas kesehatan, mempersiapkan dokumen kunjungan, dan memahami alur pelayanan medis sesuai kebutuhan Anda.
          </p>

          {/* BARIS TOMBOL AKSI UTAMA (TETAP HORIZONTAL KIRI & KANAN DENGAN EFEK GLASS) */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
            <GlassButton
              onClick={onScrollToGuides}
              variant="hero-light"
              className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 justify-center"
              rightIcon={ArrowRight}
            >
              Mulai Panduan
            </GlassButton>

            <GlassButton
              to="/user/facilities"
              variant="hero-light"
              className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 justify-center"
              leftIcon={MapPin}
            >
              Cari Faskes
            </GlassButton>
          </div>
        </div>
      </div>
    </section>
  );
}