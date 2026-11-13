import React from "react";
import { Eye, MoreVertical, MessageSquare } from "lucide-react";

const statusStyles = {
  Menunggu: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Diproses: "bg-blue-50 text-blue-700 border border-blue-200",
  Selesai: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Ditolak: "bg-red-50 text-red-700 border border-red-200",
};

export default function ReportsTable({ reports, onViewDetail, onUpdateStatus, onRespond }) {
  if (!reports || reports.length === 0) {
    return (
      <div className="text-center py-12 text-[#566E70] font-inter">
        Tidak ada laporan ditemukan.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm font-inter">
        <thead>
          <tr className="border-b border-[#E2ECEB]">
            <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">ID</th>
            <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">Judul</th>
            <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">Kategori</th>
            <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">Pelapor</th>
            <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">Status</th>
            <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">Tanggal</th>
            <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr
              key={report.id}
              className="border-b border-[#E2ECEB]/60 hover:bg-[#F8FAFA] transition-colors"
            >
              <td className="py-3.5 px-4 text-[#566E70] font-mono text-xs">#{report.id}</td>
              <td className="py-3.5 px-4 text-[#022022] font-medium max-w-[200px] truncate">
                {report.title}
              </td>
              <td className="py-3.5 px-4">
                <span className="bg-[#E6FEFF] text-[#022022] rounded-full px-3 py-1 text-xs font-medium">
                  {report.category}
                </span>
              </td>
              <td className="py-3.5 px-4 text-[#566E70]">{report.reporter}</td>
              <td className="py-3.5 px-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    statusStyles[report.status] || "bg-gray-50 text-gray-600"
                  }`}
                >
                  {report.status}
                </span>
              </td>
              <td className="py-3.5 px-4 text-[#566E70] text-xs">{report.date}</td>
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onViewDetail?.(report)}
                    className="p-1.5 rounded-lg text-[#566E70] hover:bg-[#E6FEFF] hover:text-[#022022] transition-colors"
                    title="Lihat Detail"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onUpdateStatus?.(report)}
                    className="p-1.5 rounded-lg text-[#566E70] hover:bg-[#E6FEFF] hover:text-[#022022] transition-colors"
                    title="Update Status"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRespond?.(report)}
                    className="p-1.5 rounded-lg text-[#566E70] hover:bg-[#E6FEFF] hover:text-[#022022] transition-colors"
                    title="Balas"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
