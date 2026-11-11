import { cn } from '../../lib/cn'
import { Button, type ButtonProps } from '../button'

export type IconButtonProps = ButtonProps

/**
 * A square `Button` for a single icon, with the same heights as `Button` in
 * every variant. Give it an `aria-label`.
 */
export function IconButton({ className, ...props }: IconButtonProps) {
  return <Button {...props} className={cn('aspect-square px-0', className)} />
}
