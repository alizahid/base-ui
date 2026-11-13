'use client'

import {
  Select as Component,
  type SelectGroupProps as ComponentGroupProps,
  type SelectItemProps as ComponentItemProps,
  type SelectRootProps as ComponentRootProps,
  type SelectSeparatorProps as ComponentSeparatorProps,
  type SelectTriggerProps as ComponentTriggerProps,
  type SelectGroupLabelProps,
  type SelectPopupProps,
} from '@base-ui/react/select'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, createContext, type ReactNode, use } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { ChevronDownIcon, ThickCheckIcon } from '../../lib/icons.js'
import { type RadiusToken, radii } from '../../lib/radii.js'
import { merge } from '../../lib/stylex.js'
import { ThemeContext } from '../../lib/theme.js'

type Size = '1' | '2' | '3'

// the content is portaled away from the trigger, so the size can't reach it
// through css and has to travel in context
const SizeContext = createContext<Size>('2')

export type SelectRootProps<
  Value,
  Multiple extends boolean | undefined = false,
> = ComponentRootProps<Value, Multiple> & {
  size?: Size
}

export function Root<Value, Multiple extends boolean | undefined = false>({
  size = '2',
  ...props
}: SelectRootProps<Value, Multiple>) {
  return (
    <SizeContext value={size}>
      <Component.Root {...props} />
    </SizeContext>
  )
}

export type SelectTriggerProps = Omit<ComponentTriggerProps, 'children'> & {
  className?: string
  color?: ColorToken | 'gray'
  placeholder?: ReactNode
  radius?: RadiusToken
  style?: CSSProperties
  variant?: 'surface' | 'soft' | 'ghost'
}

export function Trigger({
  className,
  color,
  placeholder,
  radius,
  style,
  variant = 'surface',
  ...props
}: SelectTriggerProps) {
  const size = use(SizeContext)

  return (
    <Component.Trigger
      data-accent={color}
      {...props}
      {...merge(
        stylex.props(
          styles.trigger,
          triggerVariants[variant],
          triggerSizes[size],
          radius && radii[radius],
        ),
        className,
        style,
      )}
    >
      <Component.Value
        placeholder={placeholder}
        {...stylex.props(styles.value)}
      />

      <Component.Icon
        render={<ChevronDownIcon />}
        {...stylex.props(styles.icon)}
      />
    </Component.Trigger>
  )
}

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
              styles.content,
              contentVariants[variant],
              highContrast && variant === 'solid' && styles.contrast,
              contentSizes[size],
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

          <Component.List {...stylex.props(styles.list)}>
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

export type SelectItemProps = ComponentItemProps & {
  className?: string
  style?: CSSProperties
}

export function Item({
  children,
  className,
  style,
  ...props
}: SelectItemProps) {
  return (
    <Component.Item
      {...props}
      {...merge(stylex.props(styles.item), className, style)}
    >
      <Component.ItemIndicator {...stylex.props(styles.indicator)}>
        <ThickCheckIcon {...stylex.props(styles.check)} />
      </Component.ItemIndicator>

      <Component.ItemText {...stylex.props(styles.text)}>
        {children}
      </Component.ItemText>
    </Component.Item>
  )
}

export type SelectGroupProps = ComponentGroupProps

export function Group(props: SelectGroupProps) {
  return <Component.Group {...props} />
}

export type SelectLabelProps = SelectGroupLabelProps & {
  className?: string
  style?: CSSProperties
}

// a group's heading; goes inside Select.Group
export function Label({ className, style, ...props }: SelectLabelProps) {
  return (
    <Component.GroupLabel
      {...props}
      {...merge(stylex.props(styles.label), className, style)}
    />
  )
}

export type SelectSeparatorProps = ComponentSeparatorProps & {
  className?: string
  style?: CSSProperties
}

export function Separator({
  className,
  style,
  ...props
}: SelectSeparatorProps) {
  return (
    <Component.Separator
      {...props}
      {...merge(stylex.props(styles.separator), className, style)}
    />
  )
}

// stylex doesn't order these against each other, so they must not overlap
const off = ':is([data-disabled])'
const invalid = ':is([data-invalid]:not([data-disabled]))'
const open =
  ':is(:is(:hover, [data-popup-open]):not([data-disabled], [data-invalid]))'

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
  check: {
    height: 'var(--select-check-size)',
    width: 'var(--select-check-size)',
  },
  chevron: {
    height: 9,
    width: 9,
  },
  content: {
    backgroundColor: 'var(--panel-background)',
    boxShadow: 'var(--panel-shadow)',
    boxSizing: 'border-box',
    color: 'var(--gray-12)',
    maxHeight: 'var(--available-height)',
    minWidth: 'var(--anchor-width)',
    // base ui focuses the popup when it opens; the highlighted item shows focus
    outline: 'none',
    overflow: 'hidden',
    transformOrigin: 'var(--transform-origin)',
  },
  contrast: {
    '--select-highlight': 'var(--accent-12)',
    '--select-highlight-color': 'var(--accent-1)',
  },
  flip: {
    transform: 'scaleY(-1)',
  },
  icon: {
    color: 'var(--select-icon)',
    flexShrink: 0,
    height: 'var(--select-icon-size)',
    opacity: 0.9,
    width: 'var(--select-icon-size)',
  },
  indicator: {
    alignItems: 'center',
    display: 'inline-flex',
    insetInlineStart: 0,
    justifyContent: 'center',
    position: 'absolute',
    width: 'var(--select-indicator-width)',
  },
  item: {
    alignItems: 'center',
    backgroundColor: {
      ':is([data-highlighted]:not([data-disabled]))': 'var(--select-highlight)',
    },
    borderRadius: 'var(--select-item-radius)',
    boxSizing: 'border-box',
    color: {
      ':is([data-disabled])': 'var(--gray-8)',
      ':is([data-highlighted]:not([data-disabled]))':
        'var(--select-highlight-color)',
    },
    cursor: 'default',
    display: 'flex',
    height: 'var(--select-item-height)',
    outline: 'none',
    // radix pads both sides by the indicator's width; the end only needs the
    // same margin as the separator
    paddingInlineEnd: 'var(--select-separator-margin)',
    paddingInlineStart: 'var(--select-indicator-width)',
    position: 'relative',
    scrollMarginBlock: 'var(--select-content-padding)',
    userSelect: 'none',
  },
  label: {
    alignItems: 'center',
    color: 'var(--gray-10)',
    cursor: 'default',
    display: 'flex',
    height: 'var(--select-item-height)',
    paddingInlineEnd: 'var(--select-separator-margin)',
    paddingInlineStart: 'var(--select-indicator-width)',
    userSelect: 'none',
  },
  list: {
    boxSizing: 'border-box',
    maxHeight: 'var(--available-height)',
    outline: 'none',
    overflowY: 'auto',
    padding: 'var(--select-content-padding)',
    position: 'relative',
    // keeps the highlighted item clear of the scroll arrows
    scrollPaddingBlock: 'calc(var(--spacing) * 6)',
  },
  positioner: {
    outline: 'none',
    zIndex: 1,
  },
  separator: {
    backgroundColor: 'var(--gray-6)',
    height: 1,
    marginBlock: 'calc(var(--spacing) * 2)',
    marginInlineEnd: 'var(--select-separator-margin)',
    marginInlineStart: 'var(--select-indicator-width)',
  },
  // fills the row, so custom item content can lay itself out across it
  text: {
    flexGrow: 1,
    minWidth: 0,
  },
  trigger: {
    '--select-icon': {
      [off]: 'var(--gray-9)',
      default: 'currentColor',
    },
    alignItems: 'center',
    backgroundColor: {
      [invalid]: 'var(--select-background-invalid)',
      [off]: 'var(--select-background-disabled)',
      [open]: 'var(--select-background-hover)',
      default: 'var(--select-background)',
    },
    boxShadow: {
      [invalid]: 'var(--select-shadow-invalid, none)',
      [off]: 'var(--select-shadow-disabled, none)',
      [open]: 'var(--select-shadow-hover, none)',
      default: 'var(--select-shadow, none)',
    },
    boxSizing: 'border-box',
    color: {
      [off]: 'var(--gray-11)',
      default: 'var(--select-color)',
    },
    cursor: {
      [off]: 'not-allowed',
      default: 'pointer',
    },
    display: 'inline-flex',
    flexShrink: 0,
    fontWeight: '400',
    justifyContent: 'space-between',
    outline: {
      ':is(:focus-visible:not([data-invalid]))': '2px solid var(--accent-8)',
      ':is([data-invalid]:focus-visible)': '2px solid var(--red-8)',
      default: 'none',
    },
    outlineOffset: -1,
    textAlign: 'start',
    userSelect: 'none',
    verticalAlign: 'top',
  },
  value: {
    color: {
      ':is([data-placeholder])': 'var(--select-placeholder)',
    },
    opacity: {
      ':is([data-placeholder])': 'var(--select-placeholder-opacity)',
    },
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
})

// variants only set variables, the styles above decide where they apply
const triggerVariants = stylex.create({
  ghost: {
    '--select-background': 'transparent',
    '--select-background-disabled': 'transparent',
    '--select-background-hover': 'var(--accent-3)',
    '--select-background-invalid': 'var(--red-3)',
    '--select-color': 'var(--accent-12)',
    '--select-placeholder': 'var(--accent-12)',
    '--select-placeholder-opacity': '0.6',
  },
  soft: {
    '--select-background': 'var(--accent-3)',
    '--select-background-disabled': 'var(--gray-3)',
    '--select-background-hover': 'var(--accent-4)',
    '--select-background-invalid': 'var(--red-3)',
    '--select-color': 'var(--accent-12)',
    '--select-placeholder': 'var(--accent-12)',
    '--select-placeholder-opacity': '0.6',
  },
  surface: {
    '--select-background': 'var(--gray-1)',
    '--select-background-disabled': 'var(--gray-2)',
    '--select-background-hover': 'var(--gray-1)',
    '--select-background-invalid': 'var(--gray-1)',
    '--select-color': 'var(--gray-12)',
    '--select-placeholder': 'var(--gray-10)',
    '--select-placeholder-opacity': '1',
    '--select-shadow': 'inset 0 0 0 1px var(--gray-7)',
    '--select-shadow-disabled': 'inset 0 0 0 1px var(--gray-6)',
    '--select-shadow-hover': 'inset 0 0 0 1px var(--gray-8)',
    '--select-shadow-invalid': 'inset 0 0 0 1px var(--red-8)',
  },
})

const triggerSizes = stylex.create({
  1: {
    '--select-icon-size': '9px',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--text-xs)',
    gap: 'var(--spacing)',
    height: 'calc(var(--spacing) * 6)',
    lineHeight: 'var(--text-xs--line-height)',
    paddingInline: 'calc(var(--spacing) * 2)',
  },
  2: {
    '--select-icon-size': '9px',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--text-sm)',
    gap: 'calc(var(--spacing) * 1.5)',
    height: 'calc(var(--spacing) * 8)',
    lineHeight: 'var(--text-sm--line-height)',
    paddingInline: 'calc(var(--spacing) * 3)',
  },
  3: {
    '--select-icon-size': '11px',
    borderRadius: 'var(--radius-lg)',
    fontSize: 'var(--text-base)',
    gap: 'calc(var(--spacing) * 2)',
    height: 'calc(var(--spacing) * 10)',
    lineHeight: 'var(--text-base--line-height)',
    paddingInline: 'calc(var(--spacing) * 4)',
  },
})

// what a highlighted item looks like
const contentVariants = stylex.create({
  soft: {
    '--select-highlight': 'var(--accent-4)',
    '--select-highlight-color': 'inherit',
  },
  solid: {
    '--select-highlight': 'var(--accent-9)',
    '--select-highlight-color': 'var(--accent-contrast)',
  },
})

// set on the popup; the items, labels and separators inside inherit them
const contentSizes = stylex.create({
  1: {
    '--select-check-size': '8px',
    '--select-content-padding': 'var(--spacing)',
    '--select-indicator-width': 'calc(var(--spacing) * 5)',
    '--select-item-height': 'calc(var(--spacing) * 6)',
    '--select-item-radius': 'var(--radius-sm)',
    '--select-separator-margin': 'calc(var(--spacing) * 2)',
    borderRadius: 'var(--radius-lg)',
    fontSize: 'var(--text-xs)',
    lineHeight: 'var(--text-xs--line-height)',
  },
  2: {
    '--select-check-size': '10px',
    '--select-content-padding': 'calc(var(--spacing) * 2)',
    '--select-indicator-width': 'calc(var(--spacing) * 6)',
    '--select-item-height': 'calc(var(--spacing) * 8)',
    '--select-item-radius': 'var(--radius-md)',
    '--select-separator-margin': 'calc(var(--spacing) * 3)',
    borderRadius: 'var(--radius-xl)',
    fontSize: 'var(--text-sm)',
    lineHeight: 'var(--text-sm--line-height)',
  },
  3: {
    '--select-check-size': '10px',
    '--select-content-padding': 'calc(var(--spacing) * 2)',
    '--select-indicator-width': 'calc(var(--spacing) * 6)',
    '--select-item-height': 'calc(var(--spacing) * 8)',
    '--select-item-radius': 'var(--radius-md)',
    '--select-separator-margin': 'calc(var(--spacing) * 3)',
    borderRadius: 'var(--radius-xl)',
    fontSize: 'var(--text-base)',
    lineHeight: 'var(--text-sm--line-height)',
  },
})
