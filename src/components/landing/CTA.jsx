import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Hospital, ShieldCheck, HeartPulse } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden bg-[#F5F8F7]">
      <div className="max-w-6xl mx-auto">
        
        {/* HEROIC DEEP DARK TEAL CTA CARD */}
        <div className="relative rounded-3xl sm:rounded-[40px] bg-[#003D3B] p-8 sm:p-14 lg:p-20 text-white shadow-[0_30px_70px_rgba(0,61,59,0.3)] overflow-hidden text-center">
          
          {/* AMBIENT RADIAL MINT GLOWS */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-radial from-[#63D6AE]/30 via-[#005B52]/35 to-transparent blur-3xl pointer-events-none -z-0" />
          <div className="absolute -top-28 -right-28 w-80 h-80 bg-[#63D6AE]/25 rounded-full blur-2xl pointer-events-none -z-0" />
          <div className="absolute -bottom-28 -left-28 w-80 h-80 bg-[#005B52]/40 rounded-full blur-2xl pointer-events-none -z-0" />

          {/* SUBTLE BACKGROUND GRID */}
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none -z-0"
            style={{
              backgroundImage: `radial-gradient(#63D6AE 1.2px, transparent 1.2px)`,
              backgroundSize: "28px 28px",
            }}
          />

          {/* DECORATIVE FLOATING UI FRAGMENTS */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:flex absolute top-12 left-12 items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-[#63D6AE] font-semibold"
          >
            <Hospital className="w-3.5 h-3.5" />
            <span>Faskes Semarang 24 Jam</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="hidden md:flex absolute bottom-14 left-16 items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-emerald-200 font-semibold"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Akses Publik Gratis</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="hidden md:flex absolute top-16 right-12 items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-[#63D6AE] font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Assistant Siaga</span>
          </motion.div>

          {/* CONTENT */}
          <div className="relative z-10 max-w-2xl mx-auto space-y-7">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#63D6AE] text-xs font-bold border border-white/10">
              <HeartPulse className="w-3.5 h-3.5" />
              <span>Platform Terbuka Untuk Seluruh Warga</span>
            </div>

            {/* BOLD HEADLINE (48px - 64px) */}
            <h2 className="text-3xl sm:text-5xl lg:text-[60px] font-extrabold text-white tracking-tight leading-[1.12]">
              Akses Kesehatan <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#63D6AE] via-emerald-200 to-[#63D6AE]">
                Tidak Harus Rumit.
              </span>
            </h2>

            {/* VERY SHORT SUBTEXT */}
            <p className="text-emerald-100/80 text-sm sm:text-base font-normal max-w-md mx-auto leading-relaxed">
              Mulai temukan fasilitas terdekat, informasi terpercaya, dan panduan darurat sekarang juga.
            </p>

            <div className="pt-3">
              <Link
                to="/user/dashboard"
                className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-[#63D6AE] text-[#003D3B] text-sm sm:text-base font-extrabold shadow-xl shadow-black/25 hover:bg-white active:scale-95 transition-all group"
              >
                <span>MULAI SEKARANG</span>
                <ArrowRight className="w-4 h-4 text-[#003D3B] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <p className="text-[11px] text-emerald-200/60 font-light">
              Gratis & Terbuka • Tidak memerlukan registrasi berbelit
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}