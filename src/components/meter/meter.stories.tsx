import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { Meter } from './meter'

const sizes = ['sm', 'md', 'lg'] as const
const variants = ['surface', 'soft'] as const

const meta = {
  title: 'Components/Meter',
  component: Meter,
  args: {
    'aria-label': 'Storage used',
    color: 'accent',
    highContrast: false,
    size: 'md',
    value: 60,
    variant: 'surface',
  },
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
} satisfies Meta<typeof Meter>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <Meter key={variant} {...args} variant={variant} />
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <Meter key={size} {...args} size={size} />
      ))}
    </div>
  ),
}

export const HighContrast: Story = {
  render: (args) => (
    <div className="flex w-64 flex-col gap-4">
      {variants.map((variant) => (
        <Meter key={variant} {...args} highContrast variant={variant} />
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-4">
      {colors.map((color) => (
        <Meter key={color} {...args} color={color} />
      ))}
    </div>
  ),
}

export const Radius: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {radii.map((radius) => (
        <Meter key={radius} {...args} radius={radius} size="lg" />
      ))}
    </div>
  ),
}

export const Values: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {[0, 25, 50, 75, 100].map((value) => (
        <Meter key={value} {...args} value={value} />
      ))}
    </div>
  ),
}

/** `className` on the root, `classNames` for the track and the indicator inside. */
export const ClassNameOverride: Story = {
  args: {
    className: 'w-40',
    classNames: { indicator: 'bg-gray-12', track: 'h-3 rounded-none' },
  },
}
