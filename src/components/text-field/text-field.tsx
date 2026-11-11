import { Input as BaseInput } from '@base-ui/react/input'
import {
  type ComponentProps,
  createContext,
  type PointerEvent,
  type ReactNode,
  useContext,
} from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { controlSize } from '../../lib/styles'
import type { Radius } from '../../lib/theme'

export const textFieldVariants = tv({
  slots: {
    // The box. It has the border, background and focus ring; the input inside is see-through.
    root: [
      'flex w-full min-w-0 cursor-text items-center',
      '-outline-offset-1 outline-accent-8 has-[input:focus-visible]:outline-2',
      'has-[input:disabled]:cursor-not-allowed',
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
          'has-[input[data-invalid]]:inset-ring-(--red-a8)',
          'has-[input:disabled]:bg-gray-a2 has-[input:disabled]:text-gray-a11',
        ],
        input: 'placeholder:text-gray-a10',
      },
      soft: {
        root: [
          'bg-accent-a3 text-accent-12',
          'has-[input[data-invalid]]:inset-ring has-[input[data-invalid]]:inset-ring-(--red-a8)',
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

type TextFieldVariants = VariantProps<typeof textFieldVariants>

// Lets a `Slot` use the size and variant of the `Root` it is in
const TextFieldContext = createContext<TextFieldVariants>({})

export type TextFieldRootProps = Omit<
  ComponentProps<typeof BaseInput>,
  'children' | 'className' | 'color' | 'size'
> &
  VariantProps<typeof textFieldVariants> & {
    /** `TextField.Slot` parts: icons, text or buttons shown inside the box. */
    children?: ReactNode
    /** Classes for the box around the input. */
    className?: string
    /** Classes for the parts that `Root` renders inside itself. */
    classNames?: {
      input?: string
    }
    /**
     * The color scale to use. `accent` follows the theme.
     * @default 'accent'
     */
    color?: Color
    /** How round the corners are. Follows the theme when not set. */
    radius?: Radius
  }

/**
 * A text input in a box. All input props (`value`, `placeholder`, `ref`, ...) go to
 * the `<input>`. Works on its own and inside `Field.Root`.
 */
export function TextFieldRoot({
  children,
  className,
  classNames,
  color,
  radius,
  size,
  variant,
  ...props
}: TextFieldRootProps) {
  const styles = textFieldVariants({ size, variant })

  // Clicking the box or an icon puts the cursor in the input
  function focusInput(event: PointerEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement

    if (target.closest('input, button, a')) {
      return
    }

    const input = event.currentTarget.querySelector('input')

    if (input && !input.disabled) {
      event.preventDefault()
      input.focus()
    }
  }

  return (
    <TextFieldContext.Provider value={{ size, variant }}>
      <div
        className={cn(styles.root(), className)}
        data-color={colorAttribute(color)}
        data-radius={radius}
        onPointerDown={focusInput}
      >
        <BaseInput {...props} className={cn(styles.input(), classNames?.input)} />
        {children}
      </div>
    </TextFieldContext.Provider>
  )
}

export type TextFieldSlotProps = Omit<ComponentProps<'div'>, 'color'> & {
  /**
   * The color scale to use for the slot content. `accent` follows the field.
   * @default 'accent'
   */
  color?: Color
  /**
   * Which side of the input the slot sits on.
   * @default 'left'
   */
  side?: 'left' | 'right'
}

/** An icon, some text or a button inside the box of a `TextField.Root`. */
export function TextFieldSlot({ className, color, side = 'left', ...props }: TextFieldSlotProps) {
  const { size, variant } = useContext(TextFieldContext)

  return (
    <div
      data-color={colorAttribute(color)}
      data-side={side}
      {...props}
      className={cn(textFieldVariants({ size, variant }).slot(), className)}
    />
  )
}
