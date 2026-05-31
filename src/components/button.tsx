"use client";

import { forwardRef, type ComponentProps } from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils.js";

/**
 * Button style contract. Tokens only — never hardcode colors or radius.
 * `size: "icon"` is square for icon-only triggers.
 */
const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-9 px-4 py-2",
        lg: "h-10 px-6",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

// TODO: replace with the shared <Spinner> component later this phase.
function ButtonSpinner() {
  return (
    <svg
      className="animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  /**
   * Render the child element instead of a `<button>` (Radix Slot).
   * @default false
   */
  asChild?: boolean;
  /**
   * Disable the button and show a centered spinner. The button keeps the same
   * width as its non-loading state — the label is hidden in place, not removed.
   * @default false
   */
  loading?: boolean;
}

/**
 * Primary action button. Variants and sizes via cva; `asChild` lets it adopt a
 * different element (e.g. an anchor) while keeping the styling.
 *
 * Note: with `asChild`, Radix Slot requires a single child, so the loading
 * spinner is not injected — `loading` only sets the disabled/`aria-busy` state.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, disabled, children, ...props },
    ref,
  ) => {
    if (asChild) {
      return (
        <Slot.Root
          ref={ref}
          className={cn(buttonVariants({ variant, size }), className)}
          aria-busy={loading || undefined}
          data-loading={loading || undefined}
          {...props}
        >
          {children}
        </Slot.Root>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={loading || disabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <>
            <span className="absolute inset-0 flex items-center justify-center">
              <ButtonSpinner />
            </span>
            <span className="invisible inline-flex items-center gap-2">
              {children}
            </span>
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { buttonVariants };
