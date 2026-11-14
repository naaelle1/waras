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
   * Masuk atau pendaftaran akun otomatis via Google OAuth 2.0
   * @param {string|Object} payload ID token kredensial atau { accessToken, profile }
   */
  async loginWithGoogle(payload) {
    const body = typeof payload === "string" ? { credential: payload } : payload;
    const res = await fetch(`${API_BASE}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Gagal masuk menggunakan akun Google.");
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
   * Memperbarui informasi profil pengguna aktif ke database
   * @param {Object} profileData
   */
  async updateProfile(profileData) {
    const token = this.getToken();
    if (!token) throw new Error("Sesi login tidak ditemukan.");

    const res = await fetch(`${API_BASE}/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Gagal memperbarui profil.");
    }

    if (data.user) {
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    }
    return data;
  },

  /**
   * Mengubah kata sandi akun aktif
   * @param {string} currentPassword
   * @param {string} newPassword
   */
  async changePassword(currentPassword, newPassword) {
    const token = this.getToken();
    if (!token) throw new Error("Sesi login tidak ditemukan.");

    const res = await fetch(`${API_BASE}/auth/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Gagal mengubah kata sandi.");
    }
    return data;
  },

  /**
   * Meminta instruksi / kode OTP reset kata sandi
   * @param {string} identifier (email atau NIK)
   */
  async forgotPassword(identifier) {
    const res = await fetch(`${API_BASE}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Gagal memproses permohonan reset sandi.");
    }
    return data;
  },

  /**
   * Memvalidasi kode OTP / token reset
   * @param {string} identifier
   * @param {string} tokenOrOtp
   */
  async verifyResetToken(identifier, tokenOrOtp) {
    const res = await fetch(`${API_BASE}/auth/verify-reset-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, tokenOrOtp }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Kode verifikasi tidak valid.");
    }
    return data;
  },

  /**
   * Mengatur kata sandi baru
   * @param {string} identifier
   * @param {string} tokenOrOtp
   * @param {string} newPassword
   */
  async resetPassword(identifier, tokenOrOtp, newPassword) {
    const res = await fetch(`${API_BASE}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, tokenOrOtp, newPassword }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Gagal mengatur ulang kata sandi.");
    }
    return data;
  },

  /**
   * Keluar dari sesi akun dan bersihkan seluruh state kredensial
   */
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    try {
      sessionStorage.clear();
      // Bersihkan sesi konsultasi AI pengguna jika ada
      localStorage.removeItem("waras_active_ai_session");
    } catch (_e) {}
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
