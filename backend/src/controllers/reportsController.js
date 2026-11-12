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
 * Body: { category, title, description, location?, contact? }
 */
export async function submit(req, res) {
  try {
    const { category, title, description, location, contact } = req.body;

    if (!category || !title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Field category, title, dan description wajib diisi.',
      });
    }

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const reportId = `WARAS-REP-${randomNum}`;
    const submittedAt = new Date().toLocaleString('id-ID', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

    await db.execute({
      sql: `INSERT INTO reports (report_id, category, title, description, location, contact, status, submitted_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        reportId,
        category,
        title,
        description,
        location || null,
        contact || null,
        'Menunggu Peninjauan',
        submittedAt
      ]
    });

    const report = {
      reportId,
      category,
      title,
      description,
      location: location || null,
      contact: contact || null,
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
