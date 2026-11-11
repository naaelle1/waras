/**
 * Mock Service untuk Pengiriman Laporan Masalah di Platform WARAS
 */
export const reportService = {
  /**
   * Simulasi pengiriman laporan ke server
   * @param {Object} reportData
   * @returns {Promise<Object>}
   */
  async submitReport(reportData) {
    // Simulasi delay jaringan (750ms)
    await new Promise((resolve) => setTimeout(resolve, 750));

    // Generasi ID Referensi Laporan unik
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const reportId = `WARAS-REP-${randomNum}`;

    // Waktu pengiriman
    const submittedAt = new Date().toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    return {
      success: true,
      data: {
        reportId,
        submittedAt,
        status: "Menunggu Peninjauan",
        payload: { ...reportData }
      }
    };
  }
};