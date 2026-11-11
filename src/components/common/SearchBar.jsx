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
        className="w-full pl-4 pr-10 py-2 bg-white/90 backdrop-blur-md border border-white/80 rounded-full text-xs sm:text-sm text-[#062F30] placeholder-[#5F6F70] focus:outline-none focus:ring-2 focus:ring-[#003B3B]/20 focus:border-[#003B3B] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
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