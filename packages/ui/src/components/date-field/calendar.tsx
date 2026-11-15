'use client'

import { useDirection } from '@base-ui/react/direction-provider'
import * as stylex from '@stylexjs/stylex'
import { type KeyboardEvent, useEffect, useRef, useState } from 'react'
import { type Day, useLilius } from 'use-lilius'

import { IconButton } from '#components/icon-button/icon-button.js'
import { ChevronRightIcon } from '#lib/icons.js'

export type CalendarMode = 'multiple' | 'range' | 'single'

// sunday is 0
export type WeekStart = 0 | 1 | 2 | 3 | 4 | 5 | 6

type Props = {
  locale: string
  max?: Date
  min?: Date
  mode: CalendarMode
  nextLabel: string
  onSelect: (date: Date) => void
  previousLabel: string
  // one date for single, any number for multiple, and for a range its start,
  // then its end once that is picked too
  selected: Array<Date>
  weekStart?: WeekStart
}

// internal: one month of days to pick from. the weeks come from use-lilius;
// what is selected is the DateField's to keep. arrow keys move between days,
// across months too, and only one day is in the tab order at a time
export function Calendar({
  locale,
  max,
  min,
  mode,
  nextLabel,
  onSelect,
  previousLabel,
  selected,
  weekStart,
}: Props) {
  const direction = useDirection()

  const table = useRef<HTMLTableElement>(null)

  // set when an arrow key moved the day, so focus follows it after the render
  const moved = useRef<boolean>(false)

  const { calendar, setViewing, viewing, viewNextMonth, viewPreviousMonth } =
    useLilius({
      viewing: selected.at(0),
      weekStartsOn: (weekStart ?? firstDay(locale)) as Day,
    })

  const now = new Date()

  const [focus, setFocus] = useState(() => selected.at(0) ?? new Date())

  useEffect(() => {
    if (!moved.current) {
      return
    }

    moved.current = false

    table.current
      ?.querySelector<HTMLButtonElement>(`[data-date="${key(focus)}"]`)
      ?.focus()
  })

  // one month is shown, so only the first of the months it can build
  const weeks = calendar.at(0) ?? []

  const days = weeks.flat()

  // the day arrow keys last landed on, or the first of the month once the
  // month buttons have moved away from it
  const tabbable = days.some((day) => same(day, focus))
    ? focus
    : new Date(viewing.getFullYear(), viewing.getMonth(), 1)

  const [start, end] = mode === 'range' ? selected : []

  function onKeyDown(event: KeyboardEvent) {
    const step = steps(direction === 'rtl')[event.key]

    if (step === undefined) {
      return
    }

    event.preventDefault()

    const next = new Date(
      tabbable.getFullYear(),
      tabbable.getMonth(),
      tabbable.getDate() + step,
    )

    if (outside(next, min, max)) {
      return
    }

    moved.current = true

    setFocus(next)

    if (!days.some((day) => same(day, next))) {
      setViewing(next)
    }
  }

  return (
    <div {...stylex.props(styles.main)}>
      <div {...stylex.props(styles.header)}>
        <IconButton
          aria-label={previousLabel}
          color="gray"
          onClick={viewPreviousMonth}
          size="1"
          variant="ghost"
        >
          <ChevronRightIcon {...stylex.props(styles.previous)} />
        </IconButton>

        <span aria-live="polite" {...stylex.props(styles.month)}>
          {format(locale, {
            month: 'long',
            year: 'numeric',
          }).format(viewing)}
        </span>

        <IconButton
          aria-label={nextLabel}
          color="gray"
          onClick={viewNextMonth}
          size="1"
          variant="ghost"
        >
          <ChevronRightIcon {...stylex.props(styles.next)} />
        </IconButton>
      </div>

      {/* biome-ignore lint/a11y/noNoninteractiveElementInteractions: the arrow keys move between the day buttons inside */}
      <table onKeyDown={onKeyDown} ref={table} {...stylex.props(styles.table)}>
        <thead>
          <tr>
            {(weeks.at(0) ?? []).map((weekday) => (
              <th
                abbr={format(locale, {
                  weekday: 'long',
                }).format(weekday)}
                key={weekday.getDay()}
                scope="col"
                {...stylex.props(styles.weekday)}
              >
                {format(locale, {
                  weekday: 'narrow',
                }).format(weekday)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {weeks.map((week) => (
            <tr key={key(week.at(0) ?? viewing)}>
              {week.map((day) => {
                const chosen = selected.some((date) => same(date, day))

                return (
                  <td
                    data-range={range(day, start, end)}
                    key={key(day)}
                    {...stylex.props(styles.cell)}
                  >
                    <button
                      aria-label={format(locale, {
                        dateStyle: 'full',
                      }).format(day)}
                      aria-pressed={chosen}
                      data-date={key(day)}
                      data-outside={
                        day.getMonth() === viewing.getMonth() ? undefined : ''
                      }
                      data-selected={chosen ? '' : undefined}
                      data-today={same(day, now) ? '' : undefined}
                      disabled={outside(day, min, max)}
                      onClick={() => {
                        setFocus(day)

                        onSelect(day)
                      }}
                      tabIndex={same(day, tabbable) ? 0 : -1}
                      type="button"
                      {...stylex.props(styles.day)}
                    >
                      {day.getDate()}
                    </button>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// how many days each arrow key moves. left and right swap where text runs
// right to left, as the days do
function steps(rtl: boolean): Record<string, number | undefined> {
  return {
    ArrowDown: 7,
    ArrowLeft: rtl ? 1 : -1,
    ArrowRight: rtl ? -1 : 1,
    ArrowUp: -7,
  }
}

// the same calendar day, whatever the time
export function same(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

// the day as 2026-11-16, in local time: for sorting, comparing and forms
export function key(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')
}

function outside(date: Date, min?: Date, max?: Date) {
  return (
    (min !== undefined && key(date) < key(min)) ||
    (max !== undefined && key(date) > key(max))
  )
}

// where a day sits in the range being shown, for the band behind it
function range(date: Date, start?: Date, end?: Date) {
  if (!(start && end) || same(start, end)) {
    return
  }

  if (same(date, start)) {
    return 'start'
  }

  if (same(date, end)) {
    return 'end'
  }

  return key(date) > key(start) && key(date) < key(end) ? 'middle' : undefined
}

export function format(locale: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(locale, options)
}

type WeekInfo = {
  firstDay: number
}

// the day the week starts on where the locale is used: sunday in the us,
// monday in germany, saturday in the uae. monday where the browser can't say
function firstDay(locale: string) {
  const info = new Intl.Locale(locale) as Intl.Locale & {
    getWeekInfo?: () => WeekInfo
    weekInfo?: WeekInfo
  }

  const day = info.getWeekInfo?.().firstDay ?? info.weekInfo?.firstDay ?? 1

  // the browser counts monday as 1 and sunday as 7; the calendar wants 0 to 6
  return (day % 7) as WeekStart
}

// stylex doesn't order these against each other, so they must not overlap
const picked = ':is([data-selected]:not(:disabled))'
const off = ':is(:disabled)'
const faded = ':is([data-outside]:not([data-selected], :disabled))'
const hover = ':is(:hover:not([data-selected], :disabled))'
const today = ':is([data-today]:not([data-selected]))'

const styles = stylex.create({
  // the band behind a range: square between its ends, round at them
  cell: {
    backgroundColor: {
      ':is([data-range])': 'var(--accent-a3)',
    },
    borderEndEndRadius: {
      ':is([data-range="end"])': 'var(--ui-radius-md)',
    },
    borderEndStartRadius: {
      ':is([data-range="start"])': 'var(--ui-radius-md)',
    },
    borderStartEndRadius: {
      ':is([data-range="end"])': 'var(--ui-radius-md)',
    },
    borderStartStartRadius: {
      ':is([data-range="start"])': 'var(--ui-radius-md)',
    },
    padding: 0,
  },
  day: {
    alignItems: 'center',
    backgroundColor: {
      [hover]: {
        '@media (hover: hover)': 'var(--gray-a3)',
        default: null,
      },
      [picked]: 'var(--accent-9)',
    },
    borderRadius: 'var(--ui-radius-md)',
    // today is ringed until it is picked
    boxShadow: {
      [today]: 'inset 0 0 0 1px var(--gray-a8)',
    },
    color: {
      [faded]: 'var(--gray-a9)',
      [off]: 'var(--gray-a7)',
      [picked]: 'var(--accent-contrast)',
    },
    cursor: {
      [off]: 'not-allowed',
      default: 'pointer',
    },
    display: 'flex',
    fontVariantNumeric: 'tabular-nums',
    height: 'calc(var(--ui-spacing) * 8)',
    justifyContent: 'center',
    outline: {
      ':focus-visible': '2px solid var(--focus-8)',
      default: 'none',
    },
    outlineOffset: 2,
    width: 'calc(var(--ui-spacing) * 8)',
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  main: {
    color: 'var(--gray-12)',
    display: 'grid',
    fontSize: 'var(--ui-text-sm)',
    gap: 'calc(var(--ui-spacing) * 2)',
    lineHeight: 'var(--ui-text-sm--line-height)',
    // as wide as its days, and centred when the popup is wider than that,
    // which it is under a wide field
    marginInline: 'auto',
    userSelect: 'none',
    width: 'fit-content',
  },
  month: {
    fontWeight: '500',
  },
  // the chevron points right; it turns round for "next" where text runs
  // right to left, and for "previous" everywhere else
  next: {
    transform: {
      ':dir(rtl)': 'scaleX(-1)',
      default: null,
    },
  },
  previous: {
    transform: {
      ':dir(rtl)': 'none',
      default: 'scaleX(-1)',
    },
  },
  table: {
    borderCollapse: 'collapse',
  },
  weekday: {
    color: 'var(--gray-a10)',
    fontSize: 'var(--ui-text-xs)',
    fontWeight: '400',
    height: 'calc(var(--ui-spacing) * 8)',
    lineHeight: 'var(--ui-text-xs--line-height)',
    padding: 0,
    textAlign: 'center',
    width: 'calc(var(--ui-spacing) * 8)',
  },
})
