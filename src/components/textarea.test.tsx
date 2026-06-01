import { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "./textarea.js";

describe("Textarea", () => {
  it("renders a real <textarea> with the base classes", () => {
    render(<Textarea aria-label="Bio" />);
    const textarea = screen.getByRole("textbox", { name: "Bio" });
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveClass("min-h-16");
  });

  it("calls the consumer onChange once per input event", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Textarea aria-label="Bio" onChange={onChange} />);
    await user.type(screen.getByRole("textbox"), "hi");
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("does not add resize-none classes when autoResize is off (default)", () => {
    render(<Textarea aria-label="Bio" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).not.toHaveClass("resize-none");
    expect(textarea).not.toHaveClass("overflow-hidden");
  });

  describe("autoResize", () => {
    it("adds the resize-none / overflow-hidden classes", () => {
      render(<Textarea aria-label="Bio" autoResize />);
      expect(screen.getByRole("textbox")).toHaveClass(
        "resize-none",
        "overflow-hidden",
      );
    });

    it("sizes the field to its scrollHeight on mount", () => {
      // jsdom has no layout engine and always reports scrollHeight === 0, so
      // stub it to prove the resize code path writes the measured height.
      const descriptor = Object.getOwnPropertyDescriptor(
        HTMLTextAreaElement.prototype,
        "scrollHeight",
      );
      Object.defineProperty(HTMLTextAreaElement.prototype, "scrollHeight", {
        configurable: true,
        value: 120,
      });
      try {
        render(<Textarea aria-label="Bio" autoResize defaultValue="line" />);
        expect(screen.getByRole("textbox")).toHaveStyle({ height: "120px" });
      } finally {
        if (descriptor) {
          Object.defineProperty(
            HTMLTextAreaElement.prototype,
            "scrollHeight",
            descriptor,
          );
        } else {
          // @ts-expect-error -- removing the test-only override.
          delete HTMLTextAreaElement.prototype.scrollHeight;
        }
      }
    });

    it("still calls the consumer onChange after resizing", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Textarea aria-label="Bio" autoResize onChange={onChange} />);
      await user.type(screen.getByRole("textbox"), "x");
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  it("forwards a usable ref to the underlying textarea element", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea aria-label="Bio" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    ref.current?.focus();
    expect(ref.current).toHaveFocus();
  });

  it("forwards native attributes (disabled, placeholder, aria-invalid)", () => {
    render(
      <Textarea
        aria-label="Bio"
        disabled
        placeholder="Tell us about yourself"
        aria-invalid
      />,
    );
    const textarea = screen.getByRole("textbox", { name: "Bio" });
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveAttribute("placeholder", "Tell us about yourself");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
  });
});
