import { db } from '../config/db.js';

/**
 * Controller Istilah Medis (WARAS Dictionary)
 */

export async function getTerms(req, res) {
  try {
    const {
      search = '',
      letter = '',
      category = '',
      page = 1,
      limit = 24
    } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 24));
    const offset = (pageNum - 1) * limitNum;

    const conditions = [];
    const args = [];

    if (letter && letter !== 'SEMUA') {
      conditions.push('(first_letter = ? OR term LIKE ?)');
      args.push(letter.toUpperCase(), `${letter}%`);
    }

    if (category && category !== 'Semua Kategori') {
      conditions.push('category = ?');
      args.push(category);
    }

    if (search.trim()) {
      const q = `%${search.trim()}%`;
      conditions.push('(term LIKE ? OR definition LIKE ? OR category LIKE ?)');
      args.push(q, q, q);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Hitung total data
    const countResult = await db.execute({
      sql: `SELECT COUNT(*) as total FROM medical_terms ${whereClause}`,
      args
    });
    const total = Number(countResult.rows[0]?.total || 0);

    // Ambil data terpaginasi
    const queryArgs = [...args, limitNum, offset];
    const dataResult = await db.execute({
      sql: `SELECT id, term, category, first_letter as firstLetter, definition
            FROM medical_terms
            ${whereClause}
            ORDER BY term ASC
            LIMIT ? OFFSET ?`,
      args: queryArgs
    });

    return res.json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      limit: limitNum,
      data: dataResult.rows
    });
  } catch (error) {
    console.error('[termsController.getTerms]', error);
    return res.status(500).json({ success: false, message: 'Gagal memuat istilah medis.' });
  }
}

export async function getTermById(req, res) {
  try {
    const { id } = req.params;
    const result = await db.execute({
      sql: `SELECT id, term, category, first_letter as firstLetter, definition
            FROM medical_terms WHERE id = ?`,
      args: [id]
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Istilah medis tidak ditemukan.' });
    }

    return res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('[termsController.getTermById]', error);
    return res.status(500).json({ success: false, message: 'Gagal mengambil detail istilah.' });
  }
}

export async function getCategories(req, res) {
  try {
    const result = await db.execute(`
      SELECT category, COUNT(*) as count
      FROM medical_terms
      GROUP BY category
      ORDER BY count DESC
    `);

    return res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('[termsController.getCategories]', error);
    return res.status(500).json({ success: false, message: 'Gagal memuat daftar kategori.' });
  }
}
