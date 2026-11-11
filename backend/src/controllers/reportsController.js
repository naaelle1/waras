// In-memory store (replace with DB in production)
const reports = [];

/**
 * POST /api/reports
 * Body: { category, title, description, location?, contact? }
 */
export function submit(req, res) {
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

  reports.push(report);
  console.log(`[Report] ${reportId} diterima: "${title}"`);

  return res.status(201).json({ success: true, data: report });
}
