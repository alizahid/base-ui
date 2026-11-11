import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { Callout } from '.'

const variants = ['soft', 'surface', 'outline'] as const
const sizes = ['sm', 'md', 'lg'] as const

function InfoIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7.25v3.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <circle cx="8" cy="5" fill="currentColor" r="0.9" />
    </svg>
  )
}

const meta = {
  title: 'Components/Callout',
  component: Callout.Root,
  args: { color: 'accent', highContrast: false, size: 'md', variant: 'soft' },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    radius: { control: 'inline-radio', options: radii },
    size: { control: 'inline-radio', options: sizes },
    variant: { control: 'inline-radio', options: variants },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Callout.Root>

export default meta

type Story = StoryObj<typeof meta>

const text = 'You will need admin privileges to install and access this application.'

export const Playground: Story = {
  render: (args) => (
    <Callout.Root {...args}>
      <Callout.Icon>
        <InfoIcon />
      </Callout.Icon>
      <Callout.Text>{text}</Callout.Text>
    </Callout.Root>
  ),
}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <Callout.Root key={variant} {...args} variant={variant}>
          <Callout.Icon>
            <InfoIcon />
          </Callout.Icon>
          <Callout.Text>{text}</Callout.Text>
        </Callout.Root>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <Callout.Root key={size} {...args} size={size}>
          <Callout.Icon>
            <InfoIcon />
          </Callout.Icon>
          <Callout.Text>{text}</Callout.Text>
        </Callout.Root>
      ))}
    </div>
  ),
}

export const HighContrast: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <Callout.Root key={variant} {...args} highContrast variant={variant}>
          <Callout.Icon>
            <InfoIcon />
          </Callout.Icon>
          <Callout.Text>{text}</Callout.Text>
        </Callout.Root>
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      {(['blue', 'jade', 'amber', 'red', 'bronze'] as const).map((color) => (
        <Callout.Root key={color} {...args} color={color} size="sm">
          <Callout.Icon>
            <InfoIcon />
          </Callout.Icon>
          <Callout.Text>{color}</Callout.Text>
        </Callout.Root>
      ))}
    </div>
  ),
}

/** Without an icon, and with more than one `Text`. */
export const TextOnly: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Callout.Root {...args}>
        <Callout.Text>{text}</Callout.Text>
      </Callout.Root>
      <Callout.Root {...args} color="red" role="alert">
        <Callout.Icon>
          <InfoIcon />
        </Callout.Icon>
        <Callout.Text className="font-medium">Access denied</Callout.Text>
        <Callout.Text>{text}</Callout.Text>
      </Callout.Root>
    </div>
  ),
}

export const Radius: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      {radii.map((radius) => (
        <Callout.Root key={radius} {...args} radius={radius} size="sm">
          <Callout.Icon>
            <InfoIcon />
          </Callout.Icon>
          <Callout.Text>Radius {radius}</Callout.Text>
        </Callout.Root>
      ))}
    </div>
  ),
}

export const ClassNameOverride: Story = {
  render: (args) => (
    <Callout.Root {...args} className="rounded-none border-accent-9 border-l-4 bg-transparent">
      <Callout.Icon>
        <InfoIcon />
      </Callout.Icon>
      <Callout.Text className="text-gray-12">{text}</Callout.Text>
    </Callout.Root>
  ),
}
