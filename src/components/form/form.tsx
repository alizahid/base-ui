import { Form as BaseForm } from '@base-ui/react/form'
import type { ComponentProps } from 'react'
import { cn } from '../../lib/cn'

export type FormProps = Omit<ComponentProps<typeof BaseForm>, 'className'> & {
  className?: string
}

/** A `<form>` that collects the errors of the fields inside it. */
export function Form({ className, ...props }: FormProps) {
  return <BaseForm {...props} className={cn('flex flex-col gap-4', className)} />
}
