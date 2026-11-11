import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { type ComponentProps, createContext, useContext, useMemo } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import type { Radius } from '../../lib/theme'

export const accordionVariants = tv({
  slots: {
    root: 'flex w-full flex-col text-gray-12',
    item: 'border-gray-a5 border-b last:border-b-0',
    header: 'flex',
    trigger: [
      'group/trigger flex w-full select-none items-center justify-between text-left font-medium',
      'hover:bg-gray-a2',
      // The ring is drawn inside, so the box around it does not cut it off
      '-outline-offset-2 outline-accent-8 focus-visible:outline-2',
      'data-disabled:cursor-not-allowed data-disabled:text-gray-a8 data-disabled:hover:bg-transparent',
    ],
    icon: [
      'shrink-0 text-gray-a10 transition-transform duration-200',
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
        // A box, so the corners stay box-like even when the theme radius is `full`
        root: 'overflow-hidden rounded-panel-lg bg-panel inset-ring inset-ring-gray-a5',
      },
      ghost: {
        trigger: 'rounded-ui-sm',
      },
    },
    size: {
      sm: {
        trigger: 'gap-3 px-3 py-2 text-sm',
        icon: 'size-3.5',
        inner: 'px-3 pb-3 text-sm',
      },
      md: {
        trigger: 'gap-4 px-4 py-3 text-base',
        icon: 'size-4',
        inner: 'px-4 pb-4 text-base',
      },
      lg: {
        trigger: 'gap-4 px-5 py-4 text-lg',
        icon: 'size-5',
        inner: 'px-5 pb-5 text-lg',
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
        <svg
          aria-hidden="true"
          className={cn(styles.icon(), classNames?.icon)}
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            d="m4 6 4 4 4-4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
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
