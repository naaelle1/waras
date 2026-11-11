import { facilities } from '../data/facilities.js';

/**
 * GET /api/facilities
 * Query: ?category=Puskesmas&district=Semarang+Tengah&search=keyword
 */
export function getAll(req, res) {
  let results = [...facilities];

  const { category, district, search } = req.query;

  if (category) {
    results = results.filter((f) => f.category.toLowerCase() === category.toLowerCase());
  }
  if (district) {
    results = results.filter((f) => f.district.toLowerCase() === district.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.address.toLowerCase().includes(q) ||
        f.district.toLowerCase().includes(q) ||
        f.services.some((s) => s.toLowerCase().includes(q))
    );
  }

  return res.json({ success: true, total: results.length, data: results });
}

/**
 * GET /api/facilities/:id
 */
export function getById(req, res) {
  const id = parseInt(req.params.id, 10);
  const facility = facilities.find((f) => f.id === id);

  if (!facility) {
    return res.status(404).json({ success: false, message: 'Fasilitas tidak ditemukan.' });
  }

  return res.json({ success: true, data: facility });
}
