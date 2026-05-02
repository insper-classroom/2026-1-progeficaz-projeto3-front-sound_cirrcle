import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { me, login as apiLogin, register as apiRegister, logout as apiLogout } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const initAuth = useCallback(async () => {
    try {
      const res = await me();
      if (res.data.authenticated) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const handleLogin = useCallback(
    async (email, password) => {
      await apiLogin({ email, password });
      const res = await me();
      if (res.data.authenticated) {
        setUser(res.data.user);
        navigate("/");
      }
    },
    [navigate]
  );

  const handleRegister = useCallback(
    async (email, password, displayName) => {
      await apiRegister({ email, password, display_name: displayName });
      const res = await me();
      if (res.data.authenticated) {
        setUser(res.data.user);
        navigate("/");
      }
    },
    [navigate]
  );

  const handleLogout = useCallback(async () => {
    try {
      await apiLogout();
    } catch {
      // ignora erro
    }
    setUser(null);
    navigate("/login");
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
