import { Autocomplete as Component } from '@base-ui/react/autocomplete'

import { Content } from './content.js'
import { Group } from './group.js'
import { Input } from './input.js'
import { Item } from './item.js'
import { Label } from './label.js'
import { Root } from './root.js'
import { Separator } from './separator.js'

export const Autocomplete = {
  // for custom rows inside a Group: (item) => <Autocomplete.Item />
  Collection: Component.Collection,
  Content,
  Group,
  Input,
  Item,
  Label,
  Root,
  Separator,
}

export type { AutocompleteContentProps } from './content.js'
export type { AutocompleteGroupProps } from './group.js'
export type { AutocompleteInputProps } from './input.js'
export type { AutocompleteItemProps } from './item.js'
export type { AutocompleteLabelProps } from './label.js'
export type { AutocompleteRootProps } from './root.js'
export type { AutocompleteSeparatorProps } from './separator.js'
