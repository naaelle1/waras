import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Hospital, Navigation, ArrowRight, Compass, Search, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const semarangLocations = [
  { name: "RSUD KRMT Wongsonegoro", zone: "Semarang Selatan", type: "RSUD", lat: 38, lng: 72, dist: "1.2 km", ready: true },
  { name: "RSUP Dr. Kariadi", zone: "Semarang Tengah", type: "RSUP", lat: 50, lng: 48, dist: "1.8 km", ready: true },
  { name: "Puskesmas Pandanaran", zone: "Semarang Selatan", type: "Puskesmas", lat: 58, lng: 52, dist: "0.9 km", ready: true },
  { name: "Puskesmas Halmahera", zone: "Semarang Timur", type: "Puskesmas", lat: 46, lng: 66, dist: "2.1 km", ready: true },
  { name: "RS Columbia Asia", zone: "Semarang Barat", type: "RS Swasta", lat: 42, lng: 28, dist: "3.5 km", ready: true },
];

export default function FacilitiesSection() {
  const [activePin, setActivePin] = useState(0);
  const [filterType, setFilterType] = useState("all");

  const filtered = semarangLocations.filter((loc) => {
    if (filterType === "all") return true;
    if (filterType === "rs") return loc.type.includes("RS");
    if (filterType === "puskesmas") return loc.type === "Puskesmas";
    return true;
  });

  return (
    <section id="faskes" className="py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden bg-white">
      {/* BACKGROUND WING WATERMARK */}
      <div className="absolute top-1/2 left-[-10%] -translate-y-1/2 w-[650px] h-auto pointer-events-none opacity-[0.05] select-none -z-0">
        <img src="/Wing.svg" alt="" className="w-full h-auto object-contain" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* EDITORIAL SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT: EDITORIAL HEADLINE & FILTER */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6FEFF] border border-[#014751]/15 text-[#014751] text-xs font-medium">
              <Compass className="w-3.5 h-3.5" />
              <span>Peta Wilayah Semarang</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-[50px] font-light text-[#022022] leading-[1.12] tracking-tight">
              Fasilitas Kesehatan, <br />
              <span className="font-normal text-[#014751]">
                Siaga & Terhubung Langsung.
              </span>
            </h2>

            <p className="text-[#022022]/75 text-sm sm:text-base font-light leading-relaxed max-w-md">
              Peta interaktif terhubung dengan 37 Puskesmas dan Rumah Sakit se-Kota Semarang lengkap dengan indikator IGD 24 Jam dan estimasi jarak tempuh secara akurat.
            </p>

            {/* Quick Filter Buttons */}
            <div className="pt-1 flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => setFilterType("all")}
                className={`px-4 py-1.5 rounded-full font-medium transition-all ${
                  filterType === "all"
                    ? "bg-[#014751] text-white shadow-xs"
                    : "bg-[#E6FEFF]/70 text-[#022022]/70 hover:text-[#014751] hover:bg-[#E6FEFF]"
                }`}
              >
                Semua Faskes
              </button>
              <button
                onClick={() => setFilterType("rs")}
                className={`px-4 py-1.5 rounded-full font-medium transition-all ${
                  filterType === "rs"
                    ? "bg-[#014751] text-white shadow-xs"
                    : "bg-[#E6FEFF]/70 text-[#022022]/70 hover:text-[#014751] hover:bg-[#E6FEFF]"
                }`}
              >
                Rumah Sakit
              </button>
              <button
                onClick={() => setFilterType("puskesmas")}
                className={`px-4 py-1.5 rounded-full font-medium transition-all ${
                  filterType === "puskesmas"
                    ? "bg-[#014751] text-white shadow-xs"
                    : "bg-[#E6FEFF]/70 text-[#022022]/70 hover:text-[#014751] hover:bg-[#E6FEFF]"
                }`}
              >
                Puskesmas
              </button>
            </div>

            <div className="pt-2">
              <Link
                to="/user/facilities"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#014751] text-white text-xs sm:text-sm font-medium hover:bg-[#022022] active:scale-95 transition-all shadow-md shadow-[#014751]/20 group"
              >
                <span>Buka Peta Faskes Lengkap</span>
                <ArrowRight className="w-4 h-4 text-[#37F4B4] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Clean Trust points */}
            <div className="pt-4 border-t border-[#014751]/10 flex flex-wrap items-center gap-4 text-xs font-light text-[#022022]/70">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#014751]" />
                Sinkronisasi Resmi Dinkes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#014751]" />
                Navigasi GPS & Jarak Rute
              </span>
            </div>
          </div>

          {/* RIGHT: BRIGHT & CRISP VECTOR MAP VIEWPORT */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border border-[#014751]/15 shadow-[0_20px_50px_rgba(2,32,34,0.06)] overflow-hidden relative">
              
              {/* Map Bar Header (Bright Crisp Clean) */}
              <div className="px-5 py-3.5 bg-[#E6FEFF]/80 border-b border-[#014751]/10 flex items-center justify-between text-[#022022]">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#37F4B4] shadow-[0_0_8px_#37F4B4] animate-pulse" />
                  <span className="text-xs font-medium tracking-wide text-[#014751]">
                    Peta Interaktif Layanan Kesehatan Semarang
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#014751] bg-white px-2.5 py-0.5 rounded-full border border-[#014751]/10">
                  37 Titik Faskes
                </span>
              </div>

              {/* Vector Map Viewport (Bright Style) */}
              <div className="relative w-full h-[380px] sm:h-[440px] bg-gradient-to-b from-[#E6FEFF]/20 via-white to-[#E6FEFF]/30 overflow-hidden select-none">
                
                {/* Subtle Coordinate Grid Overlay */}
                <div
                  className="absolute inset-0 opacity-[0.06] pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(#014751 1px, transparent 1px), linear-gradient(90deg, #014751 1px, transparent 1px)`,
                    backgroundSize: "36px 36px",
                  }}
                />

                {/* Stylized Vector Roads of Semarang */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
                  viewBox="0 0 800 500"
                  preserveAspectRatio="none"
                >
                  <path d="M 0 90 Q 220 120 400 80 T 800 100 L 800 0 L 0 0 Z" fill="#E6FEFF" />
                  <path d="M 100 110 C 260 240, 390 190, 530 270 S 710 390, 770 460" stroke="#014751" strokeWidth="2.5" fill="none" strokeDasharray="6 4" />
                  <path d="M 40 330 C 190 270, 410 310, 590 230 S 710 170, 780 140" stroke="#014751" strokeWidth="1.8" fill="none" opacity="0.5" />
                  <circle cx="410" cy="240" r="160" stroke="#014751" strokeWidth="1" fill="none" opacity="0.15" />
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
                        <span className="absolute w-8 h-8 rounded-full bg-[#37F4B4]/40 animate-ping pointer-events-none" />
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-all ${
                            isSelected
                              ? "bg-[#014751] text-[#37F4B4] ring-4 ring-[#E6FEFF] scale-110"
                              : "bg-white text-[#014751] border border-[#014751]/20 hover:bg-[#014751] hover:text-white"
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* FLOATING FACILITY CARD PREVIEW */}
                {filtered[activePin] && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={filtered[activePin].name}
                    className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-xs p-4 rounded-2xl bg-white border border-[#014751]/15 shadow-xl z-30"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#E6FEFF] text-[#014751] text-[10px] font-medium border border-[#014751]/15">
                        {filtered[activePin].type}
                      </span>
                      <span className="text-[10px] font-medium text-[#014751] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#37F4B4] animate-pulse" />
                        IGD 24 Jam Siaga
                      </span>
                    </div>

                    <h4 className="text-sm font-medium text-[#022022] mt-2 leading-snug">
                      {filtered[activePin].name}
                    </h4>
                    <p className="text-[11px] font-light text-[#022022]/60 mt-0.5">
                      Wilayah: {filtered[activePin].zone}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-[#014751]/10 flex items-center justify-between">
                      <span className="text-xs font-normal text-[#014751] font-mono">
                        {filtered[activePin].dist}
                      </span>
                      <Link
                        to="/user/facilities"
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-[#014751] hover:text-[#022022]"
                      >
                        <span>Arahkan Rute</span>
                        <Navigation className="w-3 h-3 text-[#37F4B4]" />
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
