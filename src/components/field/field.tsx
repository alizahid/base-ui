import { Field as BaseField } from '@base-ui/react/field'
import type { ComponentProps } from 'react'
import { cn } from '../../lib/cn'

export type FieldRootProps = Omit<ComponentProps<typeof BaseField.Root>, 'className'> & {
  className?: string
}

/** Groups a label, a control, a description and an error message. */
export function FieldRoot({ className, ...props }: FieldRootProps) {
  return <BaseField.Root {...props} className={cn('flex flex-col items-start gap-1', className)} />
}

export type FieldLabelProps = Omit<ComponentProps<typeof BaseField.Label>, 'className'> & {
  className?: string
}

export function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <BaseField.Label
      {...props}
      className={cn('font-medium text-gray-12 text-sm data-disabled:text-gray-a8', className)}
    />
  )
}

export type FieldDescriptionProps = Omit<
  ComponentProps<typeof BaseField.Description>,
  'className'
> & {
  className?: string
}

export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return <BaseField.Description {...props} className={cn('text-gray-11 text-sm', className)} />
}

export type FieldErrorProps = Omit<ComponentProps<typeof BaseField.Error>, 'className'> & {
  className?: string
}

/** The error message. Only rendered when the field is invalid. */
export function FieldError({ className, ...props }: FieldErrorProps) {
  return <BaseField.Error {...props} className={cn('text-(--red-11) text-sm', className)} />
}

/** Unstyled. Use it with `render`, or just put an `Input` inside `Field.Root`. */
export const FieldControl = BaseField.Control
export type FieldControlProps = ComponentProps<typeof BaseField.Control>

/** Groups one checkbox or radio with its label inside a field. */
export const FieldItem = BaseField.Item
export type FieldItemProps = ComponentProps<typeof BaseField.Item>

export const FieldValidity = BaseField.Validity
export type FieldValidityProps = ComponentProps<typeof BaseField.Validity>
