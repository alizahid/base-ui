import { createContext } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from './cn'
import { controlSize } from './styles'

/**
 * The box of every text-like control: TextField, NumberField, Combobox and
 * Autocomplete inputs, and the Select trigger. One place, so they all match.
 *
 * - `root` is the visible box (border, background, focus ring).
 * - `input` is the see-through `<input>` inside it.
 * - `slot` holds icons, text or buttons inside the box (`data-side="left" | "right"`).
 */
export const fieldBoxVariants = tv({
  slots: {
    root: [
      'flex w-full min-w-0 cursor-text items-center',
      // Focus ring: when the input inside has focus, or the box itself (Select trigger)
      '-outline-offset-1 outline-accent-8 focus-visible:outline-2 has-[input:focus-visible]:outline-2',
      'data-disabled:cursor-not-allowed has-[input:disabled]:cursor-not-allowed',
    ],
    input: [
      'h-full w-full min-w-0 flex-1 rounded-[inherit] bg-transparent outline-none',
      'disabled:cursor-not-allowed',
    ],
    slot: 'flex shrink-0 items-center gap-2 text-gray-a11 data-[side=left]:order-first',
  },
  variants: {
    variant: {
      surface: {
        root: [
          'bg-surface text-gray-12 inset-ring inset-ring-gray-a7',
          'data-invalid:inset-ring-(--red-a8) has-[input[data-invalid]]:inset-ring-(--red-a8)',
          'data-disabled:bg-gray-a2 data-disabled:text-gray-a11',
          'has-[input:disabled]:bg-gray-a2 has-[input:disabled]:text-gray-a11',
        ],
        input: 'placeholder:text-gray-a10',
      },
      soft: {
        root: [
          'bg-accent-a3 text-accent-12',
          'data-invalid:inset-ring data-invalid:inset-ring-(--red-a8)',
          'has-[input[data-invalid]]:inset-ring has-[input[data-invalid]]:inset-ring-(--red-a8)',
          'data-disabled:bg-gray-a3 data-disabled:text-gray-a11',
          'has-[input:disabled]:bg-gray-a3 has-[input:disabled]:text-gray-a11',
        ],
        input: 'placeholder:text-accent-12/60 disabled:placeholder:text-gray-a9',
        slot: 'text-accent-a11',
      },
    },
    // Same heights as Button. A slot sits as far from the side as from the top and
    // bottom of a button one size smaller, so `rounded-inner-*` on that button lines up.
    size: {
      xs: {
        root: [
          controlSize.xs,
          'px-0',
          '[&:has([data-side=left])>input]:pl-1 [&:has([data-side=right])>input]:pr-1',
        ],
        input: 'px-1.5',
        slot: 'data-[side=left]:pl-1 data-[side=right]:pr-1',
      },
      sm: {
        root: [
          controlSize.sm,
          'px-0',
          '[&:has([data-side=left])>input]:pl-1.5 [&:has([data-side=right])>input]:pr-1.5',
        ],
        input: 'px-2',
        slot: 'data-[side=left]:pl-1.5 data-[side=right]:pr-1.5',
      },
      md: {
        root: [
          controlSize.md,
          'px-0',
          '[&:has([data-side=left])>input]:pl-2 [&:has([data-side=right])>input]:pr-2',
        ],
        input: 'px-3',
        slot: 'data-[side=left]:pl-2 data-[side=right]:pr-2',
      },
      lg: {
        root: [
          controlSize.lg,
          'px-0',
          '[&:has([data-side=left])>input]:pl-3 [&:has([data-side=right])>input]:pr-3',
        ],
        input: 'px-4',
        slot: 'data-[side=left]:pl-3 data-[side=right]:pr-3',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'surface',
  },
})

export type FieldBoxVariants = VariantProps<typeof fieldBoxVariants>

/** Lets a `TextField.Slot` use the size and variant of the box it is in. */
export const FieldBoxContext = createContext<FieldBoxVariants>({})

const placeholder = {
  surface: 'placeholder:text-gray-a10',
  soft: 'placeholder:text-accent-12/60 disabled:placeholder:text-gray-a9',
}

/**
 * The same box for an `<input>` or `<textarea>` that has no wrapper around it,
 * so the element is the box itself (OtpField, Toolbar.Input, TextArea).
 * It has no side padding; add your own `px-*`.
 */
export function bareFieldBox({ size, variant }: FieldBoxVariants = {}) {
  return cn(fieldBoxVariants({ size, variant }).root(), 'block', placeholder[variant ?? 'surface'])
}
