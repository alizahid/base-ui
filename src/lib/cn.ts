import { createCn, validators } from 'cn/config'

export type { ClassValue } from 'cn'

/**
 * Same as `cn` from the `cn` package, but it also knows the `rounded-ui-*`,
 * `rounded-panel-*` and `rounded-inner-*` classes from our theme, so `className="rounded-full"` can override them.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      rounded: [{ 'rounded-inner': [validators.isAny] }],
    },
    theme: {
      radius: [
        'ui-xs',
        'ui-sm',
        'ui-md',
        'ui-lg',
        'ui-xl',
        'ui-thumb',
        'panel-xs',
        'panel-sm',
        'panel-md',
        'panel-lg',
        'panel-xl',
      ],
    },
  },
})
