import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { RadioGroup } from '.'

const sizes = ['sm', 'md', 'lg'] as const
const variants = ['surface', 'soft'] as const

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup.Root,
  args: {
    color: 'accent',
    defaultValue: 'comfortable',
    disabled: false,
    size: 'md',
    variant: 'surface',
  },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    size: { control: 'inline-radio', options: sizes },
    variant: { control: 'inline-radio', options: variants },
  },
  render: (args) => (
    <RadioGroup.Root {...args}>
      <RadioGroup.Item value="default">Default</RadioGroup.Item>
      <RadioGroup.Item value="comfortable">Comfortable</RadioGroup.Item>
      <RadioGroup.Item value="compact">Compact</RadioGroup.Item>
    </RadioGroup.Root>
  ),
} satisfies Meta<typeof RadioGroup.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex gap-12">
      {variants.map((variant) => (
        <RadioGroup.Root key={variant} {...args} variant={variant}>
          <RadioGroup.Item value="default">Default</RadioGroup.Item>
          <RadioGroup.Item value="comfortable">Comfortable</RadioGroup.Item>
          <RadioGroup.Item value="compact">Compact</RadioGroup.Item>
        </RadioGroup.Root>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex gap-12">
      {sizes.map((size) => (
        <RadioGroup.Root key={size} {...args} size={size}>
          <RadioGroup.Item value="default">Default</RadioGroup.Item>
          <RadioGroup.Item value="comfortable">Comfortable</RadioGroup.Item>
          <RadioGroup.Item value="compact">Compact</RadioGroup.Item>
        </RadioGroup.Root>
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div className="flex gap-12">
      {(['crimson', 'jade', 'amber'] as const).map((color) => (
        <RadioGroup.Root key={color} {...args} color={color}>
          <RadioGroup.Item value="default">Default</RadioGroup.Item>
          <RadioGroup.Item value="comfortable">Comfortable</RadioGroup.Item>
          <RadioGroup.Item value="compact">Compact</RadioGroup.Item>
        </RadioGroup.Root>
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <div className="flex gap-12">
      <RadioGroup.Root {...args} disabled>
        <RadioGroup.Item value="default">All disabled</RadioGroup.Item>
        <RadioGroup.Item value="comfortable">Comfortable</RadioGroup.Item>
      </RadioGroup.Root>
      <RadioGroup.Root {...args}>
        <RadioGroup.Item value="default">Default</RadioGroup.Item>
        <RadioGroup.Item value="comfortable">Comfortable</RadioGroup.Item>
        <RadioGroup.Item disabled value="compact">
          One disabled item
        </RadioGroup.Item>
      </RadioGroup.Root>
    </div>
  ),
}

/** `highContrast` uses the darkest step of the color. */
export const HighContrast: Story = {
  render: (args) => (
    <div className="flex gap-12">
      {variants.map((variant) => (
        <RadioGroup.Root key={variant} {...args} highContrast variant={variant}>
          <RadioGroup.Item value="default">Default</RadioGroup.Item>
          <RadioGroup.Item value="comfortable">Comfortable</RadioGroup.Item>
          <RadioGroup.Item value="compact">Compact</RadioGroup.Item>
        </RadioGroup.Root>
      ))}
    </div>
  ),
}

/** `className` wins over the default styles. */
export const ClassNameOverride: Story = {
  render: (args) => (
    <RadioGroup.Root {...args} className="flex-row gap-6">
      <RadioGroup.Item className="font-medium text-accent-11" value="default">
        Default
      </RadioGroup.Item>
      <RadioGroup.Item classNames={{ radio: 'rounded-ui-sm' }} value="comfortable">
        Comfortable
      </RadioGroup.Item>
    </RadioGroup.Root>
  ),
}
