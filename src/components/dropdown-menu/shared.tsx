import { createContext, type SVGProps, useContext } from 'react'
import { cn } from '../../lib/cn'

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

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m3.5 8.5 3 3 6-7" />
    </Icon>
  )
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m4 6 4 4 4-4" />
    </Icon>
  )
}

export function ChevronUpIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m4 10 4-4 4 4" />
    </Icon>
  )
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6 4 4 4-4 4" />
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

/** The size of a menu. `Content` sets it, the items read it. */
export type DropdownMenuSize = 'sm' | 'md'

const DropdownMenuSizeContext = createContext<DropdownMenuSize>('md')

export const DropdownMenuSizeProvider = DropdownMenuSizeContext.Provider

export function useMenuSize() {
  return useContext(DropdownMenuSizeContext)
}

/** Ghost look of the triggers in a menubar and a navigation menu. */
export const barTrigger = [
  'inline-flex h-8 shrink-0 cursor-default select-none items-center gap-1 rounded-ui-md px-3 font-medium text-gray-12 text-sm',
  'outline-accent-8 -outline-offset-1 focus-visible:outline-2',
  'hover:bg-accent-a3 data-popup-open:bg-accent-a4',
  'data-disabled:bg-transparent data-disabled:text-gray-a8',
].join(' ')
