import { articlesData } from "../data/articles";

/**
 * Mock AI Service for WARAS Assistant
 * Simulates intelligent, safe healthcare responses and attaches relevant educational articles.
 */
export const aiService = {
  async sendMessage(userMessage) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 650));

    const text = userMessage.toLowerCase();

    // 1. Symptom Query Handling
    if (
      text.includes("demam") ||
      text.includes("batuk") ||
      text.includes("pusing") ||
      text.includes("flu") ||
      text.includes("sakit") ||
      text.includes("pegal") ||
      text.includes("gejala")
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "symptom_information",
        message:
          "Gejala yang Anda sampaikan (seperti demam atau batuk) dapat memiliki berbagai penyebab, seperti infeksi saluran pernapasan ringan, reaksi imunitas, atau perubahan cuaca. WARAS Assistant tidak memberikan diagnosis medis spesifik. Apabila gejala berlanjut lebih dari 3 hari, memberat, atau disertai sesak napas, disarankan untuk mengonsultasikannya langsung dengan dokter di fasilitas kesehatan terdekat.",
        relatedArticleIds: ["art-1", "art-2"],
      };
    }

    // 2. Facility / Puskesmas Search Query Handling
    if (
      text.includes("puskesmas") ||
      text.includes("rumah sakit") ||
      text.includes("faskes") ||
      text.includes("lokasi") ||
      text.includes("cari") ||
      text.includes("berobat")
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "facility_recommendation",
        message:
          "Untuk penanganan kesehatan langsung di Kota Semarang, Anda dapat mengunjungi Puskesmas terdekat (seperti Puskesmas Pandanaran atau Miroto) untuk pelayanan tingkat pertama, atau Rumah Sakit Umum rujukan. Gunakan fitur Peta Fasilitas Kesehatan WARAS untuk melihat jam operasional dan lokasi persisnya.",
        relatedArticleIds: ["art-2"],
        showFacilityCTA: true,
      };
    }

    // 3. Immunization / Prevention Query Handling
    if (
      text.includes("imunisasi") ||
      text.includes("vaksin") ||
      text.includes("anak") ||
      text.includes("pencegahan")
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "general",
        message:
          "Imunisasi rutin sangat penting untuk membangun ketahanan tubuh, terutama bagi bayi dan anak-anak. Di Kota Semarang, pelayanan imunisasi dasar seperti BCG, DPT, Polio, dan Campak tersedia di seluruh Puskesmas pada hari kerja.",
        relatedArticleIds: ["art-1", "art-3"],
      };
    }

    // 4. Default General Health Response
    return {
      id: `ai-${Date.now()}`,
      sender: "ai",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "general",
      message:
        "Terima kasih telah bertanya kepada WARAS Assistant. Saya dapat membantu Anda memahami informasi seputar kesehatan umum, persiapan ke fasilitas kesehatan, serta artikel edukasi terpercaya untuk warga Kota Semarang. Apa ada hal spesifik yang ingin Anda ketahui lebih lanjut?",
      relatedArticleIds: ["art-1", "art-2", "art-3"],
    };
  },

  getArticlesByIds(ids = []) {
    return articlesData.filter((art) => ids.includes(art.id));
  },
};