import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, ArrowRight, Tag } from "lucide-react";
import clsx from "clsx";

export default function ArticleCard({ article, onReadMore, className = "" }) {
  const navigate = useNavigate();

  if (!article) return null;

  const handleClick = () => {
    if (onReadMore) {
      onReadMore(article);
    } else {
      navigate(`/user/health-info/articles/${article.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl",
        "bg-white border border-[#E2ECEB] shadow-xs",
        "transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-[#37F4B4]/60",
        "cursor-pointer select-none h-full",
        className
      )}
    >
      <div>
        {/* Article Image Container */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-gray-100">
          <img
            src={
              article.image ||
              "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600"
            }
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-poppins font-semibold bg-[#022022] text-[#37F4B4] border border-[#37F4B4]/30 shadow-xs">
              <Tag className="w-3 h-3 text-[#37F4B4]" />
              {article.category}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-2">
          <div className="flex items-center gap-2 text-[11px] font-medium text-[#526666]">
            <span>{article.date || "Terbaru"}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-400" />
              {article.readingTime || "4 min baca"}
            </span>
          </div>

          <h3 className="font-poppins font-semibold text-sm sm:text-base text-[#0D2626] line-clamp-2 leading-snug group-hover:text-[#022022] transition-colors">
            {article.title.replace(/^["']|["']$/g, "")}
          </h3>

          <p className="font-inter text-xs text-[#526666] line-clamp-2 leading-relaxed">
            {article.description}
          </p>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-4 sm:px-5 pb-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#022022]">
        <span>Baca Selengkapnya</span>
        <div className="p-1.5 rounded-lg bg-[#022022]/5 text-[#022022] group-hover:bg-[#022022] group-hover:text-[#37F4B4] transition-colors duration-200">
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  );
}
