import type { ResolvedTheme, ThemeMode } from "./types";

export const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const resolveTheme = (mode: ThemeMode): ResolvedTheme =>
  mode === "system" ? getSystemTheme() : mode;

export const applyResolvedTheme = (resolved: ResolvedTheme) => {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.dataset.theme = resolved;
  root.style.colorScheme = resolved;
};
