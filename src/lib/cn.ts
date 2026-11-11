import { createCn, validators } from 'cn/config'

export type { ClassValue } from 'cn'

/**
 * Same as `cn` from the `cn` package, but it also knows the `rounded-ui-*`,
 * `rounded-panel-*`, `rounded-inner-*` and `shadow-ui-*` classes from our theme, so `className="rounded-full"` can override them.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      rounded: [{ 'rounded-inner': [validators.isAny] }],
    },
    theme: {
      radius: [
        ...['xs', 'sm', 'md', 'lg', 'xl', '2xl'].flatMap((size) => [`ui-${size}`, `panel-${size}`]),
        'ui-thumb',
      ],
      shadow: ['ui-1', 'ui-2', 'ui-3', 'ui-4', 'ui-5', 'ui-6'],
    },
  },
})
