import { GoogleGenAI } from '@google/genai';
import { getSystemInstruction, AI_CONFIG } from '../config/aiInstructions.js';
import { db } from '../config/db.js';
import { authenticateUser } from '../utils/auth.js';

let aiClient = null;

function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY belum dikonfigurasi di file .env');
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: { timeout: 25000 },
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
 * Pastikan percakapan awal (starter) tersedia jika tabel ai_conversations masih kosong
 */
async function ensureDefaultConversations() {
  const check = await db.execute('SELECT COUNT(*) as count FROM ai_conversations');
  if (check.rows[0].count > 0) return;

  const defaults = [
    {
      id: 'conv-1',
      title: 'Demam & Batuk',
      is_pinned: 0,
      category: 'today',
      messages: [
        {
          sender: 'user',
          message: 'Halo dokter, anak saya demam 38 derajat disertai batuk sejak kemarin malam. Langkah awal apa yang harus saya lakukan?'
        },
        {
          sender: 'ai',
          message: 'Halo! Untuk demam 38°C pada anak, langkah awal yang aman adalah:\n\n1. Pastikan anak terhidrasi dengan baik (beri air hangat, ASI, atau cairan elektrolit).\n2. Kenakan pakaian yang tipis dan nyaman, jangan diselimuti terlalu tebal.\n3. Kompres hangat di area dahi atau lipatan ketiak.\n4. Apabila demam menetap lebih dari 3 hari, timbul sesak napas, atau anak tampak lemas tidak mau minum, segera periksakan ke Puskesmas atau faskes terdekat di Kota Semarang.',
          type: 'symptom_information',
          relatedArticleIds: [2],
          showFacilityCTA: true
        }
      ]
    },
    {
      id: 'conv-2',
      title: 'Informasi Imunisasi',
      is_pinned: 0,
      category: 'today',
      messages: [
        {
          sender: 'user',
          message: 'Kapan jadwal imunisasi polio dan DPT di Puskesmas Pandanaran?'
        },
        {
          sender: 'ai',
          message: 'Layanan imunisasi rutin bayi dan balita di Puskesmas Pandanaran Kota Semarang biasanya diselenggarakan setiap hari Selasa dan Kamis mulai pukul 08.00 - 11.30 WIB.\n\nDisarankan membawa Buku KIA/KMS dan datang lebih awal untuk mengambil nomor antrean poli KIA.',
          type: 'general',
          relatedArticleIds: [6]
        }
      ]
    },
    {
      id: 'conv-3',
      title: 'Rujukan BPJS ke RS',
      is_pinned: 0,
      category: 'yesterday',
      messages: [
        {
          sender: 'user',
          message: 'Bagaimana alur rujukan berjenjang BPJS dari faskes pertama ke RS Kariadi?'
        },
        {
          sender: 'ai',
          message: 'Berikut alur rujukan berjenjang BPJS Kesehatan di Kota Semarang:\n\n1. Kunjungi Faskes Tingkat Pertama (FKTP) tempat Anda terdaftar (Puskesmas / Klinik Pratama).\n2. Lakukan pemeriksaan dengan dokter FKTP. Apabila membutuhkan penanganan spesialis, dokter akan menerbitkan Surat Rujukan Online (V-Claim).\n3. Bawa KTP, Kartu BPJS/KIS, dan Surat Rujukan ke RSUP Dr. Kariadi sesuai jadwal poli yang ditentukan.',
          type: 'facility_recommendation',
          showFacilityCTA: true
        }
      ]
    }
  ];

  for (const c of defaults) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO ai_conversations (id, title, is_pinned, category)
            VALUES (?, ?, ?, ?)`,
      args: [c.id, c.title, c.is_pinned, c.category]
    });

    for (const m of c.messages) {
      await db.execute({
        sql: `INSERT INTO chat_history (session_id, sender, message, message_type, related_article_ids, show_facility_cta)
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [
          c.id,
          m.sender,
          m.message,
          m.type || 'general',
          JSON.stringify(m.relatedArticleIds || []),
          m.showFacilityCTA ? 1 : 0
        ]
      });
    }
  }
}

/**
 * GET /api/ai/conversations
 * Mengambil daftar sesi percakapan sesuai akun yang sedang login (user_id)
 */
export async function getConversations(req, res) {
  try {
    const user = authenticateUser(req);
    let result;

    if (user && user.id) {
      // Ambil percakapan khusus milik akun ini
      result = await db.execute({
        sql: `
          SELECT id, title, is_pinned, category, created_at, updated_at
          FROM ai_conversations
          WHERE user_id = ?
          ORDER BY is_pinned DESC, updated_at DESC
        `,
        args: [user.id]
      });
    } else {
      // Untuk sesi tamu / tanpa token autentikasi
      result = await db.execute(`
        SELECT id, title, is_pinned, category, created_at, updated_at
        FROM ai_conversations
        WHERE user_id IS NULL
        ORDER BY is_pinned DESC, updated_at DESC
        LIMIT 5
      `);
    }

    const conversations = result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      isPinned: Boolean(row.is_pinned),
      category: row.category || 'today',
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));

    return res.json({ success: true, data: conversations });
  } catch (err) {
    console.error('[AI getConversations Error]', err);
    return res.status(500).json({ success: false, message: 'Gagal memuat daftar percakapan.' });
  }
}

/**
 * POST /api/ai/conversations
 * Membuat sesi percakapan baru di database yang terikat ke user_id
 */
export async function createConversation(req, res) {
  try {
    const user = authenticateUser(req);
    const userId = user?.id || null;
    const { id, title = 'Percakapan Baru', isPinned = false, category = 'today' } = req.body;
    const conversationId = id || `conv-${Date.now()}`;

    await db.execute({
      sql: `INSERT OR IGNORE INTO ai_conversations (id, user_id, title, is_pinned, category)
            VALUES (?, ?, ?, ?, ?)`,
      args: [conversationId, userId, title, isPinned ? 1 : 0, category]
    });

    return res.status(201).json({
      success: true,
      data: {
        id: conversationId,
        title,
        isPinned,
        category,
        messages: [],
        updatedAt: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error('[AI createConversation Error]', err);
    return res.status(500).json({ success: false, message: 'Gagal membuat sesi percakapan baru.' });
  }
}

/**
 * GET /api/ai/conversations/:id/messages
 * Mengambil seluruh riwayat pesan untuk percakapan tertentu (dengan verifikasi hak akses akun)
 */
export async function getMessages(req, res) {
  try {
    const { id } = req.params;
    const user = authenticateUser(req);

    // Cek kepemilikan percakapan
    const convCheck = await db.execute({
      sql: 'SELECT user_id FROM ai_conversations WHERE id = ?',
      args: [id]
    });

    if (convCheck.rows.length > 0) {
      const convUserId = convCheck.rows[0].user_id;
      // Jika percakapan memiliki user_id, hanya akun pemilik atau admin yang berhak membaca
      if (convUserId && (!user || (user.id !== convUserId && user.role !== 'admin'))) {
        return res.status(403).json({
          success: false,
          message: 'Anda tidak memiliki hak akses untuk membaca riwayat percakapan ini.'
        });
      }
    }

    const result = await db.execute({
      sql: `SELECT id, session_id, sender, message, message_type, related_article_ids, show_facility_cta, attachment_data, created_at
            FROM chat_history
            WHERE session_id = ?
            ORDER BY id ASC`,
      args: [id]
    });

    const messages = result.rows.map((row) => {
      let relatedArticleIds = [];
      try {
        if (row.related_article_ids) {
          relatedArticleIds = JSON.parse(row.related_article_ids);
        }
      } catch (_e) {
        relatedArticleIds = [];
      }

      let attachment = null;
      try {
        if (row.attachment_data) {
          attachment = JSON.parse(row.attachment_data);
        }
      } catch (_e) {
        attachment = null;
      }

      let timestamp = "";
      try {
        const dateStr = typeof row.created_at === "string" ? row.created_at.replace(" ", "T") : row.created_at;
        timestamp = new Date(dateStr).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
      } catch (_e) {
        timestamp = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
      }

      return {
        id: `msg-${row.id}`,
        sender: row.sender,
        message: row.message,
        timestamp,
        type: row.message_type || 'general',
        relatedArticleIds,
        showFacilityCTA: Boolean(row.show_facility_cta),
        attachment
      };
    });

    return res.json({ success: true, data: messages });
  } catch (err) {
    console.error('[AI getMessages Error]', err);
    return res.status(500).json({ success: false, message: 'Gagal memuat riwayat pesan.' });
  }
}

/**
 * PATCH /api/ai/conversations/:id
 * Mengubah status pin atau judul percakapan milik akun sendiri
 */
export async function updateConversation(req, res) {
  try {
    const { id } = req.params;
    const user = authenticateUser(req);
    const { title, isPinned } = req.body;

    const fields = [];
    const args = [];

    if (title !== undefined) {
      fields.push('title = ?');
      args.push(title);
    }
    if (isPinned !== undefined) {
      fields.push('is_pinned = ?');
      args.push(isPinned ? 1 : 0);
    }

    if (fields.length === 0) {
      return res.status(400).json({ success: false, message: 'Tidak ada data yang diperbarui.' });
    }

    fields.push('updated_at = CURRENT_TIMESTAMP');
    let whereClause = 'WHERE id = ?';
    args.push(id);

    if (user && user.id && user.role !== 'admin') {
      whereClause += ' AND (user_id = ? OR user_id IS NULL)';
      args.push(user.id);
    }

    await db.execute({
      sql: `UPDATE ai_conversations SET ${fields.join(', ')} ${whereClause}`,
      args
    });

    return res.json({ success: true, message: 'Percakapan berhasil diperbarui.' });
  } catch (err) {
    console.error('[AI updateConversation Error]', err);
    return res.status(500).json({ success: false, message: 'Gagal memperbarui percakapan.' });
  }
}

/**
 * DELETE /api/ai/conversations/:id
 * Menghapus sesi percakapan beserta seluruh pesannya milik akun sendiri
 */
export async function deleteConversation(req, res) {
  try {
    const { id } = req.params;
    const user = authenticateUser(req);

    let whereClause = 'WHERE id = ?';
    const args = [id];

    if (user && user.id && user.role !== 'admin') {
      whereClause += ' AND (user_id = ? OR user_id IS NULL)';
      args.push(user.id);
    }

    await db.execute({
      sql: `DELETE FROM ai_conversations ${whereClause}`,
      args
    });
    await db.execute({
      sql: 'DELETE FROM chat_history WHERE session_id = ?',
      args: [id]
    });

    return res.json({ success: true, message: 'Percakapan berhasil dihapus.' });
  } catch (err) {
    console.error('[AI deleteConversation Error]', err);
    return res.status(500).json({ success: false, message: 'Gagal menghapus percakapan.' });
  }
}

/**
 * POST /api/ai/chat
 * Body: { message: string, history?: Array<{role, parts}>, sessionId?: string, attachment?: { mimeType: string, data: string, name?: string } }
 */
export async function chat(req, res) {
  const { message, history = [], sessionId, attachment } = req.body;
  const user = authenticateUser(req);
  const userId = user?.id || null;

  let cleanMessage = (message && typeof message === 'string') ? message.trim() : '';
  if (!cleanMessage && attachment) {
    cleanMessage = 'Tolong periksa foto keluhan kesehatan ini dan berikan informasi atau sarannya.';
  }

  if (!cleanMessage && !attachment) {
    return res.status(400).json({ success: false, message: 'Pesan atau foto keluhan tidak boleh kosong.' });
  }

  // Siapkan attachment data jika ada
  let attachmentJson = null;
  let hasValidAttachment = false;
  if (attachment && attachment.data && attachment.mimeType) {
    hasValidAttachment = true;
    attachmentJson = JSON.stringify({
      mimeType: attachment.mimeType,
      data: attachment.data,
      name: attachment.name || 'foto-keluhan.jpg'
    });
  }

  // Simpan pesan user ke database jika sessionId disertakan (terikat ke userId)
  if (sessionId) {
    try {
      await db.execute({
        sql: `INSERT OR IGNORE INTO ai_conversations (id, user_id, title, is_pinned, category)
              VALUES (?, ?, 'Percakapan Baru', 0, 'today')`,
        args: [sessionId, userId]
      });

      await db.execute({
        sql: `INSERT INTO chat_history (session_id, sender, message, message_type, attachment_data)
              VALUES (?, 'user', ?, 'general', ?)`,
        args: [sessionId, cleanMessage, attachmentJson]
      });
    } catch (dbErr) {
      console.warn('[AI DB Chat Save Warning - User]', dbErr.message);
    }
  }

  try {
    const primaryModel = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';

    // Format parts untuk pesan user saat ini (teks + gambar jika ada)
    const currentUserParts = [];
    if (hasValidAttachment) {
      currentUserParts.push({
        inlineData: {
          mimeType: attachment.mimeType,
          data: attachment.data,
        }
      });
    }
    currentUserParts.push({ text: cleanMessage });

    // Format riwayat chat untuk Gemini
    const contents = [
      ...history
        .filter((h) => h.parts && typeof h.parts === 'string')
        .map((h) => ({
          role: h.role === 'ai' || h.role === 'model' ? 'model' : 'user',
          parts: [{ text: h.parts }],
        })),
      { role: 'user', parts: currentUserParts },
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
      console.warn(`[AI Controller] Model ${primaryModel} gagal, mencoba fallback:`, modelErr.message);
      const fallbackModel = primaryModel === 'gemini-3.5-flash-lite' ? 'gemini-3.1-flash-lite' : 'gemini-3.5-flash-lite';
      response = await ai.models.generateContent({
        model: fallbackModel,
        contents,
        config: generateOptions,
      });
    }

    let reply = response.text?.trim() ?? 'Maaf, saya tidak dapat memproses pertanyaan Anda saat ini.';

    // Rapikan simbol markdown
    reply = reply
      .replace(/^#{1,6}\s+#{1,6}\s*/gm, '### ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    const metadata = getRelatedMetadata(cleanMessage);
    const aiMessageId = `ai-${Date.now()}`;
    const timestampStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    // Simpan respons AI ke database
    if (sessionId) {
      try {
        await db.execute({
          sql: `INSERT INTO chat_history (session_id, sender, message, message_type, related_article_ids, show_facility_cta)
                VALUES (?, 'ai', ?, 'general', ?, ?)`,
          args: [
            sessionId,
            reply,
            JSON.stringify(metadata.relatedArticleIds || []),
            metadata.showFacilityCTA ? 1 : 0
          ]
        });

        // Update waktu aktif, kepemilikan akun, dan perbarui judul jika masih "Percakapan Baru"
        const titleSnippet = cleanMessage.length > 28 ? cleanMessage.slice(0, 28) + '...' : cleanMessage;
        await db.execute({
          sql: `UPDATE ai_conversations
                SET updated_at = CURRENT_TIMESTAMP,
                    user_id = COALESCE(user_id, ?),
                    title = CASE WHEN title = 'Percakapan Baru' THEN ? ELSE title END
                WHERE id = ?`,
          args: [userId, titleSnippet, sessionId]
        });
      } catch (dbErr) {
        console.warn('[AI DB Chat Save Warning - AI Response]', dbErr.message);
      }
    }

    return res.json({
      success: true,
      data: {
        id: aiMessageId,
        sender: 'ai',
        message: reply,
        timestamp: timestampStr,
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
 * Pre-warm connection to Gemini API
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
