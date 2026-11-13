import React from "react";
import { X, CheckCircle2, AlertTriangle, Hospital } from "lucide-react";
import { Link } from "react-router-dom";

export default function GuideDetailModal({ isOpen, guide, onClose }) {
  if (!isOpen || !guide) return null;

  const details = guide.fullDetails || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#001F1F]/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-[#E2ECEB] p-6 sm:p-8 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto scrollbar-thin">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <span className="px-3 py-1 rounded-full text-[11px] font-poppins font-bold bg-[#022022]/10 text-[#022022] border border-[#37F4B4]/25">
              PANDUAN LENGKAP
            </span>
            <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#022022] mt-2">
              {guide.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-[#022022] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        {details.description && (
          <p className="font-inter text-sm text-[#4B5E5E] leading-relaxed">
            {details.description}
          </p>
        )}

        {/* Safety Precautions Box */}
        {details.precautions && details.precautions.length > 0 && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-poppins font-bold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>PERHATIAN & PANTANGAN:</span>
            </div>
            <ul className="space-y-1.5 pl-6 list-disc text-xs text-amber-950 font-inter leading-relaxed">
              {details.precautions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Complete Step-by-Step Instructions */}
        {details.detailedSteps && (
          <div className="space-y-3">
            <h4 className="font-poppins font-bold text-sm text-[#022022] tracking-wide uppercase">
              Langkah Pertolongan Detail:
            </h4>
            <div className="space-y-3">
              {details.detailedSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                  <CheckCircle2 className="w-5 h-5 text-[#022022] shrink-0 mt-0.5" />
                  <p className="font-inter text-xs sm:text-sm text-[#022022] leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#022022] font-poppins font-bold text-xs transition-colors cursor-pointer"
          >
            Tutup
          </button>

          <Link
            to="/user/facilities"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#022022] hover:bg-[#033033] text-[#37F4B4] border border-[#37F4B4]/25 font-poppins font-bold text-xs transition-colors shadow-md"
          >
            <Hospital className="w-4 h-4 text-[#37F4B4]" />
            <span>Cari Faskes Terdekat</span>
          </Link>
        </div>

      </div>
    </div>
  );
}