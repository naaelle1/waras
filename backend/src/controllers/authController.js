import crypto from 'crypto';
import { db } from '../config/db.js';
import { hashPassword, verifyPassword, generateToken, verifyToken } from '../utils/auth.js';

/**
 * Helper untuk verifikasi Bearer token dari header request
 */
function authenticateUser(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  return verifyToken(token);
}

/**
 * Helper pembentuk objek data user yang aman dikirim ke client
 */
function formatSafeUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    nik: row.nik,
    phone: row.phone,
    role: row.role || 'user',
    address: row.address || '',
    district: row.district || '',
    bpjsNumber: row.bpjs_number || '',
    bpjsStatus: row.bpjs_status || 'Aktif',
    primaryFacility: row.primary_facility || '',
    bloodType: row.blood_type || '',
    allergies: row.allergies || '',
    status: row.status || 'Aktif',
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

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
      sql: `INSERT INTO users (name, email, nik, phone, password_hash, role, status)
            VALUES (?, ?, ?, ?, ?, 'user', 'Aktif')`,
      args: [fullName.trim(), cleanEmail, cleanNik, phone.trim(), passwordHash]
    });

    const newUserId = Number(result.lastInsertRowid);
    const user = {
      id: newUserId,
      name: fullName.trim(),
      email: cleanEmail,
      nik: cleanNik,
      phone: phone.trim(),
      role: 'user',
      status: 'Aktif'
    };

    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      message: 'Pendaftaran akun warga berhasil.',
      token,
      user: formatSafeUser({ ...user, id: newUserId })
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

    const safeUser = formatSafeUser(user);
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
    const payload = authenticateUser(req);
    if (!payload || !payload.id) {
      return res.status(401).json({ success: false, message: 'Sesi kedaluwarsa atau tidak valid.' });
    }

    const result = await db.execute({
      sql: 'SELECT * FROM users WHERE id = ? LIMIT 1',
      args: [payload.id]
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan.' });
    }

    return res.json({
      success: true,
      user: formatSafeUser(result.rows[0])
    });
  } catch (err) {
    console.error('[Auth Profile Error]', err);
    return res.status(500).json({ success: false, message: 'Gagal memuat profil.' });
  }
}

/**
 * PUT /api/auth/profile
 * Memperbarui data profil pengguna aktif
 */
export async function updateProfile(req, res) {
  try {
    const payload = authenticateUser(req);
    if (!payload || !payload.id) {
      return res.status(401).json({ success: false, message: 'Sesi kedaluwarsa atau tidak valid. Silakan masuk kembali.' });
    }

    const {
      name,
      phone,
      address,
      district,
      bpjsNumber,
      bpjsStatus,
      primaryFacility,
      bloodType,
      allergies
    } = req.body;

    await db.execute({
      sql: `
        UPDATE users
        SET name = COALESCE(?, name),
            phone = COALESCE(?, phone),
            address = COALESCE(?, address),
            district = COALESCE(?, district),
            bpjs_number = COALESCE(?, bpjs_number),
            bpjs_status = COALESCE(?, bpjs_status),
            primary_facility = COALESCE(?, primary_facility),
            blood_type = COALESCE(?, blood_type),
            allergies = COALESCE(?, allergies),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `,
      args: [
        name !== undefined ? name.trim() : null,
        phone !== undefined ? phone.trim() : null,
        address !== undefined ? address.trim() : null,
        district !== undefined ? district.trim() : null,
        bpjsNumber !== undefined ? bpjsNumber.trim() : null,
        bpjsStatus !== undefined ? bpjsStatus.trim() : null,
        primaryFacility !== undefined ? primaryFacility.trim() : null,
        bloodType !== undefined ? bloodType.trim() : null,
        allergies !== undefined ? allergies.trim() : null,
        payload.id
      ]
    });

    const result = await db.execute({
      sql: 'SELECT * FROM users WHERE id = ? LIMIT 1',
      args: [payload.id]
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan.' });
    }

    return res.json({
      success: true,
      message: 'Profil warga berhasil diperbarui.',
      user: formatSafeUser(result.rows[0])
    });
  } catch (err) {
    console.error('[Auth updateProfile Error]', err);
    return res.status(500).json({ success: false, message: 'Gagal memperbarui profil pengguna.' });
  }
}

/**
 * PUT /api/auth/change-password
 * Mengubah kata sandi pengguna aktif
 */
export async function changePassword(req, res) {
  try {
    const payload = authenticateUser(req);
    if (!payload || !payload.id) {
      return res.status(401).json({ success: false, message: 'Sesi kedaluwarsa atau tidak valid.' });
    }

    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Kata sandi saat ini dan kata sandi baru wajib diisi.' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'Kata sandi baru minimal harus 8 karakter.' });
    }

    const userResult = await db.execute({
      sql: 'SELECT id, password_hash FROM users WHERE id = ? LIMIT 1',
      args: [payload.id]
    });

    if (userResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan.' });
    }

    const user = userResult.rows[0];
    const isValid = verifyPassword(currentPassword, user.password_hash);
    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Kata sandi saat ini yang Anda masukkan salah.' });
    }

    const newHash = hashPassword(newPassword);
    await db.execute({
      sql: 'UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      args: [newHash, payload.id]
    });

    return res.json({ success: true, message: 'Kata sandi berhasil diubah.' });
  } catch (err) {
    console.error('[Auth changePassword Error]', err);
    return res.status(500).json({ success: false, message: 'Gagal mengubah kata sandi.' });
  }
}

/**
 * POST /api/auth/forgot-password
 * Meminta token dan kode OTP untuk reset kata sandi
 */
export async function forgotPassword(req, res) {
  try {
    const { identifier } = req.body;
    if (!identifier?.trim()) {
      return res.status(400).json({ success: false, message: 'Silakan masukkan email atau NIK kependudukan Anda.' });
    }

    const cleanId = identifier.trim();
    const userResult = await db.execute({
      sql: 'SELECT id, name, email, nik FROM users WHERE LOWER(email) = LOWER(?) OR nik = ? LIMIT 1',
      args: [cleanId, cleanId]
    });

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Akun dengan email atau NIK tersebut tidak terdaftar di sistem WARAS.'
      });
    }

    const user = userResult.rows[0];
    const token = crypto.randomBytes(24).toString('hex');
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    await db.execute({
      sql: `INSERT INTO password_resets (email, token, otp_code, expires_at, used)
            VALUES (?, ?, ?, ?, 0)`,
      args: [user.email, token, otpCode, expiresAt]
    });

    return res.json({
      success: true,
      message: 'Kode pemulihan akun berhasil dikirimkan.',
      data: {
        email: user.email,
        token,
        otpCode // Diberikan agar pengguna dapat langsung verifikasi tanpa harus cek server email eksternal
      }
    });
  } catch (err) {
    console.error('[Auth forgotPassword Error]', err);
    return res.status(500).json({ success: false, message: 'Gagal memproses permintaan reset kata sandi.' });
  }
}

/**
 * POST /api/auth/verify-reset-token
 * Memvalidasi apakah token / OTP pemulihan masih aktif
 */
export async function verifyResetToken(req, res) {
  try {
    const { identifier, tokenOrOtp } = req.body;
    if (!tokenOrOtp?.trim()) {
      return res.status(400).json({ success: false, message: 'Kode verifikasi wajib diisi.' });
    }

    const cleanCode = tokenOrOtp.trim();
    let sql = `SELECT * FROM password_resets WHERE (token = ? OR otp_code = ?) AND used = 0 ORDER BY id DESC LIMIT 1`;
    let args = [cleanCode, cleanCode];

    if (identifier?.trim()) {
      sql = `SELECT * FROM password_resets WHERE (token = ? OR otp_code = ?) AND LOWER(email) = LOWER(?) AND used = 0 ORDER BY id DESC LIMIT 1`;
      args = [cleanCode, cleanCode, identifier.trim()];
    }

    const result = await db.execute({ sql, args });
    if (result.rows.length === 0) {
      return res.status(400).json({ success: false, message: 'Kode verifikasi tidak valid atau sudah digunakan.' });
    }

    const record = result.rows[0];
    const expiryDate = new Date(record.expires_at);
    if (expiryDate < new Date()) {
      return res.status(400).json({ success: false, message: 'Kode verifikasi telah kedaluwarsa. Silakan minta kode baru.' });
    }

    return res.json({
      success: true,
      message: 'Kode verifikasi valid.',
      email: record.email,
      token: record.token
    });
  } catch (err) {
    console.error('[Auth verifyResetToken Error]', err);
    return res.status(500).json({ success: false, message: 'Gagal memverifikasi kode.' });
  }
}

/**
 * POST /api/auth/reset-password
 * Mengatur kata sandi baru menggunakan kode OTP atau token reset
 */
export async function resetPassword(req, res) {
  try {
    const { identifier, tokenOrOtp, newPassword } = req.body;

    if (!tokenOrOtp?.trim() || !newPassword?.trim()) {
      return res.status(400).json({ success: false, message: 'Kode verifikasi dan kata sandi baru wajib diisi.' });
    }

    if (newPassword.trim().length < 8) {
      return res.status(400).json({ success: false, message: 'Kata sandi baru minimal harus 8 karakter.' });
    }

    const cleanCode = tokenOrOtp.trim();
    const result = await db.execute({
      sql: `SELECT * FROM password_resets WHERE (token = ? OR otp_code = ?) AND used = 0 ORDER BY id DESC LIMIT 1`,
      args: [cleanCode, cleanCode]
    });

    if (result.rows.length === 0) {
      return res.status(400).json({ success: false, message: 'Kode verifikasi tidak valid atau sudah kedaluwarsa.' });
    }

    const record = result.rows[0];
    const expiryDate = new Date(record.expires_at);
    if (expiryDate < new Date()) {
      return res.status(400).json({ success: false, message: 'Kode verifikasi telah kedaluwarsa. Silakan minta kode baru.' });
    }

    const newHash = hashPassword(newPassword.trim());

    // Perbarui kata sandi pengguna
    await db.execute({
      sql: 'UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE LOWER(email) = LOWER(?)',
      args: [newHash, record.email]
    });

    // Tandai token telah digunakan
    await db.execute({
      sql: 'UPDATE password_resets SET used = 1 WHERE id = ?',
      args: [record.id]
    });

    return res.json({
      success: true,
      message: 'Kata sandi berhasil diatur ulang. Silakan masuk menggunakan kata sandi baru Anda.'
    });
  } catch (err) {
    console.error('[Auth resetPassword Error]', err);
    return res.status(500).json({ success: false, message: 'Gagal mengatur ulang kata sandi.' });
  }
}

/**
 * POST /api/auth/google
 * Masuk atau pendaftaran otomatis menggunakan akun Google OAuth 2.0
 */
export async function googleLogin(req, res) {
  try {
    const { credential, accessToken, profile: clientProfile } = req.body;

    if (!credential && !accessToken) {
      return res.status(400).json({
        success: false,
        message: 'Kredensial atau token Google tidak ditemukan.'
      });
    }

    let email = null;
    let name = null;

    if (credential) {
      // 1A. Verifikasi ID Token ke endpoint resmi Google Identity
      try {
        const verifyRes = await fetch(
          `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`
        );
        if (!verifyRes.ok) {
          throw new Error('Google ID token invalid');
        }
        const payload = await verifyRes.json();
        email = payload.email;
        name = payload.name;
      } catch (verifyErr) {
        console.warn('[Google Auth Verify Error]', verifyErr);
        return res.status(401).json({
          success: false,
          message: 'Autentikasi akun Google gagal atau token telah kedaluwarsa.'
        });
      }
    } else if (accessToken) {
      // 1B. Verifikasi OAuth2 Access Token Google
      try {
        const verifyRes = await fetch(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${encodeURIComponent(accessToken)}`
        );
        if (!verifyRes.ok) {
          throw new Error('Google access token invalid');
        }
        const tokenInfo = await verifyRes.json();
        email = tokenInfo.email;

        if (clientProfile?.name) {
          name = clientProfile.name;
        } else {
          const userinfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${accessToken}` }
          });
          if (userinfoRes.ok) {
            const userinfo = await userinfoRes.json();
            name = userinfo.name;
            if (!email) email = userinfo.email;
          }
        }
      } catch (err) {
        console.warn('[Google Auth Access Token Error]', err);
        return res.status(401).json({
          success: false,
          message: 'Autentikasi akun Google gagal atau token telah kedaluwarsa.'
        });
      }
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Informasi email tidak ditemukan pada profil akun Google Anda.'
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 2. Cek apakah pengguna dengan email ini sudah ada di database
    const existingUser = await db.execute({
      sql: 'SELECT * FROM users WHERE LOWER(email) = ? LIMIT 1',
      args: [cleanEmail]
    });

    let userRecord = null;

    if (existingUser.rows.length > 0) {
      userRecord = existingUser.rows[0];

      if (userRecord.status === 'Nonaktif') {
        return res.status(403).json({
          success: false,
          message: 'Akun Anda sedang dinonaktifkan. Silakan hubungi administrator.'
        });
      }
    } else {
      // 3. Pengguna baru: Daftarkan akun warga secara otomatis via Google
      const randomPassword = crypto.randomBytes(24).toString('hex');
      const passwordHash = hashPassword(randomPassword);
      const displayName = name?.trim() || cleanEmail.split('@')[0];

      const insertResult = await db.execute({
        sql: `INSERT INTO users (name, email, password_hash, role, status)
              VALUES (?, ?, ?, 'user', 'Aktif')`,
        args: [displayName, cleanEmail, passwordHash]
      });

      const newId = Number(insertResult.lastInsertRowid);
      const fetchNew = await db.execute({
        sql: 'SELECT * FROM users WHERE id = ?',
        args: [newId]
      });
      userRecord = fetchNew.rows[0] || {
        id: newId,
        name: displayName,
        email: cleanEmail,
        role: 'user',
        status: 'Aktif'
      };
    }

    // 4. Buat JWT Token Sesi WARAS
    const safeUser = formatSafeUser(userRecord);
    const token = generateToken(safeUser);

    console.log(`[Google Auth] Pengguna berhasil masuk via Google: ${cleanEmail} (ID: ${safeUser.id})`);

    return res.json({
      success: true,
      message: 'Berhasil masuk menggunakan akun Google.',
      token,
      user: safeUser
    });
  } catch (err) {
    console.error('[Google Auth Error]', err);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat memproses login Google.'
    });
  }
}
