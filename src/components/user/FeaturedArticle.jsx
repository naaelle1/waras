import React from "react";
import { ArrowRight, Clock, Tag, Sparkles } from "lucide-react";

export default function FeaturedArticle({ article, onReadMore }) {
  if (!article) return null;

  return (
    <div className="relative group overflow-hidden rounded-3xl bg-white border border-white/80 shadow-[0_12px_40px_rgba(0,43,44,0.08)] transition-all duration-300">
      {/* Background Ambient Shapes */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-[#A9D6C8]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-10 w-64 h-64 rounded-full bg-[#4F8B8C]/15 blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-95">
        {/* Left Hero Image */}
        <div className="lg:col-span-7 relative min-h-65 sm:min-h-80 lg:min-h-full overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#001F20]/60 via-transparent to-transparent lg:hidden" />
          
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-poppins font-bold bg-[#002B2C]/90 text-[#A9D6C8] backdrop-blur-md border border-white/20 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#A9D6C8]" />
              UNGGULAN
            </span>
          </div>
        </div>

        {/* Right Content Panel (Dark Teal Glass) */}
        <div className="lg:col-span-5 bg-[#002B2C] text-white p-6 sm:p-8 lg:p-9 flex flex-col justify-between relative z-10 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-white/10">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#A9D6C8]">
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md">
                <Tag className="w-3 h-3" />
                {article.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-gray-300">
                <Clock className="w-3 h-3" />
                {article.readingTime || "5 min baca"}
              </span>
            </div>

            <h2 className="font-poppins font-bold text-xl sm:text-2xl leading-snug tracking-tight text-white group-hover:text-[#A9D6C8] transition-colors">
              {article.title}
            </h2>

            <p className="font-inter text-xs sm:text-sm text-gray-200 leading-relaxed line-clamp-4">
              {article.description}
            </p>
          </div>

          <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#4F8B8C] text-white flex items-center justify-center font-bold text-xs">
                W
              </div>
              <span className="text-xs font-medium text-gray-300">{article.author || "Tim Medis WARAS"}</span>
            </div>

            <button
              type="button"
              onClick={() => onReadMore && onReadMore(article)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#002B2C] font-poppins font-semibold text-xs sm:text-sm hover:bg-[#A9D6C8] transition-all duration-200 cursor-pointer shadow-md group/btn"
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