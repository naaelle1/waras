import { db } from '../config/db.js';

/**
 * GET /api/reports
 */
export async function getAll(req, res) {
  try {
    const result = await db.execute('SELECT * FROM reports ORDER BY id DESC');
    return res.json({ success: true, total: result.rows.length, data: result.rows });
  } catch (err) {
    console.error('[Reports Controller] Error:', err);
    return res.status(500).json({ success: false, message: 'Gagal mengambil data laporan.' });
  }
}

/**
 * POST /api/reports
 * Menyimpan pengaduan / laporan koreksi data masyarakat ke database
 */
export async function submit(req, res) {
  try {
    const {
      category,
      title,
      description,
      location,
      contact,
      relatedPage,
      related_page,
      specificItem,
      specific_item,
      suggestedCorrection,
      suggested_correction,
      attachment,
      userId,
      user_id
    } = req.body;

    if (!category || !title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Kategori, judul laporan, dan deskripsi masalah wajib diisi.',
      });
    }

    // Format kategori jika dikirimkan sebagai objek
    const cleanCategory =
      typeof category === 'object' && category !== null
        ? category.title || category.name || category.id || 'Laporan Umum'
        : String(category).trim();

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const reportId = `WARAS-REP-${randomNum}`;
    const submittedAt = new Date().toLocaleString('id-ID', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

    const page = relatedPage || related_page || null;
    const item = specificItem || specific_item || null;
    const correction = suggestedCorrection || suggested_correction || null;
    const uid = userId || user_id || null;

    await db.execute({
      sql: `INSERT INTO reports (
              report_id, category, title, description, location, contact,
              related_page, specific_item, suggested_correction, attachment,
              user_id, status, submitted_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Menunggu Peninjauan', ?)`,
      args: [
        reportId,
        cleanCategory,
        title.trim(),
        description.trim(),
        location || null,
        contact || null,
        page,
        item,
        correction,
        attachment || null,
        uid,
        submittedAt
      ]
    });

    const report = {
      reportId,
      category: cleanCategory,
      title: title.trim(),
      description: description.trim(),
      location: location || null,
      contact: contact || null,
      relatedPage: page,
      specificItem: item,
      suggestedCorrection: correction,
      attachment: attachment || null,
      status: 'Menunggu Peninjauan',
      submittedAt,
    };

    console.log(`[Report DB] ${reportId} tersimpan ke database: "${title}"`);

    return res.status(201).json({ success: true, data: report });
  } catch (err) {
    console.error('[Reports Controller] Error:', err);
    return res.status(500).json({ success: false, message: 'Gagal menyimpan laporan ke database.' });
  }
}
