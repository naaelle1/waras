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
      <div className="flex items-center gap-2.5 p-1.5 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_4px_20px_rgba(2,32,34,0.05)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={clsx(
                "px-6 py-2.5 rounded-full text-xs sm:text-sm font-poppins font-bold transition-all duration-300 cursor-pointer border",
                isActive
                  ? "bg-[#022022] text-[#37F4B4] border-[#022022] shadow-md shadow-[#022022]/20 scale-[1.02]"
                  : "bg-white/80 text-[#022022] border-[#37F4B4]/30 hover:bg-[#022022]/10 hover:border-[#37F4B4]/50"
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
        className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#022022] text-[#37F4B4] font-poppins font-bold text-xs sm:text-sm shadow-md shadow-[#022022]/20 hover:bg-[#033033] transition-all duration-300 active:scale-95 border border-[#37F4B4]/30"
      >
        <Sparkles className="w-4 h-4 text-[#37F4B4] animate-pulse" />
        <span>Ga ada di sini? Tanya AI</span>
        <ArrowRight className="w-4 h-4 text-[#37F4B4] transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}