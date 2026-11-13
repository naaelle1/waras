import React, { useState, useMemo } from "react";
import ReportsTable from "../../components/admin/ReportsTable";

const mockReports = [
  { id: "RPT-001", title: "Data faskes tidak akurat", category: "Data", reporter: "Dewi Lestari", status: "Menunggu", date: "2024-11-12" },
  { id: "RPT-002", title: "Jadwal dokter salah di Puskesmas Poncol", category: "Jadwal", reporter: "Ahmad Fauzan", status: "Diproses", date: "2024-11-11" },
  { id: "RPT-003", title: "Nomor telepon faskes tidak aktif", category: "Kontak", reporter: "Siti Rahayu", status: "Selesai", date: "2024-11-10" },
  { id: "RPT-004", title: "Layanan poli gigi tidak tersedia", category: "Layanan", reporter: "Budi Santoso", status: "Menunggu", date: "2024-11-09" },
  { id: "RPT-005", title: "Alamat RS Kariadi kurang lengkap", category: "Data", reporter: "Ratna Kusuma", status: "Ditolak", date: "2024-11-08" },
  { id: "RPT-006", title: "Error saat booking antrean online", category: "Sistem", reporter: "Hendra Wijaya", status: "Diproses", date: "2024-11-07" },
  { id: "RPT-007", title: "Foto faskes buram dan tidak update", category: "Media", reporter: "Putri Wardani", status: "Menunggu", date: "2024-11-06" },
  { id: "RPT-008", title: "Informasi BPJS tidak sesuai", category: "Data", reporter: "Teguh Prasetyo", status: "Selesai", date: "2024-11-05" },
];

const filterTabs = ["Semua", "Menunggu", "Diproses", "Selesai", "Ditolak"];

export default function ManageReports() {
  const [activeFilter, setActiveFilter] = useState("Semua");

  const filtered = useMemo(() => {
    if (activeFilter === "Semua") return mockReports;
    return mockReports.filter((r) => r.status === activeFilter);
  }, [activeFilter]);

  const pendingCount = mockReports.filter((r) => r.status === "Menunggu").length;

  const handleViewDetail = (report) => {
    console.log("View detail:", report);
  };

  const handleUpdateStatus = (report) => {
    console.log("Update status:", report);
  };

  const handleRespond = (report) => {
    console.log("Respond to:", report);
  };

  return (
    <div className="space-y-6 font-inter">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-[#022022] font-poppins">
          Laporan Masuk
        </h1>
        <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full px-3 py-1 text-xs font-medium">
          {pendingCount} menunggu
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border border-[#E2ECEB] rounded-2xl shadow-xs p-1.5 inline-flex gap-1">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
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
    </div>
  );
}
