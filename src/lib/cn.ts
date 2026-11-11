import { createCn } from 'cn/config'

export type { ClassValue } from 'cn'

/**
 * Same as `cn` from the `cn` package, but it also knows the `rounded-ui-*`
 * classes from our theme, so `className="rounded-full"` can override them.
 */
export const cn = createCn({
  extend: {
    theme: {
      radius: ['ui-xs', 'ui-sm', 'ui-md', 'ui-lg', 'ui-xl', 'ui-thumb'],
    },
  },
})
