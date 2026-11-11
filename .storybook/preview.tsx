import { withThemeByClassName } from '@storybook/addon-themes'
import type { Preview } from '@storybook/react-vite'
import './preview.css'

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      defaultTheme: 'light',
      themes: { light: 'light', dark: 'dark' },
    }),
  ],
  parameters: {
    backgrounds: { disable: true },
    controls: { expanded: true },
  },
}

export default preview
