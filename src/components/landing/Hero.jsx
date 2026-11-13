import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="beranda" className="w-full pt-8 pb-16 bg-white relative overflow-hidden">
      {/* 
        MASK GROUP.SVG BACKGROUND:
        Positioned towards the right side and masked to fade out on the left!
        This guarantees the text on the left NEVER collides with background curves.
      */}
      <div 
        className="absolute right-0 bottom-0 w-full lg:w-3/5 h-auto pointer-events-none select-none z-0 opacity-45 [mask-image:linear-gradient(to_right,transparent_0%,black_45%)]"
      >
        <img
          src="/Mask Group.svg"
          alt=""
          className="w-full h-auto object-cover object-bottom"
        />
      </div>

      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center min-h-[460px] lg:min-h-[500px]">
          
          {/* LEFT SIDE: CLEAN POLOS EDITORIAL TYPOGRAPHY ON 100% WHITE CANVAS */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 sm:space-y-7">
            
            {/* Simple Polos Category Label */}
            <span className="text-xs font-mono uppercase tracking-wider text-[#022022] font-medium">
              PORTAL LAYANAN PUBLIK KOTA SEMARANG
            </span>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-[62px] xl:text-[70px] font-light text-[#022022] leading-[1.12] tracking-tight">
                Kesehatan Lebih{" "}
                <span className="font-normal text-[#022022] block sm:inline">
                  Mudah Diakses,
                </span>
                <span className="block font-extralight text-[#022022]/85 mt-1.5">
                  Informasi Lebih Terpercaya.
                </span>
              </h1>
            </motion.div>

            {/* Subtext */}
            <p className="text-[#022022]/70 text-base sm:text-lg font-light leading-relaxed max-w-xl">
              WARAS menyederhanakan akses faskes siaga, alur rujukan, dan panduan medis darurat di Kota Semarang agar warga dapat mengambil tindakan tepat tanpa kebingungan.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-4">
              <Link
                to="/user/facilities"
                className="px-9 py-4 rounded-full bg-[#022022] text-white text-xs sm:text-sm font-light hover:bg-[#033033] border border-transparent active:scale-95 transition-all shadow-sm flex items-center gap-2"
              >
                <span>Mulai Sekarang</span>
              </Link>

              <a
                href="#tentang"
                className="text-xs sm:text-sm font-light text-[#022022] hover:text-[#033033] transition-colors underline-offset-4 hover:underline"
              >
                Pelajari Layanan
              </a>
            </div>

            {/* 4 Clean Flat Metrics (Zero Clutter, Sharp Readability) */}
            <div className="pt-8 border-t border-[#022022]/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <span className="text-2xl sm:text-3xl font-light font-mono text-[#022022]">37</span>
                <p className="text-xs text-[#022022]/70 font-light mt-0.5">Puskesmas Siaga</p>
              </div>

              <div>
                <span className="text-2xl sm:text-3xl font-light font-mono text-[#022022]">18+</span>
                <p className="text-xs text-[#022022]/70 font-light mt-0.5">RSUD & RSUP Rujukan</p>
              </div>

              <div>
                <span className="text-2xl sm:text-3xl font-light font-mono text-[#022022]">119</span>
                <p className="text-xs text-[#022022]/70 font-light mt-0.5">Hotline Darurat 24 Jam</p>
              </div>

              <div>
                <span className="text-2xl sm:text-3xl font-light font-mono text-[#022022]">100%</span>
                <p className="text-xs text-[#022022]/70 font-light mt-0.5">Akses Terbuka Warga</p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: CLEAN STETHOSCOPE (NO ZOOM-IN / AMBIENT RIGHT-SIDE WAVE) */}
          <div className="lg:col-span-5 xl:col-span-5 relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{
                opacity: 1,
                y: [0, -6, 0], // Smooth subtle floating animation without zoom
              }}
              transition={{
                opacity: { duration: 0.5 },
                y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
              }}
              className="relative z-10 w-full flex items-center justify-center"
            >
              <img
                src="/images/elements/stethoscope.png"
                alt="Stetoskop Medis WARAS"
                onError={(e) => {
                  e.currentTarget.src = "/images/elements/image-removebg-preview.png";
                }}
                className="max-h-[350px] sm:max-h-[440px] lg:max-h-[500px] w-auto scale-110 sm:scale-115 lg:scale-120 object-contain select-none drop-shadow-[0_20px_35px_rgba(1,71,81,0.14)]"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
