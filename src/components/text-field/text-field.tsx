import { Input as BaseInput } from '@base-ui/react/input'
import { type ComponentProps, type PointerEvent, type ReactNode, useContext } from 'react'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { FieldBoxContext, type FieldBoxVariants, fieldBoxVariants } from '../../lib/field-box'
import type { Radius } from '../../lib/theme'

/** Same as `fieldBoxVariants`: the box shared with NumberField, Combobox and Select. */
export const textFieldVariants = fieldBoxVariants

export type TextFieldRootProps = Omit<
  ComponentProps<typeof BaseInput>,
  'children' | 'className' | 'color' | 'size'
> &
  FieldBoxVariants & {
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
    <FieldBoxContext.Provider value={{ size, variant }}>
      <div
        className={cn(styles.root(), className)}
        data-color={colorAttribute(color)}
        data-radius={radius}
        onPointerDown={focusInput}
      >
        <BaseInput {...props} className={cn(styles.input(), classNames?.input)} />
        {children}
      </div>
    </FieldBoxContext.Provider>
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
  const { size, variant } = useContext(FieldBoxContext)

  return (
    <div
      data-color={colorAttribute(color)}
      data-side={side}
      {...props}
      className={cn(textFieldVariants({ size, variant }).slot(), className)}
    />
  )
}
