import { authService } from "./authService";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const userService = {
  /**
   * Mengambil daftar pengguna dari backend database
   */
  async getAllUsers(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (params.search) queryParams.append("search", params.search);
      if (params.status && params.status !== "Semua") queryParams.append("status", params.status);
      if (params.page) queryParams.append("page", String(params.page));
      if (params.limit) queryParams.append("limit", String(params.limit));

      const token = authService.getToken();
      const res = await fetch(`${API_BASE}/users?${queryParams.toString()}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const json = await res.json();
      if (res.ok && json.success) {
        return json;
      }
      throw new Error(json.message || "Gagal memuat pengguna.");
    } catch (err) {
      console.warn("[userService.getAllUsers] Fallback:", err.message);
      return null;
    }
  },

  /**
   * Toggle atau update status pengguna ('Aktif' | 'Nonaktif')
   */
  async updateStatus(id, status) {
    try {
      const token = authService.getToken();
      const res = await fetch(`${API_BASE}/users/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      const json = await res.json();
      if (res.ok && json.success) {
        return json;
      }
      throw new Error(json.message || "Gagal mengubah status pengguna.");
    } catch (err) {
      console.error("[userService.updateStatus]", err);
      throw err;
    }
  },

  /**
   * Hapus pengguna
   */
  async deleteUser(id) {
    try {
      const token = authService.getToken();
      const res = await fetch(`${API_BASE}/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const json = await res.json();
      if (res.ok && json.success) {
        return json;
      }
      throw new Error(json.message || "Gagal menghapus pengguna.");
    } catch (err) {
      console.error("[userService.deleteUser]", err);
      throw err;
    }
  }
};
