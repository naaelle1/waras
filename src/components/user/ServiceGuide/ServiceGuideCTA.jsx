import React from "react";
import { Hospital, MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import GlassButton from "../../ui/GlassButton";

export default function ServiceGuideCTA() {
  return (
    <section className="relative w-full rounded-2xl sm:rounded-3xl bg-[#022022] border border-white/10 p-5 sm:p-8 lg:p-10 text-white shadow-[0_20px_50px_rgba(2,32,34,0.3)] overflow-visible">
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
            id="mask_service_guide_cta"
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
          <g mask="url(#mask_service_guide_cta)">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left: Faskes Emergency CTA */}
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1 text-xs font-medium text-teal-100 backdrop-blur-sm">
            <Hospital className="w-3.5 h-3.5 text-teal-200" />
            <span>PENCARI FASKES</span>
          </div>

          <h3 className="font-poppins font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Membutuhkan Bantuan Medis?
          </h3>

          <p className="font-inter text-xs sm:text-sm text-teal-100/90 leading-relaxed max-w-lg">
            Cari fasilitas kesehatan terdekat di Kota Semarang lengkap dengan jadwal layanan dan rute lokasi.
          </p>

          <div className="pt-1">
            <GlassButton
              to="/user/facilities"
              variant="hero-light"
              className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 justify-center"
              rightIcon={ArrowRight}
            >
              Cari Faskes Terdekat
            </GlassButton>
          </div>
        </div>

        {/* Divider: Horizontal for Mobile, Vertical for Desktop */}
        <div className="block lg:hidden border-t border-white/10 my-1 w-full" />
        <div className="hidden lg:flex lg:col-span-1 justify-center self-stretch py-2">
          <div className="w-px bg-white/15 h-full" />
        </div>

        {/* Right: AI Assistant CTA */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1 text-xs font-medium text-teal-100 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-teal-200" />
            <span>WARAS AI ASSISTANT</span>
          </div>

          <h3 className="font-poppins font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Masih Bingung?
          </h3>

          <p className="font-inter text-xs sm:text-sm text-teal-100/90 leading-relaxed max-w-lg">
            Sampaikan pertanyaan Anda kepada WARAS AI untuk mendapatkan arahan awal layanan kesehatan.
          </p>

          <div className="pt-1">
            <GlassButton
              to="/user/ai"
              variant="hero-light"
              className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 justify-center"
              leftIcon={MessageCircle}
            >
              Tanya WARAS AI
            </GlassButton>
          </div>
        </div>
      </div>
    </section>
  );
}