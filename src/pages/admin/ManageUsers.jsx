import React, { useState, useMemo, useEffect } from "react";
import { Search, Download, Eye, Pencil, ShieldCheck, ShieldOff, ChevronLeft, ChevronRight, Loader2, RefreshCw } from "lucide-react";
import { userService } from "../../services/userService";

const mockUsers = [
  { id: 1, name: "Dewi Lestari", nik: "3374015503900001", email: "dewi.lestari@email.com", phone: "081234567890", status: "Aktif", registered: "2024-11-01" },
  { id: 2, name: "Ahmad Fauzan", nik: "3374021207850002", email: "ahmad.fauzan@email.com", phone: "082345678901", status: "Aktif", registered: "2024-10-28" },
  { id: 3, name: "Siti Rahayu", nik: "3374034509920003", email: "siti.rahayu@email.com", phone: "085678901234", status: "Aktif", registered: "2024-10-15" },
  { id: 4, name: "Budi Santoso", nik: "3374040108880004", email: "budi.santoso@email.com", phone: "087890123456", status: "Nonaktif", registered: "2024-09-20" },
  { id: 5, name: "Ratna Kusuma", nik: "3374052305950005", email: "ratna.kusuma@email.com", phone: "081345678912", status: "Aktif", registered: "2024-09-10" },
  { id: 6, name: "Hendra Wijaya", nik: "3374061506870006", email: "hendra.wijaya@email.com", phone: "082456789012", status: "Aktif", registered: "2024-08-25" },
  { id: 7, name: "Putri Ayu Wardani", nik: "3374073008930007", email: "putri.wardani@email.com", phone: "085789012345", status: "Aktif", registered: "2024-08-18" },
  { id: 8, name: "Teguh Prasetyo", nik: "3374080204910008", email: "teguh.prasetyo@email.com", phone: "089012345678", status: "Nonaktif", registered: "2024-07-30" },
  { id: 9, name: "Nur Hidayah", nik: "3374091711960009", email: "nur.hidayah@email.com", phone: "081567890123", status: "Aktif", registered: "2024-07-15" },
  { id: 10, name: "Fajar Setiawan", nik: "3374102509890010", email: "fajar.setiawan@email.com", phone: "082678901234", status: "Aktif", registered: "2024-06-20" },
];

const PAGE_SIZE = 5;

export default function ManageUsers() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadUsers = async () => {
    setIsLoading(true);
    const res = await userService.getAllUsers();
    if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
      setUsers(res.data);
    } else {
      setUsers(mockUsers);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (u.nik || "").includes(search) ||
        (u.email || "").toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        filterStatus === "Semua" || u.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [users, search, filterStatus]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleStatus = async (id) => {
    const current = users.find((u) => u.id === id);
    if (!current) return;
    const newStatus = current.status === "Aktif" ? "Nonaktif" : "Aktif";

    // Optimistic UI update
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: newStatus } : u
      )
    );

    try {
      await userService.updateStatus(id, newStatus);
    } catch (err) {
      alert(err.message || "Gagal memperbarui status akun.");
      // Revert if error
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, status: current.status } : u
        )
      );
    }
  };

  return (
    <div className="space-y-6 font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[#022022] font-poppins">
            Kelola Pengguna
          </h1>
          <span className="bg-[#E6FEFF] text-[#022022] rounded-full px-3 py-1 text-xs font-medium">
            {users.length} pengguna
          </span>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#022022] text-white hover:bg-[#033033] transition-colors text-sm font-medium">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white border border-[#E2ECEB] rounded-2xl shadow-xs p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#566E70]" />
            <input
              type="text"
              placeholder="Cari nama atau NIK..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2ECEB] text-sm text-[#022022] placeholder:text-[#566E70] focus:outline-none focus:ring-2 focus:ring-[#37F4B4]/40 focus:border-[#37F4B4] transition-all"
            />
          </div>
          <div className="flex gap-2">
            {["Semua", "Aktif", "Nonaktif"].map((s) => (
              <button
                key={s}
                onClick={() => {
                  setFilterStatus(s);
                  setPage(1);
                }}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  filterStatus === s
                    ? "bg-[#022022] text-white"
                    : "bg-[#F8FAFA] text-[#566E70] hover:bg-[#E6FEFF] hover:text-[#022022]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E2ECEB] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2ECEB]">
                <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">No</th>
                <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">Nama</th>
                <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">NIK</th>
                <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">Email</th>
                <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">No. HP</th>
                <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">Status</th>
                <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">Terdaftar</th>
                <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((user, idx) => (
                <tr
                  key={user.id}
                  className="border-b border-[#E2ECEB]/60 hover:bg-[#F8FAFA] transition-colors"
                >
                  <td className="py-3.5 px-4 text-[#566E70]">
                    {(page - 1) * PAGE_SIZE + idx + 1}
                  </td>
                  <td className="py-3.5 px-4 text-[#022022] font-medium">{user.name}</td>
                  <td className="py-3.5 px-4 text-[#566E70] font-mono text-xs">{user.nik}</td>
                  <td className="py-3.5 px-4 text-[#566E70]">{user.email}</td>
                  <td className="py-3.5 px-4 text-[#566E70]">{user.phone}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        user.status === "Aktif"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-red-50 text-red-600 border border-red-200"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#566E70] text-xs">{user.registered}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1">
                      <button
                        className="p-1.5 rounded-lg text-[#566E70] hover:bg-[#E6FEFF] hover:text-[#022022] transition-colors"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 rounded-lg text-[#566E70] hover:bg-[#E6FEFF] hover:text-[#022022] transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleStatus(user.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          user.status === "Aktif"
                            ? "text-[#566E70] hover:bg-red-50 hover:text-red-500"
                            : "text-[#566E70] hover:bg-emerald-50 hover:text-emerald-500"
                        }`}
                        title={user.status === "Aktif" ? "Suspend" : "Aktifkan"}
                      >
                        {user.status === "Aktif" ? (
                          <ShieldOff className="w-4 h-4" />
                        ) : (
                          <ShieldCheck className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-[#566E70]">
                    Tidak ada pengguna ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#E2ECEB]">
            <span className="text-xs text-[#566E70]">
              Menampilkan {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, filtered.length)} dari {filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg text-[#566E70] hover:bg-[#E6FEFF] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                    page === p
                      ? "bg-[#022022] text-white"
                      : "text-[#566E70] hover:bg-[#E6FEFF]"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg text-[#566E70] hover:bg-[#E6FEFF] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
