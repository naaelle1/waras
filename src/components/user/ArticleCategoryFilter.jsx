import React from "react";
import clsx from "clsx";

export default function ArticleCategoryFilter({ categories, activeCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin select-none">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelectCategory(cat)}
            className={clsx(
              "px-4 py-2 rounded-full text-xs sm:text-sm font-poppins font-semibold transition-all duration-200 shrink-0 cursor-pointer border",
              isActive
                ? "bg-[#022022] text-[#37F4B4] border-[#37F4B4]/40 shadow-2xs"
                : "bg-white text-[#2B3E3E] border-[#E2ECEB] hover:bg-[#022022]/5 hover:text-[#022022] hover:border-[#37F4B4]/30"
            )}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}