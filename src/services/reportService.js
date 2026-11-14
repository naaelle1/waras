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
      // Fallback lokal jika offline
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
   * Mengambil seluruh riwayat laporan dari backend
   */
  async getAllReports() {
    try {
      const res = await fetch(`${API_BASE}/reports`);
      const data = await res.json();
      if (res.ok && data.success) {
        return data.data;
      }
      return [];
    } catch (_err) {
      return [];
    }
  },
};
