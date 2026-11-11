import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { Slider } from './slider'

const sizes = ['sm', 'md', 'lg'] as const
const variants = ['surface', 'soft'] as const

const meta = {
  title: 'Components/Slider',
  component: Slider,
  args: {
    'aria-label': 'Volume',
    color: 'accent',
    defaultValue: 50,
    disabled: false,
    size: 'md',
    variant: 'surface',
  },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    radius: { control: 'inline-radio', options: radii },
    size: { control: 'inline-radio', options: sizes },
    variant: { control: 'inline-radio', options: variants },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <Slider key={variant} {...args} variant={variant} />
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <Slider key={size} {...args} size={size} />
      ))}
    </div>
  ),
}

/** An array value gives one thumb per number. */
export const Range: Story = {
  args: {
    'aria-label': 'Price range',
    defaultValue: [25, 75],
    thumbLabels: ['Lowest price', 'Highest price'],
  },
}

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <div className="flex h-40 gap-8">
      <Slider {...args} />
      <Slider {...args} defaultValue={[20, 60]} thumbLabels={['From', 'To']} variant="soft" />
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: Variants.render,
}

/** `highContrast` makes the filled part darker (light mode only). */
export const HighContrast: Story = {
  args: { highContrast: true },
  render: Variants.render,
}

export const Colors: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
      {colors.map((color) => (
        <div className="contents" key={color}>
          <Slider {...args} color={color} />
          <Slider {...args} color={color} variant="soft" />
        </div>
      ))}
    </div>
  ),
}

export const Radius: Story = {
  args: { size: 'lg' },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {radii.map((radius) => (
        <Slider key={radius} {...args} radius={radius} />
      ))}
    </div>
  ),
}

/** `className` and `classNames` win over the default styles. */
export const ClassNameOverride: Story = {
  args: {
    className: 'w-40',
    classNames: {
      indicator: 'bg-accent-12',
      thumb: 'size-5 rounded-ui-sm bg-accent-9',
      track: 'bg-accent-a4 data-[orientation=horizontal]:h-1',
    },
  },
}
