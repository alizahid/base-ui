import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar'
import { type ComponentProps, createContext, useContext, useMemo } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { bareFieldBox } from '../../lib/field-box'
import { controlSize } from '../../lib/styles'
import type { Radius } from '../../lib/theme'

// Radix Themes has no toolbar. This one is a bar that looks like its Card,
// holding buttons that look like its gray ghost buttons.
export const toolbarVariants = tv({
  slots: {
    // Parts inside use rounded-inner-*: the toolbar radius minus its padding.
    // The hairline color is the one of Radix Themes' Card.
    root: [
      'inline-flex bg-panel text-gray-12 backdrop-panel',
      'inset-ring inset-ring-[color-mix(in_oklab,var(--gray-a5),var(--gray-5)_25%)]',
    ],
    button: [
      'inline-flex shrink-0 cursor-default select-none items-center justify-center whitespace-nowrap text-gray-12',
      'hover:bg-gray-a3 active:bg-gray-a4',
      // Pressed toggles look like a soft button. Open menu triggers keep the hover look.
      'data-pressed:bg-accent-a4 data-pressed:text-accent-a11',
      'data-popup-open:bg-gray-a3',
      'data-disabled:cursor-not-allowed data-disabled:bg-transparent data-disabled:text-gray-a8',
      '-outline-offset-1 outline-accent-8 focus-visible:outline-2',
    ],
    link: [
      'inline-flex shrink-0 items-center text-gray-a11 underline-offset-4',
      'hover:text-accent-a11 hover:underline',
      '-outline-offset-1 outline-accent-8 focus-visible:outline-2',
    ],
    separator: 'shrink-0 self-stretch bg-gray-a6',
    group: 'flex',
    // The box itself is the shared field box (`bareFieldBox`), see `ToolbarInput`
    input: 'min-w-0',
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'items-center',
        separator: 'mx-1 w-px',
        group: 'items-center',
        input: 'w-40',
      },
      vertical: {
        root: 'flex-col items-stretch',
        separator: 'my-1 h-px',
        group: 'flex-col items-stretch',
      },
    },
    // The whole bar is as tall as a `Button` of the same size (24, 32, 40, 48px),
    // so the parts inside are one step smaller.
    size: {
      sm: {
        root: 'gap-0.5 p-0.5',
        group: 'gap-0.5',
        button: 'h-5 min-w-5 gap-1 rounded-inner-0.5 px-1 text-xs tracking-[0.0025em]',
        link: 'rounded-inner-0.5 px-1 text-xs tracking-[0.0025em]',
        input: 'h-5 rounded-inner-0.5 px-1',
      },
      md: {
        root: 'gap-1 p-1',
        group: 'gap-1',
        button: [controlSize.sm, 'min-w-6 gap-1 rounded-inner-1 px-1.5'],
        link: 'rounded-inner-1 px-1.5 text-xs tracking-[0.0025em]',
        input: 'rounded-inner-1 px-1.5',
      },
      lg: {
        root: 'gap-1 p-1',
        group: 'gap-1',
        button: [controlSize.md, 'min-w-8 gap-2 rounded-inner-1 px-2'],
        link: 'rounded-inner-1 px-2 text-sm',
        input: 'rounded-inner-1 px-2',
      },
      xl: {
        root: 'gap-1 p-1',
        group: 'gap-1',
        button: [controlSize.lg, 'min-w-10 gap-3 rounded-inner-1 px-3'],
        link: 'rounded-inner-1 px-3 text-base',
        input: 'rounded-inner-1 px-3',
      },
    },
  },
  // A bar in a row may become a pill when the theme radius is `full`.
  // A column never does: a tall pill looks wrong.
  compoundVariants: [
    { orientation: 'horizontal', size: 'sm', class: { root: 'rounded-ui-sm' } },
    { orientation: 'horizontal', size: 'md', class: { root: 'rounded-ui-md' } },
    { orientation: 'horizontal', size: 'lg', class: { root: 'rounded-ui-lg' } },
    { orientation: 'horizontal', size: 'xl', class: { root: 'rounded-ui-xl' } },
    { orientation: 'vertical', size: 'sm', class: { root: 'rounded-panel-sm' } },
    { orientation: 'vertical', size: 'md', class: { root: 'rounded-panel-md' } },
    { orientation: 'vertical', size: 'lg', class: { root: 'rounded-panel-lg' } },
    { orientation: 'vertical', size: 'xl', class: { root: 'rounded-panel-xl' } },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
})

// The size of the shared field box that fits in a toolbar of each size
const inputSize = { sm: 'sm', md: 'sm', lg: 'md', xl: 'lg' } as const

type Variants = VariantProps<typeof toolbarVariants>

// The size and the direction are set once on `Root` and read by the parts
const ToolbarContext = createContext<Variants>({})

function useStyles() {
  return toolbarVariants(useContext(ToolbarContext))
}

export type ToolbarRootProps = Omit<
  ComponentProps<typeof BaseToolbar.Root>,
  'className' | 'color'
> &
  Pick<Variants, 'size'> & {
    className?: string
    /**
     * The color scale to use. `accent` follows the theme.
     * @default 'accent'
     */
    color?: Color
    /** How round the corners are. Follows the theme when not set. */
    radius?: Radius
  }

export function ToolbarRoot({
  className,
  color,
  orientation = 'horizontal',
  radius,
  size,
  ...props
}: ToolbarRootProps) {
  const context = useMemo(() => ({ orientation, size }), [orientation, size])

  return (
    <ToolbarContext.Provider value={context}>
      <BaseToolbar.Root
        data-color={colorAttribute(color)}
        data-radius={radius}
        orientation={orientation}
        {...props}
        className={cn(toolbarVariants(context).root(), className)}
      />
    </ToolbarContext.Provider>
  )
}

export type ToolbarButtonProps = Omit<ComponentProps<typeof BaseToolbar.Button>, 'className'> & {
  className?: string
}

/** Works as a plain button, with `render={<Toggle />}`, or as the trigger of a menu. */
export function ToolbarButton({ className, ...props }: ToolbarButtonProps) {
  const styles = useStyles()

  return <BaseToolbar.Button {...props} className={cn(styles.button(), className)} />
}

export type ToolbarLinkProps = Omit<ComponentProps<typeof BaseToolbar.Link>, 'className'> & {
  className?: string
}

export function ToolbarLink({ className, ...props }: ToolbarLinkProps) {
  const styles = useStyles()

  return <BaseToolbar.Link {...props} className={cn(styles.link(), className)} />
}

export type ToolbarSeparatorProps = Omit<
  ComponentProps<typeof BaseToolbar.Separator>,
  'className'
> & {
  className?: string
}

export function ToolbarSeparator({ className, ...props }: ToolbarSeparatorProps) {
  const styles = useStyles()

  return <BaseToolbar.Separator {...props} className={cn(styles.separator(), className)} />
}

export type ToolbarGroupProps = Omit<ComponentProps<typeof BaseToolbar.Group>, 'className'> & {
  className?: string
}

export function ToolbarGroup({ className, ...props }: ToolbarGroupProps) {
  const styles = useStyles()

  return <BaseToolbar.Group {...props} className={cn(styles.group(), className)} />
}

export type ToolbarInputProps = Omit<ComponentProps<typeof BaseToolbar.Input>, 'className'> & {
  className?: string
}

export function ToolbarInput({ className, ...props }: ToolbarInputProps) {
  const styles = useStyles()
  const { size } = useContext(ToolbarContext)
  // One step smaller than a `TextField` of the same size, like the buttons
  const box = bareFieldBox({ size: inputSize[size ?? 'md'] })

  return <BaseToolbar.Input {...props} className={cn(box, styles.input(), className)} />
}
