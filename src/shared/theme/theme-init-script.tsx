import Script from "next/script";
import { THEME_STORAGE_KEY } from "./storage";

/**
 * Inline bootstrap script to apply the stored theme before React hydrates,
 * avoiding a flash of the wrong color scheme.
 */
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    var mode = stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
    var resolved = mode === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : mode;
    var root = document.documentElement;
    root.classList.toggle("dark", resolved === "dark");
    root.dataset.theme = resolved;
    root.style.colorScheme = resolved;
  } catch (e) {}
})();
`;

const ThemeInitScript = () => (
  <Script id="agrilink-theme-init" strategy="beforeInteractive">
    {themeInitScript}
  </Script>
);

export { ThemeInitScript };
