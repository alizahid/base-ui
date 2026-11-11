import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { Progress } from './progress'

const sizes = ['sm', 'md', 'lg'] as const
const variants = ['surface', 'soft'] as const

const meta = {
  title: 'Components/Progress',
  component: Progress,
  args: { 'aria-label': 'Uploading', color: 'accent', size: 'md', value: 60, variant: 'surface' },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    radius: { control: 'inline-radio', options: radii },
    size: { control: 'inline-radio', options: sizes },
    value: { control: { max: 100, min: 0, type: 'range' } },
    variant: { control: 'inline-radio', options: variants },
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <Progress key={variant} {...args} variant={variant} />
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <Progress key={size} {...args} size={size} />
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-4">
      {colors.map((color) => (
        <Progress key={color} {...args} color={color} />
      ))}
    </div>
  ),
}

export const Radius: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {radii.map((radius) => (
        <Progress key={radius} {...args} radius={radius} size="lg" />
      ))}
    </div>
  ),
}

export const Values: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {[0, 25, 50, 75, 100].map((value) => (
        <Progress key={value} {...args} value={value} />
      ))}
    </div>
  ),
}

/** With no value the bar fills the track and pulses. */
export const Indeterminate: Story = {
  args: { value: null },
}

/** `className` on the root, `classNames` for the track and the indicator inside. */
export const ClassNameOverride: Story = {
  args: {
    className: 'w-40',
    classNames: { indicator: 'bg-gray-12', track: 'h-3 rounded-none' },
  },
}
