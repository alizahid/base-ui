import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from '../checkbox'
import { NumberField } from '../number-field'
import { Slider } from '../slider'
import { TextField } from '../text-field'
import { Field } from '.'

const meta = {
  title: 'Components/Field',
  component: Field.Root,
  args: { disabled: false, invalid: false },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Field.Root {...args}>
      <Field.Label>Name</Field.Label>
      <TextField placeholder="Your name" required />
      <Field.Description>Visible on your profile.</Field.Description>
      <Field.Error />
    </Field.Root>
  ),
} satisfies Meta<typeof Field.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Type something, clear it and leave the input to see the built-in error. */
export const Validation: Story = {
  args: { validationMode: 'onBlur' },
  render: (args) => (
    <Field.Root {...args}>
      <Field.Label>Email</Field.Label>
      <TextField placeholder="you@example.com" required type="email" />
      <Field.Error match="valueMissing">Please enter your email.</Field.Error>
      <Field.Error match="typeMismatch">This is not a valid email address.</Field.Error>
    </Field.Root>
  ),
}

export const Invalid: Story = {
  args: { invalid: true },
  render: (args) => (
    <Field.Root {...args}>
      <Field.Label>Username</Field.Label>
      <TextField defaultValue="admin" />
      <Field.Error match>This username is already taken.</Field.Error>
    </Field.Root>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
}

/** `Field.Control` with `render` gives the same result as a bare `Input`. */
export const WithControl: Story = {
  render: (args) => (
    <Field.Root {...args}>
      <Field.Label>City</Field.Label>
      <Field.Control placeholder="Where you live" render={<TextField />} />
      <Field.Description>Uses Field.Control with render.</Field.Description>
    </Field.Root>
  ),
}

export const OtherControls: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <Field.Root {...args}>
        <Field.Label>Amount</Field.Label>
        <NumberField defaultValue={3} />
        <Field.Description>A number field.</Field.Description>
      </Field.Root>
      <Field.Root {...args} className="items-stretch">
        <Field.Label>Volume</Field.Label>
        <Slider defaultValue={40} />
      </Field.Root>
      <Field.Root {...args}>
        <Field.Label className="flex items-center gap-2 font-normal">
          <Checkbox />
          Send me the newsletter
        </Field.Label>
      </Field.Root>
    </div>
  ),
}

/** `className` wins over the default styles. */
export const ClassNameOverride: Story = {
  args: { invalid: true },
  render: (args) => (
    <Field.Root {...args} className="gap-3">
      <Field.Label className="text-accent-11 text-lg">Big label</Field.Label>
      <TextField />
      <Field.Description className="text-xs italic">Small italic description</Field.Description>
      <Field.Error className="font-bold text-xs" match>
        Small bold error
      </Field.Error>
    </Field.Root>
  ),
}
