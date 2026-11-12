import React from "react";
import Logo from "../common/Logo";
import { ArrowRight, Clock, Tag, Sparkles } from "lucide-react";

export default function FeaturedArticle({ article, onReadMore }) {
  if (!article) return null;

  return (
    <div className="relative group overflow-hidden rounded-2xl bg-white border border-[#E2ECEB] shadow-xs transition-all duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-85">
        {/* Left Hero Image */}
        <div className="lg:col-span-7 relative min-h-60 sm:min-h-72 lg:min-h-full overflow-hidden bg-gray-100">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#003B3B] text-white shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#DDEEEE]" />
              UNGGULAN
            </span>
          </div>
        </div>

        {/* Right Content Panel */}
        <div className="lg:col-span-5 bg-[#003B3B] text-white p-6 sm:p-8 flex flex-col justify-between relative z-10">
          <div className="space-y-3.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#DDEEEE]">
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10">
                <Tag className="w-3 h-3" />
                {article.category}
              </span>
              <span>â€¢</span>
              <span className="flex items-center gap-1 text-gray-200">
                <Clock className="w-3 h-3" />
                {article.readingTime || "5 min baca"}
              </span>
            </div>

            <h2 className="font-poppins font-bold text-xl sm:text-2xl leading-snug tracking-tight text-white group-hover:text-[#DDEEEE] transition-colors">
              {article.title}
            </h2>

            <p className="font-inter text-xs sm:text-sm text-gray-200 leading-relaxed line-clamp-3">
              {article.description}
            </p>
          </div>

          <div className="pt-6 mt-4 border-t border-white/15 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-7 px-2 rounded-full bg-white/15 flex items-center justify-center">
                <Logo tone="light" className="h-3.5" />
              </div>
              <span className="text-xs font-medium text-gray-200">{article.author || "Tim Medis WARAS"}</span>
            </div>

            <button
              type="button"
              onClick={() => onReadMore && onReadMore(article)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#003B3B] font-semibold text-xs sm:text-sm hover:bg-[#EBF5F5] transition-colors cursor-pointer shadow-xs group/btn"
            >
              <span>Baca Artikel</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
