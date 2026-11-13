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
                "px-6 py-2.5 rounded-full text-xs sm:text-sm font-poppins font-semibold transition-all duration-200 cursor-pointer active:scale-[0.98] border",
                isActive
                  ? "text-[#37F4B4] bg-gradient-to-br from-[#023b3b] via-[#022022] to-[#011414] border-[#37F4B4]/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),0_4px_12px_rgba(2,32,34,0.15)] scale-[1.02]"
                  : "text-[#022022] bg-gradient-to-br from-[#022022]/[0.08] via-teal-50/70 to-white/90 hover:from-[#022022]/[0.14] hover:via-teal-100/70 hover:to-white backdrop-blur-md border-[#022022]/15 hover:border-[#37F4B4]/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_12px_rgba(2,32,34,0.05)]"
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
        className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white bg-gradient-to-br from-[#023b3b] via-[#022022] to-[#011414] hover:from-[#034d4d] hover:via-[#033033] hover:to-[#022022] backdrop-blur-md border border-[#022022]/80 hover:border-[#37F4B4]/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.28),0_6px_16px_rgba(2,32,34,0.16)] font-poppins font-semibold text-xs sm:text-sm active:scale-[0.98] transition-all"
      >
        <Sparkles className="w-4 h-4 text-[#37F4B4] animate-pulse" />
        <span>Ga ada di sini? Tanya AI</span>
        <ArrowRight className="w-4 h-4 text-[#37F4B4] transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}