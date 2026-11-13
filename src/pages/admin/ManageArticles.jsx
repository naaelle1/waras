import React, { useState, useMemo } from "react";
import { Plus, Pencil, Eye, Archive, Trash2, ArrowUpFromLine, ArrowDownToLine } from "lucide-react";

const mockArticles = [
  { id: 1, title: "Panduan Gizi Seimbang untuk Balita", category: "Gizi", status: "Dipublikasi", author: "Dr. Sari Dewi", date: "2024-11-10" },
  { id: 2, title: "Tips Menjaga Kesehatan Jantung", category: "Jantung", status: "Dipublikasi", author: "Dr. Andi Pratama", date: "2024-11-08" },
  { id: 3, title: "Pentingnya Imunisasi pada Anak", category: "Imunisasi", status: "Draft", author: "Dr. Ratna Sari", date: "2024-11-05" },
  { id: 4, title: "Cara Mengelola Stres Sehari-hari", category: "Mental Health", status: "Dipublikasi", author: "Dr. Budi Hartono", date: "2024-10-30" },
  { id: 5, title: "Manfaat Olahraga Rutin bagi Kesehatan", category: "Olahraga", status: "Diarsipkan", author: "Dr. Putri Ayu", date: "2024-10-25" },
  { id: 6, title: "Mengenal Gejala Diabetes Tipe 2", category: "Diabetes", status: "Dipublikasi", author: "Dr. Hendra Wijaya", date: "2024-10-20" },
  { id: 7, title: "Panduan Kesehatan Ibu Hamil Trimester 1", category: "Kehamilan", status: "Draft", author: "Dr. Sari Dewi", date: "2024-10-15" },
  { id: 8, title: "Pencegahan Demam Berdarah di Musim Hujan", category: "Penyakit Tropis", status: "Dipublikasi", author: "Dr. Teguh Prasetyo", date: "2024-10-10" },
];

const statusStyles = {
  Dipublikasi: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Draft: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Diarsipkan: "bg-gray-100 text-gray-500 border border-gray-200",
};

const tabs = ["Semua", "Dipublikasi", "Draft", "Diarsipkan"];

export default function ManageArticles() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [articles, setArticles] = useState(mockArticles);

  const filtered = useMemo(() => {
    if (activeTab === "Semua") return articles;
    return articles.filter((a) => a.status === activeTab);
  }, [articles, activeTab]);

  const togglePublish = (id) => {
    setArticles((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "Dipublikasi" ? "Draft" : "Dipublikasi" }
          : a
      )
    );
  };

  const archiveArticle = (id) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Diarsipkan" } : a))
    );
  };

  const deleteArticle = (id) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6 font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[#022022] font-poppins">
            Kelola Artikel Kesehatan
          </h1>
          <span className="bg-[#E6FEFF] text-[#022022] rounded-full px-3 py-1 text-xs font-medium">
            {articles.length} artikel
          </span>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#37F4B4] text-[#022022] hover:bg-[#2DE0A3] transition-colors text-sm font-semibold">
          <Plus className="w-4 h-4" />
          Tulis Artikel Baru
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border border-[#E2ECEB] rounded-2xl shadow-xs p-1.5 inline-flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-[#022022] text-white"
                : "text-[#566E70] hover:bg-[#E6FEFF] hover:text-[#022022]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E2ECEB] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2ECEB]">
                <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">Judul</th>
                <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">Kategori</th>
                <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">Status</th>
                <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">Penulis</th>
                <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">Tanggal</th>
                <th className="text-left py-3 px-4 text-[10px] font-bold tracking-wider text-[#566E70] uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-[#E2ECEB]/60 hover:bg-[#F8FAFA] transition-colors"
                >
                  <td className="py-3.5 px-4 text-[#022022] font-medium max-w-[250px] truncate">
                    {article.title}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-[#E6FEFF] text-[#022022] rounded-full px-3 py-1 text-xs font-medium">
                      {article.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[article.status]}`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#566E70]">{article.author}</td>
                  <td className="py-3.5 px-4 text-[#566E70] text-xs">{article.date}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1">
                      <button
                        className="p-1.5 rounded-lg text-[#566E70] hover:bg-[#E6FEFF] hover:text-[#022022] transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => togglePublish(article.id)}
                        className="p-1.5 rounded-lg text-[#566E70] hover:bg-[#E6FEFF] hover:text-[#022022] transition-colors"
                        title={article.status === "Dipublikasi" ? "Unpublish" : "Publish"}
                      >
                        {article.status === "Dipublikasi" ? (
                          <ArrowDownToLine className="w-4 h-4" />
                        ) : (
                          <ArrowUpFromLine className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => archiveArticle(article.id)}
                        className="p-1.5 rounded-lg text-[#566E70] hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                        title="Arsipkan"
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteArticle(article.id)}
                        className="p-1.5 rounded-lg text-[#566E70] hover:bg-red-50 hover:text-red-500 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-[#566E70]">
                    Tidak ada artikel ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
