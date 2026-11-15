import * as stylex from '@stylexjs/stylex'

// the text styles shared by Dialog, AlertDialog and Drawer. ported from radix
// themes' base-dialog.css
export const dialog = stylex.create({
  description: {
    fontSize: 'var(--ui-text-base)',
    lineHeight: 'var(--ui-text-base--line-height)',
  },
  title: {
    fontSize: 'var(--ui-text-xl)',
    fontWeight: '700',
    lineHeight: 'var(--ui-text-xl--line-height)',
    marginBlockEnd: 'calc(var(--ui-spacing) * 3)',
  },
})
