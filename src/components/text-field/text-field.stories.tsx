import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { Button } from '../button'
import { TextField } from '.'

const sizes = ['sm', 'md', 'lg', 'xl'] as const
const variants = ['surface', 'soft'] as const

const meta = {
  title: 'Components/TextField',
  component: TextField.Root,
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
} satisfies Meta<typeof TextField.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <TextField.Root key={variant} {...args} placeholder={variant} variant={variant} />
      ))}
      {variants.map((variant) => (
        <TextField.Root
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
          <TextField.Root {...args} placeholder={`Size ${size}`} size={size} />
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
          <TextField.Root {...args} disabled placeholder="Disabled" variant={variant} />
          <TextField.Root {...args} defaultValue="Disabled with text" disabled variant={variant} />
          <TextField.Root {...args} defaultValue="Read only" readOnly variant={variant} />
          <TextField.Root {...args} data-invalid="" defaultValue="Invalid" variant={variant} />
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
          <TextField.Root {...args} color={color} placeholder={color} />
          <TextField.Root {...args} color={color} placeholder={color} variant="soft" />
        </div>
      ))}
    </div>
  ),
}

export const Radius: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {radii.map((radius) => (
        <TextField.Root key={radius} {...args} placeholder={radius} radius={radius} />
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

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 16 16">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m10.5 10.5 3 3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  )
}

/** Icons, text and buttons inside the box. `side` picks the side. */
export const Slots: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <TextField.Root {...args} placeholder="Search">
        <TextField.Slot>
          <SearchIcon />
        </TextField.Slot>
      </TextField.Root>
      <TextField.Root {...args} placeholder="0.00">
        <TextField.Slot>$</TextField.Slot>
        <TextField.Slot side="right">USD</TextField.Slot>
      </TextField.Root>
      <TextField.Root {...args} placeholder="Search">
        <TextField.Slot>
          <SearchIcon />
        </TextField.Slot>
        <TextField.Slot side="right">
          <Button className="rounded-inner-1" size="sm" variant="soft">
            Go
          </Button>
        </TextField.Slot>
      </TextField.Root>
      <TextField.Root {...args} placeholder="Disabled" disabled>
        <TextField.Slot>
          <SearchIcon />
        </TextField.Slot>
      </TextField.Root>
    </div>
  ),
}

/** A button one size smaller than the field, with `rounded-inner-*`, follows the box. */
export const SlotSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {(
        [
          ['md', 'sm', 'rounded-inner-1'],
          ['lg', 'sm', 'rounded-inner-2'],
          ['xl', 'md', 'rounded-inner-2'],
        ] as const
      ).map(([size, buttonSize, inner]) => (
        <TextField.Root key={size} {...args} placeholder={`Size ${size}`} size={size}>
          <TextField.Slot>
            <SearchIcon />
          </TextField.Slot>
          <TextField.Slot side="right">
            <Button className={inner} size={buttonSize}>
              Go
            </Button>
          </TextField.Slot>
        </TextField.Root>
      ))}
    </div>
  ),
}
