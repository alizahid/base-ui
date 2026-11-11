import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { Button } from '../button'
import { Spinner } from './spinner'

const sizes = ['sm', 'md', 'lg'] as const

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  args: { loading: true, size: 'md' },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    size: { control: 'inline-radio', options: sizes },
  },
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      {sizes.map((size) => (
        <Spinner key={size} {...args} size={size} />
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      {colors.map((color) => (
        <Spinner key={color} {...args} color={color} />
      ))}
    </div>
  ),
}

/** With children, the spinner takes their place and keeps their size. */
export const WithChildren: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Spinner {...args} loading>
        <span className="text-sm">12 new messages</span>
      </Spinner>
      <Spinner {...args} loading={false}>
        <span className="text-sm">12 new messages</span>
      </Spinner>
    </div>
  ),
}

export const InButton: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button loading>Saving</Button>
      <Button loading variant="soft">
        Saving
      </Button>
    </div>
  ),
}
