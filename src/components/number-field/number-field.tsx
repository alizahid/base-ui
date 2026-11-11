import { NumberField as BaseNumberField } from '@base-ui/react/number-field'
import type { ComponentProps } from 'react'
import { tv } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { type FieldBoxVariants, fieldBoxVariants } from '../../lib/field-box'
import type { Radius } from '../../lib/theme'

export const numberFieldVariants = tv({
  slots: {
    // The box itself comes from `fieldBoxVariants`; this only adds what a number field needs
    root: 'inline-flex w-40 overflow-hidden',
    group: 'flex size-full items-stretch',
    input: 'px-0 text-center tabular-nums',
    button: [
      'flex aspect-square h-full shrink-0 cursor-default select-none items-center justify-center text-gray-a11',
      'hover:bg-gray-a3 active:bg-gray-a4',
      'data-disabled:cursor-not-allowed data-disabled:bg-transparent data-disabled:text-gray-a8',
    ],
  },
})

export type NumberFieldProps = Omit<
  ComponentProps<typeof BaseNumberField.Root>,
  'children' | 'className' | 'color'
> &
  FieldBoxVariants & {
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
  variant,
  ...props
}: NumberFieldProps) {
  const box = fieldBoxVariants({ size, variant })
  const styles = numberFieldVariants()

  return (
    <BaseNumberField.Root
      data-color={colorAttribute(color)}
      data-radius={radius}
      {...props}
      className={cn(box.root(), styles.root(), className)}
    >
      <BaseNumberField.Group className={cn(styles.group(), classNames?.group)}>
        <BaseNumberField.Decrement className={cn(styles.button(), classNames?.decrement)}>
          <MinusIcon />
        </BaseNumberField.Decrement>
        <BaseNumberField.Input
          // The label names the text box, not the wrapping div
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          className={cn(box.input(), styles.input(), classNames?.input)}
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
