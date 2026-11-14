import {
  type MessageKeys,
  type Messages,
  type NestedKeyOf,
  type TranslationValues,
  useTranslations,
} from 'next-intl'

type Id = MessageKeys<Messages, NestedKeyOf<Messages>>

type Props = {
  id: Id
  data?: TranslationValues
}

// for props that need a string, like placeholder or aria-label
export function useText(id: Id, data?: TranslationValues) {
  const t = useTranslations()

  return t(id, data)
}

export function Text({ id, data }: Props) {
  return useText(id, data)
}
