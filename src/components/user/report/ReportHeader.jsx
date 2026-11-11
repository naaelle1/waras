import React from "react";
import { Flag } from "lucide-react";

export default function ReportHeader() {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2.5 text-[#062B2B]">
        <div className="p-2.5 rounded-2xl bg-[#003B3B] text-white shadow-md shadow-[#003B3B]/10">
          <Flag className="w-6 h-6 text-white" />
        </div>
        <h1 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#062B2B]">
          Laporkan Kesalahan
        </h1>
      </div>
      <p className="text-xs sm:text-sm text-[#4B5E5E] font-inter max-w-2xl leading-relaxed">
        Bantu kami menjaga informasi dan layanan WARAS tetap akurat, terpercaya, serta nyaman digunakan oleh seluruh masyarakat Kota Semarang.
      </p>
    </div>
  );
}