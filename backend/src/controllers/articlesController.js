import { db } from '../config/db.js';

/**
 * GET /api/articles
 * Query: ?category=...&featured=true&search=...
 */
export async function getAll(req, res) {
  try {
    const { category, featured, search } = req.query;
    let query = 'SELECT * FROM articles WHERE 1=1';
    const args = [];

    if (category && category !== 'Semua') {
      query += ' AND LOWER(category) = LOWER(?)';
      args.push(category);
    }
    if (featured === 'true') {
      query += ' AND featured = 1';
    }
    if (search) {
      query += ' AND (LOWER(title) LIKE ? OR LOWER(description) LIKE ? OR LOWER(tags) LIKE ?)';
      const s = `%${search.toLowerCase()}%`;
      args.push(s, s, s);
    }

    query += ' ORDER BY id ASC';

    const result = await db.execute({ sql: query, args });
    const data = result.rows.map((row) => ({
      ...row,
      readingTime: row.reading_time,
      featured: Boolean(row.featured),
      tags: typeof row.tags === 'string' ? JSON.parse(row.tags || '[]') : (row.tags || [])
    }));

    return res.json({ success: true, total: data.length, data });
  } catch (err) {
    console.error('[Articles Controller] Error:', err);
    return res.status(500).json({ success: false, message: 'Gagal mengambil artikel dari database.' });
  }
}

/**
 * GET /api/articles/:id
 */
export async function getById(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await db.execute({
      sql: 'SELECT * FROM articles WHERE id = ?',
      args: [id]
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Artikel tidak ditemukan.' });
    }

    const row = result.rows[0];
    const article = {
      ...row,
      readingTime: row.reading_time,
      featured: Boolean(row.featured),
      tags: typeof row.tags === 'string' ? JSON.parse(row.tags || '[]') : (row.tags || [])
    };

    return res.json({ success: true, data: article });
  } catch (err) {
    console.error('[Articles Controller] Error:', err);
    return res.status(500).json({ success: false, message: 'Gagal mengambil data artikel.' });
  }
}
