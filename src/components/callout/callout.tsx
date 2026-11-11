import { type ComponentProps, createContext, useContext } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import type { Radius } from '../../lib/theme'

// Values follow Radix Themes' Callout.
export const calloutVariants = tv({
  slots: {
    // The icon goes in the first column, the text in the second
    root: 'grid grid-cols-[auto_1fr] items-start text-left text-accent-a11 has-[>:only-child]:grid-cols-1',
    // As tall as one line of text, so the icon lines up with the first line
    icon: 'col-start-1 flex items-center [&>svg]:shrink-0',
    text: 'col-start-2 m-0 only:col-start-1',
  },
  variants: {
    variant: {
      soft: { root: 'bg-accent-a3' },
      surface: { root: 'bg-accent-a2 inset-ring inset-ring-accent-a6' },
      outline: { root: 'inset-ring inset-ring-accent-a7' },
    },
    size: {
      sm: {
        root: 'gap-2 rounded-panel-md p-3',
        icon: 'h-5 [&>svg]:size-4',
        text: 'text-sm',
      },
      md: {
        root: 'gap-x-3 gap-y-2 rounded-panel-lg p-4',
        icon: 'h-5 [&>svg]:size-4',
        text: 'text-sm',
      },
      lg: {
        root: 'gap-x-4 gap-y-3 rounded-panel-xl p-6',
        icon: 'h-6 [&>svg]:size-5',
        text: 'text-base',
      },
    },
    /** Darker text, using the darkest step of the color. */
    highContrast: {
      true: { root: 'text-accent-12' },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'soft',
  },
})

type Size = VariantProps<typeof calloutVariants>['size']

const SizeContext = createContext<Size>(undefined)

export type CalloutRootProps = Omit<ComponentProps<'div'>, 'color'> &
  VariantProps<typeof calloutVariants> & {
    /**
     * The color scale to use. `accent` follows the theme.
     * @default 'accent'
     */
    color?: Color
    /** How round the corners are. Follows the theme when not set. */
    radius?: Radius
  }

/** A short message that stands out. Use `role="alert"` when it must be announced. */
export function CalloutRoot({
  className,
  color,
  highContrast,
  radius,
  size,
  variant,
  ...props
}: CalloutRootProps) {
  return (
    <SizeContext.Provider value={size}>
      <div
        data-color={colorAttribute(color)}
        data-radius={radius}
        {...props}
        className={cn(calloutVariants({ highContrast, size, variant }).root(), className)}
      />
    </SizeContext.Provider>
  )
}

export type CalloutIconProps = ComponentProps<'div'>

export function CalloutIcon({ className, ...props }: CalloutIconProps) {
  const size = useContext(SizeContext)

  return <div {...props} className={cn(calloutVariants({ size }).icon(), className)} />
}

export type CalloutTextProps = ComponentProps<'p'>

export function CalloutText({ className, ...props }: CalloutTextProps) {
  const size = useContext(SizeContext)

  return <p {...props} className={cn(calloutVariants({ size }).text(), className)} />
}
