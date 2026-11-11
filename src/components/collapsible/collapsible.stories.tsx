import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../button'
import { Collapsible } from '.'

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible.Root,
  args: { defaultOpen: false, disabled: false },
} satisfies Meta<typeof Collapsible.Root>

export default meta

type Story = StoryObj<typeof meta>

function Recovery() {
  return (
    <div className="mt-2 flex flex-col gap-1 rounded-ui-md bg-gray-a3 p-3 text-sm">
      <div>alien-bean-pasta</div>
      <div>wild-irish-burrito</div>
      <div>horse-battery-staple</div>
    </div>
  )
}

export const Playground: Story = {
  render: (args) => (
    <Collapsible.Root {...args} className="w-64">
      <Collapsible.Trigger render={<Button size="sm" variant="soft" />}>
        Recovery keys
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Recovery />
      </Collapsible.Content>
    </Collapsible.Root>
  ),
}

export const DefaultOpen: Story = {
  ...Playground,
  args: { defaultOpen: true },
}

export const Disabled: Story = {
  ...Playground,
  args: { disabled: true },
}

/** A plain trigger with your own classes. `group` and `data-panel-open` turn the arrow. */
export const PlainTrigger: Story = {
  render: (args) => (
    <Collapsible.Root {...args} className="w-64">
      <Collapsible.Trigger className="group flex items-center gap-2 font-medium text-sm">
        <svg
          aria-hidden="true"
          className="size-3 transition-transform group-data-panel-open:rotate-90"
          fill="none"
          viewBox="0 0 12 12"
        >
          <path d="m4.5 2.5 3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        Recovery keys
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Recovery />
      </Collapsible.Content>
    </Collapsible.Root>
  ),
}

export const ClassNameOverride: Story = {
  render: (args) => (
    <Collapsible.Root {...args} className="w-64">
      <Collapsible.Trigger render={<Button size="sm" variant="outline" />}>
        Slow and tinted
      </Collapsible.Trigger>
      <Collapsible.Content className="bg-accent-a3 duration-700">
        <Recovery />
      </Collapsible.Content>
    </Collapsible.Root>
  ),
}
