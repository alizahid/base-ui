import {
  Autocomplete,
  Button,
  Cascader,
  Combobox,
  Mentions,
  MultiSelect,
  Pill,
  PillsInput,
  Select,
  TagsInput,
  TreeSelect,
  useCombobox,
} from '@mantine/core'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

import * as RT from '@radix-ui/themes'
import type { ReactNode } from 'react'

import { Demo, Row, Section } from '../demo'

const frameworks = ['React', 'Vue', 'Svelte', 'Angular', 'Solid', 'Qwik']

const countries = [
  { group: 'Europe', items: ['Germany', 'France', 'Norway'] },
  { group: 'Asia', items: ['Japan', 'Pakistan', 'Singapore'] },
  { group: 'Americas', items: ['Canada', 'Brazil', 'Mexico'] },
]

const regions = [
  {
    value: 'eu',
    label: 'Europe',
    children: [
      { value: 'eu-de', label: 'Germany', children: [{ value: 'eu-de-fra', label: 'Frankfurt' }, { value: 'eu-de-ber', label: 'Berlin' }] },
      { value: 'eu-fr', label: 'France', children: [{ value: 'eu-fr-par', label: 'Paris' }] },
    ],
  },
  {
    value: 'as',
    label: 'Asia',
    children: [
      { value: 'as-jp', label: 'Japan', children: [{ value: 'as-jp-tyo', label: 'Tokyo' }, { value: 'as-jp-osa', label: 'Osaka' }] },
      { value: 'as-sg', label: 'Singapore', disabled: true },
    ],
  },
]

const files = [
  {
    value: 'src',
    label: 'src',
    children: [
      { value: 'src/app', label: 'app', children: [{ value: 'src/app/page.tsx', label: 'page.tsx' }, { value: 'src/app/layout.tsx', label: 'layout.tsx' }] },
      { value: 'src/lib', label: 'lib', children: [{ value: 'src/lib/db.ts', label: 'db.ts' }] },
    ],
  },
  { value: 'package.json', label: 'package.json' },
]

const team = [
  { id: 'amira', display: 'Amira Khan' },
  { id: 'jonas', display: 'Jonas Weber' },
  { id: 'mei', display: 'Mei Tanaka' },
  { id: 'luca', display: 'Luca Rossi' },
]

const plans = ['Hobby', 'Pro', 'Team', 'Enterprise']

function CustomCombobox() {
  const [value, setValue] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption()
      setSearch('')
    },
    onDropdownOpen: () => combobox.focusSearchInput(),
  })

  const options = plans
    .filter((plan) => plan.toLowerCase().includes(search.toLowerCase().trim()))
    .map((plan) => (
      <Combobox.Option active={plan === value} key={plan} value={plan}>
        {plan}
      </Combobox.Option>
    ))

  return (
    <Combobox
      onOptionSubmit={(next) => {
        setValue(next)
        combobox.closeDropdown()
      }}
      store={combobox}
      width={220}
    >
      <Combobox.Target>
        <Button onClick={() => combobox.toggleDropdown()} rightSection={<ChevronDownIcon />} variant="default">
          {value ?? 'Choose a plan'}
        </Button>
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Search onChange={(event) => setSearch(event.currentTarget.value)} placeholder="Search plans" value={search} />
        <Combobox.Options>{options.length > 0 ? options : <Combobox.Empty>No plans found</Combobox.Empty>}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}

const W = 320

const planOptions = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
  { value: 'ent', label: 'Enterprise', disabled: true },
]

/** Radix Themes has no field wrapper, so the label, description and error are built from Text. */
function RadixField({ label, description, error, size = '2', children }: { label: string; description?: string; error?: string; size?: '1' | '2' | '3'; children: ReactNode }) {
  return (
    <label style={{ display: 'block', maxWidth: W }}>
      <RT.Text as="div" mb="1" size={size} weight="medium">
        {label}
      </RT.Text>
      {description && (
        <RT.Text as="div" color="gray" mb="1" size="1">
          {description}
        </RT.Text>
      )}
      {children}
      {error && (
        <RT.Text as="div" color="red" mt="1" size="1">
          {error}
        </RT.Text>
      )}
    </label>
  )
}

const radixFrameworks = (
  <RT.Select.Content position="popper">
    {frameworks.map((f) => (
      <RT.Select.Item key={f} value={f}>
        {f}
      </RT.Select.Item>
    ))}
  </RT.Select.Content>
)

const full = { width: '100%' }

export function ComboboxSection() {
  const [select, setSelect] = useState<string | null>('React')
  const [multi, setMulti] = useState<string[]>(['React', 'Svelte'])
  const [auto, setAuto] = useState('')
  const [tags, setTags] = useState<string[]>(['design', 'frontend'])
  const [path, setPath] = useState<string[] | null>(['eu', 'eu-de', 'eu-de-fra'])
  const [tree, setTree] = useState<string | null>('src/lib/db.ts')
  const [treeMulti, setTreeMulti] = useState<string[]>(['src/app/page.tsx'])
  const [mention, setMention] = useState('Ping @[Amira Khan](amira) about the release.')
  const [pills, setPills] = useState(['React', 'Vue'])
  const [pillsInput, setPillsInput] = useState('')

  return (
    <Section title="Combobox">
      <Demo title="Select" description="Single choice from a list, with search, groups and disabled options." radix="Select">
        <Row
          label="default / surface"
          radix={
            <RadixField description="Used for new projects" label="Framework">
              <RT.Select.Root onValueChange={setSelect} value={select ?? undefined}>
                <RT.Select.Trigger placeholder="Pick one" style={full} />
                {radixFrameworks}
              </RT.Select.Root>
            </RadixField>
          }
        >
          <Select data={frameworks} description="Used for new projects" label="Framework" maw={W} onChange={setSelect} placeholder="Pick one" value={select} />
        </Row>
        <Row
          label="filled / soft"
          radix={
            <RadixField label="Framework">
              <RT.Select.Root>
                <RT.Select.Trigger placeholder="Pick one" style={full} variant="soft" />
                {radixFrameworks}
              </RT.Select.Root>
            </RadixField>
          }
        >
          <Select data={frameworks} label="Framework" maw={W} placeholder="Pick one" variant="filled" />
        </Row>
        <Row
          label="groups"
          radix={
            <RadixField label="Country">
              <RT.Select.Root>
                <RT.Select.Trigger placeholder="Search countries" style={full} />
                <RT.Select.Content position="popper">
                  {countries.map((c, i) => (
                    <RT.Select.Group key={c.group}>
                      {i > 0 && <RT.Select.Separator />}
                      <RT.Select.Label>{c.group}</RT.Select.Label>
                      {c.items.map((item) => (
                        <RT.Select.Item key={item} value={item}>
                          {item}
                        </RT.Select.Item>
                      ))}
                    </RT.Select.Group>
                  ))}
                </RT.Select.Content>
              </RT.Select.Root>
            </RadixField>
          }
        >
          <Select
            clearable
            data={countries.map((c) => ({ group: c.group, items: c.items }))}
            label="Country"
            maw={W}
            placeholder="Search countries"
            searchable
          />
        </Row>
        <Row
          label="size xs / 1"
          radix={
            <RadixField label="Small" size="1">
              <RT.Select.Root size="1">
                <RT.Select.Trigger placeholder="Pick one" style={full} />
                {radixFrameworks}
              </RT.Select.Root>
            </RadixField>
          }
        >
          <Select data={frameworks} label="Small" maw={W} placeholder="Pick one" size="xs" />
        </Row>
        <Row
          label="size md / 3"
          radix={
            <RadixField label="Plan" size="3">
              <RT.Select.Root defaultValue="pro" size="3">
                <RT.Select.Trigger style={full} />
                <RT.Select.Content position="popper">
                  {planOptions.map((o) => (
                    <RT.Select.Item disabled={o.disabled} key={o.value} value={o.value}>
                      {o.label}
                    </RT.Select.Item>
                  ))}
                </RT.Select.Content>
              </RT.Select.Root>
            </RadixField>
          }
        >
          <Select data={planOptions} defaultValue="pro" label="Plan" maw={W} size="md" />
        </Row>
        <Row label="size lg">
          <Select data={planOptions} defaultValue="pro" label="Plan" maw={W} size="lg" />
        </Row>
        <Row
          label="disabled"
          radix={
            <RadixField label="Disabled">
              <RT.Select.Root disabled>
                <RT.Select.Trigger placeholder="Unavailable" style={full} />
                {radixFrameworks}
              </RT.Select.Root>
            </RadixField>
          }
        >
          <Select data={frameworks} disabled label="Disabled" maw={W} placeholder="Unavailable" />
        </Row>
        <Row
          label="error / color red"
          radix={
            <RadixField error="Choose a framework to continue" label="With error">
              <RT.Select.Root>
                <RT.Select.Trigger color="red" placeholder="Pick one" style={full} />
                {radixFrameworks}
              </RT.Select.Root>
            </RadixField>
          }
        >
          <Select data={frameworks} error="Choose a framework to continue" label="With error" maw={W} placeholder="Pick one" />
        </Row>
      </Demo>

      <Demo title="MultiSelect" description="Pick several values, shown as pills.">
        <Row label="searchable">
          <MultiSelect clearable data={frameworks} label="Frameworks" maw={W} onChange={setMulti} placeholder="Pick frameworks" searchable value={multi} />
        </Row>
        <Row label="disabled">
          <MultiSelect data={frameworks} disabled label="Disabled" maw={W} placeholder="Unavailable" />
        </Row>
        <Row label="error, size lg">
          <MultiSelect data={frameworks} error="Select at least two" label="With error" maw={W} placeholder="Pick frameworks" size="lg" />
        </Row>
        <Row label="hide picked, size xs">
          <MultiSelect data={frameworks} defaultValue={['Solid']} hidePickedOptions label="Hide picked" maw={W} maxValues={3} size="xs" />
        </Row>
      </Demo>

      <Demo title="Autocomplete" description="Free text input with suggestions.">
        <Row label="default">
          <Autocomplete data={frameworks} description="Suggestions appear as you type" label="Framework" maw={W} onChange={setAuto} placeholder="Start typing" value={auto} />
        </Row>
        <Row label="disabled">
          <Autocomplete data={frameworks} disabled label="Disabled" maw={W} placeholder="Unavailable" />
        </Row>
        <Row label="error, size lg">
          <Autocomplete data={frameworks} error="Unknown framework" label="With error" maw={W} size="lg" value="Reakt" />
        </Row>
      </Demo>

      <Demo title="TagsInput" description="Create and remove free-form tags.">
        <Row label="clearable">
          <TagsInput clearable description="Press Enter to add" label="Labels" maw={W} onChange={setTags} placeholder="Add a label" value={tags} />
        </Row>
        <Row label="suggestions">
          <TagsInput data={frameworks} label="With suggestions" maw={W} placeholder="Add a framework" />
        </Row>
        <Row label="disabled">
          <TagsInput disabled label="Disabled" maw={W} placeholder="Unavailable" value={['locked']} />
        </Row>
      </Demo>

      <Demo title="Cascader" description="Pick a path through nested options.">
        <Row label="clearable">
          <Cascader clearable data={regions} label="Region" maw={W} onChange={setPath} placeholder="Pick a data center" value={path} />
        </Row>
        <Row label="searchable">
          <Cascader data={regions} label="Searchable" maw={W} placeholder="Search regions" searchable />
        </Row>
        <Row label="disabled">
          <Cascader data={regions} disabled label="Disabled" maw={W} placeholder="Unavailable" />
        </Row>
      </Demo>

      <Demo title="TreeSelect" description="Select from a hierarchical tree in single, multiple or checkbox mode.">
        <Row label="single">
          <TreeSelect data={files} defaultExpandAll label="Single" maw={W} onChange={setTree} placeholder="Pick a file" value={tree} />
        </Row>
        <Row label="multiple">
          <TreeSelect data={files} defaultExpandAll label="Multiple" maw={W} mode="multiple" onChange={setTreeMulti} placeholder="Pick files" value={treeMulti} />
        </Row>
        <Row label="checkbox">
          <TreeSelect data={files} defaultExpandAll label="Checkbox" maw={W} mode="checkbox" placeholder="Check files" searchable withLines />
        </Row>
      </Demo>

      <Demo title="Mentions" description="Textarea that suggests teammates after an @ trigger.">
        <Row label="default">
          <Mentions
            description="Type @ to mention someone"
            label="Comment"
            maw={420}
            onChange={(payload) => setMention(payload.value)}
            placeholder="Write a comment"
            value={mention}
          >
            <Mentions.Mention data={team} markup="@[__display__](__id__)" trigger="@" />
          </Mentions>
        </Row>
      </Demo>

      <Demo title="Pill" description="Compact tag, standalone or grouped, with remove buttons.">
        <Row label="default">
          <Pill>Design</Pill>
        </Row>
        <Row label="removable">
          <Pill withRemoveButton>Removable</Pill>
        </Row>
        <Row label="disabled">
          <Pill disabled withRemoveButton>
            Disabled
          </Pill>
        </Row>
        <Row label="size lg">
          <Pill size="lg">Large</Pill>
        </Row>
        <Row label="group">
          <Pill.Group>
            {pills.map((pill) => (
              <Pill key={pill} onRemove={() => setPills((prev) => prev.filter((p) => p !== pill))} withRemoveButton>
                {pill}
              </Pill>
            ))}
          </Pill.Group>
        </Row>
      </Demo>

      <Demo title="PillsInput" description="Input that hosts pills, building block for tag-style fields.">
        <Row label="default">
          <PillsInput description="Type and press Enter" label="Skills" maw={420}>
            <Pill.Group>
              {pills.map((pill) => (
                <Pill key={pill} onRemove={() => setPills((prev) => prev.filter((p) => p !== pill))} withRemoveButton>
                  {pill}
                </Pill>
              ))}
              <PillsInput.Field
                onChange={(event) => setPillsInput(event.currentTarget.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && pillsInput.trim()) {
                    event.preventDefault()
                    setPills((prev) => [...prev, pillsInput.trim()])
                    setPillsInput('')
                  }
                }}
                placeholder="Add a skill"
                value={pillsInput}
              />
            </Pill.Group>
          </PillsInput>
        </Row>
        <Row label="disabled">
          <PillsInput disabled label="Disabled" maw={420}>
            <Pill.Group>
              <Pill>Locked</Pill>
              <PillsInput.Field placeholder="Unavailable" />
            </Pill.Group>
          </PillsInput>
        </Row>
      </Demo>

      <Demo title="Combobox" description="Custom picker built from useCombobox with a button trigger and search.">
        <Row label="button trigger">
          <CustomCombobox />
        </Row>
      </Demo>
    </Section>
  )
}
