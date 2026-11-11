import { Switch as BaseSwitch } from '@base-ui/react/switch'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { focusRing } from '../../lib/styles'
import type { Radius } from '../../lib/theme'

export const switchVariants = tv({
  slots: {
    root: [
      'group/switch relative inline-flex shrink-0 items-center rounded-ui-thumb bg-gray-a5 align-top transition-colors',
      'data-checked:bg-accent-9',
      'data-disabled:cursor-not-allowed data-disabled:bg-gray-a3 data-disabled:data-checked:bg-gray-a5',
      focusRing,
    ],
    thumb: [
      'block rounded-inner-px bg-white shadow-sm transition-transform',
      'group-data-disabled/switch:bg-gray-2 group-data-disabled/switch:shadow-none',
    ],
  },
  variants: {
    size: {
      sm: { root: 'h-4 w-7 p-px', thumb: 'size-3.5 data-checked:translate-x-3' },
      md: { root: 'h-5 w-9 p-px', thumb: 'size-4.5 data-checked:translate-x-4' },
      lg: { root: 'h-6 w-11 p-px', thumb: 'size-5.5 data-checked:translate-x-5' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type SwitchProps = Omit<ComponentProps<typeof BaseSwitch.Root>, 'className' | 'color'> &
  VariantProps<typeof switchVariants> & {
    className?: string
    /** Classes for the parts that `Switch` renders inside itself. */
    classNames?: {
      thumb?: string
    }
    /**
     * The color scale to use. `accent` follows the theme.
     * @default 'accent'
     */
    color?: Color
    /** How round the corners are. Follows the theme when not set. */
    radius?: Radius
  }

/** Includes Base UI's `Switch.Thumb`. */
export function Switch({ className, classNames, color, radius, size, ...props }: SwitchProps) {
  const styles = switchVariants({ size })

  return (
    <BaseSwitch.Root
      data-color={colorAttribute(color)}
      data-radius={radius}
      {...props}
      className={cn(styles.root(), className)}
    >
      <BaseSwitch.Thumb className={cn(styles.thumb(), classNames?.thumb)} />
    </BaseSwitch.Root>
  )
}
