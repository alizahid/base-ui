import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { Button } from '../button'
import { IconButton } from './icon-button'

const variants = ['solid', 'soft', 'surface', 'outline', 'ghost'] as const
const sizes = ['sm', 'md', 'lg', 'xl'] as const

function StarIcon() {
  return (
    <svg aria-hidden="true" className="size-[1em]" fill="currentColor" viewBox="0 0 16 16">
      <path d="m8 1.5 2 4.2 4.5.6-3.3 3.1.8 4.6L8 11.8 4 14l.8-4.6L1.5 6.3 6 5.7z" />
    </svg>
  )
}

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  args: {
    'aria-label': 'Favorite',
    children: <StarIcon />,
    color: 'accent',
    disabled: false,
    highContrast: false,
    loading: false,
    size: 'md',
    variant: 'solid',
  },
  argTypes: {
    children: { control: false },
    color: { control: 'select', options: ['accent', ...colors] },
    radius: { control: 'inline-radio', options: radii },
    size: { control: 'inline-radio', options: sizes },
    variant: { control: 'inline-radio', options: variants },
  },
} satisfies Meta<typeof IconButton>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <IconButton key={variant} {...args} variant={variant} />
      ))}
    </div>
  ),
}

/** Same heights as `Button`, so they line up in a row. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <div className="flex items-center gap-2" key={size}>
          <IconButton {...args} size={size} />
          <Button size={size}>Size {size}</Button>
        </div>
      ))}
    </div>
  ),
}

export const Radius: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      {radii.map((radius) => (
        <IconButton key={radius} {...args} radius={radius} />
      ))}
    </div>
  ),
}

export const States: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <IconButton {...args} disabled />
      <IconButton {...args} loading />
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      {colors.map((color) => (
        <IconButton key={color} {...args} aria-label={color} color={color} variant="soft" />
      ))}
    </div>
  ),
}

export const ClassNameOverride: Story = {
  args: { className: 'rounded-full bg-accent-12 text-gray-1 hover:bg-accent-11' },
}
