import { Drawer as Component } from '@base-ui/react/drawer'

import { Close } from './close.js'
import { Content } from './content.js'
import { Description } from './description.js'
import { Root } from './root.js'
import { Title } from './title.js'
import { Trigger } from './trigger.js'

export const Drawer = {
  Close,
  Content,
  // for opening a drawer from a trigger outside its Root
  createHandle: Component.createHandle,
  Description,
  Root,
  Title,
  Trigger,
}

export type { DrawerCloseProps } from './close.js'
export type { DrawerContentProps } from './content.js'
export type { DrawerDescriptionProps } from './description.js'
export type { DrawerRootProps } from './root.js'
export type { DrawerTitleProps } from './title.js'
export type { DrawerTriggerProps } from './trigger.js'
