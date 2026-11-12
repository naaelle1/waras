import { db } from '../config/db.js';
import { initDatabase } from './init.js';
import { facilities } from '../data/facilities.js';
import { medicalTerms } from '../data/medicalTerms.js';

const initialArticles = [
  {
    id: 1,
    title: "Kenali Gejala Diabetes dan Cara Menjaganya Sejak Dini",
    category: "Penyakit & Pencegahan",
    description: "Memahami tanda awal diabetes seperti sering haus, penurunan berat badan mendadak, serta langkah sederhana yang dapat dilakukan untuk menjaga kesehatan kadar gula darah.",
    readingTime: "5 menit baca",
    date: "10 Mar 2026",
    author: "Tim Medis WARAS",
    featured: 1,
    tags: JSON.stringify(["Diabetes", "Gula Darah", "Pencegahan"])
  },
  {
    id: 2,
    title: "Fase Kritis Demam Berdarah: Gejala dan Cara Mengatasinya",
    category: "Pertolongan Pertama",
    description: "Ketahui ciri-ciri penurun suhu tubuh tiba-tiba yang menandakan masa kritis DBD serta penanganan dehidrasi yang harus dilakukan segera.",
    readingTime: "4 menit baca",
    date: "08 Mar 2026",
    author: "dr. Sugiarto, Sp.PD",
    featured: 0,
    tags: JSON.stringify(["DBD", "Demam Berdarah", "Pertolongan Pertama"])
  },
  {
    id: 3,
    title: "5 Ciri-Ciri Burnout dan Cara Sederhana Mengatasinya",
    category: "Kesehatan Mental",
    description: "Kelelahan emosional akibat stres pekerjaan kronis sering tidak disadari. Simak tips praktis menjaga kesehatan mental di lingkungan kerja padat.",
    readingTime: "6 menit baca",
    date: "06 Mar 2026",
    author: "Anisa Rahma, M.Psi",
    featured: 0,
    tags: JSON.stringify(["Burnout", "Kesehatan Mental", "Stres"])
  },
  {
    id: 4,
    title: "Benarkah Makanan Manis Berbahaya untuk Asam Lambung?",
    category: "Kesehatan Umum",
    description: "Fakta nutrisi seputar hubungan antara konsumsi gula tinggi, pengosongan lambung yang lambat, dan pemicu refluks asam lambung (GERD).",
    readingTime: "3 menit baca",
    date: "04 Mar 2026",
    author: "Tim Nutrisi WARAS",
    featured: 0,
    tags: JSON.stringify(["GERD", "Asam Lambung", "Nutrisi"])
  },
  {
    id: 5,
    title: "Cara Menjaga Kesehatan Tubuh di Tengah Aktivitas Padat",
    category: "Gaya Hidup",
    description: "Panduan praktis menjaga stamina tubuh melalui micro-workouts, hidrasi teratur, dan pola makan bernutrisi seimbang bagi pekerja perkotaan.",
    readingTime: "4 menit baca",
    date: "01 Mar 2026",
    author: "Budi Santoso, S.Ked",
    featured: 0,
    tags: JSON.stringify(["Gaya Hidup", "Stamina", "Olahraga"])
  },
  {
    id: 6,
    title: "Pentingnya Imunisasi Rutin untuk Anak di Bawah 5 Tahun",
    category: "Kesehatan Anak",
    description: "Jadwal imunisasi lengkap yang direkomendasikan Kemenkes RI beserta manfaatnya dalam membentuk kekebalan tubuh anak secara optimal.",
    readingTime: "5 menit baca",
    date: "28 Feb 2026",
    author: "dr. Lestari, Sp.A",
    featured: 0,
    tags: JSON.stringify(["Imunisasi", "Kesehatan Anak", "Vaksinasi"])
  }
];

export async function seedDatabase() {
  await initDatabase();

  console.log('[Database Seed] Memulai proses seeding data...');

  // 1. Seed Facilities
  const countFac = await db.execute('SELECT COUNT(*) as count FROM facilities');
  if (countFac.rows[0].count === 0) {
    console.log(`[Database Seed] Mengisi ${facilities.length} fasilitas kesehatan Kota Semarang...`);
    for (const f of facilities) {
      await db.execute({
        sql: `INSERT INTO facilities (id, name, category, type, address, district, phone, whatsapp, services, latitude, longitude, image)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          f.id,
          f.name,
          f.category,
          f.type || null,
          f.address,
          f.district || null,
          f.phone || null,
          f.whatsapp || null,
          JSON.stringify(f.services || []),
          f.latitude,
          f.longitude,
          f.image || null
        ]
      });
    }
    console.log('[Database Seed] Selesai mengisi fasilitas kesehatan.');
  } else {
    console.log(`[Database Seed] Tabel facilities sudah terisi (${countFac.rows[0].count} data).`);
  }

  // 2. Seed Articles
  const countArt = await db.execute('SELECT COUNT(*) as count FROM articles');
  if (countArt.rows[0].count === 0) {
    console.log(`[Database Seed] Mengisi ${initialArticles.length} artikel kesehatan...`);
    for (const a of initialArticles) {
      await db.execute({
        sql: `INSERT INTO articles (id, title, category, description, reading_time, date, author, featured, tags)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          a.id,
          a.title,
          a.category,
          a.description,
          a.readingTime,
          a.date,
          a.author,
          a.featured,
          a.tags
        ]
      });
    }
    console.log('[Database Seed] Selesai mengisi artikel.');
  }

  // 3. Seed Queues for key facilities
  const countQ = await db.execute('SELECT COUNT(*) as count FROM queues');
  if (countQ.rows[0].count === 0) {
    console.log('[Database Seed] Mengisi estimasi antrean awal faskes...');
    const queueSamples = [
      { facility_id: 1, current_number: "A-024", total_queue: 8, wait: 20, status: "Normal" },
      { facility_id: 2, current_number: "B-012", total_queue: 3, wait: 10, status: "Sepi" },
      { facility_id: 3, current_number: "A-045", total_queue: 18, wait: 45, status: "Padat" },
      { facility_id: 39, current_number: "POLI-102", total_queue: 32, wait: 60, status: "Padat" },
      { facility_id: 40, current_number: "UMUM-018", total_queue: 12, wait: 25, status: "Normal" },
      { facility_id: 41, current_number: "UGD-004", total_queue: 4, wait: 10, status: "Sepi" },
    ];
    for (const q of queueSamples) {
      await db.execute({
        sql: `INSERT OR IGNORE INTO queues (facility_id, current_number, total_queue, estimated_wait_minutes, status)
              VALUES (?, ?, ?, ?, ?)`,
        args: [q.facility_id, q.current_number, q.total_queue, q.wait, q.status]
      });
    }
    console.log('[Database Seed] Selesai mengisi antrean faskes.');
  }

  // 4. Seed Admin User
  const countUsers = await db.execute('SELECT COUNT(*) as count FROM users');
  if (countUsers.rows[0].count === 0) {
    await db.execute({
      sql: `INSERT INTO users (name, email, password_hash, role)
            VALUES (?, ?, ?, ?)`,
      args: ['Admin WARAS Semarang', 'admin@waras.semarangkota.go.id', 'hashed_admin_pass', 'admin']
    });
    console.log('[Database Seed] User admin awal dibuat.');
  }

  // 5. Seed Medical Terms (1.485 istilah A-Z)
  const countTerms = await db.execute('SELECT COUNT(*) as count FROM medical_terms');
  if (countTerms.rows[0].count === 0) {
    console.log(`[Database Seed] Mengisi ${medicalTerms.length} istilah medis A-Z ke database...`);
    const batchSize = 100;
    for (let i = 0; i < medicalTerms.length; i += batchSize) {
      const chunk = medicalTerms.slice(i, i + batchSize);
      const statements = chunk.map((term) => ({
        sql: `INSERT OR IGNORE INTO medical_terms (id, term, category, first_letter, definition)
              VALUES (?, ?, ?, ?, ?)`,
        args: [term.id, term.term, term.category, term.firstLetter, term.definition]
      }));
      await db.batch(statements);
    }
    console.log(`[Database Seed] Selesai mengisi ${medicalTerms.length} istilah medis.`);
  }

  console.log('[Database Seed] Seeding database selesai 100%!');
}

if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
