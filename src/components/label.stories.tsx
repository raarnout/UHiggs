import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "./input.js";
import { Label } from "./label.js";

const meta = {
  title: "Components/Label",
  component: Label,
  parameters: {
    docs: {
      description: {
        component: [
          "The `Label` component is an accessible form label built on Radix Label. Associate it",
          "with a control via `htmlFor` (matching the control's `id`) and clicking the label",
          "focuses or toggles that control. It is tokens-only (so it inherits the host surface",
          "and works in dark mode) and dims automatically when a sibling control is `:disabled`",
          "(`peer-disabled`) or when an ancestor marks the field disabled",
          "(`group-data-[disabled=true]`).",
          "",
          "## Usage",
          "",
          "```tsx",
          'import { Label } from "@uhiggs/ui";',
          "",
          '<Label htmlFor="email">Email</Label>',
          "```",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "Label text content.",
    },
    htmlFor: {
      control: "text",
      description: "`id` of the control this label names.",
    },
  },
  args: {
    children: "Email",
    htmlFor: "email",
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The default label. Use the controls above to explore the props live. */
export const Default: Story = {};

/**
 * The canonical pairing: a `Label` whose `htmlFor` matches the `Input`'s `id`, so
 * clicking the label focuses the field and screen readers announce the field's name.
 */
export const WithInput: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Input, Label } from "@uhiggs/ui";

<div className="flex flex-col gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>`,
      },
    },
  },
  render: () => (
    <div className="flex w-72 flex-col gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
};

/**
 * Mark a required field by including a destructive asterisk in the label's
 * children. The color comes from the `destructive` token, so it stays correct in
 * dark mode.
 */
export const Required: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Input, Label } from "@uhiggs/ui";

<div className="flex flex-col gap-1.5">
  <Label htmlFor="name">
    Full name <span className="text-destructive">*</span>
  </Label>
  <Input id="name" required placeholder="Ada Lovelace" />
</div>`,
      },
    },
  },
  render: () => (
    <div className="flex w-72 flex-col gap-1.5">
      <Label htmlFor="name">
        Full name <span className="text-destructive">*</span>
      </Label>
      <Input id="name" required placeholder="Ada Lovelace" />
    </div>
  ),
};

/**
 * The label dims with its field. Here an ancestor sets `data-disabled` on a
 * `group` wrapper, so `group-data-[disabled=true]` fades the label alongside the
 * disabled `Input`. For inline (checkbox-style) layouts where the label is a
 * sibling after the control, `peer-disabled` achieves the same.
 */
export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Input, Label } from "@uhiggs/ui";

<div data-disabled={true} className="group flex flex-col gap-1.5">
  <Label htmlFor="disabled-field">Disabled field</Label>
  <Input id="disabled-field" disabled placeholder="Unavailable" />
</div>`,
      },
    },
  },
  render: () => (
    <div data-disabled={true} className="group flex w-72 flex-col gap-1.5">
      <Label htmlFor="disabled-field">Disabled field</Label>
      <Input id="disabled-field" disabled placeholder="Unavailable" />
    </div>
  ),
};
