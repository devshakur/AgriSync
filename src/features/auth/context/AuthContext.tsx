"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../types";
import { me } from "../api";
import {
  clearTokens,
  hasStoredAccessToken,
  setTokens,
  type AuthTokens,
} from "../lib/session";

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, tokens: AuthTokens) => void;
  register: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // /auth/me is the single source of truth for the session. Call it once
  // on app start/refresh only — login already returns the user, so it
  // must not be called again after a successful sign-in.
  useEffect(() => {
    if (!hasStoredAccessToken()) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    me()
      .then((response) => {
        if (!cancelled) setUser(response.user ?? null);
      })
      .catch(() => {
        if (!cancelled) {
          clearTokens();
          setUser(null);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback<AuthContextValue["login"]>((nextUser, tokens) => {
    setTokens(tokens);
    setUser(nextUser);
  }, []);

  const register = useCallback<AuthContextValue["register"]>((nextUser, tokens) => {
    setTokens(tokens);
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: Boolean(user), isLoading, login, register, logout }),
    [user, isLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
