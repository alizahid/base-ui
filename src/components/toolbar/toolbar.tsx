import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar'
import { type ComponentProps, createContext, useContext, useMemo } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { controlSize, focusRing, inputSurface } from '../../lib/styles'
import type { Radius } from '../../lib/theme'

export const toolbarVariants = tv({
  slots: {
    // Parts inside use rounded-inner-1: the toolbar radius minus its 4px padding
    root: 'inline-flex gap-1 rounded-ui-lg bg-panel p-1 text-gray-12 inset-ring inset-ring-gray-a5',
    button: [
      'inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap font-medium text-gray-12',
      'hover:bg-gray-a3 active:bg-gray-a4',
      // Pressed toggles and open menu triggers stay highlighted
      'data-pressed:bg-accent-a4 data-pressed:text-accent-a11',
      'data-popup-open:bg-gray-a4',
      'data-disabled:cursor-not-allowed data-disabled:bg-transparent data-disabled:text-gray-a8',
      // No gap around the ring: the toolbar has little room around its buttons
      'outline-accent-8 focus-visible:outline-2',
    ],
    link: [
      'inline-flex shrink-0 items-center rounded-inner-1 text-gray-a11 underline-offset-4',
      'hover:text-accent-a11 hover:underline',
      focusRing,
    ],
    separator: 'shrink-0 self-stretch bg-gray-a6',
    group: 'flex gap-1',
    input: ['min-w-0', inputSurface],
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
    // The parts are one step smaller than a `Button` of the same size
    size: {
      sm: {
        button: [controlSize.xs, 'min-w-6 rounded-inner-1 px-1.5'],
        link: 'px-1.5 text-xs',
        input: [controlSize.xs, 'rounded-inner-1'],
      },
      md: {
        button: [controlSize.sm, 'min-w-8 rounded-inner-1 px-2'],
        link: 'px-2 text-sm',
        input: [controlSize.sm, 'rounded-inner-1'],
      },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
})

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

  return <BaseToolbar.Input {...props} className={cn(styles.input(), className)} />
}
