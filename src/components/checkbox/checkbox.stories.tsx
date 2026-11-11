import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { Checkbox } from './checkbox'

const sizes = ['sm', 'md', 'lg'] as const
const variants = ['surface', 'soft'] as const

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: { color: 'accent', defaultChecked: true, disabled: false, size: 'md', variant: 'surface' },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    radius: { control: 'inline-radio', options: radii },
    size: { control: 'inline-radio', options: sizes },
    variant: { control: 'inline-radio', options: variants },
  },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <div className="flex items-center gap-4" key={variant}>
          <Checkbox {...args} defaultChecked={false} variant={variant} />
          <Checkbox {...args} defaultChecked variant={variant} />
          <Checkbox {...args} indeterminate variant={variant} />
          <span className="text-gray-11 text-sm">{variant}</span>
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      {sizes.map((size) => (
        <Checkbox key={size} {...args} size={size} />
      ))}
      {sizes.map((size) => (
        <Checkbox key={size} {...args} indeterminate size={size} />
      ))}
    </div>
  ),
}

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <div className="flex items-center gap-4" key={variant}>
          <Checkbox {...args} defaultChecked={false} variant={variant} />
          <Checkbox {...args} defaultChecked variant={variant} />
          <Checkbox {...args} indeterminate variant={variant} />
          <Checkbox {...args} defaultChecked={false} disabled variant={variant} />
          <Checkbox {...args} defaultChecked disabled variant={variant} />
          <Checkbox {...args} disabled indeterminate variant={variant} />
        </div>
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <div className="flex flex-wrap items-center gap-4" key={variant}>
          {colors.map((color) => (
            <Checkbox key={color} {...args} color={color} variant={variant} />
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Radius: Story = {
  args: { size: 'lg' },
  render: (args) => (
    <div className="flex items-center gap-4">
      {radii.map((radius) => (
        <Checkbox key={radius} {...args} radius={radius} />
      ))}
    </div>
  ),
}

export const WithLabel: Story = {
  render: (args) => (
    <label className="flex items-center gap-2 text-sm">
      <Checkbox {...args} />
      Accept terms and conditions
    </label>
  ),
}

/** `highContrast` uses the darkest step of the color. */
export const HighContrast: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <div className="flex items-center gap-4" key={variant}>
          <Checkbox {...args} variant={variant} />
          <Checkbox {...args} highContrast variant={variant} />
          <Checkbox {...args} highContrast indeterminate variant={variant} />
          <Checkbox {...args} disabled highContrast variant={variant} />
        </div>
      ))}
    </div>
  ),
}

/** `className` wins over the default styles. */
export const ClassNameOverride: Story = {
  args: {
    className: 'size-6 rounded-full data-checked:bg-accent-12',
    classNames: { indicator: 'size-4 text-gray-1' },
  },
}
