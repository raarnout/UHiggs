---
"@uhiggs/ui": minor
---

Add the `Label` component: an accessible form label built on Radix Label that
associates with a control via `htmlFor` and forwards clicks to it. Tokens only
(dark mode included) and dims automatically when a sibling control is disabled
(`peer-disabled`) or an ancestor marks the field disabled
(`group-data-[disabled=true]`). `forwardRef` onto the DOM node; exports `Label`
and `LabelProps`.
