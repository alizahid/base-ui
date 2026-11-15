import * as stylex from '@stylexjs/stylex'

// the text styles shared by Dialog, AlertDialog and Drawer. ported from radix
// themes' base-dialog.css
export const dialog = stylex.create({
  description: {
    fontSize: 'var(--text-base)',
    lineHeight: 'var(--text-base--line-height)',
  },
  title: {
    fontSize: 'var(--text-xl)',
    fontWeight: '700',
    lineHeight: 'var(--text-xl--line-height)',
    marginBlockEnd: 'calc(var(--spacing) * 3)',
  },
})
