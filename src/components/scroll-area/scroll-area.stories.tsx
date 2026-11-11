import type { Meta, StoryObj } from '@storybook/react-vite'
import { radii } from '../../lib/theme'
import { ScrollArea } from './scroll-area'

const sizes = ['sm', 'md', 'lg'] as const
const scrollbars = ['vertical', 'horizontal', 'both'] as const

const text =
  'Three fundamental aspects of typography are legibility, readability, and aesthetics. Although in a non-technical sense "legible" and "readable" are often used synonymously, typographically they are separate but related concepts.'

function Text() {
  return (
    <div className="flex flex-col gap-3 p-3 pr-5 text-sm">
      {Array.from({ length: 6 }, (_, index) => (
        <p key={index}>{text}</p>
      ))}
    </div>
  )
}

const box = 'h-48 w-72 rounded-ui-md inset-ring inset-ring-gray-a5'

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  args: { className: box, scrollbars: 'both', size: 'sm' },
  argTypes: {
    radius: { control: 'inline-radio', options: radii },
    scrollbars: { control: 'inline-radio', options: scrollbars },
    size: { control: 'inline-radio', options: sizes },
  },
  render: (args) => (
    <ScrollArea {...args}>
      <Text />
    </ScrollArea>
  ),
} satisfies Meta<typeof ScrollArea>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      {sizes.map((size) => (
        <ScrollArea key={size} {...args} size={size}>
          <Text />
        </ScrollArea>
      ))}
    </div>
  ),
}

export const Horizontal: Story = {
  args: { className: 'w-72 rounded-ui-md inset-ring inset-ring-gray-a5', scrollbars: 'horizontal' },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="flex gap-3 p-3 pb-5">
        {Array.from({ length: 12 }, (_, index) => (
          <div
            className="flex size-20 shrink-0 items-center justify-center rounded-ui-sm bg-accent-a3 text-accent-a11"
            key={index}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const Both: Story = {
  args: { scrollbars: 'both' },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="grid w-max grid-cols-8 gap-3 p-3 pr-5 pb-5">
        {Array.from({ length: 64 }, (_, index) => (
          <div
            className="flex size-20 items-center justify-center rounded-ui-sm bg-accent-a3 text-accent-a11"
            key={index}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const Radius: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      {radii.map((radius) => (
        <ScrollArea
          key={radius}
          {...args}
          className="h-32 w-40 inset-ring inset-ring-gray-a5"
          radius={radius}
          size="lg"
        >
          <Text />
        </ScrollArea>
      ))}
    </div>
  ),
}

/** `className` on the box, `classNames` for the scrollbar and the thumb inside. */
export const ClassNameOverride: Story = {
  args: {
    className: 'h-40 w-64 rounded-none bg-accent-a2',
    classNames: { scrollbar: 'm-0 bg-accent-a3 opacity-100', thumb: 'rounded-none bg-accent-9' },
  },
}
