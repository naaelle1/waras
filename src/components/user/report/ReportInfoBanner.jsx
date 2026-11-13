import React from "react";
import { Info } from "lucide-react";

export default function ReportInfoBanner() {
  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/90 p-4 sm:p-5 shadow-[0_8px_30px_rgba(2,32,34,0.04)]">
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-[#022022]/10 text-[#022022] border border-[#37F4B4]/25 shrink-0 mt-0.5">
          <Info className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-poppins font-bold text-sm text-[#022022]">
            Membantu Meningkatkan Kualitas WARAS
          </h4>
          <p className="text-xs sm:text-sm text-[#4B5E5E] font-inter leading-relaxed">
            Laporan yang Anda kirim akan ditinjau dan diverifikasi terlebih dahulu oleh tim admin medis WARAS. Informasi atau data pada platform tidak akan berubah secara otomatis sebelum melalui proses evaluasi internal.
          </p>
        </div>
      </div>
    </div>
  );
}