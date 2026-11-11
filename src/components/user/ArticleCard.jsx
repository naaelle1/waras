import React from "react";
import { Clock, ArrowRight, Tag } from "lucide-react";
import clsx from "clsx";

export default function ArticleCard({ article, onReadMore, className = "" }) {
  if (!article) return null;

  return (
    <div
      onClick={() => onReadMore && onReadMore(article)}
      className={clsx(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl",
        "bg-white/80 backdrop-blur-md border border-white/90 shadow-[0_8px_30px_rgb(0,43,44,0.06)]",
        "transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_40px_rgb(0,43,44,0.12)] hover:border-white",
        "cursor-pointer select-none h-full",
        className
      )}
    >
      <div>
        {/* Article Image Container */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-gray-100">
          <img
            src={article.image || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600"}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-poppins font-semibold bg-[#002B2C]/90 text-white backdrop-blur-md shadow-sm">
              <Tag className="w-3 h-3 text-[#A9D6C8]" />
              {article.category}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-[11px] font-medium text-[#5F6F70]">
            <span>{article.date || "Terbaru"}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readingTime || "4 min baca"}
            </span>
          </div>

          <h3 className="font-poppins font-semibold text-base text-[#002B2C] line-clamp-2 leading-snug group-hover:text-[#4F8B8C] transition-colors">
            {article.title.replace(/^["']|["']$/g, '')}
          </h3>

          <p className="font-inter text-xs text-[#5F6F70] line-clamp-2 leading-relaxed">
            {article.description}
          </p>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 pb-5 pt-3 border-t border-gray-100/80 flex items-center justify-between text-xs font-poppins font-semibold text-[#002B2C] group-hover:text-[#003536]">
        <span>Baca Selengkapnya</span>
        <div className="p-1.5 rounded-full bg-[#F4F6F4] group-hover:bg-[#002B2C] group-hover:text-white transition-all duration-200">
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  );
}