import React from "react";
import { FileText, Tag, MapPin, Clock } from "lucide-react";

export default function ReportSummary({ categoryTitle, title, relatedPage, isComplete }) {
  return (
    <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 p-6 shadow-[0_10px_35px_rgba(0,43,43,0.06)] space-y-5 lg:sticky lg:top-6">
      <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
        <FileText className="w-5 h-5 text-[#003B3B]" />
        <h3 className="font-poppins font-bold text-base text-[#062B2B]">
          Ringkasan Laporan
        </h3>
      </div>

      <div className="space-y-4">
        {/* Category Item */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-poppins font-semibold text-[#4B5E5E] uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5 text-[#003B3B]" />
            <span>Kategori</span>
          </div>
          <p className="font-poppins font-semibold text-xs sm:text-sm text-[#062B2B]">
            {categoryTitle || "Belum dipilih"}
          </p>
        </div>

        {/* Title Item */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-poppins font-semibold text-[#4B5E5E] uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-[#003B3B]" />
            <span>Judul Laporan</span>
          </div>
          <p className="font-inter text-xs sm:text-sm text-[#062B2B] font-medium line-clamp-2">
            {title ? title : <span className="text-gray-400 italic">Belum diisi</span>}
          </p>
        </div>

        {/* Related Page */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-poppins font-semibold text-[#4B5E5E] uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#003B3B]" />
            <span>Halaman / Fitur</span>
          </div>
          <p className="font-inter text-xs sm:text-sm text-[#062B2B] font-medium">
            {relatedPage}
          </p>
        </div>

        {/* Status Draft */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-poppins font-semibold text-[#4B5E5E] uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-[#003B3B]" />
            <span>Status Draf</span>
          </div>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-poppins font-bold ${
              isComplete
                ? "bg-emerald-100 text-emerald-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {isComplete ? "Siap Dikirim" : "Belum Lengkap"}
          </span>
        </div>
      </div>
    </div>
  );
}