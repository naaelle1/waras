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
              "px-4 py-2 rounded-full text-xs sm:text-sm font-poppins font-semibold transition-all duration-200 shrink-0 cursor-pointer active:scale-[0.98]",
              isActive
                ? "text-white bg-gradient-to-br from-[#023b3b] via-[#022022] to-[#011414] border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),0_4px_12px_rgba(2,32,34,0.15)]"
                : "text-[#022022] bg-gradient-to-br from-[#022022]/[0.06] via-teal-50/60 to-white/90 hover:from-[#022022]/[0.12] hover:via-teal-100/70 hover:to-white backdrop-blur-md border border-[#022022]/15 hover:border-[#022022]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_8px_rgba(2,32,34,0.04)]"
            )}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}