import { Table } from 'basedkit'
import { getTranslations } from 'next-intl/server'

import { named, parts, pretty } from '@/content/props'

import { Block } from './pre'

type Props = {
  // just the tables, for a page that has its own heading for them
  bare?: boolean
  page: string
}

// the props a page's components declare themselves, one table per component.
// the columns have widths wide enough for their longest word, so nothing
// breaks mid-word: wider pages share out the extra, narrower ones scroll
export async function Props({ bare, page }: Props) {
  const t = await getTranslations()

  const list = parts(page)

  if (list.length === 0) {
    return null
  }

  // a hook's table lists its parameters
  const hook = list.some((part) => part.returns)

  return (
    <>
      {bare ? null : (
        <h2 className="mt-10 mb-4 text-2xl font-bold">
          {t(hook ? 'common.parameters' : 'common.props')}
        </h2>
      )}

      {list.map((part) => (
        <section key={part.name}>
          {named(page) ? (
            <h3 className="mt-8 text-lg font-bold">{part.name}</h3>
          ) : null}

          <Table.Root
            className="mt-4"
            layout="fixed"
            size="1"
            variant="surface"
          >
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell className="w-44">
                  {t(hook ? 'common.name' : 'common.prop')}
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="w-72">
                  {t('common.type')}
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="w-36">
                  {t('common.default')}
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {part.props.map((prop) => (
                <Table.Row key={prop.name}>
                  <Table.RowHeaderCell>
                    <code className="text-(--accent-11)">{prop.name}</code>

                    {prop.required ? (
                      <abbr
                        className="ms-1 text-(--red-11) no-underline"
                        title={t('common.required')}
                      >
                        *
                      </abbr>
                    ) : null}
                  </Table.RowHeaderCell>

                  {/* code reads left to right in every locale */}
                  <Table.Cell>
                    <code
                      className="whitespace-pre-wrap text-(--gray-11)"
                      dir="ltr"
                    >
                      {pretty(prop.type)}
                    </code>
                  </Table.Cell>

                  <Table.Cell>
                    {prop.default ? (
                      <code dir="ltr">{prop.default}</code>
                    ) : (
                      <span className="text-(--gray-9)">–</span>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>

          {part.returns ? (
            <>
              <h2 className="mt-10 mb-4 text-2xl font-bold">
                {t('common.returns')}
              </h2>

              <Block code={pretty(part.returns)} lang="ts" />
            </>
          ) : null}
        </section>
      ))}
    </>
  )
}
