import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { Avatar } from './avatar'

const sizes = ['sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const
const variants = ['soft', 'solid'] as const

// A tiny inline picture, so the stories do not need the network
const picture = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#8da4ef"/><circle cx="32" cy="24" r="12" fill="#fff"/><circle cx="32" cy="62" r="22" fill="#fff"/></svg>',
)}`

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    alt: 'Ada Lovelace',
    color: 'accent',
    fallback: 'AL',
    highContrast: false,
    size: 'lg',
    variant: 'soft',
  },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    radius: { control: 'inline-radio', options: radii },
    size: { control: 'inline-radio', options: sizes },
    variant: { control: 'inline-radio', options: variants },
  },
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithImage: Story = {
  args: { src: picture },
}

/** The image does not load, so the fallback is shown. */
export const BrokenImage: Story = {
  args: { src: 'data:image/png;base64,broken' },
}

export const Variants: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Avatar key={variant} {...args} variant={variant} />
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {sizes.map((size) => (
          <Avatar key={size} {...args} size={size} />
        ))}
      </div>
      {/* One letter is drawn a little bigger than two */}
      <div className="flex items-center gap-4">
        {sizes.map((size) => (
          <Avatar key={size} {...args} fallback="A" size={size} />
        ))}
      </div>
      <div className="flex items-center gap-4">
        {sizes.map((size) => (
          <Avatar key={size} {...args} size={size} src={picture} />
        ))}
      </div>
    </div>
  ),
}

export const HighContrast: Story = {
  render: (args) => (
    <div className="grid grid-cols-[repeat(2,max-content)] gap-4">
      {variants.map((variant) => [
        <Avatar key={variant} {...args} variant={variant} />,
        <Avatar key={`${variant}-high`} {...args} highContrast variant={variant} />,
      ])}
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <div className="flex flex-wrap items-center gap-2" key={variant}>
          {colors.map((color) => (
            <Avatar key={color} {...args} color={color} variant={variant} />
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Radius: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      {radii.map((radius) => (
        <Avatar key={radius} {...args} radius={radius} />
      ))}
      <Avatar {...args} radius="full" src={picture} />
    </div>
  ),
}

/** `className` on the root, `classNames` for the fallback inside. */
export const ClassNameOverride: Story = {
  args: {
    className: 'size-14 rounded-none',
    classNames: { fallback: 'bg-gray-a3 text-gray-12 italic' },
  },
}
