import React, { useState } from "react";
import { RefreshCw, Clock, Users, Hash } from "lucide-react";

const initialQueues = [
  { id: 1, facility: "Puskesmas Poncol", currentNumber: 45, totalWaiting: 12, estimatedWait: "25 menit", status: "Lancar" },
  { id: 2, facility: "Puskesmas Miroto", currentNumber: 32, totalWaiting: 28, estimatedWait: "55 menit", status: "Ramai" },
  { id: 3, facility: "RS Kariadi", currentNumber: 78, totalWaiting: 45, estimatedWait: "90 menit", status: "Penuh" },
  { id: 4, facility: "RSUD K.R.M.T. Wongsonegoro", currentNumber: 23, totalWaiting: 8, estimatedWait: "15 menit", status: "Lancar" },
  { id: 5, facility: "RS Sultan Agung", currentNumber: 56, totalWaiting: 34, estimatedWait: "65 menit", status: "Ramai" },
  { id: 6, facility: "Puskesmas Bandarharjo", currentNumber: 18, totalWaiting: 5, estimatedWait: "10 menit", status: "Lancar" },
];

const statusStyles = {
  Lancar: { badge: "bg-emerald-50 text-emerald-700 border border-emerald-200", dot: "bg-emerald-400" },
  Ramai: { badge: "bg-yellow-50 text-yellow-700 border border-yellow-200", dot: "bg-yellow-400" },
  Penuh: { badge: "bg-red-50 text-red-600 border border-red-200", dot: "bg-red-400" },
};

export default function ManageQueues() {
  const [queues, setQueues] = useState(initialQueues);

  const resetQueue = (id) => {
    setQueues((prev) =>
      prev.map((q) =>
        q.id === id
          ? { ...q, currentNumber: 0, totalWaiting: 0, estimatedWait: "0 menit", status: "Lancar" }
          : q
      )
    );
  };

  const getStatusCounts = () => {
    const counts = { Lancar: 0, Ramai: 0, Penuh: 0 };
    queues.forEach((q) => {
      counts[q.status] = (counts[q.status] || 0) + 1;
    });
    return counts;
  };

  const counts = getStatusCounts();

  return (
    <div className="space-y-6 font-inter">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#022022] font-poppins">
          Kelola Antrean
        </h1>
        <p className="text-[#566E70] text-sm mt-1">
          Pantau dan kelola antrean fasilitas kesehatan secara real-time.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.entries(counts).map(([status, count]) => (
          <div
            key={status}
            className="bg-white border border-[#E2ECEB] rounded-2xl shadow-xs p-4 flex items-center gap-3"
          >
            <div className={`w-3 h-3 rounded-full ${statusStyles[status].dot}`} />
            <div>
              <span className="text-sm text-[#566E70]">{status}</span>
              <p className="text-xl font-bold text-[#022022] font-poppins">{count} faskes</p>
            </div>
          </div>
        ))}
      </div>

      {/* Queue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {queues.map((queue) => {
          const style = statusStyles[queue.status];
          return (
            <div
              key={queue.id}
              className="bg-white border border-[#E2ECEB] rounded-2xl shadow-xs p-5 flex flex-col gap-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-base font-semibold text-[#022022] font-poppins pr-2 truncate flex-1">
                  {queue.facility}
                </h3>
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1.5 ${style.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                  {queue.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center p-3 bg-[#F8FAFA] rounded-xl">
                  <Hash className="w-4 h-4 text-[#566E70] mb-1" />
                  <span className="text-lg font-bold text-[#022022] font-poppins">
                    {queue.currentNumber}
                  </span>
                  <span className="text-[10px] text-[#566E70] uppercase tracking-wide">
                    Nomor
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 bg-[#F8FAFA] rounded-xl">
                  <Users className="w-4 h-4 text-[#566E70] mb-1" />
                  <span className="text-lg font-bold text-[#022022] font-poppins">
                    {queue.totalWaiting}
                  </span>
                  <span className="text-[10px] text-[#566E70] uppercase tracking-wide">
                    Menunggu
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 bg-[#F8FAFA] rounded-xl">
                  <Clock className="w-4 h-4 text-[#566E70] mb-1" />
                  <span className="text-sm font-bold text-[#022022] font-poppins">
                    {queue.estimatedWait}
                  </span>
                  <span className="text-[10px] text-[#566E70] uppercase tracking-wide">
                    Estimasi
                  </span>
                </div>
              </div>

              <button
                onClick={() => resetQueue(queue.id)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#022022] text-white hover:bg-[#033033] transition-colors text-sm font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                Reset Antrean
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
