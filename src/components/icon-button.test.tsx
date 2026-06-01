import { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IconButton } from "./icon-button.js";

// A trivial inline icon stand-in; the real consumer passes a lucide-react icon.
function Icon() {
  return <svg data-testid="icon" aria-hidden="true" />;
}

describe("IconButton", () => {
  it("exposes its aria-label as the accessible name", () => {
    render(
      <IconButton aria-label="Delete">
        <Icon />
      </IconButton>,
    );
    expect(
      screen.getByRole("button", { name: "Delete" }),
    ).toBeInTheDocument();
  });

  it("applies the square size class per `size`", () => {
    const { rerender } = render(
      <IconButton aria-label="Delete" size="sm">
        <Icon />
      </IconButton>,
    );
    expect(screen.getByRole("button")).toHaveClass("size-8");

    rerender(
      <IconButton aria-label="Delete" size="md">
        <Icon />
      </IconButton>,
    );
    expect(screen.getByRole("button")).toHaveClass("size-9");

    rerender(
      <IconButton aria-label="Delete" size="lg">
        <Icon />
      </IconButton>,
    );
    expect(screen.getByRole("button")).toHaveClass("size-10");
  });

  it("defaults to the md square size", () => {
    render(
      <IconButton aria-label="Delete">
        <Icon />
      </IconButton>,
    );
    expect(screen.getByRole("button")).toHaveClass("size-9");
  });

  it("inherits Button's loading behavior (disabled + aria-busy)", () => {
    render(
      <IconButton aria-label="Delete" loading>
        <Icon />
      </IconButton>,
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <IconButton aria-label="Delete" onClick={onClick}>
        <Icon />
      </IconButton>,
    );
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("forwards its ref to the underlying button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <IconButton aria-label="Delete" ref={ref}>
        <Icon />
      </IconButton>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
