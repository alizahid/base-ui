import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { Separator } from './separator'

const sizes = ['sm', 'md', 'lg', 'full'] as const

const meta = {
  title: 'Components/Separator',
  component: Separator,
  args: { orientation: 'horizontal', size: 'full' },
  argTypes: {
    color: { control: 'select', options: [undefined, 'accent', ...colors] },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    size: { control: 'inline-radio', options: sizes },
  },
  decorators: [
    (Story) => (
      <div className="flex h-24 max-w-sm items-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Separator>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex w-full flex-col gap-4">
      {sizes.map((size) => (
        <Separator key={size} {...args} size={size} />
      ))}
    </div>
  ),
}

export const Vertical: Story = {
  render: (args) => (
    <div className="flex h-full items-center gap-4">
      {sizes.map((size) => (
        <Separator key={size} {...args} orientation="vertical" size={size} />
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div className="grid w-full grid-cols-5 gap-4">
      {colors.map((color) => (
        <Separator key={color} {...args} color={color} />
      ))}
    </div>
  ),
}

export const InText: Story = {
  render: (args) => (
    <div className="text-sm">
      <p>Tools for building high-quality, accessible UI.</p>
      <Separator {...args} className="my-3" />
      <div className="flex h-5 items-center gap-3">
        Themes
        <Separator {...args} orientation="vertical" />
        Primitives
        <Separator {...args} orientation="vertical" />
        Colors
      </div>
    </div>
  ),
}

export const ClassNameOverride: Story = {
  args: { className: 'h-1 w-24 rounded-full bg-accent-9' },
}
