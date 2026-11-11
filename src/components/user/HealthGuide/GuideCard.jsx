import React from "react";
import { ArrowRight } from "lucide-react";

export default function GuideCard({ guide, onOpenModal }) {
  if (!guide) return null;

  return (
    <div className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white border border-[#E2ECEB] shadow-xs hover:border-[#003B3B]/30 hover:shadow-md hover:-translate-y-1 transition-all duration-200 h-full">
      
      <div className="space-y-4">
        {/* Card Title */}
        <h3 className="font-poppins font-semibold text-base sm:text-lg text-[#0D2626] leading-snug group-hover:text-[#003B3B] transition-colors">
          {guide.title}
        </h3>

        {/* Divider line under title */}
        <div className="h-px w-full bg-gray-100" />

        {/* Short Numbered Step Previews */}
        <div className="space-y-2.5">
          {guide.previewSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <span className="font-poppins font-bold text-xs text-[#003B3B] shrink-0 mt-0.5">
                {idx + 1}.
              </span>
              <p className="font-inter text-xs sm:text-sm text-[#526666] leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Action Button */}
      <div className="pt-5 mt-3 border-t border-gray-100">
        <button
          onClick={() => onOpenModal(guide)}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#003B3B] text-white font-semibold text-xs sm:text-sm hover:bg-[#002D2D] transition-colors shadow-xs active:scale-[0.98] cursor-pointer group/btn"
        >
          <span>Pelajari Selengkapnya</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>

    </div>
  );
}