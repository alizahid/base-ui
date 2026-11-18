# basedkit

React components with the look of Radix Themes, built on Base UI. Install the package, import the styles and wrap your app in a provider.

The [documentation](https://base-ui-wine.vercel.app) has every component, with examples and props.

## Installation

Add the package to your project.

```bash
bun add basedkit
```

## Styles

With Tailwind CSS, import the theme and the styles after Tailwind. The styles go in a layer between base and utilities, so a Tailwind class on a component overrides the component's own style.

```css
@layer theme, base, ui, components, utilities;

@import "tailwindcss";

@import "basedkit/theme.css";
@import "basedkit/styles.css" layer(ui);
```

Without Tailwind, import the reset first. It has the browser resets the components are written against.

```css
@import "basedkit/reset.css";
@import "basedkit/theme.css";
@import "basedkit/styles.css";
```

The background and text color of the page are yours to set. Steps 1 and 12 of the gray scale are the usual choice.

```css
body {
  color: var(--gray-12);
  background: var(--gray-1);
}
```

## Provider

Wrap your app in a BaseProvider. Its accent and gray props set the colors of everything inside it; the gray defaults to the one that suits the accent. Pass direction for a right-to-left layout, and panelBackground to make cards translucent.

```tsx
import './main.css'

import { BaseProvider } from 'basedkit'
import { type ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <BaseProvider accent="plum">{children}</BaseProvider>
      </body>
    </html>
  )
}
```

## Dark mode

The components turn dark under a dark or dark-theme class, usually set on the html element. Any theme switcher that sets a class works.

```html
<html class="dark">
```

With Tailwind, point its dark variant at the same class.

```css
@custom-variant dark (&:where(.dark, .dark *));
```

## Usage

Import a component and use it.

```tsx
import { Button } from 'basedkit'

export function Save() {
  return <Button>Save</Button>
}
```

## Optional packages

The date field and the phone field each rely on a third-party package and have their own import path. Install the package only if you use the component.

```bash
# DateField, from basedkit/date-field
bun add use-lilius

# PhoneField, from basedkit/phone-field
bun add libphonenumber-js
```

## License

[MIT](license)
