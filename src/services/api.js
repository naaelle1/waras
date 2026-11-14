import { authService } from "./authService";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

/**
 * Universal API Fetch Client WARAS
 * Menangani penambahan header Authorization Bearer token dan standard response parsing
 */
export async function apiRequest(endpoint, options = {}) {
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const token = authService.getToken();
  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Request gagal dengan status ${response.status}`);
  }

  return data;
}

export default apiRequest;
