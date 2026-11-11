import { OTPField as BaseOtpField } from '@base-ui/react/otp-field'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { controlSize, inputSurface } from '../../lib/styles'
import type { Radius } from '../../lib/theme'

export const otpFieldVariants = tv({
  slots: {
    root: 'flex items-center',
    // Each box looks like an `Input`
    input: [inputSurface, 'text-center tabular-nums'],
  },
  variants: {
    size: {
      xs: { root: 'gap-1', input: [controlSize.xs, 'w-6 px-0'] },
      sm: { root: 'gap-1.5', input: [controlSize.sm, 'w-8 px-0'] },
      md: { root: 'gap-2', input: [controlSize.md, 'w-10 px-0'] },
      lg: { root: 'gap-2', input: [controlSize.lg, 'w-12 px-0'] },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type OtpFieldProps = Omit<
  ComponentProps<typeof BaseOtpField.Root>,
  'children' | 'className' | 'color' | 'length'
> &
  VariantProps<typeof otpFieldVariants> & {
    className?: string
    /** Classes for the parts that `OtpField` renders inside itself. */
    classNames?: {
      input?: string
    }
    /**
     * The color scale to use. `accent` follows the theme.
     * @default 'accent'
     */
    color?: Color
    /**
     * How many characters the code has. One box is rendered for each.
     * @default 6
     */
    length?: number
    /** Placeholder shown in every empty box, for example `•`. */
    placeholder?: string
    /** How round the corners are. Follows the theme when not set. */
    radius?: Radius
  }

/** Includes one Base UI `OTPField.Input` per character. */
export function OtpField({
  className,
  classNames,
  color,
  length = 6,
  placeholder,
  radius,
  size,
  ...props
}: OtpFieldProps) {
  const styles = otpFieldVariants({ size })

  return (
    <BaseOtpField.Root
      data-color={colorAttribute(color)}
      data-radius={radius}
      {...props}
      className={cn(styles.root(), className)}
      length={length}
    >
      {Array.from({ length }, (_, index) => (
        <BaseOtpField.Input
          // The first box is named by the field label
          aria-label={index === 0 ? undefined : `Character ${index + 1} of ${length}`}
          className={cn(styles.input(), classNames?.input)}
          key={index}
          placeholder={placeholder}
        />
      ))}
    </BaseOtpField.Root>
  )
}
