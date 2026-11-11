import { articles } from "../data/articles";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

/**
 * AI Service untuk WARAS Assistant — terhubung ke backend Gemini API.
 * Fallback ke mock response jika backend tidak dapat dijangkau.
 */
export const aiService = {
  /**
   * Kirim pesan ke backend /api/ai/chat
   * @param {string} userMessage
   * @param {Array}  history  - riwayat pesan untuk konteks multi-turn
   */
  async sendMessage(userMessage, history = []) {
    try {
      const res = await fetch(`${API_BASE}/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.message || "Respons tidak valid dari server.");
      }

      return json.data;
    } catch (err) {
      console.error("[aiService] Gagal menghubungi backend, menggunakan fallback:", err.message);
      return aiService._fallback(userMessage);
    }
  },

  /**
   * Fallback mock — digunakan saat backend tidak tersedia
   */
  _fallback(userMessage) {
    const text = userMessage.toLowerCase();
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    if (["demam","batuk","pusing","flu","sakit","pegal","gejala"].some((k) => text.includes(k))) {
      return { id: `ai-${Date.now()}`, sender: "ai", timestamp, type: "symptom_information", message: "Gejala yang Anda sampaikan dapat memiliki berbagai penyebab. WARAS Assistant tidak memberikan diagnosis medis. Apabila gejala berlanjut lebih dari 3 hari atau memberat, segera konsultasikan ke dokter di fasilitas kesehatan terdekat.", relatedArticleIds: [1, 2, 6] };
    }
    if (["puskesmas","rumah sakit","faskes","lokasi","cari","berobat"].some((k) => text.includes(k))) {
      return { id: `ai-${Date.now()}`, sender: "ai", timestamp, type: "facility_recommendation", message: "Gunakan fitur Peta Fasilitas Kesehatan WARAS untuk menemukan puskesmas atau rumah sakit terdekat di Kota Semarang.", relatedArticleIds: [2], showFacilityCTA: true };
    }
    if (["imunisasi","vaksin","anak","pencegahan"].some((k) => text.includes(k))) {
      return { id: `ai-${Date.now()}`, sender: "ai", timestamp, type: "general", message: "Imunisasi rutin tersedia di seluruh Puskesmas Kota Semarang pada hari kerja.", relatedArticleIds: [1, 3] };
    }
    return { id: `ai-${Date.now()}`, sender: "ai", timestamp, type: "general", message: "Saat ini WARAS Assistant tidak dapat terhubung ke server. Silakan coba beberapa saat lagi.", relatedArticleIds: [] };
  },

  getArticlesByIds(ids = []) {
    return articles.filter((art) => ids.includes(art.id));
  },
};