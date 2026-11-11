import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import type { ComponentProps } from 'react'
import { cn } from '../../lib/cn'

export const CollapsibleRoot = BaseCollapsible.Root

export type CollapsibleRootProps = ComponentProps<typeof BaseCollapsible.Root>

/** Has no look of its own. Use `render={<Button />}` to give it one. */
export const CollapsibleTrigger = BaseCollapsible.Trigger

export type CollapsibleTriggerProps = ComponentProps<typeof BaseCollapsible.Trigger>

export type CollapsibleContentProps = Omit<
  ComponentProps<typeof BaseCollapsible.Panel>,
  'className'
> & {
  className?: string
}

/** The part that opens and closes. Base UI's `Panel`, with the height animated. */
export function CollapsibleContent({ className, ...props }: CollapsibleContentProps) {
  return (
    <BaseCollapsible.Panel
      {...props}
      className={cn(
        'h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out',
        'data-ending-style:h-0 data-starting-style:h-0',
        className,
      )}
    />
  )
}
