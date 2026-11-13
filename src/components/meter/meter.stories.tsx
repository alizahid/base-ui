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
    color: 'accent',
    highContrast: false,
    label: 'Storage used',
    showValue: true,
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
        <Meter key={color} {...args} color={color} label={color} />
      ))}
    </div>
  ),
}

export const Radius: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {radii.map((radius) => (
        <Meter key={radius} {...args} label={`Radius ${radius}`} radius={radius} size="lg" />
      ))}
    </div>
  ),
}

/**
 * `low`, `high` and `optimum` color the bar, with the rules of the HTML `<meter>` element:
 * its own color in the zone that holds `optimum`, amber next to it, red in the far zone.
 */
export const Thresholds: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8">
      {/* Low is best: storage fills up */}
      <div className="flex flex-col gap-4">
        {[35, 80, 95].map((value) => (
          <Meter
            key={value}
            {...args}
            high={90}
            label="Storage used"
            low={70}
            optimum={0}
            value={value}
          />
        ))}
      </div>
      {/* High is best: battery runs out */}
      <div className="flex flex-col gap-4">
        {[80, 30, 10].map((value) => (
          <Meter
            key={value}
            {...args}
            high={50}
            label="Battery"
            low={20}
            optimum={100}
            value={value}
          />
        ))}
      </div>
      {/* No optimum: the middle is good, both ends are a warning */}
      <div className="flex flex-col gap-4">
        {[10, 50, 90].map((value) => (
          <Meter key={value} {...args} high={75} label="Humidity" low={25} value={value} />
        ))}
      </div>
    </div>
  ),
}

/** `formatValue` changes the text on the right. `format` is Base UI's number format. */
export const CustomValue: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Meter
        {...args}
        formatValue={(_, value) => `${value} GB of 100 GB`}
        label="Storage used"
        value={35}
      />
      <Meter
        {...args}
        format={{ currency: 'USD', style: 'currency' }}
        label="Budget spent"
        max={500}
        value={320}
      />
    </div>
  ),
}

/** Without a label and a value it is only the bar. Give it an `aria-label` then. */
export const BarOnly: Story = {
  args: { 'aria-label': 'Storage used', label: undefined, showValue: false },
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

/** `className` on the root, `classNames` for the parts inside. */
export const ClassNameOverride: Story = {
  args: {
    className: 'w-56',
    classNames: {
      indicator: 'bg-gray-12',
      label: 'font-normal text-gray-11 uppercase',
      track: 'h-3 rounded-none',
      value: 'font-medium text-gray-12',
    },
  },
}
