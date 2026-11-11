import React, { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({
  placeholder = "Search anything...",
  onSearch,
  className = ""
}) {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(term);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative flex items-center w-full ${className}`}>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-4 pr-10 py-2 bg-white border border-[#E2ECEB] rounded-full text-xs sm:text-sm text-[#0D2626] placeholder-[#809494] focus:outline-none focus:ring-2 focus:ring-[#003B3B]/10 focus:border-[#003B3B]/40 transition-all shadow-2xs"
      />
      <button
        type="submit"
        aria-label="Cari"
        className="absolute right-1.5 p-1.5 bg-[#003B3B] hover:bg-[#004D4D] text-white rounded-full transition-colors cursor-pointer"
      >
        <Search className="w-3.5 h-3.5" />
      </button>
    </form>
  );
}