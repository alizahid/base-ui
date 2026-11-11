import { Switch as BaseSwitch } from '@base-ui/react/switch'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { focusRing } from '../../lib/styles'
import type { Radius } from '../../lib/theme'

// Values follow Radix Themes' Switch (surface variant).
//
// The track color is a gradient that is wider than the track: accent on the
// left, see-through on the right. Turning the switch on slides the gradient
// along with the thumb, so the color follows the thumb instead of fading in.
export const switchVariants = tv({
  slots: {
    root: [
      'group/switch relative inline-flex shrink-0 cursor-default items-center align-top',
      'bg-gray-a3 bg-no-repeat shadow-[inset_0_0_0_1px_var(--gray-a5)]',
      'bg-[linear-gradient(to_right,var(--accent-track)_40%,transparent_60%)]',
      'bg-position-[100%_0] data-checked:bg-position-[0%_0]',
      '[transition:background-position_120ms_linear,background-color_140ms_ease-in-out,box-shadow_140ms_ease-in-out,filter_140ms_ease-in-out]',
      'data-checked:[transition:background-position_160ms_linear,background-color_140ms_ease-in-out,box-shadow_140ms_ease-in-out,filter_140ms_ease-in-out]',
      // Pressed: reacts fast, a bit darker (lighter in dark mode)
      'active:bg-gray-a4 active:duration-30',
      'data-checked:active:brightness-92 data-checked:active:saturate-110',
      'dark:data-checked:active:brightness-108 dark:data-checked:active:saturate-100',
      // Disabled: no color, and blended into the page like Radix Themes does
      'data-disabled:cursor-not-allowed data-disabled:bg-none data-disabled:mix-blend-multiply dark:data-disabled:mix-blend-screen',
      'data-disabled:shadow-[inset_0_0_0_1px_var(--gray-a3)] data-disabled:filter-none',
      'data-disabled:active:bg-gray-a3',
      focusRing,
    ],
    thumb: [
      // 1px away from the edge of the track on every side
      'absolute left-px block rounded-inner-px bg-white',
      'transition-[translate,box-shadow] duration-140 ease-[cubic-bezier(0.45,0.05,0.55,0.95)]',
      'shadow-[0_0_1px_1px_var(--black-a2),0_1px_1px_var(--black-a1),0_2px_4px_-1px_var(--black-a1)]',
      'data-checked:shadow-[0_1px_3px_var(--black-a2),0_2px_4px_-1px_var(--black-a1),0_0_0_1px_var(--black-a1),0_0_0_1px_var(--accent-a4),-1px_0_1px_var(--black-a2)]',
      'data-disabled:bg-gray-2 data-disabled:transition-none',
      'data-disabled:shadow-[0_0_0_1px_var(--gray-a2),0_1px_3px_var(--black-a1)]',
    ],
  },
  variants: {
    // Radix Themes sizes 1 to 3: 16, 20 and 24px tall, and 1.75 times as wide.
    // The gradient is two track widths plus one track height long.
    size: {
      sm: {
        root: 'h-4 w-7 rounded-[max(calc(0.1875rem*var(--radius-factor)),var(--radius-thumb))] bg-size-[72px_100%]',
        thumb: 'size-3.5 data-checked:translate-x-3',
      },
      md: {
        root: 'h-5 w-[35px] rounded-ui-thumb bg-size-[90px_100%]',
        thumb: 'size-4.5 data-checked:translate-x-[15px]',
      },
      lg: {
        root: 'h-6 w-[42px] rounded-ui-thumb bg-size-[108px_100%]',
        thumb: 'size-5.5 data-checked:translate-x-4.5',
      },
    },
    /** A darker track when on (light mode only, like Radix Themes). */
    highContrast: {
      true: {
        root: [
          'bg-[linear-gradient(to_right,var(--black-a8)_40%,transparent_60%),linear-gradient(to_right,var(--accent-track)_40%,transparent_60%)]',
          'dark:bg-[linear-gradient(to_right,var(--accent-track)_40%,transparent_60%)]',
          'data-checked:active:brightness-116 data-checked:active:contrast-82 data-checked:active:saturate-120',
          'dark:data-checked:active:brightness-108 dark:data-checked:active:contrast-100 dark:data-checked:active:saturate-100',
        ],
        thumb:
          'data-checked:shadow-[0_1px_3px_var(--black-a2),0_2px_4px_-1px_var(--black-a1),0_0_0_1px_var(--black-a2),-1px_0_1px_var(--black-a2)]',
      },
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
export function Switch({
  className,
  classNames,
  color,
  highContrast,
  radius,
  size,
  ...props
}: SwitchProps) {
  const styles = switchVariants({ highContrast, size })

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
