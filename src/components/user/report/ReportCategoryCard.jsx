import React from "react";
import {
  FileWarning,
  Building2,
  Wrench,
  FileQuestion,
  Accessibility,
  MoreHorizontal,
  Check
} from "lucide-react";

const ICON_MAP = {
  FileWarning,
  Building2,
  Wrench,
  FileQuestion,
  Accessibility,
  MoreHorizontal
};

export default function ReportCategoryCard({ category, isSelected, onSelect }) {
  const IconComponent = ICON_MAP[category.icon] || FileWarning;

  return (
    <button
      type="button"
      onClick={() => onSelect(category.id)}
      className={`group relative flex flex-col justify-between p-5 rounded-3xl text-left transition-all duration-200 cursor-pointer border select-none h-full ${
        isSelected
          ? "bg-[#003B3B]/5 border-[#003B3B] shadow-[0_10px_30px_rgba(0,59,59,0.12)] scale-[1.01]"
          : "bg-white/70 backdrop-blur-md border-white/80 shadow-[0_4px_20px_rgba(0,43,43,0.04)] hover:bg-white/90 hover:border-[#003B3B]/30 hover:shadow-md"
      }`}
    >
      <div className="space-y-3">
        {/* Header Icon and Check Indicator */}
        <div className="flex items-center justify-between">
          <div
            className={`p-3 rounded-2xl transition-colors ${
              isSelected
                ? "bg-[#003B3B] text-white shadow-md shadow-[#003B3B]/20"
                : "bg-[#003B3B]/10 text-[#003B3B] group-hover:bg-[#003B3B] group-hover:text-white"
            }`}
          >
            <IconComponent className="w-5 h-5" />
          </div>

          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              isSelected
                ? "bg-[#003B3B] text-white"
                : "border border-gray-300 opacity-40 group-hover:opacity-100"
            }`}
          >
            {isSelected && <Check className="w-3.5 h-3.5 stroke-3" />}
          </div>
        </div>

        {/* Title and Description */}
        <div>
          <h3 className="font-poppins font-bold text-sm text-[#062B2B] leading-tight">
            {category.title}
          </h3>
          <p className="font-inter text-xs text-[#4B5E5E] leading-relaxed mt-1.5">
            {category.description}
          </p>
        </div>
      </div>
    </button>
  );
}