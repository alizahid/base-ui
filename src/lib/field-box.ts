import { createContext } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from './cn'
import { controlSize } from './styles'

/**
 * The box of every text-like control: TextField, NumberField, Combobox and
 * Autocomplete inputs, and the Select trigger. One place, so they all match.
 * Values follow Radix Themes' TextField.
 *
 * - `root` is the visible box (border, background, focus ring).
 * - `input` is the see-through `<input>` inside it.
 * - `slot` holds icons, text or buttons inside the box (`data-side="left" | "right"`).
 */
export const fieldBoxVariants = tv({
  slots: {
    root: [
      'flex w-full min-w-0 cursor-text items-center text-start font-normal',
      // Focus ring: when the input inside has focus, or the box itself (Select trigger)
      '-outline-offset-1 outline-accent-8 focus-visible:outline-2 has-[input:focus-visible]:outline-2',
      // A disabled or read-only input gets a gray focus ring
      'has-[input:read-only]:outline-gray-8',
      'data-disabled:cursor-not-allowed has-[input:disabled]:cursor-not-allowed',
    ],
    input: [
      'h-full w-full min-w-0 flex-1 rounded-[inherit] bg-transparent text-start outline-none',
      'selection:bg-accent-a5 read-only:selection:bg-gray-a5 disabled:cursor-not-allowed',
      // Hide the small native buttons of number and search inputs
      '[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-search-cancel-button]:appearance-none [&[type=number]]:[-moz-appearance:textfield]',
      // Take away the browser's own autofill color; the box shows it instead
      'autofill:bg-clip-text autofill:[-webkit-text-fill-color:var(--gray-12)]',
    ],
    // A slot with its own `color` uses that color
    slot: 'flex shrink-0 items-center text-gray-a11 data-color:text-accent-a11 data-[side=left]:order-first',
  },
  variants: {
    variant: {
      surface: {
        root: [
          'bg-surface text-gray-12 inset-ring inset-ring-gray-a7',
          // Autofilled: a light tint of the accent color
          'has-[input:autofill]:bg-[linear-gradient(var(--accent-a2),var(--accent-a2))]',
          'has-[input:autofill]:shadow-[inset_0_0_0_1px_var(--accent-a5),inset_0_0_0_1px_var(--gray-a5)]',
          'data-invalid:inset-ring-(--red-a8) has-[input[data-invalid]]:inset-ring-(--red-a8)',
          // Disabled and read-only: a gray wash and a lighter border, like Radix Themes
          'data-disabled:bg-gray-a2 data-disabled:text-gray-a11 data-disabled:inset-ring-gray-a6',
          // For an input the gray is a layer on top of the surface color
          'has-[input:disabled]:bg-[linear-gradient(var(--gray-a2),var(--gray-a2))] has-[input:disabled]:text-gray-a11 has-[input:disabled]:inset-ring-gray-a6',
          'has-[input:read-only]:bg-[linear-gradient(var(--gray-a2),var(--gray-a2))] has-[input:read-only]:text-gray-a11 has-[input:read-only]:inset-ring-gray-a6',
          'has-[input:read-only]:shadow-none',
        ],
        input: 'placeholder:text-gray-a10 read-only:placeholder:opacity-50',
      },
      soft: {
        root: [
          'bg-accent-a3 text-accent-12',
          'has-[input:autofill]:shadow-[inset_0_0_0_1px_var(--accent-a5),inset_0_0_0_1px_var(--gray-a4)]',
          'data-invalid:inset-ring data-invalid:inset-ring-(--red-a8)',
          'has-[input[data-invalid]]:inset-ring has-[input[data-invalid]]:inset-ring-(--red-a8)',
          'data-disabled:bg-gray-a3 data-disabled:text-gray-a11',
          'has-[input:disabled]:bg-gray-a3 has-[input:disabled]:text-gray-a11',
          'has-[input:read-only]:bg-gray-a3 has-[input:read-only]:text-gray-a11',
          'has-[input:read-only]:shadow-none',
        ],
        input: 'placeholder:text-accent-12/60 read-only:placeholder:text-accent-12/50',
        slot: 'text-accent-12',
      },
    },
    // Same heights as Button. Paddings, gaps and corners are the Radix Themes
    // TextField ones for sizes 1 to 3; `xl` continues the same steps.
    size: {
      sm: {
        root: [
          controlSize.sm,
          'rounded-ui-sm px-0',
          '[&:has([data-side=left])>input]:pl-0 [&:has([data-side=right])>input]:pr-0',
        ],
        input: 'px-1.5',
        slot: 'gap-2 px-1',
      },
      md: {
        root: [
          controlSize.md,
          'px-0',
          '[&:has([data-side=left])>input]:pl-0 [&:has([data-side=right])>input]:pr-0',
        ],
        input: 'px-2',
        slot: 'gap-2 px-2',
      },
      lg: {
        root: [
          controlSize.lg,
          'px-0',
          '[&:has([data-side=left])>input]:pl-0 [&:has([data-side=right])>input]:pr-0',
        ],
        input: 'px-3',
        slot: 'gap-3 px-3',
      },
      xl: {
        root: [
          controlSize.xl,
          'px-0',
          '[&:has([data-side=left])>input]:pl-0 [&:has([data-side=right])>input]:pr-0',
        ],
        input: 'px-4',
        slot: 'gap-3 px-4',
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

// What the element needs when it is the box itself: the same placeholder,
// disabled and read-only looks that `root` + `input` give together.
const bare = {
  surface: [
    'selection:bg-accent-a5 placeholder:text-gray-a10',
    'read-only:bg-[linear-gradient(var(--gray-a2),var(--gray-a2))] read-only:text-gray-a11 read-only:outline-gray-8 read-only:inset-ring-gray-a6',
    'read-only:selection:bg-gray-a5 read-only:placeholder:opacity-50',
    'disabled:cursor-not-allowed',
  ],
  soft: [
    'selection:bg-accent-a5 placeholder:text-accent-12/60',
    'read-only:bg-gray-a3 read-only:text-gray-a11 read-only:outline-gray-8',
    'read-only:selection:bg-gray-a5 read-only:placeholder:text-accent-12/50',
    'disabled:cursor-not-allowed',
  ],
}

/**
 * The same box for an `<input>` or `<textarea>` that has no wrapper around it,
 * so the element is the box itself (OtpField, Toolbar.Input, TextArea).
 * It has no side padding; add your own `px-*`.
 */
export function bareFieldBox({ size, variant }: FieldBoxVariants = {}) {
  return cn(fieldBoxVariants({ size, variant }).root(), 'block', bare[variant ?? 'surface'])
}
