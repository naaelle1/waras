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
      className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white border border-[#E2ECEB] shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-[#37F4B4]/40 transition-all duration-200 cursor-pointer select-none h-full"
    >
      <div className="space-y-3.5">
        {/* Icon & Category Pill */}
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-xl bg-[#022022] text-[#37F4B4] border border-[#37F4B4]/25 shadow-2xs group-hover:scale-105 transition-transform">
            <IconComponent className="w-5 h-5 text-[#37F4B4]" />
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#022022]/10 text-[#022022] border border-[#37F4B4]/25">
            {guide.category}
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h3 className="font-poppins font-semibold text-base text-[#0D2626] group-hover:text-[#022022] transition-colors leading-snug">
            {guide.title}
          </h3>
          <p className="font-inter text-xs text-[#526666] leading-relaxed line-clamp-3">
            {guide.description}
          </p>
        </div>
      </div>

      {/* Footer Action Arrow */}
      <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#022022]">
        <span>Pelajari Panduan</span>
        <div className="p-1.5 rounded-lg bg-[#022022]/5 text-[#022022] group-hover:bg-[#022022] group-hover:text-[#37F4B4] transition-colors duration-200">
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  );
}