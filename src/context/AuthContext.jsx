import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [token, setToken] = useState(() => authService.getToken());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      if (authService.getToken()) {
        try {
          const profile = await authService.getProfile();
          if (profile) setUser(profile);
        } catch (_err) {
          // Tetap gunakan cached user jika offline
        }
      }
      setIsLoading(false);
    }
    loadUser();
  }, []);

  const login = async (identifier, password) => {
    const res = await authService.login(identifier, password);
    setUser(res.user);
    setToken(res.token);
    return res;
  };

  const register = async (formData) => {
    const res = await authService.register(formData);
    setUser(res.user);
    setToken(res.token);
    return res;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: Boolean(user && token),
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam <AuthProvider>");
  }
  return context;
}
