import crypto from 'crypto';

/**
 * Hash password menggunakan algoritma scrypt dengan salt acak 16 byte
 */
export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verifikasi password terhadap hash yang tersimpan di database
 */
export function verifyPassword(password, storedHash) {
  if (!storedHash) return false;
  if (!storedHash.includes(':')) {
    return password === storedHash;
  }
  try {
    const [salt, key] = storedHash.split(':');
    const keyBuffer = Buffer.from(key, 'hex');
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch (err) {
    console.error('[Auth Verify Error]', err);
    return false;
  }
}

/**
 * Buat JWT-style signed bearer token menggunakan HMAC-SHA256
 */
export function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    nik: user.nik,
    role: user.role || 'user',
    time: Date.now()
  };
  const secret = process.env.JWT_SECRET || 'waras-semarang-secret-key-2026';
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(data).digest('base64url');
  return `${data}.${sig}`;
}

/**
 * Verifikasi dan decode token
 */
export function verifyToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const [data, sig] = token.split('.');
  const secret = process.env.JWT_SECRET || 'waras-semarang-secret-key-2026';
  const expectedSig = crypto.createHmac('sha256', secret).update(data).digest('base64url');
  if (sig !== expectedSig) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    return payload;
  } catch (_e) {
    return null;
  }
}
