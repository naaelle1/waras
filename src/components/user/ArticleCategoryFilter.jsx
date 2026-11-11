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
                ? "bg-[#002B2C] text-white border-[#002B2C] shadow-sm"
                : "bg-white/60 text-[#002B2C] border-gray-200 hover:bg-white hover:border-[#002B2C]/30 backdrop-blur-md"
            )}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}