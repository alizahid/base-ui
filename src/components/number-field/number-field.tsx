import { NumberField as BaseNumberField } from '@base-ui/react/number-field'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { controlSize } from '../../lib/styles'
import type { Radius } from '../../lib/theme'

export const numberFieldVariants = tv({
  slots: {
    // The root is the visible box. Same look as `inputSurface`, but the
    // focus ring shows when the input inside has focus.
    root: [
      'inline-block w-40 overflow-hidden bg-surface text-gray-12 inset-ring inset-ring-gray-a7',
      '-outline-offset-1 outline-accent-8 has-[input:focus-visible]:outline-2',
      'data-invalid:inset-ring-(--red-a8)',
      'data-disabled:cursor-not-allowed data-disabled:bg-gray-a2 data-disabled:text-gray-a11',
    ],
    group: 'flex size-full items-stretch',
    input: [
      'min-w-0 flex-1 bg-transparent text-center tabular-nums outline-none placeholder:text-gray-a10',
      'data-disabled:cursor-not-allowed',
    ],
    button: [
      'flex aspect-square h-full shrink-0 select-none items-center justify-center text-gray-a11',
      'hover:bg-gray-a3 active:bg-gray-a4',
      'data-disabled:cursor-not-allowed data-disabled:bg-transparent data-disabled:text-gray-a8',
    ],
  },
  variants: {
    size: {
      xs: { root: [controlSize.xs, 'px-0'] },
      sm: { root: [controlSize.sm, 'px-0'] },
      md: { root: [controlSize.md, 'px-0'] },
      lg: { root: [controlSize.lg, 'px-0'] },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type NumberFieldProps = Omit<
  ComponentProps<typeof BaseNumberField.Root>,
  'children' | 'className' | 'color'
> &
  VariantProps<typeof numberFieldVariants> & {
    className?: string
    /** Classes for the parts that `NumberField` renders inside itself. */
    classNames?: {
      decrement?: string
      group?: string
      increment?: string
      input?: string
    }
    /**
     * The color scale to use. `accent` follows the theme.
     * @default 'accent'
     */
    color?: Color
    /** Placeholder text of the input. */
    placeholder?: string
    /** How round the corners are. Follows the theme when not set. */
    radius?: Radius
  }

/** Includes Base UI's `NumberField.Group`, `Decrement`, `Input` and `Increment`. */
export function NumberField({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className,
  classNames,
  color,
  placeholder,
  radius,
  size,
  ...props
}: NumberFieldProps) {
  const styles = numberFieldVariants({ size })

  return (
    <BaseNumberField.Root
      data-color={colorAttribute(color)}
      data-radius={radius}
      {...props}
      className={cn(styles.root(), className)}
    >
      <BaseNumberField.Group className={cn(styles.group(), classNames?.group)}>
        <BaseNumberField.Decrement className={cn(styles.button(), classNames?.decrement)}>
          <MinusIcon />
        </BaseNumberField.Decrement>
        <BaseNumberField.Input
          // The label names the text box, not the wrapping div
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          className={cn(styles.input(), classNames?.input)}
          placeholder={placeholder}
        />
        <BaseNumberField.Increment className={cn(styles.button(), classNames?.increment)}>
          <PlusIcon />
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  )
}

function MinusIcon() {
  return (
    <svg aria-hidden="true" className="size-[1em]" fill="none" viewBox="0 0 16 16">
      <path d="M3.5 8h9" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg aria-hidden="true" className="size-[1em]" fill="none" viewBox="0 0 16 16">
      <path d="M3.5 8h9M8 3.5v9" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  )
}
