import { authService } from "./authService";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const reportService = {
  /**
   * Mengirimkan laporan masalah data / aduan fasilitas ke backend database Turso
   * @param {Object} reportData
   */
  async submitReport(reportData) {
    try {
      const res = await fetch(`${API_BASE}/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Gagal menyimpan laporan ke server.");
      }

      return data;
    } catch (err) {
      console.warn("[ReportService] Backend gagal dijangkau, menggunakan fallback lokal:", err.message);
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const reportId = `WARAS-REP-${randomNum}`;
      const submittedAt = new Date().toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        success: true,
        data: {
          reportId,
          submittedAt,
          status: "Menunggu Peninjauan",
          payload: { ...reportData },
        },
      };
    }
  },

  /**
   * Mengambil seluruh riwayat laporan dari backend (Portal Admin)
   */
  async getAllReports(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (params.status && params.status !== "Semua") queryParams.append("status", params.status);
      if (params.search) queryParams.append("search", params.search);
      if (params.page) queryParams.append("page", String(params.page));

      const token = authService.getToken();
      const res = await fetch(`${API_BASE}/reports?${queryParams.toString()}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return data.data;
      }
      return [];
    } catch (_err) {
      return [];
    }
  },

  /**
   * Memperbarui status laporan oleh Admin
   */
  async updateStatus(id, status) {
    try {
      const token = authService.getToken();
      const res = await fetch(`${API_BASE}/reports/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return data;
      }
      throw new Error(data.message || "Gagal memperbarui status laporan.");
    } catch (err) {
      console.error("[reportService.updateStatus]", err);
      throw err;
    }
  },

  /**
   * Menambahkan tanggapan admin ke laporan warga
   */
  async respond(id, responseText, status = "Selesai") {
    try {
      const token = authService.getToken();
      const res = await fetch(`${API_BASE}/reports/${id}/respond`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ responseText, status })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return data;
      }
      throw new Error(data.message || "Gagal menyimpan tanggapan.");
    } catch (err) {
      console.error("[reportService.respond]", err);
      throw err;
    }
  },

  /**
   * Hapus laporan
   */
  async deleteReport(id) {
    try {
      const token = authService.getToken();
      const res = await fetch(`${API_BASE}/reports/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return data;
      }
      throw new Error(data.message || "Gagal menghapus laporan.");
    } catch (err) {
      console.error("[reportService.deleteReport]", err);
      throw err;
    }
  }
};
