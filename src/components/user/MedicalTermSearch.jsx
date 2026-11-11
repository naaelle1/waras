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
        <div className="absolute left-4 p-2 text-[#4F8B8C]">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari istilah medis, gejala, atau istilah kesehatan..."
          className="w-full pl-12 pr-4 py-3.5 bg-white/80 backdrop-blur-xl border border-white/90 rounded-2xl text-sm sm:text-base text-[#002B2C] placeholder-[#5F6F70] focus:outline-none focus:ring-2 focus:ring-[#002B2C]/20 focus:border-[#002B2C] transition-all shadow-[0_8px_32px_rgba(0,43,44,0.06)] font-inter"
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
                  ? "bg-[#002B2C] text-white border-[#002B2C] shadow-sm"
                  : "bg-white/60 text-[#002B2C] border-gray-200 hover:bg-white hover:border-[#002B2C]/40 backdrop-blur-sm"
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