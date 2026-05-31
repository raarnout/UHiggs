---
"@uhiggs/ui": minor
---

Add the `IconButton` component: an icon-only button built on `Button` that fixes
the square footprint and **requires an `aria-label`** at the type level, so an
icon-only control can never ship unnamed for screen readers. It inherits Button's
`color`, `variant`, `shape`, `loading`, and `asChild` props (tokens, dark mode,
and focus ring included) and adds its own three-value square `size`
(`sm`/`md`/`lg` → `size-8`/`size-9`/`size-10`) that lines up with the matching
Button height. Exports `IconButton`, `iconButtonVariants`, and `IconButtonProps`.
