// Mirrored from frontend src/data/articles.js
const articles = [
  { id: 1, title: "Kenali Gejala Diabetes dan Cara Menjaganya Sejak Dini", category: "Penyakit & Pencegahan", description: "Memahami tanda awal diabetes seperti sering haus, penurunan berat badan mendadak, serta langkah sederhana yang dapat dilakukan untuk menjaga kesehatan kadar gula darah.", readingTime: "5 menit baca", date: "10 Mar 2026", author: "Tim Medis WARAS", featured: true, tags: ["Diabetes", "Gula Darah", "Pencegahan"] },
  { id: 2, title: "Fase Kritis Demam Berdarah: Gejala dan Cara Mengatasinya", category: "Pertolongan Pertama", description: "Ketahui ciri-ciri penurun suhu tubuh tiba-tiba yang menandakan masa kritis DBD serta penanganan dehidrasi yang harus dilakukan segera.", readingTime: "4 menit baca", date: "08 Mar 2026", author: "dr. Sugiarto, Sp.PD", featured: false, tags: ["DBD", "Demam Berdarah", "Pertolongan Pertama"] },
  { id: 3, title: "5 Ciri-Ciri Burnout dan Cara Sederhana Mengatasinya", category: "Kesehatan Mental", description: "Kelelahan emosional akibat stres pekerjaan kronis sering tidak disadari. Simak tips praktis menjaga kesehatan mental di lingkungan kerja padat.", readingTime: "6 menit baca", date: "06 Mar 2026", author: "Anisa Rahma, M.Psi", featured: false, tags: ["Burnout", "Kesehatan Mental", "Stres"] },
  { id: 4, title: "Benarkah Makanan Manis Berbahaya untuk Asam Lambung?", category: "Kesehatan Umum", description: "Fakta nutrisi seputar hubungan antara konsumsi gula tinggi, pengosongan lambung yang lambat, dan pemicu refluks asam lambung (GERD).", readingTime: "3 menit baca", date: "04 Mar 2026", author: "Tim Nutrisi WARAS", featured: false, tags: ["GERD", "Asam Lambung", "Nutrisi"] },
  { id: 5, title: "Cara Menjaga Kesehatan Tubuh di Tengah Aktivitas Padat", category: "Gaya Hidup", description: "Panduan praktis menjaga stamina tubuh melalui micro-workouts, hidrasi teratur, dan pola makan bernutrisi seimbang bagi pekerja perkotaan.", readingTime: "4 menit baca", date: "01 Mar 2026", author: "Budi Santoso, S.Ked", featured: false, tags: ["Gaya Hidup", "Stamina", "Olahraga"] },
  { id: 6, title: "Pentingnya Imunisasi Rutin untuk Anak di Bawah 5 Tahun", category: "Kesehatan Anak", description: "Jadwal imunisasi lengkap yang direkomendasikan Kemenkes RI beserta manfaatnya dalam membentuk kekebalan tubuh anak secara optimal.", readingTime: "5 menit baca", date: "28 Feb 2026", author: "dr. Lestari, Sp.A", featured: false, tags: ["Imunisasi", "Kesehatan Anak", "Vaksinasi"] },
];

/**
 * GET /api/articles
 * Query: ?category=...&featured=true&search=...
 */
export function getAll(req, res) {
  let results = [...articles];

  const { category, featured, search } = req.query;

  if (category) {
    results = results.filter((a) => a.category.toLowerCase() === category.toLowerCase());
  }
  if (featured === 'true') {
    results = results.filter((a) => a.featured === true);
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return res.json({ success: true, total: results.length, data: results });
}

/**
 * GET /api/articles/:id
 */
export function getById(req, res) {
  const id = parseInt(req.params.id, 10);
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return res.status(404).json({ success: false, message: 'Artikel tidak ditemukan.' });
  }

  return res.json({ success: true, data: article });
}
