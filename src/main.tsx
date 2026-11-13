import '@mantine/core/styles.layer.css'
import '@mantine/dates/styles.layer.css'
import '@mantine/charts/styles.layer.css'
import '@mantine/notifications/styles.layer.css'
import '@mantine/spotlight/styles.layer.css'
import '@mantine/carousel/styles.layer.css'
import '@mantine/dropzone/styles.layer.css'
import '@mantine/nprogress/styles.layer.css'
import '@mantine/code-highlight/styles.layer.css'
import '@mantine/tiptap/styles.layer.css'

import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { NavigationProgress } from '@mantine/nprogress'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './playground/app'
import { RadixProvider } from './theme/settings'
import './theme/radix.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RadixProvider>
      <ModalsProvider>
        <NavigationProgress />
        <Notifications />
        <App />
      </ModalsProvider>
    </RadixProvider>
  </StrictMode>,
)
