import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset'
import type { ComponentProps } from 'react'
import { cn } from '../../lib/cn'

export type FieldsetRootProps = Omit<ComponentProps<typeof BaseFieldset.Root>, 'className'> & {
  className?: string
}

/** Groups related fields under one legend. */
export function FieldsetRoot({ className, ...props }: FieldsetRootProps) {
  return (
    <BaseFieldset.Root
      {...props}
      className={cn('m-0 flex min-w-0 flex-col gap-4 border-0 p-0', className)}
    />
  )
}

export type FieldsetLegendProps = Omit<ComponentProps<typeof BaseFieldset.Legend>, 'className'> & {
  className?: string
}

export function FieldsetLegend({ className, ...props }: FieldsetLegendProps) {
  return (
    <BaseFieldset.Legend
      {...props}
      className={cn('font-medium text-base text-gray-12 data-disabled:text-gray-a8', className)}
    />
  )
}
