import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { CheckboxGroup } from '.'

const sizes = ['sm', 'md', 'lg'] as const
const variants = ['surface', 'soft'] as const

const meta = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup.Root,
  args: {
    color: 'accent',
    defaultValue: ['apple'],
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
    <CheckboxGroup.Root {...args}>
      <CheckboxGroup.Item value="apple">Apple</CheckboxGroup.Item>
      <CheckboxGroup.Item value="banana">Banana</CheckboxGroup.Item>
      <CheckboxGroup.Item value="cherry">Cherry</CheckboxGroup.Item>
    </CheckboxGroup.Root>
  ),
} satisfies Meta<typeof CheckboxGroup.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex gap-12">
      {variants.map((variant) => (
        <CheckboxGroup.Root key={variant} {...args} variant={variant}>
          <CheckboxGroup.Item value="apple">Apple</CheckboxGroup.Item>
          <CheckboxGroup.Item value="banana">Banana</CheckboxGroup.Item>
          <CheckboxGroup.Item value="cherry">Cherry</CheckboxGroup.Item>
        </CheckboxGroup.Root>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex gap-12">
      {sizes.map((size) => (
        <CheckboxGroup.Root key={size} {...args} size={size}>
          <CheckboxGroup.Item value="apple">Apple</CheckboxGroup.Item>
          <CheckboxGroup.Item value="banana">Banana</CheckboxGroup.Item>
          <CheckboxGroup.Item value="cherry">Cherry</CheckboxGroup.Item>
        </CheckboxGroup.Root>
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div className="flex gap-12">
      {(['crimson', 'jade', 'amber'] as const).map((color) => (
        <CheckboxGroup.Root key={color} {...args} color={color} defaultValue={['apple', 'banana']}>
          <CheckboxGroup.Item value="apple">Apple</CheckboxGroup.Item>
          <CheckboxGroup.Item value="banana">Banana</CheckboxGroup.Item>
          <CheckboxGroup.Item value="cherry">Cherry</CheckboxGroup.Item>
        </CheckboxGroup.Root>
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <div className="flex gap-12">
      <CheckboxGroup.Root {...args} disabled>
        <CheckboxGroup.Item value="apple">All disabled</CheckboxGroup.Item>
        <CheckboxGroup.Item value="banana">Banana</CheckboxGroup.Item>
      </CheckboxGroup.Root>
      <CheckboxGroup.Root {...args}>
        <CheckboxGroup.Item value="apple">Apple</CheckboxGroup.Item>
        <CheckboxGroup.Item disabled value="banana">
          One disabled item
        </CheckboxGroup.Item>
      </CheckboxGroup.Root>
    </div>
  ),
}

/** `className` wins over the default styles. */
export const ClassNameOverride: Story = {
  render: (args) => (
    <CheckboxGroup.Root {...args} className="flex-row gap-6">
      <CheckboxGroup.Item className="font-medium text-accent-11" value="apple">
        Apple
      </CheckboxGroup.Item>
      <CheckboxGroup.Item classNames={{ checkbox: 'rounded-full' }} value="banana">
        Banana
      </CheckboxGroup.Item>
    </CheckboxGroup.Root>
  ),
}
