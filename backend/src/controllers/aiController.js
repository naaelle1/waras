import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `Kamu adalah WARAS Assistant, asisten kesehatan digital resmi untuk warga Kota Semarang.
Tugasmu adalah memberikan informasi kesehatan umum yang akurat, mudah dipahami, dan bermanfaat — BUKAN mendiagnosis penyakit.

Panduan respons:
- Gunakan Bahasa Indonesia yang ramah, lugas, dan empatik.
- Jika pengguna menyebutkan gejala, jelaskan secara umum dan sarankan konsultasi ke dokter atau puskesmas terdekat.
- Untuk pertanyaan tentang fasilitas kesehatan di Semarang, arahkan ke fitur Peta Fasilitas WARAS.
- Jangan memberikan dosis obat spesifik atau diagnosis medis definitif.
- Jawaban singkat dan to-the-point (maks 3–4 kalimat kecuali diperlukan lebih).
- Akhiri dengan kalimat penutup yang mendorong pengguna untuk bertindak (konsultasi dokter, cek fasilitas, dll.).`;

/**
 * POST /api/ai/chat
 * Body: { message: string, history?: Array<{role, parts}> }
 */
export async function chat(req, res) {
  const { message, history = [] } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ success: false, message: 'Pesan tidak boleh kosong.' });
  }

  try {
    const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

    // Build conversation history for multi-turn context
    const contents = [
      ...history.map((h) => ({
        role: h.role,
        parts: [{ text: h.parts }],
      })),
      { role: 'user', parts: [{ text: message.trim() }] },
    ];

    const response = await ai.models.generateContent({
      model,
      systemInstruction: SYSTEM_INSTRUCTION,
      contents,
    });

    const reply = response.text?.trim() ?? 'Maaf, saya tidak dapat memproses pertanyaan Anda saat ini.';

    return res.json({
      success: true,
      data: {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        message: reply,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        type: 'general',
      },
    });
  } catch (err) {
    console.error('[AI Controller Error]', err);
    return res.status(502).json({
      success: false,
      message: 'Gagal menghubungi layanan AI. Silakan coba lagi.',
    });
  }
}
