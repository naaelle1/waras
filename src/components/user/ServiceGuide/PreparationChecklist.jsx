import React, { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";

export default function PreparationChecklist({ items = [] }) {
  const [checkedIds, setCheckedIds] = useState([]);

  const toggleCheck = (id) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="font-poppins font-bold text-xl sm:text-2xl text-[#022022]">
            Persiapkan Sebelum Berobat
          </h2>
          <p className="text-xs sm:text-sm text-[#5F6F70] font-inter">
            Centang item di bawah untuk mempermudah persiapan kunjungan Anda ke faskes.
          </p>
        </div>
        <span className="text-xs font-poppins font-semibold px-3 py-1 rounded-full bg-[#022022]/10 text-[#022022] border border-[#022022]/15 self-start sm:self-auto">
          Tercek: {checkedIds.length} / {items.length}
        </span>
      </div>

      {/* Checklist Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const isChecked = checkedIds.includes(item.id);

          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-5 rounded-2xl border backdrop-blur-md transition-all duration-200 cursor-pointer select-none flex items-start gap-3.5 ${
                isChecked
                  ? "bg-[#022022]/5 border-[#022022]/20 shadow-inner"
                  : "bg-white/70 border-white/80 shadow-sm hover:shadow-md hover:border-white"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isChecked ? (
                  <CheckCircle2 className="w-5 h-5 text-[#022022]" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300" />
                )}
              </div>

              <div className="space-y-1">
                <h3
                  className={`font-poppins font-bold text-sm transition-colors ${
                    isChecked ? "line-through text-[#5F6F70]" : "text-[#022022]"
                  }`}
                >
                  {item.title}
                </h3>
                <p className="font-inter text-xs text-[#5F6F70] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}