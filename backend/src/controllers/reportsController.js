import { db } from '../config/db.js';

/**
 * Controller Manajemen Laporan Warga / Komunitas
 */

/**
 * GET /api/reports
 * Mengambil daftar laporan masyarakat dengan filter status, pencarian, dan paginasi
 */
export async function getAll(req, res) {
  try {
    const {
      status = 'Semua',
      search = '',
      page = 1,
      limit = 20
    } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 20));
    const offset = (pageNum - 1) * limitNum;

    const conditions = [];
    const args = [];

    if (status && status !== 'Semua') {
      // Normalisasi status pencarian (misal 'Menunggu' -> 'Menunggu Peninjauan')
      if (status.toLowerCase().includes('menunggu')) {
        conditions.push("r.status LIKE '%Menunggu%'");
      } else {
        conditions.push('LOWER(r.status) = LOWER(?)');
        args.push(status);
      }
    }

    if (search.trim()) {
      const q = `%${search.trim().toLowerCase()}%`;
      conditions.push('(LOWER(r.title) LIKE ? OR LOWER(r.description) LIKE ? OR LOWER(r.category) LIKE ? OR LOWER(u.name) LIKE ? OR r.report_id LIKE ?)');
      args.push(q, q, q, q, q);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countResult = await db.execute({
      sql: `SELECT COUNT(*) as total 
            FROM reports r 
            LEFT JOIN users u ON r.user_id = u.id 
            ${whereClause}`,
      args
    });
    const total = Number(countResult.rows[0]?.total || 0);

    const dataResult = await db.execute({
      sql: `SELECT r.*, COALESCE(u.name, r.contact, 'Masyarakat') as reporter_name
            FROM reports r
            LEFT JOIN users u ON r.user_id = u.id
            ${whereClause}
            ORDER BY r.id DESC
            LIMIT ? OFFSET ?`,
      args: [...args, limitNum, offset]
    });

    const reports = dataResult.rows.map((row) => ({
      id: row.id,
      reportId: row.report_id,
      category: row.category,
      title: row.title,
      description: row.description,
      location: row.location,
      contact: row.contact,
      reporter: row.reporter_name || 'Warga Semarang',
      relatedPage: row.related_page,
      specificItem: row.specific_item,
      suggestedCorrection: row.suggested_correction,
      attachment: row.attachment,
      status: row.status,
      adminResponse: row.admin_response,
      respondedAt: row.responded_at,
      submittedAt: row.submitted_at || row.created_at,
      date: row.submitted_at ? row.submitted_at.split(' ')[0] : '2026-03-01'
    }));

    return res.json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      limit: limitNum,
      data: reports
    });
  } catch (err) {
    console.error('[Reports Controller getAll]', err);
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

    const result = await db.execute({
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
      id: Number(result.lastInsertRowid),
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

    return res.status(201).json({
      success: true,
      message: 'Laporan berhasil dikirim dan tersimpan di database.',
      data: report,
    });
  } catch (err) {
    console.error('[Reports Controller submit]', err);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server saat menyimpan laporan.',
    });
  }
}

/**
 * PATCH /api/reports/:id/status
 * Memperbarui status laporan oleh Admin ('Menunggu Peninjauan' | 'Diproses' | 'Selesai' | 'Ditolak')
 */
export async function updateStatus(req, res) {
  try {
    const id = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status laporan wajib diisi.' });
    }

    const validStatuses = ['Menunggu Peninjauan', 'Menunggu', 'Diproses', 'Selesai', 'Ditolak'];
    const normalizedStatus = status === 'Menunggu' ? 'Menunggu Peninjauan' : status;

    if (!validStatuses.includes(status) && !validStatuses.includes(normalizedStatus)) {
      return res.status(400).json({ success: false, message: 'Status tidak valid.' });
    }

    // Bisa berdasarkan numeric id atau report_id string
    const result = await db.execute({
      sql: `UPDATE reports 
            SET status = ? 
            WHERE id = ? OR report_id = ?`,
      args: [normalizedStatus, id, id]
    });

    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, message: 'Laporan tidak ditemukan.' });
    }

    return res.json({
      success: true,
      message: `Status laporan berhasil diperbarui menjadi ${normalizedStatus}.`,
      status: normalizedStatus
    });
  } catch (err) {
    console.error('[Reports Controller updateStatus]', err);
    return res.status(500).json({ success: false, message: 'Gagal memperbarui status laporan.' });
  }
}

/**
 * POST /api/reports/:id/respond
 * Menambahkan tanggapan/catatan tindak lanjut dari admin Dinkes
 */
export async function respond(req, res) {
  try {
    const id = req.params.id;
    const { responseText, status = 'Selesai' } = req.body;

    if (!responseText?.trim()) {
      return res.status(400).json({ success: false, message: 'Teks tanggapan wajib diisi.' });
    }

    const now = new Date().toISOString();

    const result = await db.execute({
      sql: `UPDATE reports
            SET admin_response = ?,
                responded_at = ?,
                status = COALESCE(?, status)
            WHERE id = ? OR report_id = ?`,
      args: [responseText.trim(), now, status, id, id]
    });

    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, message: 'Laporan tidak ditemukan.' });
    }

    return res.json({
      success: true,
      message: 'Tanggapan berhasil disimpan.',
      adminResponse: responseText.trim(),
      respondedAt: now,
      status
    });
  } catch (err) {
    console.error('[Reports Controller respond]', err);
    return res.status(500).json({ success: false, message: 'Gagal menyimpan tanggapan laporan.' });
  }
}

/**
 * DELETE /api/reports/:id
 */
export async function deleteReport(req, res) {
  try {
    const id = req.params.id;
    const result = await db.execute({
      sql: 'DELETE FROM reports WHERE id = ? OR report_id = ?',
      args: [id, id]
    });

    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, message: 'Laporan tidak ditemukan.' });
    }

    return res.json({ success: true, message: 'Laporan berhasil dihapus.' });
  } catch (err) {
    console.error('[Reports Controller deleteReport]', err);
    return res.status(500).json({ success: false, message: 'Gagal menghapus laporan.' });
  }
}
