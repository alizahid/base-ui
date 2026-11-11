import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { Button } from '../button'
import { TextField } from './text-field'

const sizes = ['xs', 'sm', 'md', 'lg'] as const
const variants = ['surface', 'soft'] as const

const meta = {
  title: 'Components/TextField',
  component: TextField,
  args: {
    'aria-label': 'Name',
    color: 'accent',
    disabled: false,
    placeholder: 'Your name',
    size: 'md',
    variant: 'surface',
  },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    radius: { control: 'inline-radio', options: radii },
    size: { control: 'inline-radio', options: sizes },
    variant: { control: 'inline-radio', options: variants },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <TextField key={variant} {...args} placeholder={variant} variant={variant} />
      ))}
      {variants.map((variant) => (
        <TextField
          key={variant}
          {...args}
          defaultValue={`${variant} with text`}
          variant={variant}
        />
      ))}
    </div>
  ),
}

/** An input and a button of the same size line up. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <div className="flex gap-2" key={size}>
          <TextField {...args} placeholder={`Size ${size}`} size={size} />
          <Button size={size}>Send</Button>
        </div>
      ))}
    </div>
  ),
}

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <div className="flex flex-col gap-2" key={variant}>
          <TextField {...args} disabled placeholder="Disabled" variant={variant} />
          <TextField {...args} defaultValue="Disabled with text" disabled variant={variant} />
          <TextField {...args} defaultValue="Read only" readOnly variant={variant} />
          <TextField {...args} data-invalid="" defaultValue="Invalid" variant={variant} />
        </div>
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-2">
      {colors.map((color) => (
        <div className="contents" key={color}>
          <TextField {...args} color={color} placeholder={color} />
          <TextField {...args} color={color} placeholder={color} variant="soft" />
        </div>
      ))}
    </div>
  ),
}

export const Radius: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {radii.map((radius) => (
        <TextField key={radius} {...args} placeholder={radius} radius={radius} />
      ))}
    </div>
  ),
}

/** `className` wins over the default styles. */
export const ClassNameOverride: Story = {
  args: {
    className: 'h-14 rounded-none bg-accent-a3 px-6 inset-ring-accent-a8',
    placeholder: 'Tall, square and tinted',
  },
}
