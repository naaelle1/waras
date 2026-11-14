import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowUpRight } from "lucide-react";

const facilities = [
  {
    id: "wongsonegoro",
    name: "RSUD KRMT Wongsonegoro",
    location: "Semarang Selatan, Kota Semarang",
    type: "RSUD Tipe B",
    status: "IGD 24 Jam Siaga",
    images: [
      "/images/elements/wongso1.jpg",
      "/images/elements/wongso2.jpg",
      "/images/elements/wongso3.jpg",
    ],
  },
  {
    id: "kariadi",
    name: "RSUP Dr. Kariadi",
    location: "Semarang Tengah, Kota Semarang",
    type: "RSUP Rujukan Utama",
    status: "Trauma Ready 24 Jam",
    images: [
      "/images/elements/kari1.jpg",
      "/images/elements/kari2.jpg",
      "/images/elements/kari3.jpg",
    ],
  },
  {
    id: "pandanaran",
    name: "Puskesmas Pandanaran",
    location: "Semarang Selatan, Kota Semarang",
    type: "Puskesmas Kecamatan",
    status: "Pelayanan Dasar Siaga",
    images: [
      "/images/elements/panda1.jpg",
      "/images/elements/panda2.jpg",
      "/images/elements/panda3.jpg",
    ],
  },
];

function SingleFacilityCard({ facility, delayOffset = 0 }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto-slide image satu per satu secara halus setiap 3.2 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % facility.images.length);
    }, 3200 + delayOffset);

    return () => clearInterval(timer);
  }, [facility.images.length, delayOffset]);

  return (
    <div className="group rounded-3xl bg-white border border-[#022022]/10 p-4 sm:p-4.5 hover:border-[#022022]/25 hover:shadow-[0_15px_35px_rgba(2,32,34,0.08)] transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* 
          SLIDING IMAGE CONTAINER:
          Slide berganti satu per satu dengan transisi halus dan dot indicator.
        */}
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#022022]/5 select-none">
          <div
            className="facility-slider-track flex w-full h-full duration-700 ease-out"
            style={{
              transform: `translateX(-${currentIdx * 100}%)`,
              transition: "transform 700ms cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          >
            {facility.images.map((imgSrc, imgIndex) => (
              <div key={imgIndex} className="w-full h-full shrink-0 relative">
                <img
                  src={imgSrc}
                  alt={facility.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            ))}
          </div>

          {/* Minimal Subtle Dot Indicator */}
          <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5 z-10 pointer-events-auto">
            {facility.images.map((_, dotIndex) => (
              <button
                key={dotIndex}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIdx(dotIndex);
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  dotIndex === currentIdx
                    ? "w-4 h-1 bg-[#37F4B4] shadow-xs"
                    : "w-1 h-1 bg-white/60 hover:bg-white"
                }`}
                aria-label={`Lihat foto ${dotIndex + 1}`}
              />
            ))}
          </div>
        </div>

        {/* DETAILS SECTION (Clean Plain Text Below, No Floating Badges) */}
        <div className="p-3 pt-4">
          <h3 className="text-base font-normal text-[#022022] group-hover:text-[#022022] transition-colors truncate">
            {facility.name}
          </h3>

          <p className="text-xs text-[#022022]/80 font-medium mt-1">
            {facility.type} • {facility.status}
          </p>

          <div className="mt-2 flex items-center gap-1.5 text-xs font-light text-[#022022]/60">
            <MapPin className="w-3.5 h-3.5 text-[#022022] shrink-0" />
            <span className="truncate">{facility.location}</span>
          </div>
        </div>
      </div>

      {/* FOOTER LINK */}
      <div className="px-3 pb-2 pt-3 border-t border-[#022022]/10 flex items-center justify-between">
        <span className="text-[11px] font-light text-[#022022]/60 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#022022]/30" />
          <span>Dokumentasi Faskes Siaga</span>
        </span>
        <Link
          to="/user/facilities"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#022022] bg-white/80 hover:bg-white backdrop-blur-md border border-[#022022]/15 hover:border-[#022022]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_6px_rgba(2,32,34,0.04)] transition-all duration-200 active:scale-[0.98] group"
        >
          <span>Arahkan Rute</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#022022] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export default function PopularFacilities() {
  return (
    <section id="fasilitas" className="scroll-mt-20 py-20 bg-white border-t border-[#022022]/10">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#022022] font-semibold block mb-2">
              JARINGAN FASILITAS AKTIF
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#022022] tracking-tight">
              Fasilitas Kesehatan <span className="font-normal text-[#022022]">Siaga Semarang</span>
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm font-light text-[#022022]/65">
              3 Faskes utama siaga 24 jam dengan fasilitas penunjang lengkap di Kota Semarang.
            </p>
          </div>

          <Link
            to="/user/facilities"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[#022022] bg-white/80 hover:bg-white backdrop-blur-md border border-[#022022]/15 hover:border-[#022022]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_12px_rgba(2,32,34,0.05)] text-xs sm:text-sm font-medium transition-all duration-200 active:scale-[0.98] select-none group shrink-0"
          >
            <span>Buka Seluruh Direktori Faskes</span>
            <ArrowUpRight className="w-4 h-4 text-[#022022] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 3 CLEAN CARDS (Images slide smoothly one-by-one inside each box) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {facilities.map((fac, idx) => (
            <SingleFacilityCard
              key={fac.id}
              facility={fac}
              delayOffset={idx * 350}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
