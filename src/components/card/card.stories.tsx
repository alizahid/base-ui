import type { Meta, StoryObj } from '@storybook/react-vite'
import { radii } from '../../lib/theme'
import { Card } from './card'

const variants = ['surface', 'ghost'] as const
const sizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const

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
  args: { children: <Content />, className: 'w-64', size: 'sm', variant: 'surface' },
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
    <div className="flex flex-wrap items-start gap-4">
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
/** The border is drawn on top of the content, so a picture that touches the edge is still framed. */
export const EdgeToEdge: Story = {
  render: (args) => (
    <Card {...args} className="w-64 p-0">
      <div className="h-24 bg-linear-to-br from-accent-9 to-accent-7" />
      <div className="p-3">
        <Content />
      </div>
    </Card>
  ),
}

export const Clickable: Story = {
  render: (args) => (
    <div className="flex items-start gap-4">
      <Card {...args} render={<a href="https://base-ui.com" />} />
      <Card {...args} render={<button type="button" />} variant="ghost" />
    </div>
  ),
}

/** The background is on `::before` and the border on `::after`. */
export const ClassNameOverride: Story = {
  args: {
    className: 'w-64 rounded-none before:bg-accent-a3 after:shadow-[0_0_0_1px_var(--accent-a6)]',
  },
}
