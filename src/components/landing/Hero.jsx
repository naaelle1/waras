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

            {/* Action Buttons (Frosted Glass Capsules) */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Link
                to="/user/facilities"
                className="px-8 sm:px-9 py-3.5 sm:py-4 rounded-full text-white bg-gradient-to-b from-[#033436] via-[#022022] to-[#011718] hover:from-[#044447] hover:via-[#033033] hover:to-[#022022] backdrop-blur-md border border-white/20 hover:border-white/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.28),0_8px_20px_rgba(2,32,34,0.16)] text-xs sm:text-sm font-medium active:scale-[0.98] transition-all duration-200 flex items-center gap-2 select-none group"
              >
                <span>Mulai Sekarang</span>
              </Link>

              <a
                href="#tentang"
                className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-[#022022] bg-white/70 hover:bg-white backdrop-blur-md border border-[#022022]/15 hover:border-[#022022]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_12px_rgba(2,32,34,0.05)] text-xs sm:text-sm font-medium active:scale-[0.98] transition-all duration-200 inline-flex items-center gap-1.5 select-none"
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
