"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentRef,
} from "react";
import { Label as LabelPrimitive } from "radix-ui";
import { cn } from "../lib/utils.js";

/**
 * Props for {@link Label} — the native Radix Label props. Associate the label
 * with a control via `htmlFor` (matching the control's `id`).
 */
export type LabelProps = ComponentPropsWithoutRef<typeof LabelPrimitive.Root>;

/**
 * Accessible form label built on Radix Label. Associate it with a control via
 * `htmlFor`; clicking it focuses/toggles that control. Dims automatically when a
 * sibling control is `:disabled` (`peer-disabled`) or when an ancestor marks the
 * field disabled (`group-data-[disabled=true]`). Tokens only; dark mode works.
 */
export const Label = forwardRef<
  ComponentRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
      className,
    )}
    {...props}
  />
));

Label.displayName = "Label";
