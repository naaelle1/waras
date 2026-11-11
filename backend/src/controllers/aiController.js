import { GoogleGenAI } from '@google/genai';
import { getSystemInstruction, AI_CONFIG } from '../config/aiInstructions.js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function getRelatedMetadata(text) {
  const t = text.toLowerCase();
  const relatedArticleIds = [];
  let showFacilityCTA = false;

  if (t.includes('diabetes') || t.includes('gula darah') || t.includes('kencing manis')) {
    relatedArticleIds.push(1);
  }
  if (t.includes('demam') || t.includes('dbd') || t.includes('batuk') || t.includes('flu') || t.includes('trombosit')) {
    relatedArticleIds.push(2);
  }
  if (t.includes('stress') || t.includes('stres') || t.includes('burnout') || t.includes('lelah') || t.includes('mental')) {
    relatedArticleIds.push(3);
  }
  if (t.includes('lambung') || t.includes('gerd') || t.includes('maag') || t.includes('asam')) {
    relatedArticleIds.push(4);
  }
  if (t.includes('olahraga') || t.includes('stamina') || t.includes('pola hidup') || t.includes('sehat')) {
    relatedArticleIds.push(5);
  }
  if (t.includes('imunisasi') || t.includes('vaksin') || t.includes('anak') || t.includes('bayi')) {
    relatedArticleIds.push(6);
  }

  if (
    t.includes('puskesmas') ||
    t.includes('rumah sakit') ||
    t.includes('rs') ||
    t.includes('faskes') ||
    t.includes('dokter') ||
    t.includes('klinik') ||
    t.includes('lokasi') ||
    t.includes('berobat') ||
    t.includes('periksa')
  ) {
    showFacilityCTA = true;
  }

  return { relatedArticleIds, showFacilityCTA };
}

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
    const model = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';

    // Format riwayat chat untuk Gemini
    const contents = [
      ...history
        .filter((h) => h.parts && typeof h.parts === 'string')
        .map((h) => ({
          role: h.role === 'ai' || h.role === 'model' ? 'model' : 'user',
          parts: [{ text: h.parts }],
        })),
      { role: 'user', parts: [{ text: message.trim() }] },
    ];

    // Panggil Gemini dengan konfigurasi instruksi dan guardrails WARAS AI
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: getSystemInstruction(),
        temperature: AI_CONFIG.temperature,
        topP: AI_CONFIG.topP,
        maxOutputTokens: AI_CONFIG.maxOutputTokens,
      },
    });

    let reply = response.text?.trim() ?? 'Maaf, saya tidak dapat memproses pertanyaan Anda saat ini.';

    // Bersihkan simbol-simbol markdown yang tidak diperlukan agar tampilan chat rapi
    reply = reply
      .replace(/^#{1,6}\s*/gm, '') // Hapus header ###
      .replace(/^[-*_]{3,}\s*$/gm, '') // Hapus garis horizontal ---
      .replace(/\n{3,}/g, '\n\n') // Rapikan spasi baris berlebih
      .trim();

    const metadata = getRelatedMetadata(message);

    return res.json({
      success: true,
      data: {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        message: reply,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        type: 'general',
        relatedArticleIds: metadata.relatedArticleIds,
        showFacilityCTA: metadata.showFacilityCTA,
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
