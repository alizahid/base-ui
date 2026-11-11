import { Input as BaseInput } from '@base-ui/react/input'
import type { ComponentProps } from 'react'
import { tv } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { bareFieldBox, type FieldBoxVariants } from '../../lib/field-box'
import type { Radius } from '../../lib/theme'

/** What a text area adds to the shared box (`fieldBoxVariants`). Values follow Radix Themes' TextArea. */
export const textAreaVariants = tv({
  // The box has a fixed height and no padding; a text area grows and has its own padding
  base: 'h-auto',
  variants: {
    // Radix Themes sizes 1 to 3.
    // `rounded-panel-*`: a tall box must not turn into a pill when the theme radius is full
    size: {
      sm: 'min-h-12 rounded-panel-sm px-1.5 py-1',
      md: 'min-h-16 rounded-panel-sm px-2 py-1.5',
      lg: 'min-h-20 rounded-panel-md px-3 py-2',
    },
    resize: {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    },
  },
  defaultVariants: {
    resize: 'none',
    size: 'md',
  },
})

export type TextAreaProps = Omit<ComponentProps<'textarea'>, 'color'> &
  Pick<FieldBoxVariants, 'variant'> & {
    /**
     * The color scale to use. `accent` follows the theme.
     * @default 'accent'
     */
    color?: Color
    /** How round the corners are. Follows the theme when not set. */
    radius?: Radius
    /**
     * Which way the user can drag the corner to resize.
     * @default 'none'
     */
    resize?: 'none' | 'vertical' | 'horizontal' | 'both'
    /**
     * `sm`, `md` and `lg` are Radix Themes sizes 1 to 3.
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg'
  }

/** A multi-line text input. Works on its own and inside `Field.Root`. */
export function TextArea({
  className,
  color,
  radius,
  resize,
  size,
  variant,
  ...props
}: TextAreaProps) {
  return (
    <BaseInput
      data-color={colorAttribute(color)}
      data-radius={radius}
      // Base UI's Input gives the label, validation and state attributes of a Field
      render={<textarea {...props} />}
      className={cn(bareFieldBox({ size, variant }), textAreaVariants({ resize, size }), className)}
    />
  )
}
