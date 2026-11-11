import { Input as BaseInput } from '@base-ui/react/input'
import type { ComponentProps } from 'react'
import { tv } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { type FieldBoxVariants, fieldBoxVariants } from '../../lib/field-box'
import type { Radius } from '../../lib/theme'

/** What a text area adds to the shared box (`fieldBoxVariants`). */
export const textAreaVariants = tv({
  // The box has a fixed height and no padding; a text area grows and has its own padding
  base: 'block h-auto',
  variants: {
    variant: {
      surface: 'placeholder:text-gray-a10',
      soft: 'placeholder:text-accent-12/60 disabled:placeholder:text-gray-a9',
    },
    // `rounded-panel-*`: a tall box must not turn into a pill when the theme radius is full
    size: {
      xs: 'min-h-12 rounded-panel-sm px-1.5 py-1',
      sm: 'min-h-16 rounded-panel-md px-2 py-1.5',
      md: 'min-h-20 rounded-panel-md px-3 py-2',
      lg: 'min-h-24 rounded-panel-lg px-4 py-3',
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
    variant: 'surface',
  },
})

export type TextAreaProps = Omit<ComponentProps<'textarea'>, 'color'> &
  FieldBoxVariants & {
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
      className={cn(
        fieldBoxVariants({ size, variant }).root(),
        textAreaVariants({ resize, size, variant }),
        className,
      )}
    />
  )
}
