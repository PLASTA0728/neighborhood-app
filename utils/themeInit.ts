'use client';

export const themeInitScript = `
(() => {
  try {
    const theme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = theme === "dark" || (!theme && systemDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  } catch (_) {}
})();
`;
