import React from "react";
import { ArrowRight, BookOpen } from "lucide-react";

export default function GuideCard({ guide, onOpenModal }) {
  if (!guide) return null;

  return (
    <div
      onClick={() => onOpenModal && onOpenModal(guide)}
      className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white border border-[#E2ECEB] shadow-xs hover:border-[#022022]/30 hover:shadow-md hover:-translate-y-1 transition-all duration-200 h-full cursor-pointer select-none"
    >
      <div className="space-y-3.5">
        {/* Card Header Tag & Step Count */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-poppins font-semibold bg-[#022022] text-white border border-white/20 shadow-xs">
            <BookOpen className="w-3 h-3 text-white" />
            Panduan
          </span>
          <span className="text-[11px] font-medium text-[#526666]">
            {guide.previewSteps?.length || 3} Langkah
          </span>
        </div>

        {/* Card Title */}
        <h3 className="font-poppins font-semibold text-base sm:text-lg text-[#0D2626] line-clamp-2 leading-snug group-hover:text-[#022022] transition-colors">
          {guide.title}
        </h3>

        {/* Divider line under title */}
        <div className="h-px w-full bg-gray-100" />

        {/* Short Numbered Step Previews */}
        <div className="space-y-2.5">
          {guide.previewSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#022022]/10 text-[#022022] font-poppins font-bold text-[11px] shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="font-inter text-xs sm:text-sm text-[#526666] leading-relaxed line-clamp-2">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Card Action Footer matching ArticleCard */}
      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#022022]">
        <span>Pelajari Selengkapnya</span>
        <div className="p-1.5 rounded-full bg-[#022022]/5 text-[#022022] group-hover:bg-[#022022] group-hover:text-white border border-[#022022]/10 group-hover:border-white/20 transition-colors duration-200">
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  );
}
