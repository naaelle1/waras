import { db, dbMode } from '../config/db.js';
import { CREATE_TABLES_SQL } from './schema.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function initDatabase() {
  console.log(`[Database Init] Menginisialisasi tabel di mode: ${dbMode}...`);

  // Pastikan folder data ada jika menggunakan local sqlite
  const dataDir = path.resolve(__dirname, '../../data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Pisahkan statement SQL berdasarkan semicolon
  const statements = CREATE_TABLES_SQL.split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const statement of statements) {
    try {
      await db.execute(statement);
    } catch (err) {
      console.error(`[Database Init Error] Gagal menjalankan statement:`, err.message);
      throw err;
    }
  }

  console.log('[Database Init] Seluruh tabel berhasil dibuat/diverifikasi.');
}

// Jika dijalankan langsung via node src/database/init.js
if (process.argv[1] && process.argv[1].endsWith('init.js')) {
  initDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
