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
      className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_10px_35px_rgba(0,43,43,0.06)] hover:shadow-[0_18px_45px_rgba(0,43,43,0.12)] hover:-translate-y-1.5 hover:border-white transition-all duration-300 cursor-pointer select-none h-full"
    >
      <div className="space-y-4">
        {/* Icon & Category Pill */}
        <div className="flex items-center justify-between">
          <div className="p-3.5 rounded-2xl bg-[#002B2B] text-white shadow-md shadow-[#002B2B]/20 group-hover:scale-105 transition-transform">
            <IconComponent className="w-6 h-6 text-[#A9D6C8]" />
          </div>
          <span className="text-[11px] font-poppins font-semibold px-2.5 py-1 rounded-full bg-[#002B2B]/5 text-[#002B2B]">
            {guide.category}
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h3 className="font-poppins font-bold text-base sm:text-lg text-[#062B2B] group-hover:text-[#003B3B] transition-colors leading-snug">
            {guide.title}
          </h3>
          <p className="font-inter text-xs sm:text-sm text-[#5F6F70] leading-relaxed">
            {guide.description}
          </p>
        </div>
      </div>

      {/* Footer Action Arrow */}
      <div className="pt-5 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-poppins font-bold text-[#062B2B] group-hover:text-[#003B3B]">
        <span>Pelajari Panduan</span>
        <div className="p-1.5 rounded-full bg-[#F4F6F4] group-hover:bg-[#002B2B] group-hover:text-white transition-all duration-200">
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  );
}