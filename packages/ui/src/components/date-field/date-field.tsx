'use client'

import { Popover as Component } from '@base-ui/react/popover'
import * as stylex from '@stylexjs/stylex'
import {
  type CSSProperties,
  type ComponentProps as ReactComponentProps,
  type ReactNode,
  useRef,
  useState,
} from 'react'

import { Content } from '#components/popover/content.js'
import { type ColorToken } from '#lib/colors.js'
import { ChevronDownIcon, Cross2Icon, icon } from '#lib/icons.js'
import { input } from '#lib/input.js'
import { type RadiusToken, radii } from '#lib/radii.js'
import { merge } from '#lib/stylex.js'
import { trigger, triggerSizes, triggerVariants } from '#lib/trigger.js'

import {
  Calendar,
  type CalendarMode,
  format,
  key,
  same,
  type WeekStart,
} from './calendar.js'

export type DateFieldRange = {
  from: Date
  to: Date
}

type Single = {
  defaultValue?: Date | null
  mode?: 'single'
  onValueChange?: (value: Date | null) => void
  value?: Date | null
}

type Multiple = {
  defaultValue?: Array<Date>
  mode: 'multiple'
  onValueChange?: (value: Array<Date>) => void
  value?: Array<Date>
}

type Range = {
  defaultValue?: DateFieldRange | null
  mode: 'range'
  onValueChange?: (value: DateFieldRange | null) => void
  value?: DateFieldRange | null
}

export type DateFieldProps = Omit<
  ReactComponentProps<'button'>,
  'children' | 'className' | 'color' | 'defaultValue' | 'style' | 'value'
> &
  (Single | Multiple | Range) & {
    className?: string
    clearable?: boolean
    clearLabel?: string
    closeLabel?: string
    color?: ColorToken | 'gray'
    icon?: ReactNode
    locale?: string
    max?: Date
    min?: Date
    name?: string
    nextLabel?: string
    placeholder?: ReactNode
    previousLabel?: string
    radius?: RadiusToken
    size?: '1' | '2' | '3'
    style?: CSSProperties
    variant?: 'ghost' | 'soft' | 'surface'
    weekStart?: WeekStart
  }

type Value = Array<Date> | Date | DateFieldRange | null | undefined

// a button that looks like a Select and opens a calendar. `mode` decides what
// is picked and what the value is: a Date for single (the default), an array
// of them for multiple, and { from, to } for a range. a single date and a
// finished range close the calendar; multiple stays open. with a `name`, the
// days are sent in a form as 2026-11-16, one entry each. `min` and `max`
// limit what can be picked, `locale` sets the language, the date format and
// the day the week starts on. `icon` goes before the value, a calendar for
// instance. while the calendar is open it keeps the focus: tab goes round the
// month buttons and the days. with a value, a button beside it clears it,
// and so does escape, unless `clearable` is false. className and style go to the wrapper, which
// is what looks like the field; everything else goes to the button inside
export function DateField({
  className,
  clearable = true,
  clearLabel = 'Clear',
  closeLabel = 'Close',
  color,
  defaultValue,
  disabled,
  icon: glyph,
  locale = 'en',
  max,
  min,
  mode = 'single',
  name,
  nextLabel = 'Next month',
  onValueChange,
  placeholder,
  previousLabel = 'Previous month',
  radius,
  size = '2',
  style,
  value,
  variant = 'surface',
  weekStart,
  ...props
}: DateFieldProps) {
  const field = useRef<HTMLDivElement>(null)
  const popup = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState(false)

  const [inner, setInner] = useState(() => list(defaultValue))

  // the start of a range whose end hasn't been picked yet
  const [pending, setPending] = useState<Date | null>(null)

  const selected = value === undefined ? inner : list(value)

  function commit(next: Array<Date>) {
    if (value === undefined) {
      setInner(next)
    }

    // the callback's type follows `mode`, which typescript can't see here
    const report = onValueChange as ((value: Value) => void) | undefined

    report?.(shape(mode, next))
  }

  function onSelect(date: Date) {
    if (mode === 'single') {
      commit([date])

      setOpen(false)

      return
    }

    if (mode === 'multiple') {
      commit(
        selected.some((item) => same(item, date))
          ? selected.filter((item) => !same(item, date))
          : [...selected, date].sort((a, b) => a.getTime() - b.getTime()),
      )

      return
    }

    if (!pending) {
      setPending(date)

      return
    }

    commit([pending, date].sort((a, b) => a.getTime() - b.getTime()))

    setPending(null)

    setOpen(false)
  }

  const label = text(mode, selected, locale)

  return (
    <Component.Root
      // tab stays inside the calendar while it is open, going round its
      // month buttons and the days, instead of leaving and closing it
      modal="trap-focus"
      onOpenChange={(next) => {
        setOpen(next)

        // an unfinished range is dropped when the calendar closes
        if (!next) {
          setPending(null)
        }
      }}
      open={open}
    >
      {/* a button can't hold another button, so the field is a wrapper with
          the trigger and the clear button side by side. it carries the
          trigger's states itself, for the shared trigger styles */}
      <div
        data-accent={color}
        data-disabled={disabled ? '' : undefined}
        data-placeholder={label ? undefined : ''}
        data-popup-open={open ? '' : undefined}
        ref={field}
        {...merge(
          stylex.props(
            trigger.trigger,
            triggerVariants[variant],
            triggerSizes[size],
            radius && radii[radius],
            styles.field,
          ),
          className,
          style,
        )}
      >
        <Component.Trigger
          disabled={disabled}
          {...props}
          // escape clears the value, as in a combobox: by then the calendar
          // is shut, as it keeps the focus while open. the event stops here,
          // so a dialog around the field stays open
          onKeyDown={(event) => {
            props.onKeyDown?.(event)

            if (event.key === 'Escape' && clearable && label) {
              event.stopPropagation()

              commit([])
            }
          }}
          {...stylex.props(styles.trigger)}
        >
          {glyph ? (
            <span {...stylex.props(trigger.icon, styles.icon)}>{glyph}</span>
          ) : null}

          {/* a date is formatted in the reader's time zone, which the server
              may not share */}
          <span
            suppressHydrationWarning
            {...stylex.props(trigger.value, styles.value)}
          >
            {label || placeholder}
          </span>
        </Component.Trigger>

        {clearable && label && !disabled ? (
          // for the pointer: out of the tab order, as it has no focus ring
          // of its own. the keyboard has escape
          <button
            aria-label={clearLabel}
            onClick={() => {
              commit([])

              // the button is about to go, and would take the focus with it
              field.current?.querySelector('button')?.focus()
            }}
            tabIndex={-1}
            type="button"
            {...stylex.props(input.action, trigger.icon, styles.clear)}
          >
            <Cross2Icon {...stylex.props(icon.small)} />
          </button>
        ) : null}

        <ChevronDownIcon
          {...stylex.props(icon.small, trigger.icon, styles.chevron)}
        />
      </div>

      {name
        ? selected.map((date) => (
            <input
              key={key(date)}
              name={name}
              type="hidden"
              value={key(date)}
            />
          ))
        : null}

      {/* focus starts on a day, the picked one or today, so the arrow keys
          work straight away */}
      <Content
        anchor={field}
        className={stylex.props(styles.popup).className}
        initialFocus={() =>
          popup.current?.querySelector<HTMLElement>(
            '[data-date][tabindex="0"]',
          ) ?? null
        }
        ref={popup}
        size="1"
      >
        <Calendar
          locale={locale}
          max={max}
          min={min}
          mode={mode}
          nextLabel={nextLabel}
          onSelect={onSelect}
          previousLabel={previousLabel}
          selected={pending ? [pending] : selected}
          weekStart={weekStart}
        />

        {/* with focus trapped, a screen reader on a touch screen needs a way
            out. it is not shown and not in the tab order; escape and a click
            outside close the calendar for everyone else */}
        <Component.Close
          aria-label={closeLabel}
          tabIndex={-1}
          {...stylex.props(styles.close)}
        />
      </Content>
    </Component.Root>
  )
}

const styles = stylex.create({
  // its opacity lifts it above the trigger's hit area, so clicks go through
  chevron: {
    pointerEvents: 'none',
  },
  // above the trigger's stretched hit area
  clear: {
    position: 'relative',
  },
  // there for screen readers only
  close: {
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1,
  },
  // the ring shows for the button inside, as the wrapper never has the focus
  field: {
    outline: {
      ':has(:focus-visible):not([data-invalid])': '2px solid var(--focus-8)',
      ':is([data-invalid]):has(:focus-visible)': '2px solid var(--red-8)',
      default: 'none',
    },
    position: 'relative',
  },
  // as tall as the line of text beside it, like the library's own icons
  icon: {
    display: 'flex',
    height: '1lh',
  },
  // as wide as the calendar, not as the field
  popup: {
    '--panel-min-width': '0px',
  },
  // the whole field opens the calendar: the button's hit area covers the
  // wrapper, chevron included
  trigger: {
    '::after': {
      content: '',
      inset: 0,
      position: 'absolute',
    },
    alignItems: 'center',
    cursor: 'inherit',
    display: 'flex',
    flexGrow: 1,
    gap: 'inherit',
    minWidth: 0,
    outline: 'none',
    textAlign: 'start',
  },
  // takes the room between the icon and the chevron, so the value starts
  // right after the icon instead of sitting in the middle
  value: {
    flexGrow: 1,
  },
})

// any of the three value shapes as a list of days
function list(value: Value): Array<Date> {
  if (!value) {
    return []
  }

  if (value instanceof Date) {
    return [value]
  }

  return Array.isArray(value) ? value : [value.from, value.to]
}

// and back, into the shape the mode reports
function shape(mode: CalendarMode, dates: Array<Date>): Value {
  if (mode === 'multiple') {
    return dates
  }

  const [from, to] = dates

  if (mode === 'single') {
    return from ?? null
  }

  return from && to
    ? {
        from,
        to,
      }
    : null
}

// what the button shows: the date, the dates as a list, or the range, each
// the way the locale writes them
function text(mode: CalendarMode, dates: Array<Date>, locale: string) {
  const formatter = format(locale, {
    dateStyle: 'medium',
  })

  const [from, to] = dates

  if (mode === 'range') {
    return from && to ? formatter.formatRange(from, to) : ''
  }

  return new Intl.ListFormat(locale, {
    style: 'short',
    type: 'unit',
  }).format(dates.map((date) => formatter.format(date)))
}
