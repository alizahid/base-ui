import type { Preview } from '@storybook/react-vite'
import { ThemeProvider } from '../src/components/theme-provider'
import { colors } from '../src/lib/colors'
import { grays, panelBackgrounds, radii } from '../src/lib/theme'
import './preview.css'

const preview: Preview = {
  decorators: [
    (Story, { globals }) => (
      <ThemeProvider
        appearance={globals.appearance}
        className="p-4"
        color={globals.color}
        gray={globals.gray}
        panelBackground={globals.panelBackground}
        radius={globals.radius}
      >
        <Story />
      </ThemeProvider>
    ),
  ],
  globalTypes: {
    appearance: {
      toolbar: {
        dynamicTitle: true,
        icon: 'mirror',
        items: ['light', 'dark'],
        title: 'Appearance',
      },
    },
    color: {
      toolbar: { dynamicTitle: true, icon: 'paintbrush', items: [...colors], title: 'Color' },
    },
    gray: {
      toolbar: { dynamicTitle: true, icon: 'contrast', items: [...grays], title: 'Gray' },
    },
    panelBackground: {
      toolbar: {
        dynamicTitle: true,
        icon: 'sidebar',
        items: [...panelBackgrounds],
        title: 'Panels',
      },
    },
    radius: {
      toolbar: { dynamicTitle: true, icon: 'button', items: [...radii], title: 'Radius' },
    },
  },
  initialGlobals: {
    appearance: 'light',
    color: 'blue',
    gray: 'slate',
    panelBackground: 'translucent',
    radius: 'medium',
  },
  parameters: {
    backgrounds: { disable: true },
    controls: { expanded: true },
    layout: 'fullscreen',
    // The one-page playground first, then the components
    options: { storySort: { order: ['Playground', 'Components'] } },
  },
}

export default preview
