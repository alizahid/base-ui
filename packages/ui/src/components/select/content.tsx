'use client'

import {
  Select as Component,
  type SelectPopupProps,
} from '@base-ui/react/select'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, use } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { ChevronDownIcon } from '../../lib/icons.js'
import { menu, menuSizes, menuVariants } from '../../lib/menu.js'
import { SizeContext } from '../../lib/size.js'
import { merge } from '../../lib/stylex.js'
import { ThemeContext } from '../../lib/theme.js'

export type SelectContentProps = SelectPopupProps & {
  className?: string
  color?: ColorToken | 'gray'
  highContrast?: boolean
  style?: CSSProperties
  variant?: 'solid' | 'soft'
}

export function Content({
  children,
  className,
  color,
  highContrast,
  style,
  variant = 'solid',
  ...props
}: SelectContentProps) {
  const size = use(SizeContext)
  const theme = use(ThemeContext)

  return (
    <Component.Portal>
      <Component.Positioner sideOffset={4} {...stylex.props(styles.positioner)}>
        {/* portaled out of the provider's element, so its colors are set again */}
        <Component.Popup
          data-accent={color ?? theme.accent}
          data-gray={theme.gray}
          {...props}
          {...merge(
            stylex.props(
              menu.content,
              menuVariants[variant],
              highContrast && variant === 'solid' && menu.contrast,
              menuSizes[size],
            ),
            className,
            style,
          )}
        >
          {/* as in base ui's own select: the list scrolls, with arrows that
              appear at either end while there is more to scroll to */}
          <Component.ScrollUpArrow
            {...stylex.props(styles.arrow, styles.arrowUp)}
          >
            <ChevronDownIcon {...stylex.props(styles.chevron, styles.flip)} />
          </Component.ScrollUpArrow>

          <Component.List {...stylex.props(menu.list)}>
            {children}
          </Component.List>

          <Component.ScrollDownArrow
            {...stylex.props(styles.arrow, styles.arrowDown)}
          >
            <ChevronDownIcon {...stylex.props(styles.chevron)} />
          </Component.ScrollDownArrow>
        </Component.Popup>
      </Component.Positioner>
    </Component.Portal>
  )
}

// ported from radix themes' select.css, with solid colors in place of alpha
// ones. the invalid state is ours, for Field. a ghost trigger is a standard
// one with a transparent background, without radix's negative margins
const styles = stylex.create({
  // the ::before stretches the hover area past the popup's edge when the popup
  // is aligned over the trigger, as in base ui's example
  arrow: {
    '--select-arrow-reach': {
      ':is([data-side="none"])': '-100%',
      default: '0',
    },
    '::before': {
      content: '',
      height: '100%',
      insetInlineStart: 0,
      position: 'absolute',
      width: '100%',
    },
    alignItems: 'center',
    backgroundColor: 'var(--panel-background)',
    color: 'var(--gray-11)',
    cursor: 'default',
    display: 'flex',
    height: 'calc(var(--spacing) * 5)',
    justifyContent: 'center',
    width: '100%',
    zIndex: 1,
  },
  arrowDown: {
    '::before': {
      bottom: 'var(--select-arrow-reach)',
    },
    borderEndEndRadius: 'inherit',
    borderEndStartRadius: 'inherit',
    bottom: 0,
  },
  arrowUp: {
    '::before': {
      top: 'var(--select-arrow-reach)',
    },
    borderStartEndRadius: 'inherit',
    borderStartStartRadius: 'inherit',
    top: 0,
  },
  chevron: {
    height: 15,
    width: 15,
  },
  flip: {
    transform: 'scaleY(-1)',
  },
  positioner: {
    outline: 'none',
    zIndex: 1,
  },
})
