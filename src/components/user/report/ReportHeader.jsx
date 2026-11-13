import React from "react";
import { Flag, Activity } from "lucide-react";

export default function ReportHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/60 pb-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5 text-[#022022]">
          <Flag className="w-6 h-6 stroke-[2.2] text-[#022022]" />
          <h1 className="font-poppins font-bold text-2xl lg:text-3xl tracking-tight text-[#0D2626]">
            Laporkan Kesalahan
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#526666] font-inter leading-relaxed">
          Bantu kami menjaga informasi dan layanan WARAS tetap akurat, terpercaya, serta nyaman digunakan oleh seluruh masyarakat Kota Semarang.
        </p>
      </div>

      <div className="flex items-center gap-2 self-start sm:self-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#022022]/5 text-[#022022] border border-[#022022]/15">
          <Activity className="w-3.5 h-3.5 text-[#022022]" />
          Kota Semarang • Sistem Aktif
        </span>
      </div>
    </div>
  );
}
