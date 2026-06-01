---
"@uhiggs/ui": minor
---

Add the `Input` component: a tokens-only, data-agnostic text field that renders a
real `<input>` and forwards all standard props (`value`/`defaultValue`,
`onChange`, `type`, `placeholder`, `name`, `aria-invalid`), so it drops straight
into react-hook-form or any controlled form. It adds a three-value `size`
(`sm`/`md`/`lg` → `h-8`/`h-9`/`h-10`) whose heights match Button, a native
`disabled` state, and an `aria-invalid` error state. Focus uses a Bootstrap-style
glow — a soft 4px `--primary` ring at 25% opacity hugging the border (no offset)
plus a `--primary` border; when `aria-invalid` is set the glow and border swap to
`--destructive`, so the look never diverges from the screen-reader semantics.
`forwardRef` onto the DOM node; exports `Input`, `inputVariants`, and
`InputProps`.
