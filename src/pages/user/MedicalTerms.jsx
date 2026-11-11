import React, { useState, useMemo } from "react";
import { Languages, SearchX, Info } from "lucide-react";
import MedicalTermSearch from "../../components/user/MedicalTermSearch";
import MedicalTermCard from "../../components/user/MedicalTermCard";
import { medicalTerms } from "../../data/medicalTerms";

export default function MedicalTerms() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("SEMUA");

  const filteredTerms = useMemo(() => {
    return medicalTerms.filter((item) => {
      const matchesLetter =
        selectedLetter === "SEMUA" ||
        item.term.toUpperCase().startsWith(selectedLetter);

      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.term.toLowerCase().includes(query) ||
        item.definition.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchesLetter && matchesSearch;
    });
  }, [searchTerm, selectedLetter]);

  const handleSelectTerm = (term) => {
    console.log("Selected term:", term);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2.5 text-[#002B2C]">
          <div className="p-2.5 rounded-2xl bg-[#002B2C] text-white shadow-sm">
            <Languages className="w-6 h-6" />
          </div>
          <h1 className="font-poppins font-bold text-2xl lg:text-3xl tracking-tight text-[#002B2C]">
            Istilah Medis
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#5F6F70] font-inter max-w-2xl">
          Cari dan pahami istilah kesehatan yang sering digunakan dalam informasi medis.
        </p>
      </div>

      {/* SEARCH AND ALPHABET FILTER */}
      <section className="space-y-4">
        <MedicalTermSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeLetter={selectedLetter}
          onLetterSelect={setSelectedLetter}
        />
      </section>

      {/* MEDICAL TERMS LIST GRID */}
      <section className="space-y-4">
        <div className="flex items-center justify-between text-xs sm:text-sm font-poppins text-[#5F6F70]">
          <span>
            Menampilkan <strong>{filteredTerms.length}</strong> istilah medis
          </span>
          {(searchTerm || selectedLetter !== "SEMUA") && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedLetter("SEMUA");
              }}
              className="text-[#002B2C] font-semibold hover:underline cursor-pointer"
            >
              Reset Pencarian
            </button>
          )}
        </div>

        {filteredTerms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTerms.map((term) => (
              <MedicalTermCard
                key={term.id}
                term={term}
                onSelect={handleSelectTerm}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 space-y-3">
            <SearchX className="w-12 h-12 text-[#4F8B8C] mx-auto" />
            <h3 className="font-poppins font-semibold text-base text-[#002B2C]">
              Istilah tidak ditemukan
            </h3>
            <p className="text-xs sm:text-sm text-[#5F6F70] max-w-md mx-auto font-inter">
              Coba gunakan kata kunci lain atau periksa kembali ejaan istilah yang Anda cari.
            </p>
          </div>
        )}
      </section>

      {/* MEDICAL DISCLAIMER CARD */}
      <section className="rounded-2xl bg-[#002B2C]/5 border border-[#002B2C]/10 p-5 sm:p-6 backdrop-blur-md">
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-[#002B2C] text-white shrink-0 mt-0.5">
            <Info className="w-5 h-5 text-[#A9D6C8]" />
          </div>
          <div className="space-y-1">
            <h4 className="font-poppins font-semibold text-sm text-[#002B2C]">
              Penafian Edukasi
            </h4>
            <p className="text-xs sm:text-sm text-[#5F6F70] font-inter leading-relaxed">
              Definisi istilah medis di atas disajikan sebagai bentuk edukasi umum dan tidak dimaksudkan untuk mendiagnosis mandiri kondisi kesehatan Anda.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}