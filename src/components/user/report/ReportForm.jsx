import React from "react";
import { Send, ShieldCheck, ChevronDown, AlertCircle } from "lucide-react";
import FileUpload from "./FileUpload";
import ReportSummary from "./ReportSummary";
import { pageOptions } from "../../../data/reportCategories";

export default function ReportForm({
  selectedCategory,
  formData,
  errors,
  isSubmitting,
  filePreview,
  onInputChange,
  onFileSelect,
  onFileRemove,
  onSubmit
}) {
  const isFormComplete = Boolean(formData.title.trim() && formData.description.trim());

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Input Fields */}
        <div className="lg:col-span-8 rounded-2xl bg-white border border-[#E2ECEB] p-6 sm:p-8 shadow-xs space-y-5">
          <div className="pb-3 border-b border-gray-100">
            <h3 className="font-poppins font-bold text-lg text-[#022022]">
              Detail Laporan
            </h3>
            <p className="font-inter text-xs text-[#4B5E5E] mt-0.5">
              Lengkapi formulir di bawah ini dengan jelas agar memudahkan proses verifikasi.
            </p>
          </div>

          {/* 1. Report Title (Required) */}
          <div className="space-y-1.5">
            <label htmlFor="report-title" className="block font-poppins font-semibold text-xs sm:text-sm text-[#022022]">
              Judul Laporan <span className="text-red-500">*</span>
            </label>
            <input
              id="report-title"
              type="text"
              name="title"
              value={formData.title}
              onChange={onInputChange}
              placeholder="Contoh: Jam pelayanan fasilitas Puskesmas tidak sesuai"
              className={`w-full px-4 py-3 rounded-2xl bg-white border text-xs sm:text-sm font-inter text-[#022022] placeholder-gray-400 focus:outline-none transition-all ${
                errors.title
                  ? "border-red-400 focus:border-red-500 ring-2 ring-red-100"
                  : "border-gray-200 focus:border-[#022022] focus:ring-2 focus:ring-[#022022]/15"
              }`}
            />
            {errors.title && (
              <p className="flex items-center gap-1 text-[11px] font-inter text-red-600 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          {/* 2. Related Page or Feature */}
          <div className="space-y-1.5">
            <label htmlFor="related-page" className="block font-poppins font-semibold text-xs sm:text-sm text-[#022022]">
              Halaman atau Fitur Terkait
            </label>
            <div className="relative">
              <select
                id="related-page"
                name="relatedPage"
                value={formData.relatedPage}
                onChange={onInputChange}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-gray-200 text-xs sm:text-sm font-inter text-[#022022] appearance-none focus:outline-none focus:border-[#022022] focus:ring-2 focus:ring-[#022022]/15 transition-all cursor-pointer pr-10"
              >
                {pageOptions.map((page, idx) => (
                  <option key={idx} value={page}>
                    {page}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 3. Specific Content or Facility */}
          <div className="space-y-1.5">
            <label htmlFor="specific-item" className="block font-poppins font-semibold text-xs sm:text-sm text-[#022022]">
              Informasi yang Dilaporkan <span className="text-gray-400 font-normal">(Opsional)</span>
            </label>
            <input
              id="specific-item"
              type="text"
              name="specificItem"
              value={formData.specificItem}
              onChange={onInputChange}
              placeholder="Contoh: Nama Puskesmas, Judul Artikel, atau Fitur Pencarian"
              className="w-full px-4 py-3 rounded-2xl bg-white border border-gray-200 text-xs sm:text-sm font-inter text-[#022022] placeholder-gray-400 focus:outline-none focus:border-[#022022] focus:ring-2 focus:ring-[#022022]/15 transition-all"
            />
          </div>

          {/* 4. Problem Description (Required) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="description" className="block font-poppins font-semibold text-xs sm:text-sm text-[#022022]">
                Jelaskan Masalah <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] font-inter text-gray-400">
                {formData.description.length} / 1000 Karakter
              </span>
            </div>
            <textarea
              id="description"
              name="description"
              rows="4"
              maxLength={1000}
              value={formData.description}
              onChange={onInputChange}
              placeholder="Jelaskan kendala atau informasi yang tidak sesuai secara spesifik agar tim kami dapat memverifikasinya..."
              className={`w-full px-4 py-3 rounded-2xl bg-white border text-xs sm:text-sm font-inter text-[#022022] placeholder-gray-400 focus:outline-none transition-all resize-none ${
                errors.description
                  ? "border-red-400 focus:border-red-500 ring-2 ring-red-100"
                  : "border-gray-200 focus:border-[#022022] focus:ring-2 focus:ring-[#022022]/15"
              }`}
            />
            {errors.description && (
              <p className="flex items-center gap-1 text-[11px] font-inter text-red-600 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.description}</span>
              </p>
            )}
          </div>

          {/* 5. Suggested Correction */}
          <div className="space-y-1.5">
            <label htmlFor="suggested-correction" className="block font-poppins font-semibold text-xs sm:text-sm text-[#022022]">
              Saran Informasi yang Seharusnya <span className="text-gray-400 font-normal">(Opsional)</span>
            </label>
            <textarea
              id="suggested-correction"
              name="suggestedCorrection"
              rows="3"
              value={formData.suggestedCorrection}
              onChange={onInputChange}
              placeholder="Tuliskan saran atau informasi yang lebih tepat jika Anda mengetahuinya..."
              className="w-full px-4 py-3 rounded-2xl bg-white border border-gray-200 text-xs sm:text-sm font-inter text-[#022022] placeholder-gray-400 focus:outline-none focus:border-[#022022] focus:ring-2 focus:ring-[#022022]/15 transition-all resize-none"
            />
          </div>

          {/* 6. File Upload */}
          <FileUpload
            filePreview={filePreview}
            onFileSelect={onFileSelect}
            onFileRemove={onFileRemove}
          />
        </div>

        {/* RIGHT COLUMN: Summary Card */}
        <div className="lg:col-span-4">
          <ReportSummary
            categoryTitle={selectedCategory?.title}
            title={formData.title}
            relatedPage={formData.relatedPage}
            isComplete={isFormComplete}
          />
        </div>
      </div>

      {/* PRIVACY NOTICE & SUBMIT BUTTON */}
      <div className="p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/90 shadow-[0_8px_30px_rgba(2,32,34,0.04)] flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#022022]/10 text-[#022022] border border-[#022022]/15 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-poppins font-bold text-xs sm:text-sm text-[#022022]">
              Jaminan Privasi & Keamanan
            </h4>
            <p className="font-inter text-[11px] sm:text-xs text-[#4B5E5E] mt-0.5">
              Hindari mengirimkan data medis sensitif pribadi yang tidak berkaitan langsung dengan laporan.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white bg-gradient-to-br from-[#023b3b] via-[#022022] to-[#011414] hover:from-[#034d4d] hover:via-[#033033] hover:to-[#022022] backdrop-blur-md border border-[#022022]/80 hover:border-white/30 font-poppins font-semibold text-xs sm:text-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.28),0_6px_16px_rgba(2,32,34,0.16)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer shrink-0"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Mengirim Laporan...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Kirim Laporan</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}