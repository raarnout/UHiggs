import { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./input.js";

describe("Input", () => {
  it("renders a real <input>", () => {
    render(<Input aria-label="Name" />);
    const input = screen.getByRole("textbox", { name: "Name" });
    expect(input.tagName).toBe("INPUT");
  });

  it("applies the size class per `size` (default md)", () => {
    const { rerender } = render(<Input aria-label="Name" />);
    expect(screen.getByRole("textbox")).toHaveClass("h-9");

    rerender(<Input aria-label="Name" size="sm" />);
    expect(screen.getByRole("textbox")).toHaveClass("h-8");

    rerender(<Input aria-label="Name" size="lg" />);
    expect(screen.getByRole("textbox")).toHaveClass("h-10");
  });

  it("fires onChange with the typed value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input aria-label="Name" onChange={onChange} />);
    await user.type(screen.getByRole("textbox"), "abc");
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(screen.getByRole("textbox")).toHaveValue("abc");
  });

  it("forwards native attributes (type, placeholder, name)", () => {
    render(
      <Input
        aria-label="Email"
        type="email"
        placeholder="you@example.com"
        name="email"
      />,
    );
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("placeholder", "you@example.com");
    expect(input).toHaveAttribute("name", "email");
  });

  it("blocks typing when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input aria-label="Name" disabled onChange={onChange} />);
    await user.type(screen.getByRole("textbox"), "abc");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("passes through aria-invalid for the error state", () => {
    render(<Input aria-label="Name" aria-invalid />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("forwards its ref to the underlying input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input aria-label="Name" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("merges a consumer className alongside the variant classes", () => {
    render(<Input aria-label="Name" className="custom-class" />);
    expect(screen.getByRole("textbox")).toHaveClass("custom-class", "h-9");
  });
});
