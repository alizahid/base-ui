import { createContext, type SVGProps, useContext } from 'react'
import { cn } from '../../lib/cn'
import type { ListVariants } from '../../lib/styles'

/**
 * Small things shared by the list components:
 * menu, context menu, menubar, select, combobox, autocomplete, navigation menu.
 */

type IconProps = SVGProps<SVGSVGElement>

function Icon({ className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn('size-4 shrink-0', className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
      {...props}
    />
  )
}

// The next three icons are the ones Radix Themes draws in menus and selects.
// They are small (8 to 11px) and filled, so they stay sharp at that size.

type SmallIconProps = Omit<IconProps, 'children'>

/** The check mark of a picked row. */
export function CheckIcon({ className, ...props }: SmallIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn('size-2.5 shrink-0', className)}
      fill="currentColor"
      viewBox="0 0 9 9"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M8.53547 0.62293C8.88226 0.849446 8.97976 1.3142 8.75325 1.66099L4.5083 8.1599C4.38833 8.34356 4.19397 8.4655 3.9764 8.49358C3.75883 8.52167 3.53987 8.45309 3.3772 8.30591L0.616113 5.80777C0.308959 5.52987 0.285246 5.05559 0.563148 4.74844C0.84105 4.44128 1.31533 4.41757 1.62249 4.69547L3.73256 6.60459L7.49741 0.840706C7.72393 0.493916 8.18868 0.396414 8.53547 0.62293Z"
        fillRule="evenodd"
      />
    </svg>
  )
}

/** The arrow of a select trigger and of a navigation menu trigger. */
export function ChevronDownIcon({ className, ...props }: SmallIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn('size-[9px] shrink-0', className)}
      fill="currentColor"
      viewBox="0 0 9 9"
      {...props}
    >
      <path d="M0.135232 3.15803C0.324102 2.95657 0.640521 2.94637 0.841971 3.13523L4.5 6.56464L8.158 3.13523C8.3595 2.94637 8.6759 2.95657 8.8648 3.15803C9.0536 3.35949 9.0434 3.67591 8.842 3.86477L4.84197 7.6148C4.64964 7.7951 4.35036 7.7951 4.15803 7.6148L0.158031 3.86477C-0.0434285 3.67591 -0.0536285 3.35949 0.135232 3.15803Z" />
    </svg>
  )
}

/** The arrow of a row that opens a submenu. */
export function ChevronRightIcon({ className, ...props }: SmallIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn('size-2.5 shrink-0', className)}
      fill="currentColor"
      viewBox="0 0 9 9"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M3.23826 0.201711C3.54108 -0.0809141 4.01567 -0.0645489 4.29829 0.238264L7.79829 3.98826C8.06724 4.27642 8.06724 4.72359 7.79829 5.01174L4.29829 8.76174C4.01567 9.06455 3.54108 9.08092 3.23826 8.79829C2.93545 8.51567 2.91909 8.04108 3.20171 7.73826L6.22409 4.5L3.20171 1.26174C2.91909 0.958928 2.93545 0.484337 3.23826 0.201711Z"
        fillRule="evenodd"
      />
    </svg>
  )
}

/** Scroll arrows of a long select list. */
export function ChevronUpIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m4 10 4-4 4 4" />
    </Icon>
  )
}

export function XIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m4.5 4.5 7 7m-7 0 7-7" />
    </Icon>
  )
}

/**
 * The look of a list popup. `Content` sets it, the rows inside read it.
 * A submenu takes it from its parent menu.
 */
export type ListStyle = Pick<ListVariants, 'highContrast' | 'size' | 'variant'>

const ListStyleContext = createContext<ListStyle>({})

export const ListStyleProvider = ListStyleContext.Provider

export function useListStyle() {
  return useContext(ListStyleContext)
}

/**
 * The triggers in a menubar and a navigation menu. There is no Radix Themes
 * component for these, so they look like a Radix `TabNav` link: gray text that
 * gets darker, with a gray pill behind it on hover and while its popup is open.
 */
export const barTrigger = [
  'inline-flex h-7 shrink-0 cursor-default select-none items-center gap-1.5 rounded-ui-sm px-2 text-gray-a11 text-sm',
  'outline-accent-8 -outline-offset-1 focus-visible:outline-2',
  'hover:bg-gray-a3 hover:text-gray-12',
  'data-popup-open:bg-gray-a3 data-popup-open:text-gray-12',
  'data-disabled:cursor-not-allowed data-disabled:bg-transparent data-disabled:text-gray-a8',
].join(' ')
