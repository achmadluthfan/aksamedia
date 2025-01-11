import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthState, User } from "../types";

const STORAGE_KEY = "auth_state";
const DEFAULT_USER = {
  username: "admin",
  password: "admin123",
  fullName: "Administrator",
};

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateUserFullName: (fullName: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { isAuthenticated: false, user: null };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authState));
  }, [authState]);

  const login = (username: string, password: string) => {
    if (
      username === DEFAULT_USER.username &&
      password === DEFAULT_USER.password
    ) {
      setAuthState({ isAuthenticated: true, user: DEFAULT_USER });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null });
  };

  const updateUserFullName = (fullName: string) => {
    if (authState.user) {
      const updatedUser: User = { ...authState.user, fullName };
      setAuthState({ ...authState, user: updatedUser });
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...authState, login, logout, updateUserFullName }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
