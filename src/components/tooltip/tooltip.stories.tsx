import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../button'
import { Tooltip, TooltipProvider } from '.'

const sides = ['top', 'right', 'bottom', 'left'] as const

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    align: 'center',
    arrow: true,
    children: <Button variant="soft">Hover me</Button>,
    content: 'Add to library',
    disabled: false,
    side: 'top',
  },
  argTypes: {
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
    children: { control: false },
    side: { control: 'inline-radio', options: sides },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-60 items-center justify-center gap-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sides: Story = {
  render: () => (
    <>
      {sides.map((side) => (
        <Tooltip content={`On the ${side}`} key={side} side={side}>
          <Button variant="soft">{side}</Button>
        </Tooltip>
      ))}
    </>
  ),
}

/** Inside a `TooltipProvider` only the first tooltip waits; the next ones show at once. */
export const Provider: Story = {
  render: () => (
    <TooltipProvider delay={400}>
      <Tooltip content="Bold">
        <Button variant="soft">B</Button>
      </Tooltip>
      <Tooltip content="Italic">
        <Button variant="soft">I</Button>
      </Tooltip>
      <Tooltip content="Underline">
        <Button variant="soft">U</Button>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const States: Story = {
  render: () => (
    <>
      <Tooltip content="Shows without waiting" delay={0}>
        <Button variant="soft">No delay</Button>
      </Tooltip>
      <Tooltip arrow={false} content="No arrow">
        <Button variant="soft">No arrow</Button>
      </Tooltip>
      <Tooltip content="You will not see this" disabled>
        <Button variant="soft">Disabled</Button>
      </Tooltip>
      <Tooltip content="Long text wraps onto more lines when it does not fit in the largest width of the tooltip.">
        <Button variant="soft">Long text</Button>
      </Tooltip>
    </>
  ),
}

/** `className` on the box, and `classNames` for the arrow. */
export const ClassNameOverride: Story = {
  render: () => (
    <Tooltip
      className="rounded-none bg-accent-9 px-3 py-2 text-accent-contrast text-sm"
      classNames={{ arrow: 'bg-accent-9' }}
      content="Custom look"
      defaultOpen
    >
      <Button variant="outline">Hover me</Button>
    </Tooltip>
  ),
}
