"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";

interface AuthContextData {
  token: string | undefined;
  isAuthenticated: boolean;
  logout: () => void;
  setAuthCredentials: (token: string) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Função para lidar com logout
  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
    }
    setToken(undefined);
    setIsAuthenticated(false);
  }, []);

  // Função para definir as credenciais de autenticação
  const setAuthCredentials = useCallback((token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", token);
    }
    setToken(token);
    setIsAuthenticated(true);
  }, []);

  // Função para recuperar as credenciais de autenticação do localStorage
  const initializeAuth = useCallback(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
      }
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        setAuthCredentials,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
