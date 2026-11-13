import React from "react";
import { Search } from "lucide-react";
import clsx from "clsx";

const ALPHABET = ["SEMUA", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

export default function MedicalTermSearch({
  searchTerm,
  onSearchChange,
  activeLetter,
  onLetterSelect
}) {
  return (
    <div className="space-y-4">
      {/* Dictionary Search Input */}
      <div className="relative flex items-center w-full">
        <div className="absolute left-4 p-2 text-[#022022]">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari istilah medis, gejala, atau istilah kesehatan..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-[#E2ECEB] rounded-xl text-sm sm:text-base text-[#0D2626] placeholder-[#809494] focus:outline-none focus:ring-2 focus:ring-[#022022]/15 focus:border-[#022022] transition-all shadow-xs font-inter"
          aria-label="Cari istilah medis"
        />
      </div>

      {/* Alphabet Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin select-none">
        {ALPHABET.map((letter) => {
          const isActive = activeLetter === letter;
          return (
            <button
              key={letter}
              type="button"
              onClick={() => onLetterSelect(letter)}
              className={clsx(
                "h-8 px-3 rounded-lg text-xs font-poppins font-semibold transition-all duration-150 shrink-0 cursor-pointer border",
                isActive
                  ? "bg-[#022022] text-white border-[#022022] shadow-2xs"
                  : "bg-white text-[#2B3E3E] border-[#E2ECEB] hover:bg-[#022022]/5 hover:text-[#022022] hover:border-[#022022]/30"
              )}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}