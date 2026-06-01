import type { Meta, StoryObj } from "@storybook/react-vite";

import { Textarea } from "./textarea.js";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: [
          "The `Textarea` component is a styled multi-line text field. It renders a real",
          "`<textarea>` and is data-agnostic — `value`/`defaultValue`, `onChange`, `rows`,",
          "`placeholder`, `name`, and `aria-invalid` all flow through as standard textarea",
          "props, so it drops straight into react-hook-form or any controlled form. It supports",
          "a native `disabled` state, an `aria-invalid` error state that styles the border and",
          "focus ring with the destructive token, and an optional `autoResize` prop that grows",
          "the field to fit its content.",
          "",
          "Always pair it with a `<label htmlFor>` (or `aria-labelledby`) so the field is named",
          "for assistive tech.",
          "",
          "## Usage",
          "",
          "```tsx",
          'import { Textarea } from "@uhiggs/ui";',
          "",
          '<Textarea placeholder="Leave a comment…" />',
          "```",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text shown when the field is empty.",
    },
    rows: {
      control: "number",
      description: "Initial visible number of text rows. Forwarded to `<textarea>`.",
    },
    autoResize: {
      control: "boolean",
      description:
        "Grow the field to fit its content as the user types, removing the manual resize handle and scrollbar.",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      description: "Disables the textarea and blocks interaction.",
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
    placeholder: "Leave a comment…",
    autoResize: false,
    disabled: false,
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The default textarea. Use the controls above to explore the props live. */
export const Default: Story = {};

/** A disabled textarea is non-interactive and dimmed via the native `disabled` attribute. */
export const Disabled: Story = {
  args: { disabled: true, value: "Can't touch this" },
  parameters: {
    docs: {
      source: {
        code: `import { Textarea } from "@uhiggs/ui";

<Textarea disabled value="Can't touch this" />`,
      },
    },
  },
};

/**
 * Setting `aria-invalid` styles the border and focus ring with the destructive
 * token. It is both the visual error state and the semantic signal for assistive
 * tech, so the look never diverges from what screen readers announce — wire it to
 * your form's error state (e.g. react-hook-form's `errors`).
 */
export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "Too short" },
  parameters: {
    docs: {
      source: {
        code: `import { Textarea } from "@uhiggs/ui";

<Textarea aria-invalid defaultValue="Too short" />`,
      },
    },
  },
};

/**
 * With `autoResize`, the field grows to fit its content as you type and the
 * manual resize handle is removed. It works in every browser (driven by
 * `scrollHeight`).
 */
export const AutoResize: Story = {
  args: {
    autoResize: true,
    defaultValue:
      "This textarea grows as you type.\nAdd more lines and watch it expand to fit the content.",
  },
  parameters: {
    docs: {
      source: {
        code: `import { Textarea } from "@uhiggs/ui";

<Textarea autoResize defaultValue="This textarea grows as you type." />`,
      },
    },
  },
};

/**
 * The library ships no label — pair the `Textarea` with a `<label htmlFor>` (or
 * `aria-labelledby`) so the field is named for assistive tech. The `id` ties the
 * label to the textarea.
 */
export const WithLabel: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Textarea } from "@uhiggs/ui";

<div className="flex flex-col gap-1.5">
  <label htmlFor="bio" className="text-sm font-medium text-foreground">
    Bio
  </label>
  <Textarea id="bio" placeholder="Tell us about yourself…" />
</div>`,
      },
    },
  },
  render: () => (
    <div className="flex w-80 flex-col gap-1.5">
      <label htmlFor="bio" className="text-sm font-medium text-foreground">
        Bio
      </label>
      <Textarea id="bio" placeholder="Tell us about yourself…" />
    </div>
  ),
};
