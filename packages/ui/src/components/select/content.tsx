'use client'

import {
  Select as Component,
  type SelectPopupProps,
  type SelectPositionerProps,
} from '@base-ui/react/select'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, use } from 'react'

import { type ColorToken } from '#lib/colors.js'
import { ChevronDownIcon, icon } from '#lib/icons.js'
import { listbox, listboxSize, listboxVariants } from '#lib/listbox.js'
import { panel } from '#lib/panel.js'
import { SizeContext } from '#lib/size.js'
import { merge } from '#lib/stylex.js'
import { ThemeContext } from '#lib/theme.js'

export type SelectContentProps = SelectPopupProps &
  Pick<SelectPositionerProps, 'align' | 'side' | 'sideOffset'> & {
    className?: string
    color?: ColorToken | 'gray'
    highContrast?: boolean
    style?: CSSProperties
    variant?: 'solid' | 'soft'
  }

export function Content({
  align,
  side,
  sideOffset = 4,
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
      <Component.Positioner
        align={align}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(panel.positioner)}
      >
        {/* portaled out of the provider's element, so its colors are set again */}
        <Component.Popup
          data-accent={color ?? theme.accent}
          data-gray={theme.gray}
          {...props}
          {...merge(
            stylex.props(
              listbox.content,
              listboxVariants[variant],
              highContrast && variant === 'solid' && listbox.contrast,
              ...listboxSize(size),
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
            <ChevronDownIcon {...stylex.props(icon.small, styles.flip)} />
          </Component.ScrollUpArrow>

          <Component.List {...stylex.props(listbox.list)}>
            {children}
          </Component.List>

          <Component.ScrollDownArrow
            {...stylex.props(styles.arrow, styles.arrowDown)}
          >
            <ChevronDownIcon {...stylex.props(icon.small)} />
          </Component.ScrollDownArrow>
        </Component.Popup>
      </Component.Positioner>
    </Component.Portal>
  )
}

// ported from radix themes' select.css. the invalid state is ours, for Field. a ghost trigger is a standard
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
    height: 'calc(var(--ui-spacing) * 5)',
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
  flip: {
    transform: 'scaleY(-1)',
  },
})
