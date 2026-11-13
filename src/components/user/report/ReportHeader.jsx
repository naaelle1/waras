import React from "react";
import { Flag } from "lucide-react";

export default function ReportHeader() {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2.5 text-[#022022]">
        <div className="p-2.5 rounded-2xl bg-[#022022] text-[#37F4B4] shadow-md shadow-[#022022]/10">
          <Flag className="w-6 h-6 text-[#37F4B4]" />
        </div>
        <h1 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#022022]">
          Laporkan Kesalahan
        </h1>
      </div>
      <p className="text-xs sm:text-sm text-[#4B5E5E] font-inter max-w-2xl leading-relaxed">
        Bantu kami menjaga informasi dan layanan WARAS tetap akurat, terpercaya, serta nyaman digunakan oleh seluruh masyarakat Kota Semarang.
      </p>
    </div>
  );
}