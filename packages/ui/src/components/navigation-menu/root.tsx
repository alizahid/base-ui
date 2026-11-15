'use client'

import {
  NavigationMenu as Component,
  type NavigationMenuRootProps as ComponentProps,
  type NavigationMenuPositionerProps,
} from '@base-ui/react/navigation-menu'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, use } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { merge } from '../../lib/stylex.js'
import { ThemeContext } from '../../lib/theme.js'
import { ContentContext } from './content.js'

export type NavigationMenuRootProps = Omit<
  ComponentProps,
  'className' | 'color' | 'style'
> &
  Pick<NavigationMenuPositionerProps, 'align' | 'side' | 'sideOffset'> & {
    className?: string
    // tints the active link, and the hover and open states to match it.
    // without one, the active link takes the theme's accent and the rest stay
    // gray
    color?: ColorToken | 'gray'
    style?: CSSProperties
  }

// links for getting around a site, some of which open a popup of more links.
// one popup is shared by every trigger and moves and resizes between them;
// the root renders it, so there is no portal or positioner to assemble.
// `side`, `align` and `sideOffset` place it. put a vertical root inside a
// Content for a submenu: it becomes an item of that list. radix themes has no navigation menu, so the look is
// our own
export function Root({
  align,
  children,
  className,
  color,
  orientation = 'horizontal',
  side,
  sideOffset = 8,
  style,
  ...props
}: NavigationMenuRootProps) {
  const nested = use(ContentContext)
  const theme = use(ThemeContext)
  const vertical = orientation === 'vertical'

  return (
    <Component.Root
      {...props}
      data-accent={color}
      orientation={orientation}
      render={nested ? <li /> : undefined}
      {...merge(
        stylex.props(
          styles.main,
          vertical && styles.vertical,
          color && styles.tinted,
        ),
        className,
        style,
      )}
    >
      {children}

      <Component.Portal>
        <Component.Positioner
          align={align ?? (vertical ? 'start' : 'center')}
          collisionPadding={8}
          side={side ?? (vertical ? 'inline-end' : 'bottom')}
          sideOffset={sideOffset}
          {...stylex.props(styles.positioner)}
        >
          {/* portaled out of the provider's element, so its colors are set
              again for everything inside */}
          <Component.Popup
            data-accent={color ?? theme.accent}
            data-gray={theme.gray}
            {...stylex.props(styles.popup, color && styles.tinted)}
          >
            <Component.Viewport {...stylex.props(styles.viewport)} />
          </Component.Popup>
        </Component.Positioner>
      </Component.Portal>
    </Component.Root>
  )
}

const hidden = ':is([data-starting-style], [data-ending-style])'
const still = '@media (prefers-reduced-motion: reduce)'

const styles = stylex.create({
  main: {
    minWidth: 'max-content',
  },
  popup: {
    backgroundColor: 'var(--panel-background)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--panel-shadow)',
    color: 'var(--gray-12)',
    height: 'var(--popup-height)',
    opacity: {
      [hidden]: 0,
      default: null,
    },
    outline: 'none',
    position: 'relative',
    transform: {
      [hidden]: 'scale(0.97)',
      default: null,
    },
    transformOrigin: 'var(--transform-origin)',
    // closes faster than it opens
    transitionDuration: {
      ':is([data-ending-style])': '150ms',
      default: '300ms',
    },
    transitionProperty: {
      [still]: 'none',
      default: 'opacity, transform, width, height',
    },
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    width: 'var(--popup-width)',
  },
  positioner: {
    // fills the gap to the trigger, so the pointer can cross it without the
    // popup closing
    '::before': {
      content: '""',
      inset: 'calc(var(--spacing) * -2.5)',
      position: 'absolute',
    },
    height: 'var(--positioner-height)',
    maxWidth: 'var(--available-width)',
    transitionDuration: '300ms',
    // slides from one trigger to the next, but not into place on opening
    transitionProperty: {
      ':is([data-instant])': 'none',
      [still]: 'none',
      default: 'top, left, right, bottom',
    },
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    width: 'var(--positioner-width)',
    zIndex: 1,
  },
  tinted: {
    '--navigation-hover': 'var(--accent-a3)',
  },
  // a column of full-width items, whose chevrons point at the popup beside
  // them
  vertical: {
    '--navigation-direction': 'column',
    '--navigation-icon-open': {
      ':dir(rtl)': '90deg',
      default: '-90deg',
    },
    '--navigation-icon-rotate': {
      ':dir(rtl)': '90deg',
      default: '-90deg',
    },
    '--navigation-item-justify': 'space-between',
    '--navigation-item-width': '100%',
  },
  viewport: {
    borderRadius: 'inherit',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
})
