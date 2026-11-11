import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { Field } from '../field'
import { TextArea } from './text-area'

const sizes = ['xs', 'sm', 'md', 'lg'] as const
const variants = ['surface', 'soft'] as const
const resizes = ['none', 'vertical', 'horizontal', 'both'] as const

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  args: {
    'aria-label': 'Comment',
    color: 'accent',
    disabled: false,
    placeholder: 'Reply to comment…',
    resize: 'none',
    size: 'md',
    variant: 'surface',
  },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    radius: { control: 'inline-radio', options: radii },
    resize: { control: 'inline-radio', options: resizes },
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
} satisfies Meta<typeof TextArea>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <TextArea key={variant} {...args} placeholder={variant} variant={variant} />
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <TextArea key={size} {...args} placeholder={`Size ${size}`} size={size} />
      ))}
    </div>
  ),
}

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <TextArea {...args} disabled placeholder="Disabled" />
      <TextArea {...args} defaultValue="Read only" readOnly />
      <Field.Root invalid>
        <Field.Label>Comment</Field.Label>
        <TextArea {...args} defaultValue="Invalid, inside a Field" />
        <Field.Error match>Please write a longer comment.</Field.Error>
      </Field.Root>
    </div>
  ),
}

export const Resize: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {resizes.map((resize) => (
        <TextArea key={resize} {...args} placeholder={`Resize ${resize}`} resize={resize} />
      ))}
    </div>
  ),
}

export const Radius: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {radii.map((radius) => (
        <TextArea key={radius} {...args} placeholder={radius} radius={radius} />
      ))}
    </div>
  ),
}

export const ClassNameOverride: Story = {
  args: { className: 'min-h-32 rounded-none bg-accent-a3', placeholder: 'Tall, square and tinted' },
}

export const Colors: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-2">
      {(['tomato', 'pink', 'violet', 'cyan', 'jade', 'amber'] as const).map((color) => (
        <div className="contents" key={color}>
          <TextArea {...args} color={color} placeholder={color} size="sm" />
          <TextArea {...args} color={color} placeholder={color} size="sm" variant="soft" />
        </div>
      ))}
    </div>
  ),
}
