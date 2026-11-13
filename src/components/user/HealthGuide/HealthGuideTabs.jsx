import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import clsx from "clsx";

export default function HealthGuideTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: "darurat", label: "Darurat" },
    { id: "p3k", label: "P3K" },
    { id: "cekMandiri", label: "Cek Mandiri" }
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 overflow-x-auto pb-1 scrollbar-thin select-none">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 p-1 rounded-full bg-white border border-[#E2ECEB] shadow-2xs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={clsx(
                "px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border",
                isActive
                  ? "bg-[#022022] text-[#37F4B4] border-[#022022] shadow-xs"
                  : "bg-white text-[#2B3E3E] border-transparent hover:bg-[#022022]/5 hover:text-[#022022]"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* AI Assistance CTA Pill */}
      <Link
        to="/user/ai"
        className="group inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#022022] text-[#37F4B4] font-semibold text-xs sm:text-sm shadow-xs hover:bg-[#033033] border border-[#37F4B4]/25 transition-colors"
      >
        <Sparkles className="w-4 h-4 text-[#37F4B4]" />
        <span>Belum menemukan topik? Tanya AI</span>
        <ArrowRight className="w-4 h-4 text-[#37F4B4] transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}