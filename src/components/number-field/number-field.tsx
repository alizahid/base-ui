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
    root: 'inline-flex w-40',
    // `contents`: the group is only there for Base UI, the box lays out its children
    group: 'contents',
    // The slots on both sides already keep the text away from the edges
    input: 'px-0 text-center tabular-nums',
    // The minus and plus buttons sit in a slot, away from the edges, like a ghost
    // IconButton inside a `TextField.Slot` (same sizes as the Combobox buttons)
    button: [
      'flex shrink-0 cursor-default select-none items-center justify-center rounded-ui-xs text-gray-a11',
      '-outline-offset-1 outline-accent-8 focus-visible:outline-2',
      'hover:bg-gray-a3 active:bg-gray-a4',
      'data-disabled:cursor-not-allowed data-disabled:bg-transparent data-disabled:text-gray-a8',
    ],
  },
  variants: {
    size: {
      sm: { button: '-m-0.5 size-5 [&>svg]:size-3' },
      md: { button: '-m-1 size-5.5 [&>svg]:size-3.5' },
      lg: { button: '-m-1.5 size-7 rounded-ui-sm [&>svg]:size-4' },
      xl: { button: '-m-2 size-8 rounded-ui-sm [&>svg]:size-4' },
    },
    variant: {
      surface: {},
      soft: { button: 'text-accent-12 hover:bg-accent-a4 active:bg-accent-a5' },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'surface',
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

/**
 * Includes Base UI's `NumberField.Group`, `Decrement`, `Input` and `Increment`.
 * The minus and plus buttons are not tab stops (Base UI's default): the input is,
 * and the arrow keys change the value.
 */
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
  const styles = numberFieldVariants({ size, variant })

  return (
    <BaseNumberField.Root
      data-color={colorAttribute(color)}
      data-radius={radius}
      {...props}
      className={cn(box.root(), styles.root(), className)}
    >
      <BaseNumberField.Group className={cn(styles.group(), classNames?.group)}>
        <div className={box.slot()} data-side="left">
          <BaseNumberField.Decrement className={cn(styles.button(), classNames?.decrement)}>
            <MinusIcon />
          </BaseNumberField.Decrement>
        </div>
        <BaseNumberField.Input
          // The label names the text box, not the wrapping div
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          className={cn(box.input(), styles.input(), classNames?.input)}
          placeholder={placeholder}
        />
        <div className={box.slot()} data-side="right">
          <BaseNumberField.Increment className={cn(styles.button(), classNames?.increment)}>
            <PlusIcon />
          </BaseNumberField.Increment>
        </div>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  )
}

function MinusIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 16 16">
      <path d="M3.5 8h9" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 16 16">
      <path d="M3.5 8h9M8 3.5v9" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  )
}
