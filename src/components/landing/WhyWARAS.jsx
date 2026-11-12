import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Link2, Info } from "lucide-react";

const pillars = [
  {
    number: "01",
    title: "AKSES LEBIH CEPAT",
    subtitle: "Tanpa Birokrasi Berbelit",
    description: "Cari nomor darurat ambulans 119 dan lokasi faskes IGD dalam hitungan detik tanpa registrasi panjang.",
    icon: Zap,
  },
  {
    number: "02",
    title: "INFORMASI LEBIH JELAS",
    subtitle: "Bebas Jargon Rumit",
    description: "Panduan P3K dan alur BPJS disajikan dalam bahasa awam yang terstruktur agar langsung dapat dieksekusi.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "TERHUBUNG DENGAN FASILITAS",
    subtitle: "Jaringan Resmi Semarang",
    description: "Terintegrasi dengan 37 Puskesmas dan seluruh RSUD & RS rujukan se-Kota Semarang secara langsung.",
    icon: Link2,
  },
];

export default function WhyWARAS() {
  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden bg-[#003D3B] text-white">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-radial from-[#63D6AE]/20 via-transparent to-transparent blur-3xl pointer-events-none -z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#63D6AE] text-xs font-bold mb-3 border border-white/10">
            <span>Filosofi & Nilai Layanan</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold text-white tracking-tight leading-[1.12]">
            Dibuat untuk Mempermudah, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#63D6AE] via-emerald-200 to-[#63D6AE]">
              Bukan Membingungkan.
            </span>
          </h2>
          <p className="mt-4 text-emerald-100/80 text-sm sm:text-base font-normal max-w-lg mx-auto">
            Platform kesehatan publik yang berfokus pada kecepatan penanganan dan kepastian informasi bagi warga.
          </p>
        </div>

        {/* 3 BIG REASONS (Large Typography & Minimal Text) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#63D6AE]/50 hover:bg-white/10 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl sm:text-5xl font-black font-mono text-[#63D6AE]">
                      {item.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/10 text-[#63D6AE] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-white tracking-wide">
                    {item.title}
                  </h3>
                  <span className="text-xs font-mono text-emerald-200/70 block mt-1">
                    {item.subtitle}
                  </span>

                  <p className="mt-3 text-xs sm:text-sm text-emerald-100/75 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-bold text-[#63D6AE]">
                  <span>Standar Publik WARAS</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* MEDICAL DISCLAIMER BADGE */}
        <div className="mt-14 max-w-2xl mx-auto">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <Info className="w-5 h-5 text-[#63D6AE] shrink-0" />
            <p className="text-xs text-emerald-100/80 leading-relaxed font-light">
              <strong className="text-white font-bold">Pemberitahuan: </strong>
              WARAS menyediakan panduan dan informasi kesehatan umum dan tidak menggantikan diagnosis atau konsultasi tenaga medis profesional.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}