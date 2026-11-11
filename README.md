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

## Theme

Wrap your app in a `ThemeProvider` to set the defaults for everything inside.

```tsx
import { ThemeProvider } from 'base-ui-themes'

;<ThemeProvider appearance="dark" color="violet" gray="mauve" radius="large">
  <App />
</ThemeProvider>
```

- `color`: the accent color (default `blue`)
- `gray`: `gray`, `mauve`, `slate`, `sage`, `olive` or `sand` (default `slate`)
- `radius`: `none`, `small`, `medium`, `large` or `full` (default `medium`)
- `appearance`: `light`, `dark` or `inherit` (default `inherit`)
- Providers can be nested. Anything not set comes from the parent.
- `useTheme()` returns the current values.

Radius priority on a component: `className` > `radius` prop > `ThemeProvider`.
Components use `rounded-ui-xs` to `rounded-ui-xl`, which follow the theme radius.

## Colors

- The default accent is `blue` and the default gray is `slate`.
- Components use two sets of Tailwind colors: `accent-1` to `accent-12` and `gray-1` to
  `gray-12` (plus alpha steps like `accent-a3`, and `accent-contrast` for text on step 9).
- `color="pink"` on a component sets `data-color="pink"`, which points the accent at the
  pink scale for that element.
- The provider is a thin layer over plain attributes: `data-color`, `data-gray`,
  `data-radius` and the `light` / `dark` class. They also work on any element by hand.

## Components

Accordion, AlertDialog, Autocomplete, Avatar, Badge, Button, Callout, Card, Checkbox,
CheckboxGroup, Collapsible, Combobox, ContextMenu, Dialog, Drawer, DropdownMenu, Field, Fieldset,
Form, HoverCard, IconButton, Menubar, Meter, NavigationMenu, NumberField, OtpField, Popover,
Progress, Radio, RadioGroup, ScrollArea, SegmentedControl, Select, Separator, Skeleton, Slider,
Spinner, Switch, Tabs, TextArea, TextField, Toast, Toggle, ToggleGroup, Toolbar, Tooltip.

- The API follows Radix Themes: `Dialog.Root`, `Dialog.Trigger`, `Dialog.Content`, ...
- Plumbing parts (portal, backdrop, positioner, thumb, indicator) are built in and not exposed.
  Where one is rendered for you, a `classNames` prop lets you style it.
- Popups keep the theme of the `ThemeProvider` they are used in.

## Radius

- `rounded-ui-*` follows the theme radius and becomes a pill when the radius is `full`.
- `rounded-panel-*` follows the theme radius but never becomes a pill (dialogs, popups).
- Every `rounded-*` class sets `--ui-radius` on its element. A part inside it uses
  `rounded-inner-px`, `rounded-inner-0.5` or `rounded-inner-[3px]` (outer radius minus the gap),
  so one `className` on the outer part reshapes both.
- The inner radius never goes below 4px (set `--ui-radius-min` to change it), unless the
  outer part is squarer than that.

## Development

```bash
bun install
bun run dev        # Storybook
bun run lint
bun run typecheck
bun run build
bun run generate   # rebuild the color CSS after changing src/lib/colors.ts
```
