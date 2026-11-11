import { cn } from '../../lib/cn'
import { Button, type ButtonProps } from '../button'

export type IconButtonProps = ButtonProps

// Ghost has no fixed size: the icon plus the same padding on all sides.
// The paddings are the ones of Radix Themes' IconButton: 4, 6, 8 and 12px.
const ghostPadding = {
  sm: 'p-1',
  md: 'p-1.5',
  lg: 'p-2',
  xl: 'p-3',
}

/** A square `Button` for a single icon. Give it an `aria-label`. */
export function IconButton({ className, size, variant, ...props }: IconButtonProps) {
  return (
    <Button
      {...props}
      className={cn(
        // As wide as it is tall, the same heights as `Button`
        variant === 'ghost' ? ghostPadding[size ?? 'md'] : 'aspect-square px-0',
        className,
      )}
      size={size}
      variant={variant}
    />
  )
}
