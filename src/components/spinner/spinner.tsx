import type { ComponentProps, ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'

// One turn takes 800ms, like Radix Themes
const duration = 800
const leaves = [0, 1, 2, 3, 4, 5, 6, 7]

// Radix sizes 1 to 3: 12px, 16px and 20px
export const spinnerVariants = tv({
  base: 'block shrink-0 opacity-65',
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

  // Eight leaves in a circle. Each one fades out, one after the other.
  // It is an SVG, so it scales with any `size-*` class.
  const spinner = (
    <>
      <svg
        aria-hidden="true"
        data-color={colorAttribute(color)}
        fill="currentColor"
        viewBox="0 0 16 16"
        {...props}
        className={cn(spinnerVariants({ size }), color && 'text-accent-a11', className)}
      >
        {leaves.map((leaf) => (
          <rect
            className="animate-[ui-spinner-leaf-fade_800ms_linear_infinite]"
            height="4.8"
            key={leaf}
            rx="1"
            style={{ animationDelay: `${((leaf - 8) / 8) * duration}ms` }}
            transform={`rotate(${leaf * 45} 8 8)`}
            width="2"
            x="7"
            y="0"
          />
        ))}
      </svg>
    </>
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
