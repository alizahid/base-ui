import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'

const config: StorybookConfig = {
  addons: ['@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.tsx'],
  viteFinal: (config) => {
    config.plugins = [...(config.plugins ?? []), tailwindcss()]

    return config
  },
}

export default config
