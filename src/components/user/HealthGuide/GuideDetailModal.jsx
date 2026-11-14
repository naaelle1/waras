import React, { useEffect } from "react";
import { X, CheckCircle2, AlertTriangle, Hospital, Bot } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function GuideDetailModal({ isOpen, guide, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !guide) return null;

  const details = guide.fullDetails || {};

  const handleAskAI = () => {
    onClose();
    navigate(
      `/user/ai?q=${encodeURIComponent(
        `Saya butuh panduan langkah demi langkah mengenai: ${guide.title}`
      )}`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#001F1F]/60 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-[#E2ECEB] p-5 sm:p-7 shadow-2xl z-10 space-y-5 max-h-[90vh] overflow-y-auto scrollbar-thin animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#022022] text-white border border-white/20 shadow-xs font-poppins">
              PANDUAN LENGKAP
            </span>
            <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#0D2626] leading-snug tracking-tight">
              {guide.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-[#022022] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Tutup panduan"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Description Callout */}
        {details.description && (
          <div className="p-4 rounded-2xl bg-[#022022]/[0.03] border border-[#022022]/10 font-inter text-xs sm:text-sm text-[#0D2626] leading-relaxed">
            {details.description}
          </div>
        )}

        {/* Safety Precautions Box */}
        {details.precautions && details.precautions.length > 0 && (
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-2">
            <div className="flex items-center gap-2 text-xs font-poppins font-semibold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>PERHATIAN & PANTANGAN:</span>
            </div>
            <ul className="space-y-1.5 pl-6 list-disc text-xs sm:text-sm text-amber-950 font-inter leading-relaxed">
              {details.precautions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Complete Step-by-Step Instructions */}
        {details.detailedSteps && (
          <div className="space-y-2.5 pt-1">
            <h4 className="font-poppins font-semibold text-sm sm:text-base text-[#0D2626]">
              Langkah Pertolongan Detail:
            </h4>
            <div className="space-y-2">
              {details.detailedSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#E2ECEB] shadow-2xs hover:border-[#022022]/20 transition-colors">
                  <div className="p-1 rounded-lg bg-[#022022]/5 text-[#022022] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#022022]" />
                  </div>
                  <p className="font-inter text-xs sm:text-sm text-[#0D2626] leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="order-last sm:order-first px-5 py-2.5 rounded-full border border-gray-200 hover:bg-gray-50 text-[#526666] hover:text-[#022022] font-semibold text-xs transition-colors cursor-pointer text-center font-inter"
          >
            Tutup
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleAskAI}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#022022]/5 hover:bg-[#022022]/10 text-[#022022] border border-[#022022]/15 font-semibold text-xs transition-colors cursor-pointer active:scale-[0.99] font-inter"
            >
              <Bot className="w-4 h-4 text-[#022022]" />
              <span>Tanya AI tentang Panduan Ini</span>
            </button>

            <Link
              to="/user/facilities"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#022022] hover:bg-[#033033] text-white font-semibold text-xs shadow-xs transition-colors active:scale-[0.99] font-inter"
            >
              <Hospital className="w-4 h-4 text-white" />
              <span>Cari Faskes Terdekat</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
