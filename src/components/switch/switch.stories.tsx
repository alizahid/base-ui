import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { Switch } from './switch'

const sizes = ['sm', 'md', 'lg'] as const

const meta = {
  title: 'Components/Switch',
  component: Switch,
  args: { color: 'accent', defaultChecked: true, disabled: false, size: 'md' },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    radius: { control: 'inline-radio', options: radii },
    size: { control: 'inline-radio', options: sizes },
  },
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      {sizes.map((size) => (
        <Switch key={size} {...args} size={size} />
      ))}
    </div>
  ),
}

export const States: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Switch {...args} defaultChecked={false} />
      <Switch {...args} defaultChecked />
      <Switch {...args} defaultChecked={false} disabled />
      <Switch {...args} defaultChecked disabled />
    </div>
  ),
}

/** `highContrast` makes the track darker when on (light mode only). */
export const HighContrast: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Switch {...args} />
      <Switch {...args} highContrast />
      <Switch {...args} disabled highContrast />
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      {colors.map((color) => (
        <Switch key={color} {...args} color={color} />
      ))}
    </div>
  ),
}

export const Radius: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      {radii.map((radius) => (
        <Switch key={radius} {...args} radius={radius} />
      ))}
    </div>
  ),
}

/** A `rounded-*` class on the switch also reshapes the thumb. */
export const ClassNameOverride: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Switch {...args} className="rounded-none" />
      <Switch {...args} className="rounded-sm" />
      <Switch {...args} className="rounded-md" />
      <Switch {...args} className="rounded-[5px]" />
      <Switch {...args} className="rounded-full" radius="none" />
    </div>
  ),
}

export const WithLabel: Story = {
  render: (args) => (
    <label className="flex items-center gap-2 text-sm">
      <Switch {...args} />
      Notifications
    </label>
  ),
}
