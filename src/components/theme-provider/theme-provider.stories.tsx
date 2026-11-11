import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { appearances, grays, radii } from '../../lib/theme'
import { Button } from '../button'
import { ThemeProvider, useTheme } from './theme-provider'

const meta = {
  title: 'Components/ThemeProvider',
  component: ThemeProvider,
  argTypes: {
    appearance: { control: 'inline-radio', options: appearances },
    color: { control: 'select', options: colors },
    gray: { control: 'inline-radio', options: grays },
    radius: { control: 'inline-radio', options: radii },
  },
} satisfies Meta<typeof ThemeProvider>

export default meta

type Story = StoryObj<typeof meta>

function Buttons() {
  const theme = useTheme()

  return (
    <div className="flex flex-col gap-3">
      <span className="text-gray-11 text-sm">
        {theme.color} · {theme.gray} · {theme.radius} · {theme.appearance}
      </span>
      <div className="flex flex-wrap items-center gap-3">
        <Button>Solid</Button>
        <Button variant="soft">Soft</Button>
        <Button variant="surface">Surface</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button color="crimson">Own color</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  )
}

/** A nested provider. Use the controls to change it. */
export const Playground: Story = {
  args: { appearance: 'dark', color: 'violet', gray: 'mauve', radius: 'full' },
  render: (args) => (
    <ThemeProvider {...args} className="rounded-lg p-6">
      <Buttons />
    </ThemeProvider>
  ),
}

export const Radius: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {radii.map((radius) => (
        <ThemeProvider key={radius} radius={radius}>
          <Buttons />
        </ThemeProvider>
      ))}
    </div>
  ),
}

/** Anything not set on a nested provider comes from its parent. */
export const Nested: Story = {
  render: () => (
    <ThemeProvider className="flex flex-col gap-6" color="jade" radius="large">
      <Buttons />
      <ThemeProvider appearance="dark" className="rounded-lg p-6">
        <Buttons />
        <ThemeProvider
          appearance="light"
          className="mt-6 rounded-lg p-6"
          color="orange"
          gray="sand"
          radius="small"
        >
          <Buttons />
        </ThemeProvider>
      </ThemeProvider>
    </ThemeProvider>
  ),
}
