import { db } from '../config/db.js';

/**
 * GET /api/queues
 * Ambil semua status antrean aktif faskes
 */
export async function getAll(req, res) {
  try {
    const result = await db.execute(`
      SELECT q.*, f.name as facility_name, f.category, f.district
      FROM queues q
      JOIN facilities f ON q.facility_id = f.id
      ORDER BY q.total_queue DESC
    `);

    return res.json({ success: true, total: result.rows.length, data: result.rows });
  } catch (err) {
    console.error('[Queue Controller] Error:', err);
    return res.status(500).json({ success: false, message: 'Gagal mengambil data antrean.' });
  }
}

/**
 * GET /api/queues/:facilityId
 */
export async function getByFacilityId(req, res) {
  try {
    const facilityId = parseInt(req.params.facilityId, 10);
    const result = await db.execute({
      sql: `
        SELECT q.*, f.name as facility_name, f.category, f.district
        FROM queues q
        JOIN facilities f ON q.facility_id = f.id
        WHERE q.facility_id = ?
      `,
      args: [facilityId]
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Data antrean faskes tidak ditemukan.' });
    }

    return res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('[Queue Controller] Error:', err);
    return res.status(500).json({ success: false, message: 'Gagal mengambil data antrean faskes.' });
  }
}

/**
 * PUT /api/queues/:facilityId (Update kondisi antrean oleh petugas faskes / admin)
 */
export async function updateQueue(req, res) {
  try {
    const facilityId = parseInt(req.params.facilityId, 10);
    const { current_number, total_queue, estimated_wait_minutes, status } = req.body;

    await db.execute({
      sql: `
        UPDATE queues
        SET current_number = COALESCE(?, current_number),
            total_queue = COALESCE(?, total_queue),
            estimated_wait_minutes = COALESCE(?, estimated_wait_minutes),
            status = COALESCE(?, status),
            last_updated = CURRENT_TIMESTAMP
        WHERE facility_id = ?
      `,
      args: [current_number, total_queue, estimated_wait_minutes, status, facilityId]
    });

    return res.json({ success: true, message: 'Status antrean berhasil diperbarui.' });
  } catch (err) {
    console.error('[Queue Controller] Error:', err);
    return res.status(500).json({ success: false, message: 'Gagal memperbarui status antrean.' });
  }
}
