import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { type ComponentProps, createContext, useContext, useMemo } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import type { Radius } from '../../lib/theme'

// Values follow Radix Themes' Tabs (`base-tab-list.css`).
export const tabsVariants = tv({
  slots: {
    root: 'text-gray-12',
    list: 'relative flex justify-start whitespace-nowrap',
    // Radix draws a fixed 2px line on the active tab. Ours is Base UI's indicator,
    // so it slides to the active tab. Same color and thickness.
    indicator:
      'absolute bg-accent-indicator transition-[translate,width,height] duration-200 ease-out',
    trigger: [
      'group/tab relative flex shrink-0 cursor-default select-none items-center text-gray-a11 outline-none',
      'hover:text-gray-12 data-active:text-gray-12',
      'data-disabled:cursor-not-allowed data-disabled:text-gray-a8',
    ],
    // The pill inside a tab. It gets the hover color and the focus ring.
    triggerInner: [
      'grid items-center -outline-offset-2 outline-accent-8',
      'group-hover/tab:bg-gray-a3 group-focus-visible/tab:group-hover/tab:bg-accent-a3',
      'group-data-disabled/tab:bg-transparent',
      'group-focus-visible/tab:outline-2',
    ],
    // The label. The active tab is bolder; a slightly tighter letter spacing
    // (Radix: -0.01em) keeps its width close to the inactive one.
    label: [
      'col-start-1 row-start-1 flex items-center justify-center gap-2 tracking-normal',
      'group-data-active/tab:font-medium group-data-active/tab:tracking-[-0.01em]',
    ],
    // A hidden copy of the label in the active weight. It sets the width of the
    // tab, so the tab does not change size when it becomes active.
    labelHidden:
      'invisible col-start-1 row-start-1 flex items-center justify-center gap-2 font-medium tracking-[-0.01em]',
    content: 'relative outline-accent-8 focus-visible:outline-2',
  },
  variants: {
    orientation: {
      horizontal: {
        list: [
          'overflow-x-auto shadow-[inset_0_-1px_0_0_var(--gray-a5)]',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        ],
        indicator: 'bottom-0 left-0 h-0.5 w-(--active-tab-width) translate-x-(--active-tab-left)',
        trigger: 'justify-center',
        content: 'pt-3',
      },
      // Radix has no vertical tabs. Same parts, with the line on the right.
      vertical: {
        root: 'flex',
        list: 'flex-col shadow-[inset_-1px_0_0_0_var(--gray-a5)]',
        indicator: 'top-0 right-0 h-(--active-tab-height) w-0.5 translate-y-(--active-tab-top)',
        trigger: 'justify-start',
        content: 'grow pl-3',
      },
    },
    // Radix sizes 1 and 2: 32px and 40px tall
    size: {
      sm: {
        trigger: 'h-8 px-1 text-xs',
        triggerInner: 'rounded-panel-xs px-1 py-0.5',
      },
      md: {
        trigger: 'h-10 px-2 text-sm',
        triggerInner: 'rounded-panel-sm px-2 py-1',
      },
    },
    /** A darker line under the active tab. */
    highContrast: {
      true: { indicator: 'bg-accent-12' },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
})

type Variants = Pick<VariantProps<typeof tabsVariants>, 'highContrast' | 'orientation' | 'size'>

// The size and the direction are set once on `Root` and read by the parts
const TabsContext = createContext<Variants>({})

function useStyles() {
  return tabsVariants(useContext(TabsContext))
}

export type TabsRootProps = Omit<ComponentProps<typeof BaseTabs.Root>, 'className' | 'color'> &
  Pick<Variants, 'highContrast' | 'size'> & {
    className?: string
    /**
     * The color scale to use. `accent` follows the theme.
     * @default 'accent'
     */
    color?: Color
    /** How round the corners are. Follows the theme when not set. */
    radius?: Radius
  }

export function TabsRoot({
  className,
  color,
  highContrast,
  orientation = 'horizontal',
  radius,
  size,
  ...props
}: TabsRootProps) {
  const context = useMemo(
    () => ({ highContrast, orientation, size }),
    [highContrast, orientation, size],
  )

  return (
    <TabsContext.Provider value={context}>
      <BaseTabs.Root
        data-color={colorAttribute(color)}
        data-radius={radius}
        orientation={orientation}
        {...props}
        className={cn(tabsVariants(context).root(), className)}
      />
    </TabsContext.Provider>
  )
}

export type TabsListProps = Omit<ComponentProps<typeof BaseTabs.List>, 'className'> & {
  className?: string
  /** Classes for the parts that `List` renders inside itself. */
  classNames?: {
    /** The line that slides to the active tab. */
    indicator?: string
  }
}

/** The row of tabs. Includes Base UI's `Tabs.Indicator`, the line under the active tab. */
export function TabsList({ children, className, classNames, ...props }: TabsListProps) {
  const styles = useStyles()

  return (
    <BaseTabs.List {...props} className={cn(styles.list(), className)}>
      {children}
      <BaseTabs.Indicator className={cn(styles.indicator(), classNames?.indicator)} />
    </BaseTabs.List>
  )
}

export type TabsTriggerProps = Omit<ComponentProps<typeof BaseTabs.Tab>, 'className'> & {
  className?: string
  /** Classes for the parts that `Trigger` renders inside itself. */
  classNames?: {
    /** The pill around the label. It gets the hover color. */
    inner?: string
  }
}

/** One tab. Base UI's `Tabs.Tab`. */
export function TabsTrigger({ children, className, classNames, ...props }: TabsTriggerProps) {
  const styles = useStyles()

  return (
    <BaseTabs.Tab {...props} className={cn(styles.trigger(), className)}>
      <span className={cn(styles.triggerInner(), classNames?.inner)}>
        <span className={styles.label()}>{children}</span>
        <span aria-hidden="true" className={styles.labelHidden()}>
          {children}
        </span>
      </span>
    </BaseTabs.Tab>
  )
}

export type TabsContentProps = Omit<ComponentProps<typeof BaseTabs.Panel>, 'className'> & {
  className?: string
}

/** What a tab shows. Base UI's `Tabs.Panel`. */
export function TabsContent({ className, ...props }: TabsContentProps) {
  const styles = useStyles()

  return <BaseTabs.Panel {...props} className={cn(styles.content(), className)} />
}
