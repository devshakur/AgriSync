"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { applyResolvedTheme, resolveTheme } from "./resolve";
import { readStoredTheme, writeStoredTheme } from "./storage";
import type { ResolvedTheme, ThemeMode } from "./types";

type ThemeContextValue = {
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setTheme: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

let memoryTheme: ThemeMode | null = null;
const themeListeners = new Set<() => void>();

const getThemeSnapshot = (): ThemeMode => {
  if (memoryTheme) return memoryTheme;
  memoryTheme = readStoredTheme();
  return memoryTheme;
};

const getServerThemeSnapshot = (): ThemeMode => "system";

const subscribeTheme = (listener: () => void) => {
  themeListeners.add(listener);
  return () => {
    themeListeners.delete(listener);
  };
};

const notifyThemeListeners = () => {
  themeListeners.forEach((listener) => listener());
};

const subscribeSystemTheme = (listener: () => void) => {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
};

const getSystemDarkSnapshot = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const getServerSystemDarkSnapshot = () => false;

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const systemIsDark = useSyncExternalStore(
    subscribeSystemTheme,
    getSystemDarkSnapshot,
    getServerSystemDarkSnapshot,
  );

  const resolvedTheme: ResolvedTheme =
    theme === "system" ? (systemIsDark ? "dark" : "light") : theme;

  useEffect(() => {
    applyResolvedTheme(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = useCallback((mode: ThemeMode) => {
    memoryTheme = mode;
    writeStoredTheme(mode);
    applyResolvedTheme(resolveTheme(mode));
    notifyThemeListeners();
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };
