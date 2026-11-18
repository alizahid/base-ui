import * as stylex from '@stylexjs/stylex'

// the chips a field shows its values as, shared by Combobox and TagsField:
// they sit in one wrapping row with the input, inside the text input look
// from `input.ts`

export const chips = stylex.create({
  chip: {
    alignItems: 'center',
    backgroundColor: {
      ':is([data-highlighted])': 'var(--combobox-chip-highlight)',
      default: 'var(--combobox-chip)',
    },
    // the field's radius less half the space around the chip: a little
    // rounder than sharing a centre with the field's corner, as it is so
    // small. a result below zero is square
    borderRadius: 'calc(var(--outer-radius) - var(--combobox-chip-space) / 2)',
    cursor: 'default',
    display: 'inline-flex',
    gap: 'calc(var(--ui-spacing) * 0.5)',
    height: 'var(--combobox-chip-height)',
    outline: 'none',
    paddingInlineEnd: 'var(--ui-spacing)',
    paddingInlineStart: 'calc(var(--ui-spacing) * 1.5)',
    whiteSpace: 'nowrap',
  },
  // chips and the input share one wrapping row. the space around a chip is
  // what a single row leaves above and below it, so it is the same on every
  // side and between rows. the field's border takes its width out of the edges
  chips: {
    '--combobox-chip-space':
      'calc((var(--text-field-height) - var(--combobox-chip-height)) / 2)',
    alignItems: 'center',
    // at the top of a field that is taller than its rows
    alignSelf: 'flex-start',
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    gap: 'var(--combobox-chip-space)',
    minWidth: 0,
    paddingBlock:
      'calc(var(--combobox-chip-space) - var(--text-field-border-width))',
    paddingInlineStart: {
      ':has([data-chip])':
        'calc(var(--combobox-chip-space) - var(--text-field-border-width))',
    },
  },
  // a step smaller than the line, so it reads as part of the chip
  cross: {
    height: 'calc(1lh - var(--ui-spacing) * 1.5)',
    width: 'calc(1lh - var(--ui-spacing) * 1.5)',
  },
  // the input takes whatever is left of the row, and wraps when that is tight
  grow: {
    // as wide as its text, or its placeholder while it is empty, so it moves
    // to the next row when that no longer fits. a browser without
    // field-sizing keeps the fixed starting width
    fieldSizing: 'content',
    flexBasis: {
      '@supports (field-sizing: content)': 'auto',
      default: 'calc(var(--ui-spacing) * 16)',
    },
    flexGrow: 1,
    height: 'var(--combobox-chip-height)',
    maxWidth: '100%',
    minWidth: 'calc(var(--ui-spacing) * 16)',
    // a smaller indent beside a chip: the text starts a little way from the
    // last chip on its row, and nearly under the chips' own text on a row of
    // its own
    textIndent: {
      // a chip on either side of it in the markup
      ':is([data-chip] ~ *, :has(~ [data-chip]))': 'var(--ui-spacing)',
      default: 'var(--text-field-padding)',
    },
    width: 'auto',
  },
  remove: {
    opacity: {
      ':hover': {
        '@media (hover: hover)': 1,
        default: null,
      },
      default: 0.6,
    },
  },
  // the buttons at the end stay level with the first row, however many rows
  // or however much height the field has
  slot: {
    alignSelf: 'flex-start',
    minHeight:
      'calc(var(--text-field-height) - var(--text-field-border-width) * 2)',
  },
  // with chips the field grows with its rows instead of keeping a fixed height
  tall: {
    height: 'auto',
    minHeight: 'var(--text-field-height)',
  },
})

export const chipVariants = stylex.create({
  soft: {
    '--combobox-chip': 'var(--accent-a5)',
    '--combobox-chip-highlight': 'var(--accent-a6)',
  },
  surface: {
    '--combobox-chip': 'var(--accent-a3)',
    '--combobox-chip-highlight': 'var(--accent-a5)',
  },
})

export const chipSizes = stylex.create({
  1: {
    '--combobox-chip-height': 'calc(var(--ui-spacing) * 5)',
  },
  2: {
    '--combobox-chip-height': 'calc(var(--ui-spacing) * 6)',
  },
  3: {
    '--combobox-chip-height': 'calc(var(--ui-spacing) * 7)',
  },
})
