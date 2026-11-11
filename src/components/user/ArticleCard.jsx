import React from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { Clock, ArrowRight } from "lucide-react";

export default function ArticleCard({ article }) {
  return (
    <Card hoverEffect className="p-0 overflow-hidden flex flex-col justify-between h-full">
      <div>
        <div className="relative h-36 w-full overflow-hidden bg-gray-100">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="teal">{article.category}</Badge>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 text-[11px] text-[#5F6F70] mb-2">
            <span>{article.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>

          <h4 className="font-poppins font-semibold text-sm text-[#062F30] mb-2 line-clamp-2 leading-snug">
            {article.title}
          </h4>

          <p className="text-xs text-[#5F6F70] line-clamp-2 leading-relaxed">
            {article.description}
          </p>
        </div>
      </div>

      <div className="px-4 pb-4 pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#003B3B] hover:text-[#004D4D]">
        <span>Baca Selengkapnya</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Card>
  );
}