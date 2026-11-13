const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const TOKEN_KEY = "waras_auth_token";
const USER_KEY = "waras_auth_user";

export const authService = {
  /**
   * Pendaftaran akun warga baru ke backend Turso DB
   * @param {Object} formData { fullName, nik, email, phone, password }
   */
  async register(formData) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Gagal melakukan pendaftaran akun.");
    }

    if (data.token) localStorage.setItem(TOKEN_KEY, data.token);
    if (data.user) localStorage.setItem(USER_KEY, JSON.stringify(data.user));

    return data;
  },

  /**
   * Masuk ke akun WARAS menggunakan Email atau NIK
   * @param {string} identifier (email atau 16 digit NIK)
   * @param {string} password
   */
  async login(identifier, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Email/NIK atau kata sandi tidak sesuai.");
    }

    if (data.token) localStorage.setItem(TOKEN_KEY, data.token);
    if (data.user) localStorage.setItem(USER_KEY, JSON.stringify(data.user));

    return data;
  },

  /**
   * Ambil data profil terkini dari database
   */
  async getProfile() {
    const token = this.getToken();
    if (!token) return null;

    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success && data.user) {
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        return data.user;
      }
    } catch (_e) {
      // offline / fallback
    }
    return this.getCurrentUser();
  },

  /**
   * Keluar dari sesi akun
   */
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Dapatkan token aktif dari localStorage
   */
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Dapatkan data user saat ini dari localStorage
   */
  getCurrentUser() {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (_e) {
      return null;
    }
  },

  /**
   * Periksa apakah pengguna sedang dalam status terautentikasi
   */
  isAuthenticated() {
    return Boolean(this.getToken() && this.getCurrentUser());
  },
};
