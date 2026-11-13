import React, { useState, useMemo } from "react";
import { Plus, Pencil, Trash2, MapPin, Search } from "lucide-react";

const mockFacilities = [
  { id: 1, name: "Puskesmas Poncol", type: "Puskesmas", address: "Jl. Imam Bonjol No. 114, Semarang Tengah", status: "Aktif" },
  { id: 2, name: "Puskesmas Miroto", type: "Puskesmas", address: "Jl. Taman Seteran Barat No. 3, Semarang Tengah", status: "Aktif" },
  { id: 3, name: "Puskesmas Bandarharjo", type: "Puskesmas", address: "Jl. Layur No. 93, Semarang Utara", status: "Aktif" },
  { id: 4, name: "RSUD K.R.M.T. Wongsonegoro", type: "Rumah Sakit", address: "Jl. Fatmawati No. 1, Semarang Selatan", status: "Aktif" },
  { id: 5, name: "RS Kariadi", type: "Rumah Sakit", address: "Jl. Dr. Sutomo No. 16, Semarang Selatan", status: "Aktif" },
  { id: 6, name: "Puskesmas Karangayu", type: "Puskesmas", address: "Jl. Kenconowungu III No. 28, Semarang Barat", status: "Nonaktif" },
  { id: 7, name: "RS Sultan Agung", type: "Rumah Sakit", address: "Jl. Raya Kaligawe KM 4, Semarang Timur", status: "Aktif" },
  { id: 8, name: "Puskesmas Lamper Tengah", type: "Puskesmas", address: "Jl. Kel. Lamper Tengah Gg. VII, Semarang Selatan", status: "Aktif" },
];

export default function ManageFacilities() {
  const [filterType, setFilterType] = useState("Semua");
  const [search, setSearch] = useState("");
  const [facilities, setFacilities] = useState(mockFacilities);

  const filtered = useMemo(() => {
    return facilities.filter((f) => {
      const matchType = filterType === "Semua" || f.type === filterType;
      const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.address.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    });
  }, [facilities, filterType, search]);

  const handleDelete = (id) => {
    setFacilities((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6 font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[#022022] font-poppins">
            Kelola Fasilitas Kesehatan
          </h1>
          <span className="bg-[#E6FEFF] text-[#022022] rounded-full px-3 py-1 text-xs font-medium">
            {facilities.length} faskes
          </span>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#37F4B4] text-[#022022] hover:bg-[#2DE0A3] transition-colors text-sm font-semibold">
          <Plus className="w-4 h-4" />
          Tambah Faskes
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white border border-[#E2ECEB] rounded-2xl shadow-xs p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#566E70]" />
            <input
              type="text"
              placeholder="Cari fasilitas kesehatan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2ECEB] text-sm text-[#022022] placeholder:text-[#566E70] focus:outline-none focus:ring-2 focus:ring-[#37F4B4]/40 focus:border-[#37F4B4] transition-all"
            />
          </div>
          <div className="flex gap-2">
            {["Semua", "Puskesmas", "Rumah Sakit"].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  filterType === t
                    ? "bg-[#022022] text-white"
                    : "bg-[#F8FAFA] text-[#566E70] hover:bg-[#E6FEFF] hover:text-[#022022]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((facility) => (
          <div
            key={facility.id}
            className="bg-white border border-[#E2ECEB] rounded-2xl shadow-xs p-5 flex flex-col gap-3 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold text-[#022022] font-poppins truncate">
                  {facility.name}
                </h3>
                <span className="bg-[#E6FEFF] text-[#022022] rounded-full px-3 py-1 text-xs font-medium inline-block mt-1.5">
                  {facility.type}
                </span>
              </div>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                  facility.status === "Aktif"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-red-50 text-red-600 border border-red-200"
                }`}
              >
                {facility.status}
              </span>
            </div>

            <div className="flex items-start gap-2 text-sm text-[#566E70]">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span className="line-clamp-2">{facility.address}</span>
            </div>

            <div className="flex items-center gap-2 mt-auto pt-2 border-t border-[#E2ECEB]/60">
              <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#022022] text-white hover:bg-[#033033] transition-colors text-sm font-medium">
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(facility.id)}
                className="inline-flex items-center justify-center px-3 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors text-sm font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-[#566E70]">
            Tidak ada fasilitas ditemukan.
          </div>
        )}
      </div>
    </div>
  );
}
