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
      className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer border select-none h-full ${
        isSelected
          ? "bg-[#022022]/5 border-[#022022] shadow-xs"
          : "bg-white border-[#E2ECEB] shadow-2xs hover:border-[#022022]/30 hover:shadow-xs"
      }`}
    >
      <div className="space-y-3">
        {/* Header Icon and Check Indicator */}
        <div className="flex items-center justify-between">
          <div
            className={`p-3 rounded-2xl transition-colors ${
              isSelected
                ? "bg-[#022022] text-white shadow-md shadow-[#022022]/20"
                : "bg-[#022022]/10 text-[#022022] group-hover:bg-[#022022] group-hover:text-white"
            }`}
          >
            <IconComponent className="w-5 h-5" />
          </div>

          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              isSelected
                ? "bg-[#022022] text-white"
                : "border border-gray-300 opacity-40 group-hover:opacity-100"
            }`}
          >
            {isSelected && <Check className="w-3.5 h-3.5 stroke-3" />}
          </div>
        </div>

        {/* Title and Description */}
        <div>
          <h3 className="font-poppins font-bold text-sm text-[#022022] leading-tight">
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