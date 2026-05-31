---
"@uhiggs/ui": minor
---

Complete the Phase 0 scaffold: add `success`/`warning`/`font-sans` design tokens
(light + dark), a framework-agnostic `ThemeProvider` + `useTheme` (no `next/*`
deps, `light`/`dark`/`system` via `matchMedia`), a shadcn `components.json` wired
for the unified `radix-ui` primitives with a `@/*` path alias, and a Storybook
light/dark theme toolbar plus `@storybook/addon-a11y`. Verified that bunchee
preserves per-file `"use client"` in `dist`.
