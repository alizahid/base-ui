import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import type { ComponentProps } from 'react'
import { cn } from '../../lib/cn'
import { listItem, listLabel, listSeparator } from '../../lib/styles'
import {
  ComboboxContent,
  type ComboboxContentProps,
  type ComboboxInputProps,
  InputBox,
} from '../combobox/combobox'

export const AutocompleteRoot = BaseAutocomplete.Root

export type AutocompleteRootProps<ItemValue> = BaseAutocomplete.Root.Props<ItemValue>

export const AutocompleteGroup = BaseAutocomplete.Group

export type AutocompleteGroupProps = ComponentProps<typeof BaseAutocomplete.Group>

/**
 * Renders the items of one group when `Root` has grouped `items`.
 * Goes inside `Group`, with a function `(item) => <Item />` as children.
 */
export const AutocompleteCollection = BaseAutocomplete.Collection

export type AutocompleteCollectionProps = ComponentProps<typeof BaseAutocomplete.Collection>

/** Filter helpers that match the user's locale. Same as Base UI's `Autocomplete.useFilter`. */
export const useAutocompleteFilter = BaseAutocomplete.useFilter

export type AutocompleteInputProps = ComboboxInputProps

/**
 * The text input, with the same look as the Combobox input.
 * Includes Base UI's `InputGroup`, `Clear` and (with `showTrigger`) `Trigger`.
 */
export function AutocompleteInput({ showTrigger = false, ...props }: AutocompleteInputProps) {
  return <InputBox {...props} parts={BaseAutocomplete} showTrigger={showTrigger} />
}

export type AutocompleteContentProps = ComboboxContentProps

/** The list box. Base UI's `Portal`, `Positioner`, `Popup`, `Empty` and `List` in one. */
export const AutocompleteContent = ComboboxContent

export type AutocompleteItemProps = Omit<
  ComponentProps<typeof BaseAutocomplete.Item>,
  'className'
> & {
  className?: string
}

export function AutocompleteItem({ className, ...props }: AutocompleteItemProps) {
  return <BaseAutocomplete.Item {...props} className={cn(listItem, className)} />
}

export type AutocompleteLabelProps = Omit<
  ComponentProps<typeof BaseAutocomplete.GroupLabel>,
  'className'
> & {
  className?: string
}

/** A small heading. Must be inside `Group`. */
export function AutocompleteLabel({ className, ...props }: AutocompleteLabelProps) {
  return <BaseAutocomplete.GroupLabel {...props} className={cn(listLabel, className)} />
}

export type AutocompleteSeparatorProps = Omit<
  ComponentProps<typeof BaseAutocomplete.Separator>,
  'className'
> & {
  className?: string
}

export function AutocompleteSeparator({ className, ...props }: AutocompleteSeparatorProps) {
  return <BaseAutocomplete.Separator {...props} className={cn(listSeparator, className)} />
}
