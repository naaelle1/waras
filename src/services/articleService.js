import { articles as localArticles } from "../data/articles";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const articleService = {
  /**
   * Mengambil daftar artikel kesehatan dari backend database Turso
   * @param {Object} params { category, featured, search }
   */
  async getAll(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (params.category && params.category !== "Semua") {
        queryParams.append("category", params.category);
      }
      if (params.featured !== undefined) {
        queryParams.append("featured", String(params.featured));
      }
      if (params.search && params.search.trim()) {
        queryParams.append("search", params.search.trim());
      }

      const url = `${API_BASE}/articles${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
      const res = await fetch(url);
      const json = await res.json();

      if (res.ok && json.success && Array.isArray(json.data)) {
        return json.data;
      }
      throw new Error(json.message || "Gagal memuat artikel.");
    } catch (err) {
      console.warn("[ArticleService] Menggunakan data lokal (offline fallback):", err.message);
      let list = [...localArticles];
      if (params.category && params.category !== "Semua") {
        list = list.filter((a) => a.category?.toLowerCase() === params.category.toLowerCase());
      }
      if (params.featured !== undefined) {
        list = list.filter((a) => Boolean(a.featured) === Boolean(params.featured));
      }
      if (params.search && params.search.trim()) {
        const q = params.search.trim().toLowerCase();
        list = list.filter(
          (a) =>
            a.title?.toLowerCase().includes(q) ||
            a.description?.toLowerCase().includes(q) ||
            (Array.isArray(a.tags) && a.tags.some((t) => t.toLowerCase().includes(q)))
        );
      }
      return list;
    }
  },

  /**
   * Mengambil detail artikel berdasarkan ID
   * @param {number|string} id
   */
  async getById(id) {
    try {
      const res = await fetch(`${API_BASE}/articles/${id}`);
      const json = await res.json();
      if (res.ok && json.success && json.data) {
        return json.data;
      }
      throw new Error(json.message || "Artikel tidak ditemukan.");
    } catch (err) {
      console.warn("[ArticleService] Mengambil detail artikel dari data lokal:", err.message);
      const parsedId = parseInt(id, 10);
      const found = localArticles.find((a) => a.id === parsedId);
      return found || null;
    }
  },

  /**
   * Mengambil daftar kategori artikel unik
   */
  getCategories() {
    return [
      "Semua",
      "Kesehatan Umum",
      "Penyakit & Pencegahan",
      "Kesehatan Mental",
      "Gaya Hidup",
      "Pertolongan Pertama",
      "Kesehatan Anak"
    ];
  }
};
