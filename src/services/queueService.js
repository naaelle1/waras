import { queueData as localQueueData } from "../data/queueData";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

function mapQueueStatus(rawStatus) {
  const s = String(rawStatus || "").toLowerCase();
  if (s.includes("padat") || s.includes("penuh") || s.includes("ramai")) {
    return "Ramai";
  }
  if (s.includes("normal") || s.includes("sedang")) {
    return "Sedang";
  }
  return "Sepi";
}

export const queueService = {
  /**
   * Mengambil seluruh estimasi antrean faskes aktif dari backend
   */
  async getAll() {
    try {
      const res = await fetch(`${API_BASE}/queues`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();

      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        return json.data.map((row) => ({
          id: `q-${row.id || row.facility_id}`,
          facilityId: row.facility_id,
          facilityName: row.facility_name || "Fasilitas Kesehatan",
          service: row.category === "Puskesmas" ? "Poli Umum & BPJS" : "Poliklinik Terpadu",
          queueStatus: mapQueueStatus(row.status),
          rawStatus: row.status,
          currentNumber: row.current_number || "A-001",
          currentQueue: row.total_queue ?? 0,
          estimatedWait: `~${row.estimated_wait_minutes || 15} Menit`,
          lastUpdated: row.last_updated,
        }));
      }
      return localQueueData;
    } catch (err) {
      console.warn("[queueService] Menggunakan data antrean lokal (fallback):", err.message);
      return localQueueData;
    }
  },

  /**
   * Mengambil antrean untuk faskes tertentu
   */
  async getByFacilityId(facilityId) {
    try {
      const res = await fetch(`${API_BASE}/queues/${facilityId}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.warn("[queueService] Gagal mengambil antrean faskes:", err.message);
      return null;
    }
  },
};
