"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils.js";
import { Button, type ButtonProps } from "./button.js";

/**
 * Square size axis for icon-only buttons. The footprints match the Button
 * heights (h-8 / h-9 / h-10) so an IconButton lines up next to the matching
 * text button in toolbars and form rows. Layered onto `Button size="icon"`
 * (which strips the horizontal padding); the dimension class wins the
 * tailwind-merge because Button merges `className` last.
 */
const iconButtonVariants = cva("", {
  variants: {
    size: {
      sm: "size-8",
      md: "size-9",
      lg: "size-10",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface IconButtonProps
  // Drop Button's 4-value `size`; the cva below re-introduces a 3-value
  // square `sm`/`md`/`lg` axis.
  extends Omit<ButtonProps, "size">,
    VariantProps<typeof iconButtonVariants> {
  /**
   * Accessible name for the button. Required — an icon-only button has no
   * visible text, so without it the control is unnamed for screen readers.
   */
  "aria-label": string;
}

/**
 * Icon-only button. A thin wrapper over `Button` that fixes the square
 * `icon` footprint and requires an `aria-label`. Inherits every Button
 * capability — `color`, `variant`, `shape`, `loading`, `asChild`, tokens,
 * dark mode, and the focus ring — and adds its own `sm`/`md`/`lg` size.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size, className, children, ...props }, ref) => (
    <Button
      ref={ref}
      size="icon"
      className={cn(iconButtonVariants({ size }), className)}
      {...props}
    >
      {children}
    </Button>
  ),
);

IconButton.displayName = "IconButton";

export { iconButtonVariants };
