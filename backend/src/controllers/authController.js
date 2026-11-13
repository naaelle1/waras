import { db } from '../config/db.js';
import { hashPassword, verifyPassword, generateToken, verifyToken } from '../utils/auth.js';

/**
 * POST /api/auth/register
 * Mendaftarkan akun warga baru ke database
 */
export async function register(req, res) {
  try {
    const { fullName, nik, email, phone, password } = req.body;

    if (!fullName?.trim() || !nik?.trim() || !email?.trim() || !phone?.trim() || !password?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Semua kolom formulir pendaftaran wajib diisi.'
      });
    }

    const cleanNik = nik.trim();
    if (cleanNik.length < 16) {
      return res.status(400).json({
        success: false,
        message: 'NIK Kependudukan harus terdiri dari 16 digit angka.'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Kata sandi minimal harus 8 karakter.'
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Periksa duplikasi email
    const existingEmail = await db.execute({
      sql: 'SELECT id FROM users WHERE LOWER(email) = ? LIMIT 1',
      args: [cleanEmail]
    });
    if (existingEmail.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Alamat email ini sudah terdaftar di sistem WARAS.'
      });
    }

    // 2. Periksa duplikasi NIK
    const existingNik = await db.execute({
      sql: 'SELECT id FROM users WHERE nik = ? LIMIT 1',
      args: [cleanNik]
    });
    if (existingNik.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'NIK Kependudukan ini sudah terdaftar.'
      });
    }

    // 3. Hash password dan simpan ke database
    const passwordHash = hashPassword(password);
    const result = await db.execute({
      sql: `INSERT INTO users (name, email, nik, phone, password_hash, role)
            VALUES (?, ?, ?, ?, ?, 'user')`,
      args: [fullName.trim(), cleanEmail, cleanNik, phone.trim(), passwordHash]
    });

    const newUserId = Number(result.lastInsertRowid);
    const user = {
      id: newUserId,
      name: fullName.trim(),
      email: cleanEmail,
      nik: cleanNik,
      phone: phone.trim(),
      role: 'user'
    };

    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      message: 'Pendaftaran akun warga berhasil.',
      token,
      user
    });
  } catch (err) {
    console.error('[Auth Register Error]', err);
    return res.status(500).json({
      success: false,
      message: 'Gagal memproses pendaftaran. Silakan coba kembali.'
    });
  }
}

/**
 * POST /api/auth/login
 * Masuk ke akun WARAS menggunakan Email atau NIK
 */
export async function login(req, res) {
  try {
    const { identifier, password } = req.body;

    if (!identifier?.trim() || !password?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Silakan masukkan email/NIK dan kata sandi.'
      });
    }

    const cleanId = identifier.trim();

    // Cari berdasarkan Email atau NIK
    const queryResult = await db.execute({
      sql: 'SELECT * FROM users WHERE LOWER(email) = LOWER(?) OR nik = ? LIMIT 1',
      args: [cleanId, cleanId]
    });

    if (queryResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Email/NIK atau kata sandi tidak sesuai.'
      });
    }

    const user = queryResult.rows[0];
    const isPasswordValid = verifyPassword(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Email/NIK atau kata sandi tidak sesuai.'
      });
    }

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      nik: user.nik,
      phone: user.phone,
      role: user.role || 'user'
    };

    const token = generateToken(safeUser);

    return res.json({
      success: true,
      message: 'Berhasil masuk ke akun WARAS.',
      token,
      user: safeUser
    });
  } catch (err) {
    console.error('[Auth Login Error]', err);
    return res.status(500).json({
      success: false,
      message: 'Gagal memproses login. Silakan coba kembali.'
    });
  }
}

/**
 * GET /api/auth/me
 * Mendapatkan profil pengguna terautentikasi
 */
export async function getProfile(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Sesi tidak valid.' });
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);

    if (!payload || !payload.id) {
      return res.status(401).json({ success: false, message: 'Token kedaluwarsa atau tidak valid.' });
    }

    const result = await db.execute({
      sql: 'SELECT id, name, email, nik, phone, role, created_at FROM users WHERE id = ? LIMIT 1',
      args: [payload.id]
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan.' });
    }

    return res.json({
      success: true,
      user: result.rows[0]
    });
  } catch (err) {
    console.error('[Auth Profile Error]', err);
    return res.status(500).json({ success: false, message: 'Gagal memuat profil.' });
  }
}
