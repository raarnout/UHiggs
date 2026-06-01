import { createRef } from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Label } from "./label.js";

describe("Label", () => {
  it("renders its text content", () => {
    render(<Label>Email</Label>);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("associates with a control via htmlFor and focuses it on click", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" type="text" />
      </>,
    );
    await user.click(screen.getByText("Email"));
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it("includes the disabled-dimming utility classes", () => {
    render(<Label>Email</Label>);
    const label = screen.getByText("Email");
    expect(label.className).toContain("peer-disabled:opacity-50");
    expect(label.className).toContain("group-data-[disabled=true]:opacity-50");
  });

  it("merges a consumer className alongside the base classes", () => {
    render(<Label className="custom-class">Email</Label>);
    const label = screen.getByText("Email");
    expect(label).toHaveClass("custom-class", "font-medium");
  });

  it("forwards its ref to the underlying label element", () => {
    const ref = createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Email</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });
});
