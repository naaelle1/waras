const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const TOKEN_KEY = "waras_auth_token";
const USER_KEY = "waras_auth_user";

export const authService = {
  /**
   * Pendaftaran akun warga baru ke backend Turso DB (dengan fallback offline/demo)
   * @param {Object} formData { fullName, nik, email, phone, password }
   */
  async register(formData) {
    try {
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
    } catch (err) {
      const isNetworkError =
        err.name === "TypeError" ||
        err.message?.includes("Failed to fetch") ||
        err.message?.includes("NetworkError") ||
        err.message?.includes("ERR_CONNECTION_REFUSED");

      if (isNetworkError) {
        console.warn("[Auth] Backend tidak terjangkau, mendaftarkan sesi lokal.");
        const mockUser = {
          id: Date.now(),
          name: formData.fullName || "Warga Baru",
          email: formData.email,
          nik: formData.nik,
          phone: formData.phone,
          role: "user"
        };
        const mockToken = "waras_demo_token_" + Date.now();
        localStorage.setItem(TOKEN_KEY, mockToken);
        localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
        return {
          success: true,
          message: "Pendaftaran berhasil (Mode Demo Lokal).",
          token: mockToken,
          user: mockUser
        };
      }
      throw err;
    }
  },

  /**
   * Masuk ke akun WARAS menggunakan Email atau NIK (dengan fallback offline/demo otomatis)
   * @param {string} identifier (email atau 16 digit NIK)
   * @param {string} password
   */
  async login(identifier, password) {
    try {
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
    } catch (err) {
      // Jika terjadi network error (backend belum aktif / offline), gunakan fallback otomatis
      const isNetworkError =
        err.name === "TypeError" ||
        err.message?.includes("Failed to fetch") ||
        err.message?.includes("NetworkError") ||
        err.message?.includes("ERR_CONNECTION_REFUSED");

      if (isNetworkError) {
        console.warn("[Auth] Backend tidak terjangkau, beralih otomatis ke sesi login demo/lokal.");
        const cleanId = String(identifier || "").trim().toLowerCase();
        const isAdmin = cleanId.includes("admin");
        
        let displayName = "Nael";
        if (isAdmin) {
          displayName = "Administrator WARAS";
        } else if (cleanId.includes("@")) {
          const prefix = cleanId.split("@")[0];
          displayName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
        } else if (cleanId && cleanId !== "nael") {
          displayName = cleanId.charAt(0).toUpperCase() + cleanId.slice(1);
        }

        const mockUser = {
          id: isAdmin ? 999 : 1,
          name: displayName,
          email: cleanId.includes("@") ? cleanId : `${cleanId || "nael"}@semarangkota.go.id`,
          nik: cleanId.length === 16 ? cleanId : "3374015503900001",
          phone: "081234567890",
          role: isAdmin ? "admin" : "user"
        };

        const mockToken = "waras_demo_token_" + Date.now();
        localStorage.setItem(TOKEN_KEY, mockToken);
        localStorage.setItem(USER_KEY, JSON.stringify(mockUser));

        return {
          success: true,
          message: "Masuk berhasil (Mode Demo Warga).",
          token: mockToken,
          user: mockUser
        };
      }

      // Lempar kembali error validasi resmi dari backend
      throw err;
    }
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
