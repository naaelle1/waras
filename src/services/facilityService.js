import { facilities as localFacilities } from "../data/facilities";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const facilityService = {
  /**
   * Mengambil daftar seluruh fasilitas kesehatan dari backend database Turso
   * @param {Object} params { category, district, search }
   */
  async getAll(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (params.category && params.category !== "Semua") {
        queryParams.append("category", params.category);
      }
      if (params.district && params.district !== "Semua") {
        queryParams.append("district", params.district);
      }
      if (params.search && params.search.trim()) {
        queryParams.append("search", params.search.trim());
      }

      const url = `${API_BASE}/facilities${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
      const res = await fetch(url);
      const json = await res.json();

      if (res.ok && json.success && Array.isArray(json.data)) {
        return json.data;
      }
      throw new Error(json.message || "Gagal memuat data fasilitas.");
    } catch (err) {
      console.warn("[FacilityService] Menggunakan data lokal (offline fallback):", err.message);
      // Filter offline fallback
      let list = [...localFacilities];
      if (params.category && params.category !== "Semua") {
        list = list.filter((f) => f.category?.toLowerCase() === params.category.toLowerCase());
      }
      if (params.district && params.district !== "Semua") {
        list = list.filter((f) => f.district?.toLowerCase() === params.district.toLowerCase());
      }
      if (params.search && params.search.trim()) {
        const q = params.search.trim().toLowerCase();
        list = list.filter(
          (f) =>
            f.name?.toLowerCase().includes(q) ||
            f.address?.toLowerCase().includes(q) ||
            f.district?.toLowerCase().includes(q) ||
            (f.services && f.services.some((s) => s.toLowerCase().includes(q)))
        );
      }
      return list;
    }
  },

  /**
   * Mengambil detail fasilitas kesehatan berdasarkan ID
   * @param {number|string} id
   */
  async getById(id) {
    try {
      const res = await fetch(`${API_BASE}/facilities/${id}`);
      const json = await res.json();
      if (res.ok && json.success && json.data) {
        return json.data;
      }
      throw new Error(json.message || "Fasilitas tidak ditemukan.");
    } catch (err) {
      console.warn("[FacilityService] Mengambil detail dari data lokal:", err.message);
      const parsedId = parseInt(id, 10);
      const found = localFacilities.find((f) => f.id === parsedId);
      return found || null;
    }
  },

  /**
   * Mendapatkan daftar nama kecamatan unik
   * @param {Array} facilityList (opsional)
   */
  extractDistricts(facilityList = localFacilities) {
    const list = facilityList
      .map((f) => f.district)
      .filter((d) => d && d !== "Semarang");
    return ["Semua", ...Array.from(new Set(list)).sort()];
  }
};
