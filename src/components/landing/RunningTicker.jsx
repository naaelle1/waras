import React from "react";
import { Activity, ShieldCheck, HeartPulse, Hospital, PhoneCall, Sparkles } from "lucide-react";

const tickerItems = [
  { text: "Pusat Informasi & Navigasi Kesehatan Kota Semarang", icon: Hospital },
  { text: "IGD 24 Jam Siaga & Ambulans Darurat 119", icon: PhoneCall },
  { text: "37 Puskesmas & RS Rujukan Terverifikasi", icon: ShieldCheck },
  { text: "Panduan Penanganan Medis Awal & P3K Terstruktur", icon: HeartPulse },
  { text: "Akses Kesehatan Terbuka & Gratis Untuk Seluruh Warga", icon: Activity },
  { text: "Informasi Jelas, Akurat, dan Bebas Jargon Rumit", icon: Sparkles },
];

export default function RunningTicker({ variant = "light" }) {
  const isLight = variant === "light";

  return (
    <div
      className={`w-full overflow-hidden border-y py-3.5 transition-colors select-none ${
        isLight
          ? "bg-[#022022]/5 border-[#37F4B4]/20 text-[#022022]"
          : "bg-[#022022] border-[#37F4B4]/20 text-white"
      }`}
    >
      <div className="flex w-max animate-marquee">
        {/* Render twice for continuous infinite seamless loop */}
        {[...tickerItems, ...tickerItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-3.5 mx-6 sm:mx-8 whitespace-nowrap"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isLight ? "bg-[#022022]" : "bg-[#37F4B4]"
                } shadow-[0_0_8px_rgba(55,244,180,0.6)]`}
              />
              <span className="text-xs sm:text-sm font-light tracking-wide uppercase">
                {item.text}
              </span>
              <span className="text-[#37F4B4] opacity-80 text-xs font-mono">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
