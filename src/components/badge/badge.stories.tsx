import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { Badge } from './badge'

const variants = ['solid', 'soft', 'surface', 'outline'] as const
const sizes = ['sm', 'md', 'lg'] as const

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'New', color: 'accent', size: 'sm', variant: 'soft' },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    radius: { control: 'inline-radio', options: radii },
    size: { control: 'inline-radio', options: sizes },
    variant: { control: 'inline-radio', options: variants },
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      {variants.map((variant) => (
        <Badge key={variant} {...args} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      {sizes.map((size) => (
        <Badge key={size} {...args} size={size}>
          Size {size}
        </Badge>
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div className="grid grid-cols-[repeat(4,max-content)] gap-2">
      {colors.map((color) =>
        variants.map((variant) => (
          <Badge key={`${color}-${variant}`} {...args} color={color} variant={variant}>
            {color}
          </Badge>
        )),
      )}
    </div>
  ),
}

export const Radius: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      {radii.map((radius) => (
        <Badge key={radius} {...args} radius={radius}>
          {radius}
        </Badge>
      ))}
    </div>
  ),
}

export const ClassNameOverride: Story = {
  args: { children: 'Custom', className: 'rounded-full bg-accent-12 px-3 text-gray-1 uppercase' },
}
