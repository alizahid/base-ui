import type { Meta, StoryObj } from '@storybook/react-vite'
import { HoverCard } from '.'

const sizes = ['sm', 'md', 'lg'] as const

const meta = {
  title: 'Components/HoverCard',
  component: HoverCard.Content,
  args: { align: 'center', arrow: false, side: 'bottom', sideOffset: 8, size: 'md' },
  argTypes: {
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
    side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] },
    size: { control: 'inline-radio', options: sizes },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-80 items-center justify-center gap-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HoverCard.Content>

export default meta

type Story = StoryObj<typeof meta>

const link = 'text-accent-11 underline underline-offset-2'

function Profile() {
  return (
    <div className="flex w-64 gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-9 font-medium text-accent-contrast text-sm">
        B
      </div>
      <div>
        <div className="font-bold">Base UI</div>
        <div className="text-gray-11">@base_ui</div>
        <p className="mt-2">Unstyled UI components for building accessible web apps.</p>
      </div>
    </div>
  )
}

export const Playground: Story = {
  render: (args) => (
    <p>
      Built with{' '}
      <HoverCard.Root>
        <HoverCard.Trigger className={link} href="https://base-ui.com">
          Base UI
        </HoverCard.Trigger>
        <HoverCard.Content {...args}>
          <Profile />
        </HoverCard.Content>
      </HoverCard.Root>
      .
    </p>
  ),
}

export const Sizes: Story = {
  render: () => (
    <>
      {sizes.map((size) => (
        <HoverCard.Root key={size}>
          <HoverCard.Trigger className={link} href="https://base-ui.com">
            Size {size}
          </HoverCard.Trigger>
          <HoverCard.Content size={size}>
            <Profile />
          </HoverCard.Content>
        </HoverCard.Root>
      ))}
    </>
  ),
}

export const Arrow: Story = {
  render: () => (
    <HoverCard.Root>
      <HoverCard.Trigger className={link} href="https://base-ui.com">
        With an arrow
      </HoverCard.Trigger>
      <HoverCard.Content arrow side="top">
        <Profile />
      </HoverCard.Content>
    </HoverCard.Root>
  ),
}

export const ClassNameOverride: Story = {
  render: () => (
    <HoverCard.Root>
      <HoverCard.Trigger className={link} href="https://base-ui.com">
        Custom look
      </HoverCard.Trigger>
      <HoverCard.Content className="rounded-none bg-accent-3 p-8">
        <Profile />
      </HoverCard.Content>
    </HoverCard.Root>
  ),
}
