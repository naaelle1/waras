import { GoogleGenAI } from '@google/genai';
import { getSystemInstruction, AI_CONFIG } from '../config/aiInstructions.js';

let aiClient = null;

function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY belum dikonfigurasi di file .env');
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: { timeout: 10000 },
    });
  }
  return aiClient;
}

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
    const primaryModel = process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite';

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

    const ai = getAiClient();

    const generateOptions = {
      systemInstruction: getSystemInstruction(),
      temperature: AI_CONFIG.temperature,
      topP: AI_CONFIG.topP,
      maxOutputTokens: AI_CONFIG.maxOutputTokens,
      thinkingConfig: AI_CONFIG.thinkingConfig,
    };

    let response;
    try {
      response = await ai.models.generateContent({
        model: primaryModel,
        contents,
        config: generateOptions,
      });
    } catch (modelErr) {
      // Fallback model jika primary model sedang mengalami lonjakan beban sesaat
      console.warn(`[AI Controller] Model ${primaryModel} gagal, mencoba fallback:`, modelErr.message);
      const fallbackModel = primaryModel === 'gemini-3.1-flash-lite' ? 'gemini-3.5-flash-lite' : 'gemini-3.1-flash-lite';
      response = await ai.models.generateContent({
        model: fallbackModel,
        contents,
        config: generateOptions,
      });
    }

    let reply = response.text?.trim() ?? 'Maaf, saya tidak dapat memproses pertanyaan Anda saat ini.';

    // Rapikan simbol markdown: perbaiki double hash (### ### -> ###) dan spasi berlebih
    reply = reply
      .replace(/^#{1,6}\s+#{1,6}\s*/gm, '### ')
      .replace(/\n{3,}/g, '\n\n')
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
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
}

/**
 * Pre-warm connection to Gemini API to eliminate cold-start TLS latency
 */
export async function warmup() {
  try {
    const ai = getAiClient();
    const model = process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite';
    await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: 'ping' }] }],
      config: { maxOutputTokens: 5, thinkingConfig: { thinkingLevel: 'MINIMAL' } },
    });
    console.log('⚡ Koneksi AI Gemini berhasil dipanaskan (warm up ready)');
  } catch (_err) {
    // Ignore warmup errors
  }
}
