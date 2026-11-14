import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

import express from 'express';
import cors from 'cors';

import aiRoutes from './routes/ai.js';
import authRoutes from './routes/auth.js';
import facilitiesRoutes from './routes/facilities.js';
import articlesRoutes from './routes/articles.js';
import reportsRoutes from './routes/reports.js';
import queuesRoutes from './routes/queues.js';
import termsRoutes from './routes/terms.js';
import usersRoutes from './routes/users.js';
import adminRoutes from './routes/admin.js';
import { dbMode } from './config/db.js';
import { seedDatabase } from './database/seed.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: (origin, callback) => {
    // Izinkan semua origin saat development lokal atau bila tanpa origin (seperti Postman/curl)
    if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
}));
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/facilities', facilitiesRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/queues', queuesRoutes);
app.use('/api/terms', termsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/admin', adminRoutes);

// ── Health Check & Root ─────────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    project: 'WARAS Backend API',
    database: dbMode,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    project: 'WARAS Backend',
    database: dbMode,
    timestamp: new Date().toISOString()
  });
});

// ── 404 Handler ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan.' });
});

// ── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err);
  res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
});

// Auto-seed database jika tabel belum ada / masih kosong
seedDatabase().catch((err) => {
  console.warn('[Database] Peringatan saat inisialisasi database:', err.message);
});

// Hanya jalankan listener mandiri jika BUKAN di environment serverless Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`✅ WARAS Backend berjalan di http://localhost:${PORT}`);
    console.log(`   Database     : ${dbMode}`);
    console.log(`   Model Gemini : ${process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite'}`);
    console.log(`   Frontend URL : ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);

    // Warmup koneksi HTTPS TLS & model di background agar respon pertama pengguna langsung cepat
    import('./controllers/aiController.js').then(({ warmup }) => {
      if (typeof warmup === 'function') warmup();
    }).catch(() => {});
  });
}

export default app;
