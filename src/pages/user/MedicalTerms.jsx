import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Languages,
  SearchX,
  Info,
  X,
  Copy,
  Check,
  Bot,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Filter,
  Sparkles,
  BookOpen
} from "lucide-react";
import MedicalTermSearch from "../../components/user/MedicalTermSearch";
import MedicalTermCard from "../../components/user/MedicalTermCard";
import { medicalTerms } from "../../data/medicalTerms";

const ITEMS_PER_PAGE = 24;

const CATEGORIES = [
  "Semua Kategori",
  "Kondisi & Istilah Klinis",
  "Kardiovaskular",
  "Respirasi",
  "Pencernaan & Hepar",
  "Neurologi & Saraf",
  "Hematologi",
  "Imunologi & Infeksi",
  "Farmakologi & Terapi",
  "Kandungan & Reproduksi",
  "Muskuloskeletal",
  "Dermatologi (Kulit)",
  "Oftalmologi (Mata)",
  "THT",
  "Nefrologi & Urologi",
  "Endokrin & Metabolisme",
  "Onkologi",
  "Diagnostik & Bedah",
  "Kesehatan Mental"
];

export default function MedicalTerms() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("SEMUA");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  // Reset pagination when search / filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedLetter, selectedCategory]);

  const filteredTerms = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return medicalTerms.filter((item) => {
      // 1. Filter Huruf A-Z
      const matchesLetter =
        selectedLetter === "SEMUA" ||
        item.firstLetter === selectedLetter ||
        item.term.toUpperCase().startsWith(selectedLetter);

      // 2. Filter Kategori
      const matchesCategory =
        selectedCategory === "Semua Kategori" ||
        item.category === selectedCategory;

      // 3. Pencarian Teks
      const matchesSearch =
        !query ||
        item.term.toLowerCase().includes(query) ||
        item.definition.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchesLetter && matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedLetter, selectedCategory]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredTerms.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTerms = filteredTerms.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 180, behavior: "smooth" });
  };

  const handleSelectTerm = (term) => {
    setSelectedTerm(term);
    setCopied(false);
  };

  const handleCopyDefinition = () => {
    if (!selectedTerm) return;
    const text = `${selectedTerm.term} (${selectedTerm.category}):\n${selectedTerm.definition}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAskAI = (term) => {
    navigate("/user/chat", {
      state: {
        initialQuery: `Halo WARAS Assistant, tolong jelaskan lebih rinci mengenai istilah medis "${term.term}" beserta contoh gejala atau kaitannya dalam pemeriksaan kesehatan.`
      }
    });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* ── PAGE HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2.5 text-[#002B2C]">
            <div className="p-2.5 rounded-2xl bg-[#003B3B] text-white shadow-sm">
              <Languages className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-poppins font-bold text-2xl lg:text-3xl tracking-tight text-[#002B2C]">
                Kamus Istilah Medis
              </h1>
              <p className="text-[11px] font-semibold text-[#003B3B] uppercase tracking-wider mt-0.5">
                WARAS HEALTHCARE DICTIONARY &bull; 1.485 ISTILAH LENGKAP A-Z
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#5F6F70] font-inter max-w-2xl mt-1">
            Pahami bahasa medis, diagnosa faskes, resep obat, dan terminologi klinis dengan penjelasan bahasa Indonesia yang mudah dimengerti.
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#003B3B]/5 border border-[#003B3B]/10 self-start sm:self-auto">
          <BookOpen className="w-4 h-4 text-[#003B3B]" />
          <span className="text-xs font-semibold text-[#003B3B] font-inter">
            Total {medicalTerms.length.toLocaleString("id-ID")} Istilah Terdata
          </span>
        </div>
      </div>

      {/* ── SEARCH, ALPHABET, & CATEGORY FILTER ── */}
      <section className="space-y-4 bg-white p-5 sm:p-6 rounded-3xl border border-[#E2ECEB] shadow-2xs">
        {/* Search Input & Alphabet Bar */}
        <MedicalTermSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeLetter={selectedLetter}
          onLetterSelect={setSelectedLetter}
        />

        {/* Category Pills Bar */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#003B3B]" />
            <span className="hidden sm:inline">Kategori:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin select-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`h-7 px-2.5 rounded-lg text-[11px] font-poppins font-medium transition-all shrink-0 cursor-pointer border ${
                    isActive
                      ? "bg-[#003B3B] text-white border-[#003B3B] shadow-2xs font-semibold"
                      : "bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-[#EBF5F5] hover:text-[#003B3B]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MEDICAL TERMS LIST GRID ── */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm font-poppins text-[#5F6F70]">
          <span>
            Menampilkan <strong>{paginatedTerms.length}</strong> dari{" "}
            <strong>{filteredTerms.length.toLocaleString("id-ID")}</strong> istilah medis
            {selectedLetter !== "SEMUA" && (
              <span className="ml-1 text-[#003B3B] font-semibold">
                (Huruf &quot;{selectedLetter}&quot;)
              </span>
            )}
            {selectedCategory !== "Semua Kategori" && (
              <span className="ml-1 text-[#003B3B] font-semibold">
                &bull; {selectedCategory}
              </span>
            )}
          </span>

          {(searchTerm ||
            selectedLetter !== "SEMUA" ||
            selectedCategory !== "Semua Kategori") && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedLetter("SEMUA");
                setSelectedCategory("Semua Kategori");
              }}
              className="text-[#003B3B] font-semibold hover:underline cursor-pointer self-start sm:self-auto"
            >
              Reset Semua Filter
            </button>
          )}
        </div>

        {paginatedTerms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedTerms.map((term) => (
              <MedicalTermCard
                key={term.id}
                term={term}
                onSelect={handleSelectTerm}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-white border border-[#E2ECEB] space-y-3">
            <SearchX className="w-12 h-12 text-[#4F8B8C] mx-auto" />
            <h3 className="font-poppins font-semibold text-base text-[#002B2C]">
              Istilah Medis Tidak Ditemukan
            </h3>
            <p className="text-xs sm:text-sm text-[#5F6F70] max-w-md mx-auto font-inter">
              Coba gunakan kata kunci lain, pilih huruf alfabet lain, atau ubah kategori filter Anda.
            </p>
          </div>
        )}

        {/* ── PAGINATION CONTROLS ── */}
        {totalPages > 1 && (
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 font-inter">
              Halaman <strong>{currentPage}</strong> dari <strong>{totalPages}</strong>
            </p>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="h-9 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Sebelumnya</span>
              </button>

              {/* Page Number Pills */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    return (
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1
                    );
                  })
                  .map((page, idx, arr) => {
                    const prev = arr[idx - 1];
                    const hasGap = prev && page - prev > 1;

                    return (
                      <React.Fragment key={page}>
                        {hasGap && (
                          <span className="px-1 text-slate-400 text-xs font-bold">
                            ...
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handlePageChange(page)}
                          className={`w-9 h-9 rounded-xl text-xs font-poppins font-semibold transition-all cursor-pointer ${
                            currentPage === page
                              ? "bg-[#003B3B] text-white shadow-2xs"
                              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    );
                  })}
              </div>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="h-9 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span className="hidden sm:inline">Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ── MEDICAL DISCLAIMER CARD ── */}
      <section className="rounded-3xl bg-[#002B2C]/5 border border-[#002B2C]/10 p-5 sm:p-6 backdrop-blur-md">
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-[#003B3B] text-white shrink-0 mt-0.5">
            <Info className="w-5 h-5 text-teal-200" />
          </div>
          <div className="space-y-1">
            <h4 className="font-poppins font-semibold text-sm text-[#002B2C]">
              Penafian Edukasi Klinis
            </h4>
            <p className="text-xs sm:text-sm text-[#5F6F70] font-inter leading-relaxed">
              Definisi istilah medis di atas disajikan sebagai bentuk referensi edukasi umum warga Kota Semarang dan tidak dimaksudkan untuk menggantikan diagnosis resmi tenaga medis profesional. Untuk pemeriksaan akurat, silakan kunjungi Puskesmas atau fasilitas kesehatan terdekat.
            </p>
          </div>
        </div>
      </section>

      {/* ── MODAL DETAIL ISTILAH MEDIS ── */}
      {selectedTerm && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 selection:bg-[#003B3B] selection:text-white"
          onClick={() => setSelectedTerm(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedTerm(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Tutup detail istilah"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Modal */}
            <div className="space-y-2 pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-[#003B3B] border border-teal-200/70">
                <span>{selectedTerm.category}</span>
              </div>

              <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                {selectedTerm.term}
              </h2>

              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                Indeks Alfabet: [{selectedTerm.firstLetter}]
              </p>
            </div>

            {/* Definition Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 font-inter">
                Definisi & Arti Medis
              </span>
              <p className="text-sm sm:text-base text-slate-800 font-inter leading-relaxed">
                {selectedTerm.definition}
              </p>
            </div>

            {/* Practical Advice Note */}
            <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200/60 text-xs text-[#003B3B] flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 shrink-0 text-[#003B3B]" />
              <span>
                Istilah ini tercatat resmi dalam sistem edukasi kesehatan terintegrasi WARAS Kota Semarang.
              </span>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleAskAI(selectedTerm)}
                className="w-full sm:flex-1 h-11 inline-flex items-center justify-center gap-2 px-4 rounded-xl bg-[#003B3B] hover:bg-[#002B2B] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs active:scale-[0.99]"
              >
                <Bot className="w-4 h-4" />
                <span>Tanya WARAS AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleCopyDefinition}
                className="w-full sm:w-auto h-11 inline-flex items-center justify-center gap-2 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span>Salin</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
