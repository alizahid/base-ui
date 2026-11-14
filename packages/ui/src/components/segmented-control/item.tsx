import {
  Radio as Component,
  type RadioRootProps as ComponentProps,
} from '@base-ui/react/radio'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { merge } from '../../lib/stylex.js'

export type SegmentedControlItemProps = Omit<
  ComponentProps,
  'className' | 'style'
> & {
  className?: string
  style?: CSSProperties
}

// one option. className and style go to the label, the part that holds the
// content
export function Item({
  children,
  className,
  style,
  ...props
}: SegmentedControlItemProps) {
  return (
    <Component.Root {...props} {...stylex.props(styles.main)}>
      <span {...stylex.props(styles.separator)} />

      <span {...merge(stylex.props(styles.label), className, style)}>
        {children}
      </span>
    </Component.Root>
  )
}

const hover = ':is(:not([data-checked], [data-disabled]):hover > *)'

const styles = stylex.create({
  label: {
    alignItems: 'center',
    backgroundColor: {
      [hover]: {
        '@media (hover: hover)': 'var(--gray-a2)',
        default: null,
      },
    },
    borderRadius: 'inherit',
    boxSizing: 'border-box',
    display: 'flex',
    flexGrow: 1,
    gap: 'var(--segmented-control-gap)',
    justifyContent: 'center',
    paddingInline: 'var(--segmented-control-padding)',
    // heavier text for the selected item without changing its width
    WebkitTextStrokeColor: 'currentColor',
    WebkitTextStrokeWidth: {
      ':is([data-checked] > *)': '0.35px',
      default: 0,
    },
    whiteSpace: 'nowrap',
  },
  main: {
    alignItems: 'stretch',
    // the outer corners follow the root's
    borderEndEndRadius: {
      ':is(:last-of-type, :focus-visible)': 'inherit',
    },
    borderEndStartRadius: {
      ':is(:first-of-type, :focus-visible)': 'inherit',
    },
    borderStartEndRadius: {
      ':is(:last-of-type, :focus-visible)': 'inherit',
    },
    borderStartStartRadius: {
      ':is(:first-of-type, :focus-visible)': 'inherit',
    },
    cursor: {
      ':is([data-disabled])': 'not-allowed',
      default: 'pointer',
    },
    display: 'flex',
    outline: {
      ':focus-visible': '2px solid var(--focus-8)',
      default: 'none',
    },
    outlineOffset: -1,
    userSelect: 'none',
  },
  // a line before each item, hidden on the first one and on either side of
  // the selected or focused one. base ui puts a hidden input after each
  // item, hence `+ input + *` for "the next item"
  separator: {
    backgroundColor: 'var(--gray-a4)',
    marginBlock: 3,
    marginInline: -0.5,
    opacity: {
      ':is(:first-of-type > *, :is([data-checked], :focus-visible) > *, :is([data-checked], :focus-visible) + input + * > *)': 0,
      default: 1,
    },
    transitionDuration: '80ms',
    transitionProperty: 'opacity',
    width: 1,
    zIndex: -1,
  },
})
