/**
 * Skema Database WARAS (Turso / libSQL)
 */

export const CREATE_TABLES_SQL = `
-- 1. Tabel Fasilitas Kesehatan Kota Semarang (64 Faskes)
CREATE TABLE IF NOT EXISTS facilities (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT,
  address TEXT NOT NULL,
  district TEXT,
  phone TEXT,
  whatsapp TEXT,
  services TEXT,
  latitude REAL,
  longitude REAL,
  image TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabel Artikel Edukasi Kesehatan
CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  reading_time TEXT,
  date TEXT,
  author TEXT,
  featured INTEGER DEFAULT 0,
  tags TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabel Laporan Masyarakat / Komunitas
CREATE TABLE IF NOT EXISTS reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  report_id TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  contact TEXT,
  status TEXT DEFAULT 'Menunggu Peninjauan',
  submitted_at TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabel Estimasi Antrean Faskes
CREATE TABLE IF NOT EXISTS queues (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  facility_id INTEGER NOT NULL UNIQUE REFERENCES facilities(id),
  current_number TEXT,
  total_queue INTEGER DEFAULT 0,
  estimated_wait_minutes INTEGER DEFAULT 15,
  status TEXT DEFAULT 'Normal',
  last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabel Pengguna (Admin & User)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  nik TEXT UNIQUE,
  phone TEXT,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME
);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_nik ON users(nik);

-- 6. Tabel Sesi Percakapan AI
CREATE TABLE IF NOT EXISTS ai_conversations (
  id TEXT PRIMARY KEY,
  user_id INTEGER,
  title TEXT NOT NULL,
  is_pinned INTEGER DEFAULT 0,
  category TEXT DEFAULT 'today',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_user ON ai_conversations(user_id);

-- 7. Tabel Riwayat Chat AI (Konteks & Percakapan)
CREATE TABLE IF NOT EXISTS chat_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  sender TEXT NOT NULL,
  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'general',
  related_article_ids TEXT,
  show_facility_cta INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_chat_history_session ON chat_history(session_id);

-- 8. Tabel Istilah Medis A-Z (1.485 Istilah Medis Terintegrasi)
CREATE TABLE IF NOT EXISTS medical_terms (
  id INTEGER PRIMARY KEY,
  term TEXT NOT NULL,
  category TEXT NOT NULL,
  first_letter TEXT NOT NULL,
  definition TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_medical_terms_letter ON medical_terms(first_letter);
CREATE INDEX IF NOT EXISTS idx_medical_terms_category ON medical_terms(category);
`;
