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
      <div className="flex items-center gap-2.5 p-1.5 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_4px_20px_rgba(0,43,43,0.05)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={clsx(
                "px-6 py-2.5 rounded-full text-xs sm:text-sm font-poppins font-bold transition-all duration-300 cursor-pointer border",
                isActive
                  ? "bg-[#003B3B] text-white border-[#003B3B] shadow-md shadow-[#003B3B]/20 scale-[1.02]"
                  : "bg-white/80 text-[#003B3B] border-[#003B3B]/30 hover:bg-[#003B3B]/10 hover:border-[#003B3B]"
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
        className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#003B3B] text-white font-poppins font-bold text-xs sm:text-sm shadow-md shadow-[#003B3B]/20 hover:bg-[#002B2B] transition-all duration-300 active:scale-95 border border-[#003B3B]"
      >
        <Sparkles className="w-4 h-4 text-[#A9D6C8] animate-pulse" />
        <span>Ga ada di sini? Tanya AI</span>
        <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}