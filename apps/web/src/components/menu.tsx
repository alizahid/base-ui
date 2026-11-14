'use client'

import { ListIcon, XIcon } from '@phosphor-icons/react/dist/ssr'
import { Drawer, IconButton } from '@repo/ui'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Sidebar } from './sidebar'

// the sidebar's links in a drawer, for small screens
export function Menu() {
  const t = useTranslations()

  const [open, setOpen] = useState(false)

  return (
    <Drawer.Root onOpenChange={setOpen} open={open} side="start">
      <Drawer.Trigger
        render={
          <IconButton
            aria-label={t('header.menu')}
            className="ms-auto md:hidden"
            highContrast
            variant="ghost"
          />
        }
      >
        <ListIcon />
      </Drawer.Trigger>

      <Drawer.Content className="md:hidden" size="1">
        {/* full screen on a phone, so it needs its own way out */}
        <div className="flex items-start justify-between">
          <Drawer.Title>{t('metadata.title')}</Drawer.Title>

          <Drawer.Close
            render={
              <IconButton
                aria-label={t('header.close')}
                highContrast
                variant="ghost"
              />
            }
          >
            <XIcon />
          </Drawer.Close>
        </div>

        {/* the links bleed 1px past the drawer's padding */}
        <div className="px-px">
          <Sidebar onNavigate={() => setOpen(false)} />
        </div>
      </Drawer.Content>
    </Drawer.Root>
  )
}
