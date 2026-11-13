# Mantine × Radix

Every [Mantine](https://mantine.dev) 9 component (core plus dates, charts, notifications, spotlight, carousel, dropzone, nprogress, modals, code-highlight, tiptap and form) on one page, themed to look like [Radix Themes](https://www.radix-ui.com/themes) using [Radix Colors](https://www.radix-ui.com/colors).

```bash
bun install
bun run dev
```

## How the theme works

- `src/theme/radix.ts` builds the Mantine theme. Every Radix scale (`--indigo-1…12`, `--indigo-a1…a12`, plus `--gray-*` and `--accent-*`) is emitted per color scheme through `cssVariablesResolver`, and Mantine's own color variables point at them. Mantine shade 6 is Radix step 9, so `color="teal.6"` means solid Radix teal.
- Mantine variants map to Radix variants: `filled` = solid, `light` = soft, `outline` = outline, `subtle` = ghost, plus a custom `surface` variant.
- Sizes, spacing, radius, type scale and shadows follow Radix Themes. Controls take their corner radius from their size, like Radix.
- `src/theme/radix.css` restyles individual components. Mantine's CSS is loaded as `@layer mantine`, so these rules win without specificity fights.
- The **Theme** button in the header switches the accent color, gray (auto pairs it like Radix does), radius (none, small, medium, large, full) and appearance.
