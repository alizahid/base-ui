# base-ui-themes

A [Radix Themes](https://www.radix-ui.com/) alternative built with
[Base UI](https://base-ui.com/), [Tailwind CSS](https://tailwindcss.com/) and
[Radix Colors](https://www.radix-ui.com/colors).

- Base UI handles behavior and accessibility
- Tailwind CSS handles styling, and `className` always wins over the defaults
- Radix Colors gives every component a `color` prop

## Setup

```css
@import "tailwindcss";
@import "base-ui-themes/styles.css";
```

```tsx
import { Button } from 'base-ui-themes'

<Button>Save</Button>
<Button color="pink" variant="soft" size="sm">Like</Button>
<Button className="rounded-full">Rounded</Button>
```

## Colors

- The default accent is `blue` and the default gray is `slate`.
- Components use two sets of Tailwind colors: `accent-1` to `accent-12` and `gray-1` to
  `gray-12` (plus alpha steps like `accent-a3`, and `accent-contrast` for text on step 9).
- `color="pink"` on a component sets `data-color="pink"`, which points the accent at the
  pink scale for that element.
- `data-color` works on any element. Put it on `<html>` or a wrapper to change the accent
  for everything inside.
- Dark mode: add the `dark` class to `<html>` or any wrapper.

## Development

```bash
bun install
bun run dev        # Storybook
bun run lint
bun run typecheck
bun run build
bun run generate   # rebuild the color CSS after changing src/lib/colors.ts
```
