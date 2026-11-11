import { OTPField as BaseOtpField } from '@base-ui/react/otp-field'
import type { ComponentProps } from 'react'
import { tv } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { bareFieldBox, type FieldBoxVariants } from '../../lib/field-box'
import type { Radius } from '../../lib/theme'

export const otpFieldVariants = tv({
  slots: {
    root: 'flex items-center',
    // Each box is the shared field box (`bareFieldBox`), made square
    input: 'text-center tabular-nums',
  },
  variants: {
    size: {
      sm: { root: 'gap-1', input: 'w-6' },
      md: { root: 'gap-1.5', input: 'w-8' },
      lg: { root: 'gap-2', input: 'w-10' },
      xl: { root: 'gap-2', input: 'w-12' },
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
  FieldBoxVariants & {
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
  variant,
  ...props
}: OtpFieldProps) {
  const box = bareFieldBox({ size, variant })
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
          className={cn(box, styles.input(), classNames?.input)}
          key={index}
          placeholder={placeholder}
        />
      ))}
    </BaseOtpField.Root>
  )
}
