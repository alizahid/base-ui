import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { Toggle } from './toggle'

const variants = ['soft', 'surface', 'outline', 'ghost'] as const
const sizes = ['sm', 'md', 'lg', 'xl'] as const

function StarIcon() {
  return (
    <svg aria-hidden="true" className="size-[1em]" fill="currentColor" viewBox="0 0 16 16">
      <path d="m8 1.5 2 4.3 4.7.6-3.5 3.2.9 4.6L8 11.9l-4.1 2.3.9-4.6L1.3 6.4 6 5.8z" />
    </svg>
  )
}

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  args: {
    children: 'Toggle',
    color: 'accent',
    disabled: false,
    size: 'md',
    variant: 'ghost',
  },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    radius: { control: 'inline-radio', options: radii },
    size: { control: 'inline-radio', options: sizes },
    variant: { control: 'inline-radio', options: variants },
  },
} satisfies Meta<typeof Toggle>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Top row is not pressed, bottom row is pressed. */
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {[false, true].map((pressed) => (
        <div className="flex flex-wrap items-center gap-4" key={String(pressed)}>
          {variants.map((variant) => (
            <Toggle key={variant} {...args} defaultPressed={pressed} variant={variant}>
              {variant}
            </Toggle>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      {sizes.map((size) => (
        <Toggle key={size} {...args} defaultPressed size={size}>
          Size {size}
        </Toggle>
      ))}
    </div>
  ),
}

/** For a toggle with only an icon, `aspect-square px-0` makes it square like an `IconButton`. */
export const WithIcon: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      {sizes.map((size) => (
        <Toggle
          key={size}
          {...args}
          aria-label="Favorite"
          className="aspect-square px-0"
          size={size}
        >
          <StarIcon />
        </Toggle>
      ))}
      <Toggle {...args}>
        <StarIcon />
        Favorite
      </Toggle>
    </div>
  ),
}

/** `highContrast` uses the darkest step of the color for the text. */
export const HighContrast: Story = {
  args: { highContrast: true },
  render: Variants.render,
}

export const Disabled: Story = {
  args: { disabled: true },
  render: Variants.render,
}

export const Colors: Story = {
  render: (args) => (
    <div className="grid grid-cols-[auto_repeat(4,max-content)] items-center gap-x-6 gap-y-3">
      {(['accent', ...colors] as const).map((color) => (
        <div className="contents" key={color}>
          <span className="text-gray-11 text-sm">{color}</span>
          {variants.map((variant) => (
            <Toggle key={variant} {...args} color={color} defaultPressed variant={variant}>
              {variant}
            </Toggle>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Radius: Story = {
  args: { defaultPressed: true },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      {radii.map((radius) => (
        <Toggle key={radius} {...args} radius={radius}>
          {radius}
        </Toggle>
      ))}
    </div>
  ),
}

/** `className` wins over the default styles. */
export const ClassNameOverride: Story = {
  args: {
    children: 'Press me',
    defaultPressed: true,
    className: 'rounded-full px-8 data-pressed:bg-accent-9 data-pressed:text-accent-contrast',
  },
}
