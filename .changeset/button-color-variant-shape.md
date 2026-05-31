---
"@uhiggs/ui": minor
---

Make `Button` fully composable: replace the single mixed `variant` prop with
three independent axes — `color` (primary/secondary/success/info/warning/danger/
light/dark), `variant` (solid/outline/ghost/link), and `shape` (rounded/square/
pill) — so every combination is valid (e.g. an outline pill in any color). Colors
are driven by tokens via CSS-variable indirection (`--btn-color`/`--btn-on`), no
hardcoded hex.

Recolor the intent design tokens to a Bootstrap-derived palette (oklch) with
readable foregrounds, identical in light and dark mode. Structural tokens and the
ThemeProvider are unchanged.

BREAKING: the previous `variant` values (`default`/`secondary`/`outline`/`ghost`/
`destructive`/`link`) are removed. Migrate, e.g. `variant="destructive"` →
`color="danger"`, `variant="outline"` → `variant="outline"` (now any color),
`variant="secondary"` → `color="secondary"`.
