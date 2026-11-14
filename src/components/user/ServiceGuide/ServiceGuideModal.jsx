import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  X,
  Phone,
  Siren,
  WalletCards,
  CheckCircle2,
  AlertCircle,
  Bot,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Building2
} from "lucide-react";

export default function ServiceGuideModal({ isOpen, type, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !type) return null;

  const handleAskAI = (prompt) => {
    onClose();
    navigate(`/user/ai?q=${encodeURIComponent(prompt)}`);
  };

  if (type === "layanan-darurat") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-[#001F1F]/60 backdrop-blur-sm transition-opacity duration-200"
          onClick={onClose}
        />

        {/* Modal Dialog Card */}
        <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-[#E2ECEB] p-5 sm:p-7 shadow-2xl z-10 space-y-5 max-h-[90vh] overflow-y-auto scrollbar-thin animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100">
            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-600 text-white shadow-xs font-poppins">
                <Siren className="w-3.5 h-3.5" />
                LAYANAN DARURAT 24 JAM
              </span>
              <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#0D2626] leading-snug tracking-tight">
                Panggilan Darurat & Kontak IGD
              </h3>
              <p className="text-xs sm:text-sm text-[#526666] font-inter">
                Hubungi saluran siaga ambulans dan Instalasi Gawat Darurat terdekat di Kota Semarang.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-[#022022] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Tutup dialog darurat"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </button>
          </div>

          {/* Hotline Utama: PSC 119 Kota Semarang */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#022022] to-[#043336] text-white space-y-3 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-teal-300">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-sm sm:text-base text-white">
                    PSC 119 Kota Semarang
                  </h4>
                  <p className="text-[11px] text-teal-200/80 font-inter">
                    Pusat Komando Kegawatdaruratan Medis Terpadu
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Bebas Pulsa • Siaga 24 Jam
              </span>
            </div>

            <p className="text-xs text-teal-100/90 font-inter leading-relaxed">
              Layanan ambulans gratis, penanganan medis di lokasi kejadian, dan pengawalan darurat resmi Pemerintah Kota Semarang.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href="tel:119"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#022022] hover:bg-teal-50 font-poppins font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-[0.98]"
              >
                <Phone className="w-4 h-4 text-[#022022]" />
                <span>Panggil 119 (Bebas Pulsa)</span>
              </a>
              <a
                href="tel:0248444444"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-inter text-xs transition-colors"
              >
                <span>Saluran Alternatif: (024) 8444444</span>
              </a>
            </div>
          </div>

          {/* Kontak IGD Rumah Sakit Rujukan */}
          <div className="space-y-2.5 pt-1">
            <h4 className="font-poppins font-semibold text-xs sm:text-sm text-[#0D2626] uppercase tracking-wider">
              Kontak Cepat IGD Rumah Sakit Utama:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-[#E2ECEB] shadow-2xs hover:border-[#022022]/20 transition-colors flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-poppins font-semibold text-xs sm:text-sm text-[#0D2626]">
                      IGD RSUD Wongsonegoro
                    </span>
                    <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                      RSUD Kota
                    </span>
                  </div>
                  <p className="text-[11px] text-[#526666] font-inter pt-1">
                    Jl. Fatmawati No.1, Mangunharjo, Semarang
                  </p>
                </div>
                <a
                  href="tel:0246711500"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#022022]/5 hover:bg-[#022022]/10 text-[#022022] text-xs font-semibold font-inter transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>(024) 6711500</span>
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#E2ECEB] shadow-2xs hover:border-[#022022]/20 transition-colors flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-poppins font-semibold text-xs sm:text-sm text-[#0D2626]">
                      IGD RSUP Dr. Kariadi
                    </span>
                    <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                      Rujukan Pusat
                    </span>
                  </div>
                  <p className="text-[11px] text-[#526666] font-inter pt-1">
                    Jl. Dr. Sutomo No.16, Randusari, Semarang
                  </p>
                </div>
                <a
                  href="tel:0248413476"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#022022]/5 hover:bg-[#022022]/10 text-[#022022] text-xs font-semibold font-inter transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>(024) 8413476</span>
                </a>
              </div>
            </div>
          </div>

          {/* Petunjuk Tindakan Darurat */}
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 font-inter flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Tips saat menghubungi panggilan darurat:</strong> Berikan alamat atau patokan lokasi dengan jelas, sebutkan jumlah korban, dan jelaskan kondisi kesadaran/pernapasan pasien agar armada ambulans yang dikirim membawa kelengkapan medis yang sesuai.
            </p>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="order-last sm:order-first px-5 py-2.5 rounded-full border border-gray-200 hover:bg-gray-50 text-[#526666] hover:text-[#022022] font-semibold text-xs transition-colors cursor-pointer text-center font-inter"
            >
              Tutup
            </button>

            <Link
              to="/user/facilities?type=hospital"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#022022] hover:bg-[#033033] text-white font-semibold text-xs shadow-xs transition-colors active:scale-[0.99] font-inter"
            >
              <MapPin className="w-3.5 h-3.5 text-white" />
              <span>Cari Lokasi IGD di Peta Faskes</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Jaminan Kesehatan Modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#001F1F]/60 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-[#E2ECEB] p-5 sm:p-7 shadow-2xl z-10 space-y-5 max-h-[90vh] overflow-y-auto scrollbar-thin animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#022022] text-white shadow-xs font-poppins">
              <WalletCards className="w-3.5 h-3.5 text-teal-200" />
              PANDUAN PEMBIAYAAN & JAMINAN
            </span>
            <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#0D2626] leading-snug tracking-tight">
              Panduan Berobat dengan BPJS & Jaminan Kesehatan
            </h3>
            <p className="text-xs sm:text-sm text-[#526666] font-inter">
              Alur pemanfaatan BPJS Kesehatan / JKN dan jaminan kesehatan Kota Semarang (UHC).
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-[#022022] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Tutup panduan"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Highlight Callout */}
        <div className="p-4 rounded-2xl bg-[#022022]/[0.03] border border-[#022022]/10 space-y-1.5 font-inter">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#022022]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Universal Health Coverage (UHC) Kota Semarang Aktif</span>
          </div>
          <p className="text-xs sm:text-sm text-[#0D2626] leading-relaxed">
            Warga ber-KTP Kota Semarang berhak mendapatkan layanan pengobatan dasar di Puskesmas tanpa biaya dengan kepesertaan BPJS aktif atau program jaminan UHC pemerintah daerah.
          </p>
        </div>

        {/* 4 Tahapan Berobat Berjenjang */}
        <div className="space-y-2.5 pt-1">
          <h4 className="font-poppins font-semibold text-sm sm:text-base text-[#0D2626]">
            Alur Berobat Berjenjang BPJS Kesehatan:
          </h4>
          <div className="space-y-2.5">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#E2ECEB] shadow-2xs hover:border-[#022022]/20 transition-colors">
              <div className="w-7 h-7 rounded-full bg-[#022022] text-white flex items-center justify-center text-xs font-bold font-poppins shrink-0 mt-0.5">
                1
              </div>
              <div className="space-y-1 font-inter">
                <h5 className="font-semibold text-xs sm:text-sm text-[#0D2626]">
                  Datang ke Faskes Tingkat Pertama (FKTP / Puskesmas / Klinik)
                </h5>
                <p className="text-xs text-[#526666] leading-relaxed">
                  Pemeriksaan awal wajib dilakukan di Puskesmas atau klinik keluarga yang tertera pada kartu BPJS/KIS Anda. Bawa KTP asli atau KIS digital pada aplikasi Mobile JKN.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#E2ECEB] shadow-2xs hover:border-[#022022]/20 transition-colors">
              <div className="w-7 h-7 rounded-full bg-[#022022] text-white flex items-center justify-center text-xs font-bold font-poppins shrink-0 mt-0.5">
                2
              </div>
              <div className="space-y-1 font-inter">
                <h5 className="font-semibold text-xs sm:text-sm text-[#0D2626]">
                  Pemeriksaan & Obat Standar Gratis
                </h5>
                <p className="text-xs text-[#526666] leading-relaxed">
                  Dokter di Puskesmas/FKTP akan memeriksa keluhan Anda. Pengambilan obat yang masuk daftar Formularium Nasional tidak dikenakan biaya tambahan.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#E2ECEB] shadow-2xs hover:border-[#022022]/20 transition-colors">
              <div className="w-7 h-7 rounded-full bg-[#022022] text-white flex items-center justify-center text-xs font-bold font-poppins shrink-0 mt-0.5">
                3
              </div>
              <div className="space-y-1 font-inter">
                <h5 className="font-semibold text-xs sm:text-sm text-[#0D2626]">
                  Surat Rujukan Digital (P-Care) jika Perlu Spesialis
                </h5>
                <p className="text-xs text-[#526666] leading-relaxed">
                  Jika diagnosis membutuhkan dokter spesialis atau rawat inap lanjutan di rumah sakit, dokter FKTP akan menerbitkan Surat Rujukan Online berjenjang sesuai indikasi medis.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#E2ECEB] shadow-2xs hover:border-[#022022]/20 transition-colors">
              <div className="w-7 h-7 rounded-full bg-[#022022] text-white flex items-center justify-center text-xs font-bold font-poppins shrink-0 mt-0.5">
                4
              </div>
              <div className="space-y-1 font-inter">
                <h5 className="font-semibold text-xs sm:text-sm text-[#0D2626]">
                  Kunjungan ke Rumah Sakit Rujukan (RSUD / RS Swasta Mitra)
                </h5>
                <p className="text-xs text-[#526666] leading-relaxed">
                  Lakukan registrasi di RS tujuan dengan memperlihatkan KTP dan surat rujukan digital. Masa berlaku surat rujukan adalah 90 hari sejak tanggal diterbitkan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pengecualian Kegawatdaruratan */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 text-xs text-emerald-950 font-inter flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Pengecualian Gawat Darurat:</strong> Untuk kondisi darurat (kecelakaan, serangan jantung, sesak napas berat, perdarahan hebat), Anda dapat langsung menuju IGD Rumah Sakit manapun tanpa surat rujukan dan tetap dijamin BPJS.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="order-last sm:order-first px-5 py-2.5 rounded-full border border-gray-200 hover:bg-gray-50 text-[#526666] hover:text-[#022022] font-semibold text-xs transition-colors cursor-pointer text-center font-inter"
          >
            Tutup
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handleAskAI("Jelaskan alur berobat dengan BPJS Kesehatan dan cara mendapatkan rujukan di Kota Semarang")}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#022022]/5 hover:bg-[#022022]/10 text-[#022022] border border-[#022022]/15 font-semibold text-xs transition-colors cursor-pointer active:scale-[0.99] font-inter"
            >
              <Bot className="w-4 h-4 text-[#022022]" />
              <span>Tanya AI seputar BPJS</span>
            </button>

            <Link
              to="/user/help"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#022022] hover:bg-[#033033] text-white font-semibold text-xs shadow-xs transition-colors active:scale-[0.99] font-inter"
            >
              <ExternalLink className="w-3.5 h-3.5 text-white" />
              <span>Buka FAQ & Bantuan BPJS</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
