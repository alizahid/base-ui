import { Input as BaseInput } from '@base-ui/react/input'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { controlSize, inputSurface } from '../../lib/styles'
import type { Radius } from '../../lib/theme'

export const textFieldVariants = tv({
  base: 'block w-full min-w-0',
  variants: {
    variant: {
      surface: inputSurface,
      soft: [
        'bg-accent-a3 text-accent-12 placeholder:text-accent-12/60',
        '-outline-offset-1 outline-accent-8 focus-visible:outline-2',
        'data-invalid:inset-ring data-invalid:inset-ring-(--red-a8)',
        'data-disabled:cursor-not-allowed data-disabled:bg-gray-a3 data-disabled:text-gray-a11 data-disabled:placeholder:text-gray-a9',
      ],
    },
    // Same heights as Button, with less side padding
    size: {
      xs: [controlSize.xs, 'px-1.5'],
      sm: [controlSize.sm, 'px-2'],
      md: [controlSize.md, 'px-3'],
      lg: [controlSize.lg, 'px-4'],
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'surface',
  },
})

export type TextFieldProps = Omit<
  ComponentProps<typeof BaseInput>,
  'className' | 'color' | 'size'
> &
  VariantProps<typeof textFieldVariants> & {
    className?: string
    /**
     * The color scale to use. `accent` follows the theme.
     * @default 'accent'
     */
    color?: Color
    /** How round the corners are. Follows the theme when not set. */
    radius?: Radius
  }

/** A text input. Works on its own and inside `Field.Root`. */
export function TextField({ className, color, radius, size, variant, ...props }: TextFieldProps) {
  return (
    <BaseInput
      data-color={colorAttribute(color)}
      data-radius={radius}
      {...props}
      className={cn(textFieldVariants({ size, variant }), className)}
    />
  )
}
