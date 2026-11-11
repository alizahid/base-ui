import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { ToggleGroup } from '.'

const variants = ['soft', 'surface', 'outline', 'ghost'] as const
const sizes = ['sm', 'md', 'lg', 'xl'] as const

const meta = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup.Root,
  args: {
    'aria-label': 'Text alignment',
    color: 'accent',
    defaultValue: ['left'],
    disabled: false,
    multiple: false,
    size: 'md',
    variant: 'ghost',
  },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    radius: { control: 'inline-radio', options: radii },
    size: { control: 'inline-radio', options: sizes },
    variant: { control: 'inline-radio', options: variants },
  },
  render: (args) => (
    <ToggleGroup.Root {...args}>
      <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
      <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
      <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
    </ToggleGroup.Root>
  ),
} satisfies Meta<typeof ToggleGroup.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-4">
      {variants.map((variant) => (
        <ToggleGroup.Root key={variant} {...args} variant={variant}>
          <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
          <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
          <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
        </ToggleGroup.Root>
      ))}
    </div>
  ),
}

/** `highContrast` uses the darkest step of the color for the text. */
export const HighContrast: Story = {
  args: { highContrast: true },
  render: Variants.render,
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-4">
      {sizes.map((size) => (
        <ToggleGroup.Root key={size} {...args} size={size}>
          <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
          <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
          <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
        </ToggleGroup.Root>
      ))}
    </div>
  ),
}

export const Multiple: Story = {
  args: { 'aria-label': 'Text style', defaultValue: ['bold', 'italic'], multiple: true },
  render: (args) => (
    <ToggleGroup.Root {...args}>
      <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
      <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
      <ToggleGroup.Item value="underline">Underline</ToggleGroup.Item>
    </ToggleGroup.Root>
  ),
}

export const Vertical: Story = {
  args: { orientation: 'vertical' },
}

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-4">
      {(['crimson', 'jade', 'amber'] as const).map((color) => (
        <ToggleGroup.Root key={color} {...args} color={color} variant="soft">
          <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
          <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
          <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
        </ToggleGroup.Root>
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: Variants.render,
}

/** `className` wins over the default styles. */
export const ClassNameOverride: Story = {
  render: (args) => (
    <ToggleGroup.Root {...args} className="gap-0 rounded-ui-md bg-gray-a3 p-1">
      <ToggleGroup.Item className="data-pressed:bg-panel data-pressed:shadow-sm" value="left">
        Left
      </ToggleGroup.Item>
      <ToggleGroup.Item className="data-pressed:bg-panel data-pressed:shadow-sm" value="center">
        Center
      </ToggleGroup.Item>
      <ToggleGroup.Item className="data-pressed:bg-panel data-pressed:shadow-sm" value="right">
        Right
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  ),
}

export const Radius: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-4">
      {radii.map((radius) => (
        <ToggleGroup.Root
          key={radius}
          {...args}
          defaultValue={['left']}
          radius={radius}
          variant="soft"
        >
          <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
          <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
          <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
        </ToggleGroup.Root>
      ))}
    </div>
  ),
}
