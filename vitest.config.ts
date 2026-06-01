import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Standalone Vitest config (kept separate from the Storybook Vite setup).
// `css: false` — Tailwind is intentionally NOT processed here; tests assert
// DOM/attributes/className substrings, never computed styles (jsdom applies no
// CSS). Component sources import siblings with explicit `.js` extensions; the
// Vite resolver maps `.js` -> `.tsx` exactly as Storybook does, so no extra
// resolve config is needed.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    css: false,
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.stories.tsx",
        "src/**/*.test.{ts,tsx}",
        "src/index.ts",
        "src/theme/index.ts",
      ],
      reporter: ["text", "html"],
    },
  },
});
