import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { semarangHealthcareData } from "../../data/landingData";

export default function SemarangMap() {
  const [activePin, setActivePin] = useState(1); // Default to RSUP Dr. Kariadi
  const [filterType, setFilterType] = useState("all");

  const filteredLocations = semarangHealthcareData.locations.filter((loc) => {
    if (filterType === "all") return true;
    if (filterType === "rs") return loc.type.includes("RS");
    if (filterType === "puskesmas") return loc.type === "Puskesmas";
    return true;
  });

  return (
    <section id="faskes" className="py-20 lg:py-28 px-4 sm:px-6 relative overflow-hidden bg-white">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-radial from-[#DDF8EC]/50 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDF8EC] text-[#006B5E] text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Jangkauan Wilayah</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062F2F] tracking-tight leading-[1.2]">
            Terhubung dengan <br />
            Akses Kesehatan Semarang.
          </h2>
          <p className="mt-3 text-[#647777] text-sm sm:text-base font-normal max-w-lg mx-auto">
            {semarangHealthcareData.subtext}
          </p>
        </div>

        {/* MAP CONTAINER & INTERFACE */}
        <div className="rounded-3xl bg-[#F6FAF9] border border-[#E2ECEB] shadow-[0_20px_50px_rgba(0,59,59,0.06)] overflow-hidden">
          
          {/* MAP HEADER / FILTERS */}
          <div className="p-4 sm:p-5 bg-white border-b border-[#E2ECEB] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#062F2F]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006B5E] animate-pulse" />
              <span>Peta Distribusi Layanan Kesehatan</span>
            </div>

            {/* Pill Filters */}
            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={() => setFilterType("all")}
                className={`px-3 py-1 rounded-full font-semibold transition-all ${
                  filterType === "all"
                    ? "bg-[#003B3B] text-white shadow-xs"
                    : "bg-[#F6FAF9] text-[#647777] hover:text-[#062F2F]"
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setFilterType("rs")}
                className={`px-3 py-1 rounded-full font-semibold transition-all ${
                  filterType === "rs"
                    ? "bg-[#003B3B] text-white shadow-xs"
                    : "bg-[#F6FAF9] text-[#647777] hover:text-[#062F2F]"
                }`}
              >
                Rumah Sakit
              </button>
              <button
                onClick={() => setFilterType("puskesmas")}
                className={`px-3 py-1 rounded-full font-semibold transition-all ${
                  filterType === "puskesmas"
                    ? "bg-[#003B3B] text-white shadow-xs"
                    : "bg-[#F6FAF9] text-[#647777] hover:text-[#062F2F]"
                }`}
              >
                Puskesmas
              </button>
            </div>
          </div>

          {/* ABSTRACT MINIMAL VECTOR MAP VIEWPORT */}
          <div className="relative w-full h-[360px] sm:h-[420px] bg-[#002B2B] overflow-hidden select-none">
            
            {/* Subtle Map Grid Lines */}
            <div
              className="absolute inset-0 opacity-[0.08] pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(#8FE3C1 1px, transparent 1px), linear-gradient(90deg, #8FE3C1 1px, transparent 1px)`,
                backgroundSize: "36px 36px",
              }}
            />

            {/* Stylized Semarang Topo & Coast Vector Path */}
            <svg
              className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
              viewBox="0 0 800 500"
              preserveAspectRatio="none"
            >
              {/* Coastline Java Sea (Top) */}
              <path
                d="M 0 100 Q 200 130 400 90 T 800 110 L 800 0 L 0 0 Z"
                fill="#004D4D"
              />
              {/* Major Roads / Ring Road Semarang */}
              <path
                d="M 120 120 C 250 250, 380 200, 520 280 S 700 380, 750 450"
                stroke="#8FE3C1"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray="6 4"
              />
              <path
                d="M 50 320 C 200 280, 420 300, 600 240 S 720 180, 780 150"
                stroke="#006B5E"
                strokeWidth="2"
                fill="none"
              />
              <circle cx="400" cy="250" r="140" stroke="#8FE3C1" strokeWidth="1" fill="none" opacity="0.3" />
              <circle cx="400" cy="250" r="220" stroke="#8FE3C1" strokeWidth="0.8" fill="none" opacity="0.2" />
            </svg>

            {/* Central Area Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center">
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#8FE3C1]/30">
                Pusat Kota Semarang • Simpang Lima
              </span>
            </div>

            {/* ANIMATED LOCATION PINS */}
            {filteredLocations.map((loc, idx) => {
              const isSelected = activePin === idx;
              return (
                <div
                  key={loc.name}
                  onClick={() => setActivePin(idx)}
                  className="absolute cursor-pointer transition-transform duration-300 hover:scale-125 z-20"
                  style={{ top: `${loc.lat}%`, left: `${loc.lng}%` }}
                >
                  {/* Outer Pulsing Aura */}
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-8 h-8 rounded-full bg-[#8FE3C1]/30 animate-ping pointer-events-none" />
                    
                    {/* Pin Point */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-all ${
                        isSelected
                          ? "bg-[#8FE3C1] text-[#003B3B] ring-4 ring-white/30 scale-110"
                          : "bg-[#006B5E] text-white hover:bg-[#8FE3C1] hover:text-[#003B3B]"
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>

                    {/* Floating Label / Tooltip */}
                    <div
                      className={`absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-xl text-[10px] font-bold shadow-md transition-all pointer-events-none ${
                        isSelected
                          ? "bg-white text-[#003B3B] opacity-100 scale-100"
                          : "bg-black/60 backdrop-blur-sm text-emerald-200 opacity-80 scale-95"
                      }`}
                    >
                      {loc.name}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* FLOATING DETAIL CARD (Bottom Left of Map) */}
            {filteredLocations[activePin] && (
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-white shadow-xl z-30">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-[#DDF8EC] text-[#006B5E] text-[10px] font-bold">
                    {filteredLocations[activePin].type}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Aktif
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#062F2F] mt-1 leading-snug">
                  {filteredLocations[activePin].name}
                </h4>
                <p className="text-[10px] text-[#647777] mt-0.5">
                  Wilayah: {filteredLocations[activePin].zone}
                </p>
                <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-[#006B5E] font-medium">IGD & Rawat Jalan Ready</span>
                  <Link
                    to="/user/facilities"
                    className="text-[10px] font-bold text-[#003B3B] hover:text-[#006B5E] flex items-center gap-0.5"
                  >
                    <span>Buka Rute</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* LOCAL HEALTHCARE STATS STRIP */}
          <div className="p-6 sm:p-8 bg-white grid grid-cols-2 lg:grid-cols-4 gap-6">
            {semarangHealthcareData.stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#003B3B] font-mono tracking-tight block">
                  {stat.value}
                </span>
                <p className="text-xs sm:text-sm font-bold text-[#062F2F] leading-tight">
                  {stat.label}
                </p>
                <span className="text-[11px] text-[#647777] block">
                  {stat.note}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
