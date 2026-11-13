import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Link2, Info, HeartPulse } from "lucide-react";

const pillars = [
  {
    number: "01",
    title: "AKSES CEPAT TANPA HAMBATAN",
    subtitle: "Tanggap Darurat Kritis",
    description: "Cari nomor ambulans 119 dan faskes siaga dalam hitungan detik tanpa dipersulit oleh formulir atau registrasi panjang.",
    icon: Zap,
  },
  {
    number: "02",
    title: "BAHASA MEDIS RAMAH AWAM",
    subtitle: "Bebas Istilah Membingungkan",
    description: "Panduan pertolongan pertama dan alur rujukan fasilitas kesehatan disusun dengan kalimat ringkas dan dapat langsung dieksekusi.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "JARINGAN RESMI KOTA SEMARANG",
    subtitle: "Integrasi Pelayanan Publik",
    description: "Terhubung langsung dengan 37 Puskesmas dan seluruh RSUD rujukan se-Kota Semarang demi keakuratan data fasilitas.",
    icon: Link2,
  },
];

export default function WhyWARAS() {
  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden bg-[#022022]/[0.02] text-[#022022]">
      {/* BACKGROUND WING WATERMARK */}
      <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[650px] h-auto pointer-events-none opacity-[0.05] select-none -z-0">
        <img src="/Wing.svg" alt="" className="w-full h-auto object-contain" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#37F4B4]/30 text-[#022022] text-xs font-medium mb-3 shadow-2xs">
            <HeartPulse className="w-3.5 h-3.5 text-[#022022]" />
            <span>Prinsip Layanan Publik</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-light text-[#022022] tracking-tight leading-[1.12]">
            Dihadirkan untuk Mempermudah, <br />
            <span className="font-normal text-[#022022]">
              Bukan Membingungkan.
            </span>
          </h2>
          <p className="mt-4 text-[#022022]/70 text-sm sm:text-base font-light max-w-lg mx-auto leading-relaxed">
            Platform kesehatan publik Kota Semarang yang berfokus pada ketepatan tindakan dan kejelasan informasi bagi setiap warga.
          </p>
        </div>

        {/* 3 BIG PILLARS */}
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
                className="p-8 rounded-3xl bg-white border border-[#022022]/10 hover:border-[#37F4B4]/50 hover:shadow-[0_20px_45px_rgba(2,32,34,0.06)] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl sm:text-5xl font-light font-mono text-[#022022]">
                      {item.number}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-[#022022]/5 text-[#022022] flex items-center justify-center group-hover:bg-[#022022] group-hover:text-[#37F4B4] transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-normal text-[#022022] tracking-wide">
                    {item.title}
                  </h3>
                  <span className="text-xs font-mono text-[#022022]/80 block mt-1">
                    {item.subtitle}
                  </span>

                  <p className="mt-3 text-xs sm:text-sm text-[#022022]/70 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#022022]/10 flex items-center gap-1.5 text-[11px] font-medium text-[#022022]">
                  <span>Standar Akses WARAS</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* MEDICAL DISCLAIMER BADGE (Clean White Frame) */}
        <div className="mt-14 max-w-2xl mx-auto">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#022022]/10 flex items-center gap-3.5 shadow-2xs">
            <Info className="w-5 h-5 text-[#022022] shrink-0" />
            <p className="text-xs text-[#022022]/75 leading-relaxed font-light">
              <strong className="text-[#022022] font-medium">Pemberitahuan Medis: </strong>
              WARAS menyediakan panduan pertolongan pertama dan direktori informasi kesehatan umum. Dalam kondisi gawat darurat yang mengancam jiwa, segera hubungi ambulans 119 atau kunjungi IGD rumah sakit terdekat.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
