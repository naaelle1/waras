import React, { useState, useMemo, useEffect } from "react";
import ReportsTable from "../../components/admin/ReportsTable";
import { reportService } from "../../services/reportService";
import { Loader2, RefreshCw } from "lucide-react";

const mockReports = [
  { id: 1, reportId: "WARAS-REP-001", title: "Data faskes tidak akurat", category: "Data", reporter: "Dewi Lestari", status: "Menunggu", date: "2024-11-12", description: "Jam operasional faskes di peta berbeda dengan kondisi lapangan." },
  { id: 2, reportId: "WARAS-REP-002", title: "Jadwal dokter salah di Puskesmas Poncol", category: "Jadwal", reporter: "Ahmad Fauzan", status: "Diproses", date: "2024-11-11", description: "Poli gigi tutup pada hari rabu, perlu revisi jadwal." },
  { id: 3, reportId: "WARAS-REP-003", title: "Nomor telepon faskes tidak aktif", category: "Kontak", reporter: "Siti Rahayu", status: "Selesai", date: "2024-11-10", description: "Nomor puskesmas tidak bisa dihubungi saat darurat." },
  { id: 4, reportId: "WARAS-REP-004", title: "Layanan poli gigi tidak tersedia", category: "Layanan", reporter: "Budi Santoso", status: "Menunggu", date: "2024-11-09", description: "Dokter gigi sedang cuti, mohon info diperbarui." },
  { id: 5, reportId: "WARAS-REP-005", title: "Alamat RS Kariadi kurang lengkap", category: "Data", reporter: "Ratna Kusuma", status: "Ditolak", date: "2024-11-08", description: "Titik koordinat gerbang utama kurang pas." },
  { id: 6, reportId: "WARAS-REP-006", title: "Error saat booking antrean online", category: "Sistem", reporter: "Hendra Wijaya", status: "Diproses", date: "2024-11-07", description: "Tombol cetak nomor antrean tidak merespons." },
  { id: 7, reportId: "WARAS-REP-007", title: "Foto faskes buram dan tidak update", category: "Media", reporter: "Putri Wardani", status: "Menunggu", date: "2024-11-06", description: "Gedung baru faskes sudah direnovasi." },
  { id: 8, reportId: "WARAS-REP-008", title: "Informasi BPJS tidak sesuai", category: "Data", reporter: "Teguh Prasetyo", status: "Selesai", date: "2024-11-05", description: "Klaim BPJS kini sudah menerima rujukan elektronik." },
];

const filterTabs = ["Semua", "Menunggu", "Diproses", "Selesai", "Ditolak"];

export default function ManageReports() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);

  const loadReports = async () => {
    setIsLoading(true);
    const data = await reportService.getAllReports();
    if (Array.isArray(data) && data.length > 0) {
      // Normalisasi status untuk kesesuaian badge filter
      const normalized = data.map((r) => ({
        ...r,
        status: r.status?.includes("Menunggu") ? "Menunggu" : r.status
      }));
      setReports(normalized);
    } else {
      setReports(mockReports);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadReports();
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === "Semua") return reports;
    return reports.filter((r) => {
      if (activeFilter === "Menunggu") {
        return r.status === "Menunggu" || r.status?.includes("Menunggu");
      }
      return r.status === activeFilter;
    });
  }, [reports, activeFilter]);

  const pendingCount = reports.filter((r) =>
    r.status === "Menunggu" || r.status?.includes("Menunggu")
  ).length;

  const handleViewDetail = (report) => {
    setSelectedReport(report);
  };

  const handleUpdateStatus = async (report) => {
    const nextStatusMap = {
      "Menunggu": "Diproses",
      "Diproses": "Selesai",
      "Selesai": "Ditolak",
      "Ditolak": "Menunggu"
    };
    const current = report.status?.includes("Menunggu") ? "Menunggu" : report.status;
    const nextStatus = nextStatusMap[current] || "Diproses";

    // Optimistic UI update
    setReports((prev) =>
      prev.map((r) => (r.id === report.id ? { ...r, status: nextStatus } : r))
    );

    try {
      await reportService.updateStatus(report.id, nextStatus === "Menunggu" ? "Menunggu Peninjauan" : nextStatus);
    } catch (err) {
      alert(err.message || "Gagal mengubah status laporan.");
      loadReports();
    }
  };

  const handleRespond = async (report) => {
    const responseText = window.prompt(
      `Tuliskan tanggapan dinas untuk laporan: "${report.title}"`,
      report.adminResponse || ""
    );
    if (!responseText || !responseText.trim()) return;

    try {
      await reportService.respond(report.id, responseText.trim(), "Selesai");
      setReports((prev) =>
        prev.map((r) =>
          r.id === report.id
            ? { ...r, status: "Selesai", adminResponse: responseText.trim() }
            : r
        )
      );
      alert("Tanggapan berhasil disimpan.");
    } catch (err) {
      alert(err.message || "Gagal menyimpan tanggapan.");
    }
  };

  return (
    <div className="space-y-6 font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[#022022] font-poppins">
            Laporan Masuk
          </h1>
          <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full px-3 py-1 text-xs font-medium">
            {pendingCount} menunggu
          </span>
        </div>

        <button
          onClick={loadReports}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors shadow-2xs cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Muat Ulang</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border border-[#E2ECEB] rounded-2xl shadow-xs p-1.5 inline-flex gap-1">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeFilter === tab
                ? "bg-[#022022] text-white"
                : "text-[#566E70] hover:bg-[#E6FEFF] hover:text-[#022022]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Reports Table */}
      <div className="bg-white border border-[#E2ECEB] rounded-2xl shadow-xs overflow-hidden">
        <ReportsTable
          reports={filtered}
          onViewDetail={handleViewDetail}
          onUpdateStatus={handleUpdateStatus}
          onRespond={handleRespond}
        />
      </div>

      {/* Modal Detail Laporan */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  {selectedReport.reportId || `#${selectedReport.id}`}
                </span>
                <h3 className="font-poppins font-bold text-base text-[#022022]">
                  {selectedReport.title}
                </h3>
              </div>
              <span className="bg-[#E6FEFF] text-[#022022] text-xs font-semibold px-2.5 py-1 rounded-full">
                {selectedReport.category}
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div>
                <p className="font-semibold text-slate-900 mb-1">Deskripsi Aduan:</p>
                <p className="p-3 bg-slate-50 rounded-xl leading-relaxed">
                  {selectedReport.description || "Tidak ada rincian tambahan."}
                </p>
              </div>

              {selectedReport.suggestedCorrection && (
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Usulan Koreksi Warga:</p>
                  <p className="p-3 bg-teal-50/50 text-[#022022] rounded-xl border border-teal-100">
                    {selectedReport.suggestedCorrection}
                  </p>
                </div>
              )}

              {selectedReport.adminResponse && (
                <div>
                  <p className="font-semibold text-emerald-800 mb-1">Tanggapan Resmi Admin:</p>
                  <p className="p-3 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200">
                    {selectedReport.adminResponse}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <p>Pelapor: <strong className="text-slate-800">{selectedReport.reporter}</strong></p>
                <p>Kontak: <strong className="text-slate-800">{selectedReport.contact || "-"}</strong></p>
                <p>Tanggal: <strong className="text-slate-800">{selectedReport.submittedAt || selectedReport.date}</strong></p>
                <p>Status: <strong className="text-slate-800">{selectedReport.status}</strong></p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 rounded-xl bg-[#022022] text-white text-xs font-medium hover:bg-[#033033] transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
