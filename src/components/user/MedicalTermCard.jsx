import React from "react";
import { BookOpenText, ArrowRight, Tag } from "lucide-react";
import clsx from "clsx";

export default function MedicalTermCard({ term, onSelect, className = "" }) {
  if (!term) return null;

  return (
    <div
      onClick={() => onSelect && onSelect(term)}
      className={clsx(
        "group relative flex flex-col justify-between p-5 rounded-2xl",
        "bg-white border border-[#E2ECEB] shadow-xs",
        "transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-[#37F4B4]/40",
        "cursor-pointer select-none h-full",
        className
      )}
    >
      <div className="space-y-3">
        {/* Header Badge & Phonetic */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-poppins font-semibold bg-[#022022]/10 text-[#022022] border border-[#37F4B4]/25">
            <Tag className="w-3 h-3 text-[#022022]" />
            {term.category}
          </span>
          {term.phonetic && (
            <span className="text-xs font-mono text-[#526666] italic">
              /{term.phonetic}/
            </span>
          )}
        </div>

        {/* Term Title */}
        <h3 className="font-poppins font-semibold text-base sm:text-lg text-[#0D2626] group-hover:text-[#022022] transition-colors">
          {term.term}
        </h3>

        {/* Definition Text */}
        <p className="font-inter text-xs sm:text-sm text-[#526666] leading-relaxed line-clamp-3">
          {term.definition}
        </p>
      </div>

        {/* Action Footer */}
      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#022022]">
        <span className="flex items-center gap-1.5">
          <BookOpenText className="w-4 h-4 text-[#022022]" />
          <span>Definisi & Konteks Medis</span>
        </span>
        <ArrowRight className="w-4 h-4 text-[#022022] transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
}