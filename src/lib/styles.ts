import { tv, type VariantProps } from 'tailwind-variants/lite'

/**
 * Class strings shared by several components, so things that should look
 * the same (popups, menu items, ...). The box of text inputs is in `field-box.ts` really do.
 */

/** Keyboard focus ring. */
export const focusRing = 'outline-accent-8 outline-offset-2 focus-visible:outline-2'

/**
 * How floating popups (menus, popovers, selects, tooltips) come in and go out.
 * Same as Radix Themes (`.rt-PopperContent` in animations.css): fade, grow from 97%
 * and move 4px away from the trigger. 160ms in, 100ms out.
 * Base UI sets `data-side` and `data-starting-style` / `data-ending-style` on the popup.
 */
export const popupAnimation = [
  'origin-(--transform-origin) transition-[opacity,scale,translate] duration-160 ease-[cubic-bezier(0.16,1,0.3,1)]',
  'motion-reduce:transition-none',
  'data-starting-style:scale-[0.97] data-starting-style:opacity-0',
  'data-ending-style:scale-[0.97] data-ending-style:opacity-0 data-ending-style:duration-100',
  'data-[side=top]:data-starting-style:translate-y-1 data-[side=top]:data-ending-style:translate-y-1',
  'data-[side=bottom]:data-starting-style:-translate-y-1 data-[side=bottom]:data-ending-style:-translate-y-1',
  'data-[side=left]:data-starting-style:translate-x-1 data-[side=left]:data-ending-style:translate-x-1',
  'data-[side=right]:data-starting-style:-translate-x-1 data-[side=right]:data-ending-style:-translate-x-1',
].join(' ')

/** The box of a floating popup. Radix Themes: panel-solid, shadow-5, radius-4. */
export const popupSurface = 'rounded-panel-lg bg-panel-solid text-gray-12 shadow-ui-5 outline-none'

/**
 * The parts of a list popup: menus, select lists, combobox lists.
 * All numbers are from Radix Themes (`_internal/base-menu.css` and `select.css`).
 *
 * `content` is the box. It sets three CSS variables that the rows read:
 * - `--list-p`   padding of the box
 * - `--list-pl`  left padding of a row. Grows when the list has rows with a
 *                check mark (`data-inset`), so all text lines up.
 * - `--list-pr`  right padding of a row
 * `viewport` is the part that scrolls and has the padding (it can be the box itself).
 */
export const listVariants = tv({
  slots: {
    content: [popupSurface, popupAnimation, 'max-w-(--available-width)'],
    viewport: 'overflow-y-auto overscroll-contain p-(--list-p)',
    item: [
      'group/item relative flex scroll-my-(--list-p) items-center gap-2 pr-(--list-pr) pl-(--list-pl)',
      'cursor-default select-none outline-none',
      // Base UI lets the arrow keys stop on a disabled row. It gets a gray highlight,
      // whatever the variant, so it never looks like a row you can pick.
      'data-disabled:text-gray-a8 data-disabled:data-highlighted:bg-gray-a3 data-disabled:data-highlighted:text-gray-a8',
    ],
    // The check mark of a picked row. It sits in the left padding of the row.
    indicator: 'absolute left-0 inline-flex w-(--list-pl) items-center justify-center',
    label:
      'flex cursor-default select-none items-center pr-(--list-pr) pl-(--list-pl) text-gray-a10',
    separator: 'my-2 mr-(--list-pr) ml-(--list-pl) h-px shrink-0 bg-gray-a6',
    // Keyboard shortcut text at the end of a row
    shortcut: [
      'ml-auto flex items-center pl-4 text-gray-a11',
      'group-data-disabled/item:text-inherit group-data-highlighted/item:text-inherit group-data-popup-open/item:text-inherit',
    ],
  },
  variants: {
    size: {
      sm: {
        content:
          'rounded-panel-md [--list-p:0.25rem] [--list-pl:0.5rem] [--list-pr:0.5rem] has-[[data-inset]]:[--list-pl:1.25rem]',
        item: 'h-6 rounded-panel-xs text-xs tracking-[0.0025em]',
        indicator: '[&>svg]:size-2',
        label: 'h-6 text-xs tracking-[0.0025em]',
      },
      md: {
        content:
          'rounded-panel-lg [--list-p:0.5rem] [--list-pl:0.75rem] [--list-pr:0.75rem] has-[[data-inset]]:[--list-pl:1.5rem]',
        item: 'h-8 rounded-panel-sm text-sm',
        indicator: '[&>svg]:size-2.5',
        label: 'h-8 text-sm',
      },
      // Only Select has this one: the box of `md` with bigger text in the rows
      lg: {
        content:
          'rounded-panel-lg [--list-p:0.5rem] [--list-pl:0.75rem] [--list-pr:0.75rem] has-[[data-inset]]:[--list-pl:1.5rem]',
        item: 'h-8 rounded-panel-sm text-base',
        indicator: '[&>svg]:size-2.5',
        label: 'h-8 text-sm',
      },
    },
    /** The look of the highlighted row: a full accent fill, or a light tint. */
    variant: {
      solid: {
        item: [
          'data-highlighted:bg-accent-9 data-highlighted:text-accent-contrast',
          // A row that has its own color, for example a red "Delete"
          'data-color:not-data-disabled:not-data-highlighted:text-accent-a11',
          // The row of an open submenu, when the pointer is inside the submenu
          'data-popup-open:not-data-highlighted:bg-gray-a3',
        ],
      },
      soft: {
        item: [
          'data-highlighted:bg-accent-a4',
          'data-color:not-data-disabled:text-accent-a11',
          'data-popup-open:not-data-highlighted:bg-accent-a3',
        ],
      },
    },
    /** Solid only: the highlight uses the darkest step. A row with its own color keeps it. */
    highContrast: {
      true: '',
    },
    /** The row has its own `color`. */
    colored: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      colored: false,
      highContrast: true,
      variant: 'solid',
      class: { item: 'data-highlighted:bg-accent-12 data-highlighted:text-accent-1' },
    },
  ],
  defaultVariants: {
    colored: false,
    size: 'md',
    variant: 'solid',
  },
})

export type ListVariants = VariantProps<typeof listVariants>

// The default look (`md`, `solid`) as plain strings
const list = listVariants()

/** A list popup: menus, select lists, combobox lists. */
export const listPopup = `${list.content()} ${list.viewport()}`

/** A row inside a list popup. Highlight uses the accent color, like Radix Themes. */
export const listItem = list.item()

/** A small heading inside a list popup. */
export const listLabel = list.label()

/** A divider line inside a list popup. */
export const listSeparator = list.separator()

/**
 * Heights of "control" sized parts, the same as Radix Themes sizes 1 to 4.
 * A button, an input and a select trigger of the same size line up in a row.
 * `md` (32px tall, 14px text) is the default everywhere.
 */
export const controlSize = {
  sm: 'h-6 rounded-ui-xs px-2 text-xs tracking-[0.0025em]',
  md: 'h-8 rounded-ui-sm px-3 text-sm',
  lg: 'h-10 rounded-ui-md px-4 text-base',
  xl: 'h-12 rounded-ui-lg px-6 text-lg tracking-[-0.0025em]',
} as const

export type ControlSize = keyof typeof controlSize
