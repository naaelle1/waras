import React from "react";
import { ShieldCheck } from "lucide-react";

const partners = [
  "Dinas Kesehatan Kota Semarang",
  "RSUP Dr. Kariadi",
  "RSUD KRMT Wongsonegoro",
  "PSC Ambulans 119",
  "BPJS Kesehatan",
];

export default function PartnerStrip() {
  return (
    <section className="px-4 sm:px-8 lg:px-12 py-8 bg-white border-b border-[#014751]/10">
      <div className="max-w-[1480px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* LEFT TAG */}
        <div className="flex items-center gap-2.5 text-xs font-light text-[#022022]/60 shrink-0">
          <ShieldCheck className="w-4 h-4 text-[#014751]" />
          <span>Integrasi Jaringan Publik Resmi:</span>
        </div>

        {/* LOGOS / PARTNER NAMES (Clean & Minimal like Reference) */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 sm:gap-10 text-xs sm:text-sm font-light text-[#022022]/70">
          {partners.map((partner) => (
            <span
              key={partner}
              className="hover:text-[#014751] transition-colors cursor-default tracking-wide"
            >
              {partner}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
