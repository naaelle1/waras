import React, { useState } from "react";
import ReportHeader from "../../components/user/report/ReportHeader";
import ReportInfoBanner from "../../components/user/report/ReportInfoBanner";
import ReportCategorySelector from "../../components/user/report/ReportCategorySelector";
import ReportForm from "../../components/user/report/ReportForm";
import ReportSuccessModal from "../../components/user/report/ReportSuccessModal";

import { reportCategoriesData } from "../../data/reportCategories";
import { reportService } from "../../services/reportService";

function ReportProblem() {
  // State 1: Kategori terpilih
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    reportCategoriesData[0].id
  );

  // State 2: Isian Formulir
  const [formData, setFormData] = useState({
    title: "",
    relatedPage: "Fasilitas Kesehatan",
    specificItem: "",
    description: "",
    suggestedCorrection: ""
  });

  // State 3: Lampiran Berkas Gambar
  const [filePreview, setFilePreview] = useState(null);

  // State 4: Pesan Error Validasi & Status
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const selectedCategory = reportCategoriesData.find(
    (c) => c.id === selectedCategoryId
  );

  // Handle Perubahan Input Teks
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validasi Input Wajib
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Judul laporan wajib diisi.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Deskripsi penjelasan masalah wajib diisi.";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Deskripsi masalah minimal 10 karakter.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        category: selectedCategory,
        ...formData,
        attachment: filePreview ? filePreview.name : null
      };

      const response = await reportService.submitReport(payload);
      if (response.success) {
        setSubmissionResult(response.data);
      }
    } catch (error) {
      console.error("Gagal mengirim laporan:", error);
      alert("Terjadi kesalahan teknis saat mengirim laporan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset Formulir
  const handleReset = () => {
    setFormData({
      title: "",
      relatedPage: "Fasilitas Kesehatan",
      specificItem: "",
      description: "",
      suggestedCorrection: ""
    });
    setFilePreview(null);
    setErrors({});
    setSubmissionResult(null);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. PAGE HEADER */}
      <ReportHeader />

      {/* 2. INFORMATION BANNER */}
      <ReportInfoBanner />

      {/* 3. CATEGORY SELECTOR */}
      <ReportCategorySelector
        categories={reportCategoriesData}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
      />

      {/* 4. MAIN FORM & SUMMARY SECTION */}
      <ReportForm
        selectedCategory={selectedCategory}
        formData={formData}
        errors={errors}
        isSubmitting={isSubmitting}
        filePreview={filePreview}
        onInputChange={handleInputChange}
        onFileSelect={setFilePreview}
        onFileRemove={() => setFilePreview(null)}
        onSubmit={handleSubmit}
      />

      {/* 5. SUCCESS MODAL OVERLAY */}
      <ReportSuccessModal
        isOpen={Boolean(submissionResult)}
        resultData={submissionResult}
        onReset={handleReset}
      />
    </div>
  );
}

// Ekspor default terpisah untuk mencegah hambatan resolusi bundler
export default ReportProblem;