import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "./input.js";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    docs: {
      description: {
        component: [
          "The `Input` component is a styled text field. It renders a real `<input>` and is",
          "data-agnostic — `value`/`defaultValue`, `onChange`, `type`, `placeholder`, `name`,",
          "and `aria-invalid` all flow through as standard input props, so it drops straight",
          "into react-hook-form or any controlled form. It supports three `size`s, a native",
          "`disabled` state, and an `aria-invalid` error state that styles the border and focus",
          "ring with the destructive token.",
          "",
          "Always pair it with a `<label htmlFor>` (or `aria-labelledby`) so the field is named",
          "for assistive tech.",
          "",
          "## Usage",
          "",
          "```tsx",
          'import { Input } from "@uhiggs/ui";',
          "",
          '<Input type="email" placeholder="you@example.com" />',
          "```",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
      description: "Native input `type`. Forwarded to the underlying `<input>`.",
      table: { defaultValue: { summary: "text" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Overall size. Heights match Button so they align in a row.",
      table: { defaultValue: { summary: "md" } },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown when the field is empty.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input and blocks interaction.",
      table: { defaultValue: { summary: "false" } },
    },
    "aria-invalid": {
      control: "boolean",
      description:
        "Marks the field invalid: destructive border + focus ring, and the semantic error signal for screen readers.",
      table: { defaultValue: { summary: "false" } },
    },
  },
  args: {
    type: "text",
    placeholder: "Email",
    size: "md",
    disabled: false,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The default input. Use the controls above to explore the props live. */
export const Default: Story = {};

/**
 * The `size` prop controls height, padding, and text size. Heights match the
 * Button sizes (`sm`/`md`/`lg` → `h-8`/`h-9`/`h-10`) so an input and a button
 * line up on the same form row.
 */
export const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Input } from "@uhiggs/ui";

<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`,
      },
    },
  },
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
};

/** A disabled input is non-interactive and dimmed via the native `disabled` attribute. */
export const Disabled: Story = {
  args: { disabled: true, value: "Can't touch this" },
  parameters: {
    docs: {
      source: {
        code: `import { Input } from "@uhiggs/ui";

<Input disabled value="Can't touch this" />`,
      },
    },
  },
};

/**
 * Setting `aria-invalid` styles the border and focus ring with the destructive
 * token. It is both the visual error state and the semantic signal for assistive
 * tech, so the look never diverges from what screen readers announce — wire it
 * to your form's error state (e.g. react-hook-form's `errors`).
 */
export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "not-an-email" },
  parameters: {
    docs: {
      source: {
        code: `import { Input } from "@uhiggs/ui";

<Input type="email" aria-invalid defaultValue="not-an-email" />`,
      },
    },
  },
};

/**
 * The library ships no label — pair the `Input` with a `<label htmlFor>` (or
 * `aria-labelledby`) so the field is named for assistive tech. The `id` ties the
 * label to the input.
 */
export const WithLabel: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Input } from "@uhiggs/ui";

<div className="flex flex-col gap-1.5">
  <label htmlFor="email" className="text-sm font-medium text-foreground">
    Email
  </label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>`,
      },
    },
  },
  render: () => (
    <div className="flex w-72 flex-col gap-1.5">
      <label htmlFor="email" className="text-sm font-medium text-foreground">
        Email
      </label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
};

/**
 * The native `type` is forwarded to the underlying `<input>`, so the field
 * behaves and validates like a standard input of that type.
 */
export const Types: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Input } from "@uhiggs/ui";

<Input type="text" placeholder="Text" />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
<Input type="number" placeholder="Number" />`,
      },
    },
  },
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <Input type="text" placeholder="Text" />
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input type="number" placeholder="Number" />
    </div>
  ),
};
