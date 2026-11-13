import React from "react";
import ReportCategoryCard from "./ReportCategoryCard";

export default function ReportCategorySelector({ categories, selectedCategoryId, onSelectCategory }) {
  return (
    <div className="space-y-3">
      <div>
        <h2 className="font-poppins font-bold text-lg sm:text-xl text-[#022022]">
          Pilih Jenis Masalah
        </h2>
        <p className="text-xs sm:text-sm text-[#4B5E5E] font-inter">
          Pilih kategori yang paling sesuai dengan kendala atau kesalahan yang Anda temukan.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <ReportCategoryCard
            key={category.id}
            category={category}
            isSelected={selectedCategoryId === category.id}
            onSelect={onSelectCategory}
          />
        ))}
      </div>
    </div>
  );
}