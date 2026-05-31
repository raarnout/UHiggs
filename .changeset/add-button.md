---
"@uhiggs/ui": minor
---

Add the `Button` component: `default`/`secondary`/`outline`/`ghost`/`destructive`/`link`
variants and `sm`/`md`/`lg`/`icon` sizes via cva, `asChild` support through Radix
Slot, and a `loading` state that disables the button and shows a centered spinner
while preserving the button's width. Exports `Button`, `buttonVariants`, and
`ButtonProps`. (Spinner is a temporary inline SVG, to be replaced by a shared
`<Spinner>` later this phase.)
