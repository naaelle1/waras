import React from "react";
import { BookOpenText, ArrowRight, Tag } from "lucide-react";
import clsx from "clsx";

export default function MedicalTermCard({ term, onSelect, className = "" }) {
  if (!term) return null;

  return (
    <div
      onClick={() => onSelect && onSelect(term)}
      className={clsx(
        "group relative flex flex-col justify-between p-5 sm:p-6 rounded-[20px]",
        "bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_8px_30px_rgb(0,43,44,0.05)]",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgb(0,43,44,0.1)] hover:border-[#4F8B8C]/40 hover:bg-white/85",
        "cursor-pointer select-none h-full",
        className
      )}
    >
      <div className="space-y-3">
        {/* Header Badge & Phonetic */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-poppins font-semibold bg-[#002B2C]/8 text-[#002B2C]">
            <Tag className="w-3 h-3 text-[#4F8B8C]" />
            {term.category}
          </span>
          {term.phonetic && (
            <span className="text-xs font-mono text-[#5F6F70] italic">
              /{term.phonetic}/
            </span>
          )}
        </div>

        {/* Term Title */}
        <h3 className="font-poppins font-bold text-lg sm:text-xl text-[#002B2C] group-hover:text-[#4F8B8C] transition-colors">
          {term.term}
        </h3>

        {/* Definition Text */}
        <p className="font-inter text-xs sm:text-sm text-[#5F6F70] leading-relaxed line-clamp-3">
          {term.definition}
        </p>
      </div>

      {/* Action Footer */}
      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-poppins font-semibold text-[#002B2C] group-hover:text-[#003536]">
        <span className="flex items-center gap-1.5">
          <BookOpenText className="w-4 h-4 text-[#4F8B8C]" />
          <span>Pelajari Lebih Lanjut</span>
        </span>
        <ArrowRight className="w-4 h-4 text-[#002B2C] transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
}