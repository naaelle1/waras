import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Hospital, Navigation, ArrowRight, Compass, Search } from "lucide-react";
import { Link } from "react-router-dom";

const semarangLocations = [
  { name: "RSUD KRMT Wongsonegoro", zone: "Semarang Selatan", type: "RSUD", lat: 38, lng: 72, dist: "1.2 km", ready: true },
  { name: "RSUP Dr. Kariadi", zone: "Semarang Tengah", type: "RSUP", lat: 50, lng: 48, dist: "1.8 km", ready: true },
  { name: "Puskesmas Pandanaran", zone: "Semarang Selatan", type: "Puskesmas", lat: 58, lng: 52, dist: "0.9 km", ready: true },
  { name: "Puskesmas Halmahera", zone: "Semarang Timur", type: "Puskesmas", lat: 46, lng: 66, dist: "2.1 km", ready: true },
  { name: "RS Columbia Asia", zone: "Semarang Barat", type: "RS Swasta", lat: 42, lng: 28, dist: "3.5 km", ready: true },
];

export default function FacilitiesSection() {
  const [activePin, setActivePin] = useState(0); // Default to RSUD KRMT Wongsonegoro
  const [filterType, setFilterType] = useState("all");

  const filtered = semarangLocations.filter((loc) => {
    if (filterType === "all") return true;
    if (filterType === "rs") return loc.type.includes("RS");
    if (filterType === "puskesmas") return loc.type === "Puskesmas";
    return true;
  });

  return (
    <section id="faskes" className="py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden bg-white">
      {/* Background ambient blur */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-radial from-[#63D6AE]/15 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* EDITORIAL SPLIT LAYOUT: LEFT TEXT + RIGHT DOMINANT MAP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT: EDITORIAL HEADLINE & FILTER */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D8F5E8] text-[#005B52] text-xs font-bold">
              <Compass className="w-3.5 h-3.5" />
              <span>Direktori Faskes Semarang</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-[#062E2B] leading-[1.1] tracking-tight">
              Fasilitas Kesehatan, <br />
              <span className="text-[#003D3B]">
                Lebih Mudah Ditemukan.
              </span>
            </h2>

            <p className="text-[#647777] text-sm sm:text-base font-normal leading-relaxed max-w-md">
              Peta interaktif terhubung dengan 37 Puskesmas dan Rumah Sakit se-Kota Semarang lengkap dengan status IGD 24 Jam dan estimasi jarak rute.
            </p>

            {/* Quick Filter Buttons */}
            <div className="pt-1 flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => setFilterType("all")}
                className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${
                  filterType === "all"
                    ? "bg-[#003D3B] text-white shadow-xs"
                    : "bg-[#F5F8F7] text-[#647777] hover:text-[#062E2B]"
                }`}
              >
                Semua Faskes
              </button>
              <button
                onClick={() => setFilterType("rs")}
                className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${
                  filterType === "rs"
                    ? "bg-[#003D3B] text-white shadow-xs"
                    : "bg-[#F5F8F7] text-[#647777] hover:text-[#062E2B]"
                }`}
              >
                Rumah Sakit
              </button>
              <button
                onClick={() => setFilterType("puskesmas")}
                className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${
                  filterType === "puskesmas"
                    ? "bg-[#003D3B] text-white shadow-xs"
                    : "bg-[#F5F8F7] text-[#647777] hover:text-[#062E2B]"
                }`}
              >
                Puskesmas
              </button>
            </div>

            <div className="pt-2">
              <Link
                to="/user/facilities"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#003D3B] text-white text-xs sm:text-sm font-bold hover:bg-[#005B52] active:scale-95 transition-all shadow-lg shadow-[#003D3B]/20 group"
              >
                <span>Jelajahi Fasilitas</span>
                <ArrowRight className="w-4 h-4 text-[#63D6AE] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Mini Trust badge */}
            <div className="pt-4 border-t border-[#F0F5F4] flex items-center gap-4 text-xs font-semibold text-[#647777]">
              <span>✓ Database Resmi Dinkes</span>
              <span>✓ Rute & Navigasi Cepat</span>
            </div>
          </div>

          {/* RIGHT: LARGE DOMINANT MAP INTERFACE PREVIEW */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#002D2B] border border-white/10 shadow-[0_25px_60px_rgba(0,61,59,0.18)] overflow-hidden relative">
              
              {/* Map Bar Header */}
              <div className="px-5 py-3.5 bg-[#003D3B] border-b border-white/10 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold tracking-wide">Peta Interaktif Kota Semarang</span>
                </div>
                <span className="text-[10px] font-mono text-[#63D6AE] bg-white/10 px-2.5 py-0.5 rounded-full">
                  GPS Ready
                </span>
              </div>

              {/* Vector Map Viewport */}
              <div className="relative w-full h-[380px] sm:h-[440px] bg-[#002220] overflow-hidden select-none">
                
                {/* Grid overlay */}
                <div
                  className="absolute inset-0 opacity-[0.07] pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(#63D6AE 1px, transparent 1px), linear-gradient(90deg, #63D6AE 1px, transparent 1px)`,
                    backgroundSize: "36px 36px",
                  }}
                />

                {/* Stylized Vector Roads of Semarang */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
                  viewBox="0 0 800 500"
                  preserveAspectRatio="none"
                >
                  <path d="M 0 90 Q 220 120 400 80 T 800 100 L 800 0 L 0 0 Z" fill="#004D4A" />
                  <path d="M 100 110 C 260 240, 390 190, 530 270 S 710 390, 770 460" stroke="#63D6AE" strokeWidth="2.5" fill="none" strokeDasharray="6 4" />
                  <path d="M 40 330 C 190 270, 410 310, 590 230 S 710 170, 780 140" stroke="#005B52" strokeWidth="2" fill="none" />
                  <circle cx="410" cy="240" r="150" stroke="#63D6AE" strokeWidth="1" fill="none" opacity="0.4" />
                </svg>

                {/* ANIMATED LOCATION PINS */}
                {filtered.map((loc, idx) => {
                  const isSelected = activePin === idx;
                  return (
                    <div
                      key={loc.name}
                      onClick={() => setActivePin(idx)}
                      className="absolute cursor-pointer transition-transform duration-300 hover:scale-125 z-20"
                      style={{ top: `${loc.lat}%`, left: `${loc.lng}%` }}
                    >
                      <div className="relative flex items-center justify-center">
                        <span className="absolute w-8 h-8 rounded-full bg-[#63D6AE]/35 animate-ping pointer-events-none" />
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-all ${
                            isSelected
                              ? "bg-[#63D6AE] text-[#003D3B] ring-4 ring-white/40 scale-110"
                              : "bg-[#005B52] text-white hover:bg-[#63D6AE] hover:text-[#003D3B]"
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* FLOATING FACILITY CARD (Wireframe inspired: prominent preview) */}
                {filtered[activePin] && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={filtered[activePin].name}
                    className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-xs p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-white shadow-2xl z-30"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#D8F5E8] text-[#005B52] text-[10px] font-bold">
                        {filtered[activePin].type}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        24 Jam Siaga
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#062E2B] mt-2 leading-snug">
                      {filtered[activePin].name}
                    </h4>
                    <p className="text-[11px] text-[#647777] mt-0.5">
                      Wilayah: {filtered[activePin].zone}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-black text-[#003D3B] font-mono">
                        {filtered[activePin].dist}
                      </span>
                      <Link
                        to="/user/facilities"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#005B52] hover:underline"
                      >
                        <span>Arahkan Rute</span>
                        <Navigation className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                )}

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}