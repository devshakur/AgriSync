import type { ThemeMode } from "./types";
import { themeModes } from "./types";

export const THEME_STORAGE_KEY = "agrilink-theme";

export const isThemeMode = (value: unknown): value is ThemeMode =>
  typeof value === "string" && themeModes.includes(value as ThemeMode);

export const readStoredTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "system";

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeMode(stored) ? stored : "system";
  } catch {
    return "system";
  }
};

export const writeStoredTheme = (mode: ThemeMode) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // Ignore storage failures (private mode, quota, etc.)
  }
};
