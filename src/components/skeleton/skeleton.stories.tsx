import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../button'
import { Skeleton } from './skeleton'

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  args: { loading: true },
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof meta>

/** Without children: a block. `className` gives it a size. */
export const Playground: Story = {
  args: { className: 'h-4 w-48' },
}

/** With children: the block takes their size. Switch `loading` off to see them. */
export const WithChildren: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-3">
      <Skeleton {...args}>
        <span className="font-medium text-lg">Teodros Girmay</span>
      </Skeleton>
      <Skeleton {...args}>Plain text works too</Skeleton>
      <Skeleton {...args}>
        <Button>Follow</Button>
      </Skeleton>
    </div>
  ),
}

export const Layout: Story = {
  render: (args) => (
    <div className="flex w-72 items-center gap-3">
      <Skeleton {...args} className="size-10 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton {...args} className="h-4 w-2/3" />
        <Skeleton {...args} className="h-3 w-full" />
      </div>
    </div>
  ),
}
