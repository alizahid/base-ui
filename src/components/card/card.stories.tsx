import type { Meta, StoryObj } from '@storybook/react-vite'
import { radii } from '../../lib/theme'
import { Card } from './card'

const variants = ['surface', 'ghost'] as const
const sizes = ['sm', 'md', 'lg'] as const

function Content() {
  return (
    <>
      <div className="font-medium">Teodros Girmay</div>
      <div className="text-gray-11 text-sm">Engineering</div>
    </>
  )
}

const meta = {
  title: 'Components/Card',
  component: Card,
  args: { children: <Content />, className: 'w-64', size: 'md', variant: 'surface' },
  argTypes: {
    children: { control: false },
    radius: { control: 'inline-radio', options: radii },
    size: { control: 'inline-radio', options: sizes },
    variant: { control: 'inline-radio', options: variants },
  },
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex items-start gap-4">
      {variants.map((variant) => (
        <Card key={variant} {...args} variant={variant} />
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-start gap-4">
      {sizes.map((size) => (
        <Card key={size} {...args} className="w-48" size={size} />
      ))}
    </div>
  ),
}

export const Radius: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-start gap-4">
      {radii.map((radius) => (
        <Card key={radius} {...args} className="w-40" radius={radius} />
      ))}
    </div>
  ),
}

/** With `render`, the whole card is a link or a button and reacts to hover and focus. */
export const Clickable: Story = {
  render: (args) => (
    <div className="flex items-start gap-4">
      <Card {...args} render={<a href="https://base-ui.com" />} />
      <Card {...args} render={<button type="button" />} variant="ghost" />
    </div>
  ),
}

export const ClassNameOverride: Story = {
  args: { className: 'w-64 rounded-none bg-accent-a3 inset-ring-accent-a6' },
}
