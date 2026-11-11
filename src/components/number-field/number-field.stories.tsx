import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { Button } from '../button'
import { NumberField } from './number-field'

const sizes = ['xs', 'sm', 'md', 'lg'] as const

const meta = {
  title: 'Components/NumberField',
  component: NumberField,
  args: {
    'aria-label': 'Amount',
    color: 'accent',
    defaultValue: 10,
    disabled: false,
    size: 'md',
  },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    radius: { control: 'inline-radio', options: radii },
    size: { control: 'inline-radio', options: sizes },
  },
} satisfies Meta<typeof NumberField>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** A number field and a button of the same size line up. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <div className="flex gap-2" key={size}>
          <NumberField {...args} size={size} />
          <Button size={size}>Add</Button>
        </div>
      ))}
    </div>
  ),
}

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-4">
      <NumberField {...args} defaultValue={undefined} placeholder="Empty" />
      <NumberField {...args} defaultValue={5} max={5} min={0} />
      <NumberField {...args} disabled />
      <NumberField {...args} readOnly />
      <NumberField {...args} data-invalid="" />
    </div>
  ),
}

export const Formatted: Story = {
  args: {
    defaultValue: 1234.5,
    format: { currency: 'EUR', style: 'currency' },
    step: 0.5,
  },
}

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      {(['crimson', 'jade', 'amber'] as const).map((color) => (
        <NumberField key={color} {...args} color={color} />
      ))}
    </div>
  ),
}

export const Radius: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-4">
      {radii.map((radius) => (
        <NumberField key={radius} {...args} radius={radius} />
      ))}
    </div>
  ),
}

/** `className` and `classNames` win over the default styles. */
export const ClassNameOverride: Story = {
  args: {
    className: 'w-56 rounded-none bg-accent-a3 inset-ring-accent-a8',
    classNames: {
      decrement: 'bg-accent-9 text-accent-contrast hover:bg-accent-10',
      increment: 'bg-accent-9 text-accent-contrast hover:bg-accent-10',
      input: 'font-bold text-accent-11',
    },
  },
}
