import type { Meta, StoryObj } from '@storybook/react-vite'
import { Field } from '../field'
import { TextField } from '../text-field'
import { Fieldset } from '.'

const meta = {
  title: 'Components/Fieldset',
  component: Fieldset.Root,
  args: { disabled: false },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Fieldset.Root {...args}>
      <Fieldset.Legend>Billing details</Fieldset.Legend>
      <Field.Root>
        <Field.Label>Company</Field.Label>
        <TextField.Root placeholder="Company name" />
      </Field.Root>
      <Field.Root>
        <Field.Label>Tax ID</Field.Label>
        <TextField.Root placeholder="Tax number" />
      </Field.Root>
    </Fieldset.Root>
  ),
} satisfies Meta<typeof Fieldset.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Disabled: Story = {
  args: { disabled: true },
}

/** `className` wins over the default styles. */
export const ClassNameOverride: Story = {
  render: (args) => (
    <Fieldset.Root {...args} className="gap-2 rounded-ui-lg border border-gray-a6 p-4">
      <Fieldset.Legend className="border-gray-a6 border-b pb-2 text-accent-11 text-lg">
        Boxed fieldset
      </Fieldset.Legend>
      <Field.Root>
        <Field.Label>Company</Field.Label>
        <TextField.Root placeholder="Company name" />
      </Field.Root>
    </Fieldset.Root>
  ),
}
