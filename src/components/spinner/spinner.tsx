import type { ComponentProps, ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'

export const spinnerVariants = tv({
  base: 'shrink-0 animate-spin',
  variants: {
    size: {
      sm: 'size-3',
      md: 'size-4',
      lg: 'size-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type SpinnerProps = Omit<ComponentProps<'svg'>, 'children' | 'color'> &
  VariantProps<typeof spinnerVariants> & {
    /** Shown in place of the spinner when `loading` is false. */
    children?: ReactNode
    /**
     * The color scale to use. Without it the spinner takes the text color around it.
     */
    color?: Color
    /**
     * With children: shows the spinner while true, and the children when false.
     * The space taken stays the size of the children.
     * @default true
     */
    loading?: boolean
  }

export function Spinner({
  children,
  className,
  color,
  loading = true,
  size,
  ...props
}: SpinnerProps) {
  if (!loading) {
    return children
  }

  const spinner = (
    <svg
      aria-hidden="true"
      data-color={colorAttribute(color)}
      fill="none"
      viewBox="0 0 16 16"
      {...props}
      className={cn(spinnerVariants({ size }), color && 'text-accent-a11', className)}
    >
      <circle cx="8" cy="8" opacity="0.25" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M14.5 8A6.5 6.5 0 0 0 8 1.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  )

  if (children === undefined) {
    return spinner
  }

  // Keep the children in the layout (hidden), with the spinner centered on top
  return (
    <span className="relative inline-flex items-center justify-center">
      <span aria-hidden="true" className="invisible contents">
        {children}
      </span>
      <span className="absolute inset-0 flex items-center justify-center">{spinner}</span>
    </span>
  )
}
