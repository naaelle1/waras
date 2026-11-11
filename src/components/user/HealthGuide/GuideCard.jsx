import React from "react";
import { ArrowRight } from "lucide-react";

export default function GuideCard({ guide, onOpenModal }) {
  if (!guide) return null;

  return (
    <div className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_8px_30px_rgba(0,43,43,0.06)] hover:shadow-[0_16px_40px_rgba(0,43,43,0.12)] hover:-translate-y-1 transition-all duration-300 h-full">
      
      <div className="space-y-4">
        {/* Card Title */}
        <h3 className="font-poppins font-bold text-lg sm:text-xl text-[#062B2B] leading-snug group-hover:text-[#003B3B] transition-colors">
          {guide.title}
        </h3>

        {/* Divider line under title */}
        <div className="h-0.5 w-full bg-gray-100" />

        {/* Short Numbered Step Previews */}
        <div className="space-y-2.5">
          {guide.previewSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <span className="font-poppins font-bold text-xs text-[#003B3B] shrink-0 mt-0.5">
                {idx + 1}.
              </span>
              <p className="font-inter text-xs sm:text-sm text-[#4B5E5E] leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Action Button */}
      <div className="pt-6 mt-4">
        <button
          onClick={() => onOpenModal(guide)}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#003B3B] text-white font-poppins font-bold text-xs sm:text-sm hover:bg-[#002B2B] transition-all duration-200 shadow-md active:scale-95 cursor-pointer group/btn"
        >
          <span>Perbesar/Pelajari</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>

    </div>
  );
}