import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { type ComponentProps, createContext, useContext, useMemo } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import type { Radius } from '../../lib/theme'
import { ChevronDownIcon } from '../dropdown-menu/shared'

// Radix Themes has no accordion. This one is made to sit next to its Card:
// the same box, hairlines and grays, with calm rows like a menu.
export const accordionVariants = tv({
  slots: {
    root: 'flex w-full flex-col text-gray-12',
    item: 'group/item border-gray-a5 border-b last:border-b-0',
    header: 'flex',
    trigger: [
      'group/trigger flex w-full cursor-default select-none items-center justify-between text-left font-medium',
      'hover:bg-gray-a2 active:bg-gray-a3',
      // The ring is drawn inside, so the box around it does not cut it off
      '-outline-offset-2 outline-accent-8 focus-visible:outline-2',
      'data-disabled:cursor-not-allowed data-disabled:bg-transparent data-disabled:text-gray-a8',
    ],
    icon: [
      'shrink-0 text-gray-a11 transition-transform duration-200',
      'group-data-panel-open/trigger:rotate-180 group-data-disabled/trigger:text-gray-a8',
    ],
    content: [
      'h-(--accordion-panel-height) overflow-hidden text-gray-11 transition-[height] duration-200 ease-out',
      'data-ending-style:h-0 data-starting-style:h-0',
    ],
    inner: '',
  },
  variants: {
    variant: {
      surface: {
        // The same box as `Card`: ::before is the see-through panel, ::after the hairline
        // on top (color from Radix Themes' `base-card.css`). It never becomes a pill.
        root: [
          'relative overflow-hidden rounded-panel-lg contain-paint',
          'before:pointer-events-none before:absolute before:inset-px before:-z-1 before:[border-radius:calc(var(--ui-radius)-1px)] before:bg-panel before:backdrop-panel',
          'after:pointer-events-none after:absolute after:inset-px after:[border-radius:calc(var(--ui-radius)-1px)]',
          'after:shadow-[0_0_0_1px_color-mix(in_oklab,var(--gray-a5),var(--gray-5)_25%)]',
        ],
        // The first and the last row follow the corners of the box, so the focus ring does too
        trigger: [
          'group-first/item:rounded-t-(--ui-radius)',
          'group-last/item:not-data-panel-open:rounded-b-(--ui-radius)',
        ],
      },
      ghost: {
        trigger: 'rounded-panel-sm',
      },
    },
    size: {
      sm: {
        trigger: 'gap-2 px-3 py-2 text-xs tracking-[0.0025em]',
        inner: 'px-3 pb-3 text-xs tracking-[0.0025em]',
      },
      md: {
        trigger: 'gap-3 px-4 py-3 text-sm',
        inner: 'px-4 pb-4 text-sm',
      },
      lg: {
        trigger: 'gap-4 px-5 py-4 text-base',
        icon: 'size-[11px]',
        inner: 'px-5 pb-5 text-base',
      },
    },
  },
  defaultVariants: {
    variant: 'surface',
    size: 'md',
  },
})

type Variants = VariantProps<typeof accordionVariants>

// The size and the variant are set once on `Root` and read by the parts
const AccordionContext = createContext<Variants>({})

function useStyles() {
  return accordionVariants(useContext(AccordionContext))
}

export type AccordionRootProps = Omit<
  ComponentProps<typeof BaseAccordion.Root>,
  'className' | 'color'
> &
  Variants & {
    className?: string
    /**
     * The color scale to use. `accent` follows the theme.
     * @default 'accent'
     */
    color?: Color
    /** How round the corners are. Follows the theme when not set. */
    radius?: Radius
  }

export function AccordionRoot({
  className,
  color,
  radius,
  size,
  variant,
  ...props
}: AccordionRootProps) {
  const context = useMemo(() => ({ size, variant }), [size, variant])

  return (
    <AccordionContext.Provider value={context}>
      <BaseAccordion.Root
        data-color={colorAttribute(color)}
        data-radius={radius}
        {...props}
        className={cn(accordionVariants(context).root(), className)}
      />
    </AccordionContext.Provider>
  )
}

export type AccordionItemProps = Omit<ComponentProps<typeof BaseAccordion.Item>, 'className'> & {
  className?: string
}

export function AccordionItem({ className, ...props }: AccordionItemProps) {
  const styles = useStyles()

  return <BaseAccordion.Item {...props} className={cn(styles.item(), className)} />
}

export type AccordionTriggerProps = Omit<
  ComponentProps<typeof BaseAccordion.Trigger>,
  'className'
> & {
  className?: string
  /** Classes for the parts that `Trigger` renders around and inside itself. */
  classNames?: {
    header?: string
    icon?: string
  }
  /**
   * The heading tag around the button. Pick the one that fits the page outline.
   * @default 'h3'
   */
  heading?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

/** The row that opens an item. Base UI's `Header` and `Trigger` in one, with an arrow. */
export function AccordionTrigger({
  children,
  className,
  classNames,
  heading: Heading = 'h3',
  ...props
}: AccordionTriggerProps) {
  const styles = useStyles()

  return (
    <BaseAccordion.Header className={cn(styles.header(), classNames?.header)} render={<Heading />}>
      <BaseAccordion.Trigger {...props} className={cn(styles.trigger(), className)}>
        {children}
        <ChevronDownIcon className={cn(styles.icon(), classNames?.icon)} />
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  )
}

export type AccordionContentProps = Omit<
  ComponentProps<typeof BaseAccordion.Panel>,
  'className'
> & {
  className?: string
  /** Classes for the parts that `Content` renders inside itself. */
  classNames?: {
    /** The padded box around the children. */
    inner?: string
  }
}

/** The part that opens and closes. Base UI's `Panel`, with the height animated. */
export function AccordionContent({
  children,
  className,
  classNames,
  ...props
}: AccordionContentProps) {
  const styles = useStyles()

  return (
    <BaseAccordion.Panel {...props} className={cn(styles.content(), className)}>
      <div className={cn(styles.inner(), classNames?.inner)}>{children}</div>
    </BaseAccordion.Panel>
  )
}
