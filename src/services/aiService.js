import { articles } from "../data/articles";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

/**
 * AI Service untuk WARAS Assistant — terhubung ke backend Gemini API dan Turso DB.
 */
export const aiService = {
  /**
   * Kirim pesan ke backend /api/ai/chat dan simpan di Turso DB
   * @param {string} userMessage
   * @param {Array}  history  - riwayat pesan untuk konteks multi-turn
   * @param {string} sessionId - ID sesi percakapan
   */
  async sendMessage(userMessage, history = [], sessionId = null) {
    const tryFetch = async () => {
      const res = await fetch(`${API_BASE}/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history, sessionId }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.message || "Respons tidak valid dari server.");
      }
      return json.data;
    };

    try {
      return await tryFetch();
    } catch (err) {
      console.warn("[aiService] Percobaan pertama gagal, mencoba kembali:", err.message);
      try {
        await new Promise((r) => setTimeout(r, 1000));
        return await tryFetch();
      } catch (retryErr) {
        console.error("[aiService] Gagal menghubungi backend setelah retry, menggunakan fallback:", retryErr.message);
        return aiService._fallback(userMessage);
      }
    }
  },

  /**
   * Mengambil daftar seluruh sesi percakapan dari database
   */
  async getConversations() {
    try {
      const res = await fetch(`${API_BASE}/ai/conversations`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      console.warn("[aiService] Gagal memuat percakapan dari DB, menggunakan fallback lokal:", err.message);
      return [
        {
          id: "conv-1",
          title: "Demam & Batuk",
          category: "today",
          isPinned: false,
          messages: [],
          updatedAt: new Date().toISOString()
        },
        {
          id: "conv-2",
          title: "Informasi Imunisasi",
          category: "today",
          isPinned: false,
          messages: [],
          updatedAt: new Date().toISOString()
        },
        {
          id: "conv-3",
          title: "Rujukan BPJS ke RS",
          category: "yesterday",
          isPinned: true,
          messages: [],
          updatedAt: new Date(Date.now() - 86400000).toISOString()
        }
      ];
    }
  },

  /**
   * Mengambil riwayat pesan dari suatu percakapan
   */
  async getMessages(conversationId) {
    try {
      const res = await fetch(`${API_BASE}/ai/conversations/${conversationId}/messages`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      console.warn("[aiService] Gagal mengambil riwayat pesan:", err.message);
      return [];
    }
  },

  /**
   * Membuat sesi percakapan baru di database
   */
  async createConversation(data = {}) {
    try {
      const res = await fetch(`${API_BASE}/ai/conversations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.warn("[aiService] Gagal membuat percakapan di DB:", err.message);
      return {
        id: data.id || `conv-${Date.now()}`,
        title: data.title || "Percakapan Baru",
        category: data.category || "today",
        isPinned: false,
        messages: [],
        updatedAt: new Date().toISOString()
      };
    }
  },

  /**
   * Memperbarui sesi percakapan (pin / ubah judul)
   */
  async updateConversation(id, updates = {}) {
    try {
      const res = await fetch(`${API_BASE}/ai/conversations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      return res.ok;
    } catch (err) {
      console.warn("[aiService] Gagal memperbarui percakapan:", err.message);
      return false;
    }
  },

  /**
   * Menghapus sesi percakapan dari database
   */
  async deleteConversation(id) {
    try {
      const res = await fetch(`${API_BASE}/ai/conversations/${id}`, {
        method: "DELETE",
      });
      return res.ok;
    } catch (err) {
      console.warn("[aiService] Gagal menghapus percakapan:", err.message);
      return false;
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
