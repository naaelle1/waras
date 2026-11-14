import { db } from '../config/db.js';

/**
 * Controller Manajemen Pengguna (Admin Portal)
 */

/**
 * GET /api/users
 * Mengambil daftar pengguna terdaftar dengan fitur pencarian, filter status, dan paginasi
 */
export async function getAllUsers(req, res) {
  try {
    const {
      search = '',
      status = 'Semua',
      page = 1,
      limit = 10
    } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
    const offset = (pageNum - 1) * limitNum;

    const conditions = [];
    const args = [];

    if (status && status !== 'Semua') {
      conditions.push('LOWER(status) = LOWER(?)');
      args.push(status);
    }

    if (search.trim()) {
      const q = `%${search.trim().toLowerCase()}%`;
      conditions.push('(LOWER(name) LIKE ? OR LOWER(email) LIKE ? OR nik LIKE ? OR phone LIKE ?)');
      args.push(q, q, q, q);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Hitung total pengguna yang cocok
    const countResult = await db.execute({
      sql: `SELECT COUNT(*) as total FROM users ${whereClause}`,
      args
    });
    const total = Number(countResult.rows[0]?.total || 0);

    // Ambil data pengguna aman (tanpa password_hash)
    const dataResult = await db.execute({
      sql: `SELECT id, name, email, nik, phone, role, status,
                   address, district, bpjs_number as bpjsNumber,
                   bpjs_status as bpjsStatus, created_at as registered
            FROM users
            ${whereClause}
            ORDER BY id DESC
            LIMIT ? OFFSET ?`,
      args: [...args, limitNum, offset]
    });

    const users = dataResult.rows.map((u) => ({
      ...u,
      registered: u.registered ? u.registered.split(' ')[0] : '2026-01-01'
    }));

    return res.json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      limit: limitNum,
      data: users
    });
  } catch (err) {
    console.error('[Users Controller getAllUsers]', err);
    return res.status(500).json({ success: false, message: 'Gagal mengambil data pengguna.' });
  }
}

/**
 * GET /api/users/:id
 */
export async function getUserById(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await db.execute({
      sql: `SELECT id, name, email, nik, phone, role, status,
                   address, district, bpjs_number as bpjsNumber,
                   bpjs_status as bpjsStatus, created_at as registered
            FROM users WHERE id = ? LIMIT 1`,
      args: [id]
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan.' });
    }

    return res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('[Users Controller getUserById]', err);
    return res.status(500).json({ success: false, message: 'Gagal mengambil detail pengguna.' });
  }
}

/**
 * PATCH /api/users/:id/status
 * Toggle atau update status pengguna ('Aktif' | 'Nonaktif')
 */
export async function updateUserStatus(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;

    // Lindungi akun administrator utama agar tidak dinonaktifkan
    const userCheck = await db.execute({
      sql: 'SELECT id, role, email FROM users WHERE id = ? LIMIT 1',
      args: [id]
    });

    if (userCheck.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan.' });
    }

    const targetUser = userCheck.rows[0];
    if (targetUser.role === 'admin' && status === 'Nonaktif') {
      return res.status(400).json({
        success: false,
        message: 'Akun Administrator tidak dapat dinonaktifkan untuk menjaga akses sistem.'
      });
    }

    const newStatus = status === 'Nonaktif' ? 'Nonaktif' : 'Aktif';

    await db.execute({
      sql: 'UPDATE users SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      args: [newStatus, id]
    });

    return res.json({
      success: true,
      message: `Status akun pengguna berhasil diubah menjadi ${newStatus}.`,
      status: newStatus
    });
  } catch (err) {
    console.error('[Users Controller updateUserStatus]', err);
    return res.status(500).json({ success: false, message: 'Gagal memperbarui status pengguna.' });
  }
}

/**
 * DELETE /api/users/:id
 * Menghapus akun pengguna dari database
 */
export async function deleteUser(req, res) {
  try {
    const id = parseInt(req.params.id, 10);

    const userCheck = await db.execute({
      sql: 'SELECT id, role, email FROM users WHERE id = ? LIMIT 1',
      args: [id]
    });

    if (userCheck.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan.' });
    }

    if (userCheck.rows[0].role === 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Akun Administrator utama tidak dapat dihapus.'
      });
    }

    await db.execute({
      sql: 'DELETE FROM users WHERE id = ?',
      args: [id]
    });

    return res.json({
      success: true,
      message: 'Akun pengguna berhasil dihapus dari sistem.'
    });
  } catch (err) {
    console.error('[Users Controller deleteUser]', err);
    return res.status(500).json({ success: false, message: 'Gagal menghapus pengguna.' });
  }
}
