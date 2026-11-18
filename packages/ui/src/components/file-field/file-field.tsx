'use client'

import {
  Input as Component,
  type InputProps as ComponentProps,
} from '@base-ui/react/input'
import * as stylex from '@stylexjs/stylex'
import {
  type CSSProperties,
  type DragEvent,
  type ComponentProps as ReactComponentProps,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'

import { Spinner } from '#components/spinner/spinner.js'
import { type ColorToken } from '#lib/colors.js'
import { Cross2Icon, icon, UploadIcon } from '#lib/icons.js'
import { input } from '#lib/input.js'
import { type RadiusToken, radii } from '#lib/radii.js'
import { merge } from '#lib/stylex.js'

export type FileFieldProps = Omit<
  ReactComponentProps<'input'>,
  | 'children'
  | 'className'
  | 'color'
  | 'defaultValue'
  | 'size'
  | 'style'
  | 'type'
  | 'value'
> & {
  children?: ReactNode
  className?: string
  color?: ColorToken | 'gray'
  filesLabel?: string
  layout?: 'field' | 'zone'
  loading?: boolean
  locale?: string
  onValueChange?: (files: Array<File>) => void
  radius?: RadiusToken
  removeLabel?: string
  size?: '1' | '2' | '3'
  style?: CSSProperties
  value?: Array<File>
  variant?: 'surface' | 'soft'
}

// whether a file passes an `accept` list: extensions, mime types and
// wildcards like image/*. while a file is still being dragged the browser
// gives its type but not its name, so an extension can't be checked yet and
// passes
function accepts(accept: string | undefined, type: string, name?: string) {
  const tokens = (accept ?? '')
    .split(',')
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean)

  return (
    tokens.length === 0 ||
    tokens.some((token) => {
      if (token.startsWith('.')) {
        return name === undefined || name.toLowerCase().endsWith(token)
      }

      return token.endsWith('/*')
        ? type.startsWith(token.slice(0, -1))
        : type === token
    })
  )
}

const units = ['byte', 'kilobyte', 'megabyte', 'gigabyte']

// 1536 becomes "1.5 kB", in the locale's own digits and separators
function size(bytes: number, locale?: string) {
  const unit = Math.min(
    Math.floor(Math.log(Math.max(bytes, 1)) / Math.log(1024)),
    units.length - 1,
  )

  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 1,
    style: 'unit',
    unit: units[unit],
    unitDisplay: 'short',
  }).format(bytes / 1024 ** unit)
}

// the same file picked twice is one file
function key(file: File) {
  return `${file.name}:${file.size}:${file.lastModified}`
}

// a dropzone over a native file input, as tall as a text field. the input
// covers the dropzone, so clicking, the keyboard, dropping and form submission
// are the browser's own; this adds the drag states, checks dropped files
// against `accept`, which browsers only apply to the picker, and shows what
// was picked: one file's name, or how many, with their size. with `multiple`,
// new files add to the ones already there. className and style go to the
// dropzone, a flex container; everything else goes to the input. `layout` only
// styles it: a `field` is a row as tall as a text field, a `zone` a padded box
// with its content stacked in the middle
export function FileField({
  accept,
  children = 'Drop files here or click to browse',
  className,
  color,
  disabled,
  // ponytail: one template for every count. a function prop, if a locale's
  // plural forms matter
  filesLabel = '{count} files',
  layout = 'field',
  loading = false,
  locale,
  multiple,
  onValueChange,
  radius,
  removeLabel = 'Remove',
  size: scale = '2',
  style,
  value,
  variant = 'surface',
  ...props
}: FileFieldProps) {
  const ref = useRef<HTMLInputElement>(null)

  const [own, setOwn] = useState<Array<File>>([])
  const [drag, setDrag] = useState<'over' | 'rejected'>()

  const files = value ?? own

  const [first] = files

  const label =
    files.length === 1 && first
      ? first.name
      : filesLabel.replace(
          '{count}',
          new Intl.NumberFormat(locale).format(files.length),
        )

  // the input holds the same files as the field shows, so a form submits
  // them and `required` sees them
  const write = (next: Array<File>) => {
    const transfer = new DataTransfer()

    for (const file of next) {
      transfer.items.add(file)
    }

    if (ref.current) {
      ref.current.files = transfer.files
    }
  }

  const commit = (next: Array<File>) => {
    write(next)
    setOwn(next)
    onValueChange?.(next)
  }

  const add = (list: Iterable<File>) => {
    if (loading) {
      return
    }

    const picked = [...list].filter((file) =>
      accepts(accept, file.type, file.name),
    )

    const next = multiple
      ? [
          ...new Map([...files, ...picked].map((file) => [key(file), file])),
        ].map(([, file]) => file)
      : picked.slice(0, 1)

    // dropping only files that aren't accepted changes nothing
    commit(picked.length > 0 ? next : files)
  }

  // a controlled value is written to the input too
  // biome-ignore lint/correctness/useExhaustiveDependencies: write only reads the ref
  useEffect(() => {
    if (value) {
      write(value)
    }
  }, [value])

  const over = (event: DragEvent<HTMLInputElement>) => {
    const items = [...event.dataTransfer.items].filter(
      (item) => item.kind === 'file',
    )

    if (loading) {
      return
    }

    setDrag(
      items.length > 0 && items.every((item) => !accepts(accept, item.type))
        ? 'rejected'
        : 'over',
    )
  }

  return (
    <div
      aria-busy={loading || undefined}
      data-accent={color}
      data-dragging={drag === 'over' ? '' : undefined}
      data-filled={files.length > 0 ? '' : undefined}
      data-loading={loading ? '' : undefined}
      data-rejected={drag === 'rejected' ? '' : undefined}
      {...merge(
        stylex.props(
          styles.main,
          variants[variant],
          sizes[scale],
          layout === 'zone' && styles.zone,
          radius && radii[radius],
        ),
        className,
        style,
      )}
    >
      {/* the spinner takes the icon's place and its space; its sizes are the
          icon's */}
      <Spinner loading={loading} size={scale}>
        <UploadIcon {...stylex.props(icon.small, styles.icon)} />
      </Spinner>

      {files.length > 0 ? (
        <span {...stylex.props(styles.text, styles.value)}>
          <span {...stylex.props(styles.text, styles.name)}>{label}</span>

          <span {...stylex.props(styles.size)}>
            {size(
              files.reduce((total, file) => total + file.size, 0),
              locale,
            )}
          </span>
        </span>
      ) : (
        <span {...stylex.props(styles.text)}>{children}</span>
      )}

      <Component
        {...(props as ComponentProps)}
        accept={accept}
        disabled={disabled}
        multiple={multiple}
        onChange={(event) => {
          props.onChange?.(event)

          add(event.currentTarget.files ?? [])
        }}
        // while loading the field looks the same but takes nothing: the
        // picker stays shut, for the keyboard too, and `add` ignores a drop
        onClick={(event) => {
          props.onClick?.(event)

          if (loading) {
            event.preventDefault()
          }
        }}
        onDragEnter={over}
        onDragLeave={() => {
          setDrag(undefined)
        }}
        onDrop={(event) => {
          // the browser would replace the files, accepted or not
          event.preventDefault()

          setDrag(undefined)
          add(event.dataTransfer.files)
        }}
        // escape removes the files, as in a combobox. the event stops here,
        // so a dialog around the field stays open
        onKeyDown={(event) => {
          props.onKeyDown?.(event)

          if (event.key === 'Escape' && files.length > 0 && !loading) {
            event.stopPropagation()

            commit([])
          }
        }}
        ref={ref}
        render={<input type="file" />}
        {...stylex.props(styles.input)}
      />

      {files.length > 0 ? (
        <button
          aria-label={`${removeLabel} ${label}`}
          data-disabled={disabled ? '' : undefined}
          disabled={disabled}
          inert={loading}
          onClick={() => {
            commit([])

            // the button is about to go, and would take the focus with it
            ref.current?.focus()
          }}
          // for the pointer: the keyboard has escape
          tabIndex={-1}
          type="button"
          {...stylex.props(input.action, styles.remove)}
        >
          <Cross2Icon {...stylex.props(icon.small)} />
        </button>
      ) : null}
    </div>
  )
}

// stylex doesn't order these against each other, so they must not overlap.
// in order: disabled, a rejected drag, an accepted drag, invalid, hover
const off = ':has(input:disabled)'
const rejected = ':is([data-rejected]):not(:has(input:disabled))'
const dragging = ':is([data-dragging]):not(:has(input:disabled))'
const invalid =
  ':has(input[data-invalid]):not([data-dragging], [data-rejected], :has(input:disabled))'
const hover =
  ':hover:not([data-dragging], [data-rejected], :has(input:disabled), :has(input[data-invalid]))'

// ours: radix themes has no file field. the sizes and colours follow its
// text field
const styles = stylex.create({
  icon: {
    flexShrink: 0,
  },
  // covers the dropzone, unseen: the click, the drop and the focus are its own
  input: {
    cursor: {
      ':disabled': 'not-allowed',
      ':is([data-loading] > *):not(:disabled)': 'default',
      default: 'pointer',
    },
    inset: 0,
    opacity: 0,
    position: 'absolute',
  },
  main: {
    // the size of `icon.small`, for the remove button and the room it needs
    '--file-field-icon': 'calc(1lh - var(--ui-spacing))',
    alignItems: 'center',
    backgroundColor: {
      [dragging]: 'var(--accent-a3)',
      [off]: 'var(--gray-a3)',
      [rejected]: 'var(--red-a3)',
      default: 'var(--file-field-background)',
    },
    borderColor: {
      [dragging]: 'var(--accent-8)',
      [hover]: {
        '@media (hover: hover)': 'var(--file-field-border-hover)',
        default: null,
      },
      [invalid]: 'var(--red-8)',
      [off]: 'var(--gray-a6)',
      [rejected]: 'var(--red-8)',
      default: 'var(--file-field-border)',
    },
    // a field's border is the text field's; a zone dashes it
    borderStyle: 'solid',
    borderWidth: 1,
    color: {
      [off]: 'var(--gray-a9)',
      [rejected]: 'var(--red-a11)',
      default: 'var(--file-field-color)',
    },
    display: 'flex',
    fontWeight: '400',
    gap: 'calc(var(--ui-spacing) * 2)',
    height: 'var(--file-field-height)',
    outline: {
      ':has(input:focus-visible)': '2px solid var(--focus-8)',
      default: 'none',
    },
    outlineOffset: -1,
    // room for the remove button, which is out of the flow
    paddingInlineEnd: {
      ':is([data-filled])':
        'calc(var(--file-field-padding) * 2 + var(--file-field-icon))',
      default: 'var(--file-field-padding)',
    },
    paddingInlineStart: 'var(--file-field-padding)',
    position: 'relative',
    textAlign: 'start',
    // one line, cut short. inherited, so a className on a box can wrap it
    whiteSpace: 'nowrap',
  },
  name: {
    color: 'var(--file-field-value)',
  },
  // over the input, in the corner: centred in a field of the default height,
  // and still in the corner of a taller box
  remove: {
    color: 'var(--gray-a11)',
    height: 'var(--file-field-icon)',
    insetBlockStart:
      'var(--file-field-remove, calc((var(--file-field-height) - var(--file-field-icon)) / 2 - 1px))',
    insetInlineEnd: 'var(--file-field-padding)',
    justifyContent: 'center',
    position: 'absolute',
    width: 'var(--file-field-icon)',
  },
  size: {
    flexShrink: 0,
  },
  text: {
    maxWidth: '100%',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  // the name and the size stay on one line, whichever way the field runs
  value: {
    display: 'flex',
    gap: 'calc(var(--ui-spacing) * 2)',
    whiteSpace: 'nowrap',
  },
  // the same room on both sides keeps the content centred under the button
  zone: {
    '--file-field-border': 'var(--file-field-zone-border)',
    '--file-field-border-hover': 'var(--file-field-zone-border-hover)',
    '--file-field-remove': 'var(--file-field-padding)',
    borderStyle: 'dashed',
    flexDirection: 'column',
    height: 'auto',
    justifyContent: 'center',
    paddingBlock: 'var(--file-field-zone)',
    paddingInlineEnd:
      'calc(var(--file-field-padding) * 2 + var(--file-field-icon))',
    paddingInlineStart:
      'calc(var(--file-field-padding) * 2 + var(--file-field-icon))',
    textAlign: 'center',
    whiteSpace: 'normal',
  },
})

// variants only set variables, the dropzone decides where they apply
const variants = stylex.create({
  soft: {
    '--file-field-background': 'var(--accent-a3)',
    // a soft field has no border, like a soft text field; a zone keeps its dashes
    '--file-field-border': 'transparent',
    '--file-field-border-hover': 'transparent',
    '--file-field-color': 'var(--accent-a11)',
    '--file-field-value': 'var(--accent-12)',
    '--file-field-zone-border': 'var(--accent-a6)',
    '--file-field-zone-border-hover': 'var(--accent-a8)',
  },
  surface: {
    '--file-field-background': 'var(--surface)',
    '--file-field-border': 'var(--gray-a7)',
    '--file-field-border-hover': 'var(--gray-a8)',
    '--file-field-color': 'var(--gray-a11)',
    '--file-field-value': 'var(--gray-12)',
    '--file-field-zone-border': 'var(--gray-a7)',
    '--file-field-zone-border-hover': 'var(--gray-a8)',
  },
})

// the text field's heights, corners and text
const sizes = stylex.create({
  1: {
    '--file-field-height': 'calc(var(--ui-spacing) * 6)',
    '--file-field-padding': 'calc(var(--ui-spacing) * 1.5)',
    '--file-field-zone': 'calc(var(--ui-spacing) * 4)',
    borderRadius: 'var(--ui-radius-sm)',
    fontSize: 'var(--ui-text-xs)',
    lineHeight: 'var(--ui-text-xs--line-height)',
  },
  2: {
    '--file-field-height': 'calc(var(--ui-spacing) * 8)',
    '--file-field-padding': 'calc(var(--ui-spacing) * 2)',
    '--file-field-zone': 'calc(var(--ui-spacing) * 6)',
    borderRadius: 'var(--ui-radius-sm)',
    fontSize: 'var(--ui-text-sm)',
    lineHeight: 'var(--ui-text-sm--line-height)',
  },
  3: {
    '--file-field-height': 'calc(var(--ui-spacing) * 10)',
    '--file-field-padding': 'calc(var(--ui-spacing) * 3)',
    '--file-field-zone': 'calc(var(--ui-spacing) * 8)',
    borderRadius: 'var(--ui-radius-md)',
    fontSize: 'var(--ui-text-base)',
    lineHeight: 'var(--ui-text-base--line-height)',
  },
})
