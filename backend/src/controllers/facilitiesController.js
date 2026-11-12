import { db } from '../config/db.js';

/**
 * GET /api/facilities
 * Query: ?category=Puskesmas&district=Semarang+Tengah&search=keyword
 */
export async function getAll(req, res) {
  try {
    const { category, district, search } = req.query;
    let query = 'SELECT * FROM facilities WHERE 1=1';
    const args = [];

    if (category && category !== 'Semua') {
      query += ' AND LOWER(category) = LOWER(?)';
      args.push(category);
    }
    if (district && district !== 'Semua') {
      query += ' AND LOWER(district) = LOWER(?)';
      args.push(district);
    }
    if (search) {
      query += ' AND (LOWER(name) LIKE ? OR LOWER(address) LIKE ? OR LOWER(district) LIKE ? OR LOWER(services) LIKE ?)';
      const s = `%${search.toLowerCase()}%`;
      args.push(s, s, s, s);
    }

    query += ' ORDER BY id ASC';

    const result = await db.execute({ sql: query, args });
    const data = result.rows.map((row) => ({
      ...row,
      services: typeof row.services === 'string' ? JSON.parse(row.services || '[]') : (row.services || [])
    }));

    return res.json({ success: true, total: data.length, data });
  } catch (err) {
    console.error('[Facilities Controller] Error:', err);
    return res.status(500).json({ success: false, message: 'Gagal mengambil data fasilitas dari database.' });
  }
}

/**
 * GET /api/facilities/:id
 */
export async function getById(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await db.execute({
      sql: 'SELECT * FROM facilities WHERE id = ?',
      args: [id]
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Fasilitas tidak ditemukan.' });
    }

    const row = result.rows[0];
    const facility = {
      ...row,
      services: typeof row.services === 'string' ? JSON.parse(row.services || '[]') : (row.services || [])
    };

    return res.json({ success: true, data: facility });
  } catch (err) {
    console.error('[Facilities Controller] Error:', err);
    return res.status(500).json({ success: false, message: 'Gagal mengambil data detail fasilitas.' });
  }
}
