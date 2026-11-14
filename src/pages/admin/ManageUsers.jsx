import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Download,
  Eye,
  Pencil,
  ShieldCheck,
  ShieldOff,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RefreshCw,
  X,
  Save,
  UserCheck,
  AlertCircle
} from "lucide-react";
import { userService } from "../../services/userService";

const mockUsers = [
  { id: 1, name: "Admin WARAS Semarang", nik: "3374010101850001", email: "admin@waras.semarangkota.go.id", phone: "081122334455", role: "admin", status: "Aktif", registered: "2026-01-01", bpjsStatus: "Aktif", bpjsNumber: "0001234567891", district: "Semarang Tengah", address: "Jl. Pemuda No. 148, Sekayu" },
  { id: 2, name: "Nael Ardiansyah", nik: "3374015503900001", email: "nael@semarangkota.go.id", phone: "081234567890", role: "user", status: "Aktif", registered: "2026-02-10", bpjsStatus: "Aktif", bpjsNumber: "0001234567892", district: "Semarang Barat", address: "Jl. Siliwangi No. 12" },
  { id: 3, name: "Warga Semarang", nik: "3374021207850002", email: "warga@semarangkota.go.id", phone: "082345678901", role: "user", status: "Aktif", registered: "2026-02-15", bpjsStatus: "Aktif", bpjsNumber: "0001234567893", district: "Semarang Selatan", address: "Jl. Sriwijaya No. 45" },
  { id: 4, name: "Krisna Mandala Putra", nik: "3374034509920003", email: "youokozzie@gmail.com", phone: "085678901234", role: "user", status: "Aktif", registered: "2026-03-01", bpjsStatus: "Aktif", bpjsNumber: "0001234567894", district: "Banyumanik", address: "Jl. Sukun Raya No. 8" },
  { id: 5, name: "Siti Rahmawati", nik: "3374040108880004", email: "siti.rahmawati@example.com", phone: "087890123456", role: "user", status: "Aktif", registered: "2026-03-05", bpjsStatus: "Tidak Aktif", bpjsNumber: "0001234567895", district: "Pedurungan", address: "Jl. Majapahit No. 88" },
  { id: 6, name: "daboy", nik: "3374052305950005", email: "daboy@gmail.com", phone: "081345678912", role: "user", status: "Aktif", registered: "2026-03-10", bpjsStatus: "Aktif", bpjsNumber: "0001234567896", district: "Tembalang", address: "Jl. Prof. Soedarto No. 20" },
];

const PAGE_SIZE = 5;

const SEMARANG_DISTRICTS = [
  "Semarang Tengah",
  "Semarang Barat",
  "Semarang Timur",
  "Semarang Utara",
  "Semarang Selatan",
  "Banyumanik",
  "Candisari",
  "Gajahmungkur",
  "Gayamsari",
  "Genuk",
  "Gunungpati",
  "Mijen",
  "Ngaliyan",
  "Pedurungan",
  "Tembalang",
  "Tugu"
];

export default function ManageUsers() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State Modal Edit & Detail
  const [editUser, setEditUser] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

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

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Handler Buka Modal Edit
  const handleStartEdit = (user) => {
    setEditFormData({
      name: user.name || "",
      email: user.email || "",
      nik: user.nik || "",
      phone: user.phone || "",
      role: user.role || "user",
      status: user.status || "Aktif",
      bpjsStatus: user.bpjsStatus || "Aktif",
      bpjsNumber: user.bpjsNumber || "",
      district: user.district || "Semarang Tengah",
      address: user.address || ""
    });
    setEditUser(user);
  };

  // Handler Simpan Perubahan Edit
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editUser) return;

    if (!editFormData.name?.trim()) {
      alert("Nama lengkap wajib diisi.");
      return;
    }
    if (!editFormData.email?.trim()) {
      alert("Alamat email wajib diisi.");
      return;
    }

    setIsSaving(true);
    try {
      const updated = await userService.updateUser(editUser.id, editFormData);
      setUsers((prev) =>
        prev.map((u) => (u.id === editUser.id ? { ...u, ...updated } : u))
      );
      setEditUser(null);
      alert("Data pengguna berhasil diperbarui di database!");
    } catch (err) {
      alert(err.message || "Gagal memperbarui data pengguna.");
    } finally {
      setIsSaving(false);
    }
  };

  // Handler Toggle Status Aktif / Nonaktif
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
          <span className="bg-[#E6FEFF] text-[#022022] rounded-full px-3 py-1 text-xs font-semibold">
            {users.length} pengguna
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadUsers}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors shadow-2xs cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Segarkan</span>
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white border border-[#E2ECEB] rounded-2xl shadow-xs p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#566E70]" />
            <input
              type="text"
              placeholder="Cari nama, NIK, atau email pengguna..."
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
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
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
              <tr className="border-b border-[#E2ECEB] bg-[#F8FAFA]">
                <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">
                  Pengguna
                </th>
                <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">
                  NIK
                </th>
                <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">
                  Kontak
                </th>
                <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">
                  Peran
                </th>
                <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">
                  Status Akun
                </th>
                <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">
                  Terdaftar
                </th>
                <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {paged.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-[#E2ECEB]/60 hover:bg-[#F8FAFA] transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#022022] text-[#37F4B4] font-semibold text-xs flex items-center justify-center shrink-0">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div>
                        <div className="font-medium text-[#022022] flex items-center gap-1.5">
                          <span>{user.name}</span>
                          {user.role === "admin" && (
                            <span className="text-[10px] bg-slate-900 text-teal-300 font-bold px-1.5 py-0.2 rounded">
                              ADMIN
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-[#566E70]">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#566E70] font-mono text-xs">
                    {user.nik || "-"}
                  </td>
                  <td className="py-3.5 px-4 text-[#566E70] text-xs">
                    {user.phone || "-"}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      user.role === "admin"
                        ? "bg-[#022022] text-[#37F4B4]"
                        : "bg-slate-100 text-slate-700"
                    }`}>
                      {user.role === "admin" ? "Administrator" : "Warga"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium inline-flex items-center gap-1 ${
                        user.status === "Aktif"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-red-50 text-red-600 border border-red-200"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === "Aktif" ? "bg-emerald-500" : "bg-red-500"}`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#566E70] text-xs">{user.registered}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1">
                      {/* Tombol Lihat Detail */}
                      <button
                        onClick={() => setSelectedDetail(user)}
                        className="p-1.5 rounded-lg text-[#566E70] hover:bg-[#E6FEFF] hover:text-[#022022] transition-colors cursor-pointer"
                        title="Lihat Detail Profil"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Tombol Edit User */}
                      <button
                        onClick={() => handleStartEdit(user)}
                        className="p-1.5 rounded-lg text-[#566E70] hover:bg-[#37F4B4]/20 hover:text-[#022022] transition-colors cursor-pointer"
                        title="Edit Data Pengguna"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      {/* Tombol Suspend / Aktifkan */}
                      <button
                        onClick={() => toggleStatus(user.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          user.status === "Aktif"
                            ? "text-[#566E70] hover:bg-red-50 hover:text-red-500"
                            : "text-[#566E70] hover:bg-emerald-50 hover:text-emerald-500"
                        }`}
                        title={user.status === "Aktif" ? "Nonaktifkan Akun" : "Aktifkan Akun"}
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
                  <td colSpan={7} className="text-center py-12 text-[#566E70]">
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
                className="p-1.5 rounded-lg text-[#566E70] hover:bg-[#E6FEFF] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
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
                className="p-1.5 rounded-lg text-[#566E70] hover:bg-[#E6FEFF] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── MODAL EDIT PENGGUNA ── */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-xl w-full shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150 scrollbar-thin">
            {/* Header Modal */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#022022] text-[#37F4B4] flex items-center justify-center font-bold text-sm">
                  <Pencil className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-base text-[#022022]">
                    Edit Data Pengguna
                  </h3>
                  <p className="text-xs text-slate-500">
                    ID Pengguna: <span className="font-mono font-semibold">#{editUser.id}</span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditUser(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Edit */}
            <form onSubmit={handleSaveEdit} className="space-y-4 pt-4 text-xs font-inter">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nama Lengkap */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#37F4B4]/40 focus:border-[#37F4B4] text-xs text-slate-900"
                    placeholder="Nama lengkap warga"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Alamat Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#37F4B4]/40 focus:border-[#37F4B4] text-xs text-slate-900"
                    placeholder="contoh@email.com"
                  />
                </div>

                {/* NIK */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    NIK Kependudukan (16 Digit)
                  </label>
                  <input
                    type="text"
                    maxLength={16}
                    value={editFormData.nik}
                    onChange={(e) => setEditFormData({ ...editFormData, nik: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#37F4B4]/40 focus:border-[#37F4B4] text-xs font-mono text-slate-900"
                    placeholder="337401xxxxxxxxxx"
                  />
                </div>

                {/* Nomor HP / WhatsApp */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nomor WhatsApp / HP
                  </label>
                  <input
                    type="tel"
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#37F4B4]/40 focus:border-[#37F4B4] text-xs text-slate-900"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>

                {/* Peran / Role */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Peran Akun
                  </label>
                  <select
                    value={editFormData.role}
                    onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#37F4B4]/40 focus:border-[#37F4B4] text-xs text-slate-900 bg-white"
                  >
                    <option value="user">Warga (User Biasa)</option>
                    <option value="admin">Administrator Dinkes</option>
                  </select>
                </div>

                {/* Status Akun */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Status Akun
                  </label>
                  <select
                    value={editFormData.status}
                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#37F4B4]/40 focus:border-[#37F4B4] text-xs text-slate-900 bg-white"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif (Suspend)</option>
                  </select>
                </div>

                {/* Status BPJS */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Status BPJS Kesehatan
                  </label>
                  <select
                    value={editFormData.bpjsStatus}
                    onChange={(e) => setEditFormData({ ...editFormData, bpjsStatus: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#37F4B4]/40 focus:border-[#37F4B4] text-xs text-slate-900 bg-white"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
                    <option value="Menunggak">Menunggak</option>
                  </select>
                </div>

                {/* Nomor Kartu BPJS */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nomor Kartu BPJS
                  </label>
                  <input
                    type="text"
                    value={editFormData.bpjsNumber}
                    onChange={(e) => setEditFormData({ ...editFormData, bpjsNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#37F4B4]/40 focus:border-[#37F4B4] text-xs font-mono text-slate-900"
                    placeholder="0001234567891"
                  />
                </div>
              </div>

              {/* Kecamatan */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Kecamatan di Kota Semarang
                </label>
                <select
                  value={editFormData.district}
                  onChange={(e) => setEditFormData({ ...editFormData, district: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#37F4B4]/40 focus:border-[#37F4B4] text-xs text-slate-900 bg-white"
                >
                  <option value="">Pilih Kecamatan</option>
                  {SEMARANG_DISTRICTS.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>

              {/* Alamat Lengkap */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Alamat Domisili
                </label>
                <textarea
                  rows={2}
                  value={editFormData.address}
                  onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#37F4B4]/40 focus:border-[#37F4B4] text-xs text-slate-900"
                  placeholder="Jl. Pemuda No. 12, RT 01/RW 02..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditUser(null)}
                  disabled={isSaving}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-xs font-medium cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#022022] text-white hover:bg-[#033033] transition-colors text-xs font-semibold shadow-sm cursor-pointer disabled:opacity-60"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5 text-[#37F4B4]" />
                      <span>Simpan Perubahan</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL DETAIL PROFIL PENGGUNA ── */}
      {selectedDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#022022] text-[#37F4B4] flex items-center justify-center font-bold text-base shadow-sm">
                  {selectedDetail.name ? selectedDetail.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-base text-[#022022]">
                    {selectedDetail.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      selectedDetail.role === "admin"
                        ? "bg-[#022022] text-[#37F4B4]"
                        : "bg-slate-100 text-slate-700"
                    }`}>
                      {selectedDetail.role === "admin" ? "Administrator" : "Warga"}
                    </span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      selectedDetail.status === "Aktif"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-red-50 text-red-600 border border-red-200"
                    }`}>
                      {selectedDetail.status}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDetail(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-slate-600">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl">
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Alamat Email</p>
                  <p className="font-semibold text-slate-900 mt-0.5 truncate">{selectedDetail.email}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Nomor WhatsApp / HP</p>
                  <p className="font-semibold text-slate-900 mt-0.5">{selectedDetail.phone || "-"}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">NIK Kependudukan</p>
                  <p className="font-semibold font-mono text-slate-900 mt-0.5">{selectedDetail.nik || "-"}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Tanggal Registrasi</p>
                  <p className="font-semibold text-slate-900 mt-0.5">{selectedDetail.registered || "-"}</p>
                </div>
              </div>

              <div className="p-3 bg-teal-50/40 border border-teal-100 rounded-2xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#022022]">BPJS Kesehatan</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                    {selectedDetail.bpjsStatus || "Aktif"}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-slate-700">
                  No. Kartu: {selectedDetail.bpjsNumber || "Belum ditautkan"}
                </p>
              </div>

              <div>
                <p className="text-[10px] text-slate-400 font-medium">Alamat & Kecamatan</p>
                <p className="p-2.5 bg-slate-50 rounded-xl text-slate-800 mt-1">
                  {selectedDetail.address || "Belum ada data alamat"} {selectedDetail.district ? `— Kec. ${selectedDetail.district}` : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  const target = selectedDetail;
                  setSelectedDetail(null);
                  handleStartEdit(target);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#37F4B4] text-[#022022] text-xs font-semibold hover:bg-[#2DE0A3] transition-colors cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit Pengguna</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedDetail(null)}
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
