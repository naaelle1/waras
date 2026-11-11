import React from "react";
import { Building2, WalletCards, ClipboardCheck, Siren, ArrowRight } from "lucide-react";

const ICON_MAP = {
  Building2,
  WalletCards,
  ClipboardCheck,
  Siren
};

export default function QuickGuideCard({ guide, onSelect }) {
  if (!guide) return null;
  const IconComponent = ICON_MAP[guide.icon] || Building2;

  return (
    <div
      onClick={() => onSelect && onSelect(guide)}
      className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white border border-[#E2ECEB] shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-[#003B3B]/30 transition-all duration-200 cursor-pointer select-none h-full"
    >
      <div className="space-y-3.5">
        {/* Icon & Category Pill */}
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-xl bg-[#003B3B] text-white shadow-2xs group-hover:scale-105 transition-transform">
            <IconComponent className="w-5 h-5 text-[#EBF5F5]" />
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#EBF5F5] text-[#003B3B]">
            {guide.category}
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h3 className="font-poppins font-semibold text-base text-[#0D2626] group-hover:text-[#003B3B] transition-colors leading-snug">
            {guide.title}
          </h3>
          <p className="font-inter text-xs text-[#526666] leading-relaxed line-clamp-3">
            {guide.description}
          </p>
        </div>
      </div>

      {/* Footer Action Arrow */}
      <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#003B3B]">
        <span>Pelajari Panduan</span>
        <div className="p-1.5 rounded-lg bg-[#EBF5F5] group-hover:bg-[#003B3B] group-hover:text-white transition-colors duration-200">
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  );
}