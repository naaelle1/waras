import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Clock, RotateCcw, LayoutDashboard } from "lucide-react";

export default function ReportSuccessModal({ isOpen, resultData, onReset }) {
  if (!isOpen || !resultData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[#001F1F]/60 backdrop-blur-md transition-opacity duration-300" />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-lg rounded-3xl bg-white/95 backdrop-blur-2xl border border-white p-6 sm:p-8 shadow-2xl z-10 text-center space-y-6">
        
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#062B2B]">
            Laporan Berhasil Dikirim
          </h3>
          <p className="font-inter text-xs sm:text-sm text-[#4B5E5E] leading-relaxed">
            Terima kasih telah berkontribusi menjaga keakuratan informasi platform WARAS. Laporan Anda telah tercatat dan akan ditinjau oleh tim kami.
          </p>
        </div>

        {/* Metadata Details Card */}
        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-left space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-inter text-[#4B5E5E]">ID Referensi:</span>
            <span className="font-poppins font-bold text-[#062B2B] bg-white px-2 py-0.5 rounded border border-gray-200">
              {resultData.reportId}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="font-inter text-[#4B5E5E]">Waktu Pengiriman:</span>
            <span className="font-inter font-medium text-[#062B2B]">
              {resultData.submittedAt}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-200/60">
            <span className="font-inter text-[#4B5E5E]">Status Laporan:</span>
            <span className="inline-flex items-center gap-1 font-poppins font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full text-[11px]">
              <Clock className="w-3 h-3 text-amber-700" />
              {resultData.status}
            </span>
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onReset}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-[#062B2B] font-poppins font-bold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Kirim Laporan Lain</span>
          </button>

          <Link
            to="/user/dashboard"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#003B3B] text-white font-poppins font-bold text-xs sm:text-sm hover:bg-[#002B2B] transition-colors shadow-md shadow-[#003B3B]/20"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Kembali ke Dashboard</span>
          </Link>
        </div>

      </div>
    </div>
  );
}