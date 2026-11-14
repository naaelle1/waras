import { authService } from "./authService";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const adminService = {
  /**
   * Mengambil statistik ringkasan dashboard admin secara live
   */
  async getDashboardStats() {
    try {
      const token = authService.getToken();
      const res = await fetch(`${API_BASE}/admin/stats`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const json = await res.json();
      if (res.ok && json.success) {
        return json.data;
      }
      throw new Error(json.message || "Gagal memuat statistik admin.");
    } catch (err) {
      console.warn("[adminService.getDashboardStats] Fallback:", err.message);
      return null;
    }
  }
};
