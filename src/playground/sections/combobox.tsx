import {
  Autocomplete,
  Button,
  Cascader,
  Combobox,
  Group,
  Mentions,
  MultiSelect,
  Pill,
  PillsInput,
  Select,
  SimpleGrid,
  Stack,
  TagsInput,
  TreeSelect,
  useCombobox,
} from '@mantine/core'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

import { Demo, Section } from '../demo'

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
      <Demo title="Select" description="Single choice from a list, with search, groups and disabled options.">
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <Select data={frameworks} description="Used for new projects" label="Framework" onChange={setSelect} placeholder="Pick one" value={select} />
          <Select
            clearable
            data={countries.map((c) => ({ group: c.group, items: c.items }))}
            label="Country"
            placeholder="Search countries"
            searchable
          />
          <Select
            data={[{ value: 'free', label: 'Free' }, { value: 'pro', label: 'Pro' }, { value: 'ent', label: 'Enterprise', disabled: true }]}
            defaultValue="pro"
            label="Plan"
            size="lg"
          />
          <Select data={frameworks} disabled label="Disabled" placeholder="Unavailable" />
          <Select data={frameworks} error="Choose a framework to continue" label="With error" placeholder="Pick one" />
          <Select data={frameworks} label="Small" placeholder="Pick one" size="xs" />
        </SimpleGrid>
      </Demo>

      <Demo title="MultiSelect" description="Pick several values, shown as pills.">
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <MultiSelect clearable data={frameworks} label="Frameworks" onChange={setMulti} placeholder="Pick frameworks" searchable value={multi} />
          <MultiSelect data={frameworks} disabled label="Disabled" placeholder="Unavailable" />
          <MultiSelect data={frameworks} error="Select at least two" label="With error" placeholder="Pick frameworks" size="lg" />
          <MultiSelect data={frameworks} defaultValue={['Solid']} hidePickedOptions label="Hide picked" maxValues={3} size="xs" />
        </SimpleGrid>
      </Demo>

      <Demo title="Autocomplete" description="Free text input with suggestions.">
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <Autocomplete data={frameworks} description="Suggestions appear as you type" label="Framework" onChange={setAuto} placeholder="Start typing" value={auto} />
          <Autocomplete data={frameworks} disabled label="Disabled" placeholder="Unavailable" />
          <Autocomplete data={frameworks} error="Unknown framework" label="With error" size="lg" value="Reakt" />
        </SimpleGrid>
      </Demo>

      <Demo title="TagsInput" description="Create and remove free-form tags.">
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <TagsInput clearable description="Press Enter to add" label="Labels" onChange={setTags} placeholder="Add a label" value={tags} />
          <TagsInput data={frameworks} label="With suggestions" placeholder="Add a framework" />
          <TagsInput disabled label="Disabled" placeholder="Unavailable" value={['locked']} />
        </SimpleGrid>
      </Demo>

      <Demo title="Cascader" description="Pick a path through nested options.">
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <Cascader clearable data={regions} label="Region" onChange={setPath} placeholder="Pick a data center" value={path} />
          <Cascader data={regions} label="Searchable" placeholder="Search regions" searchable />
          <Cascader data={regions} disabled label="Disabled" placeholder="Unavailable" />
        </SimpleGrid>
      </Demo>

      <Demo title="TreeSelect" description="Select from a hierarchical tree in single, multiple or checkbox mode.">
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <TreeSelect data={files} defaultExpandAll label="Single" onChange={setTree} placeholder="Pick a file" value={tree} />
          <TreeSelect data={files} defaultExpandAll label="Multiple" mode="multiple" onChange={setTreeMulti} placeholder="Pick files" value={treeMulti} />
          <TreeSelect data={files} defaultExpandAll label="Checkbox" mode="checkbox" placeholder="Check files" searchable withLines />
        </SimpleGrid>
      </Demo>

      <Demo title="Mentions" description="Textarea that suggests teammates after an @ trigger.">
        <Stack maw={420}>
          <Mentions
            description="Type @ to mention someone"
            label="Comment"
            onChange={(payload) => setMention(payload.value)}
            placeholder="Write a comment"
            value={mention}
          >
            <Mentions.Mention data={team} markup="@[__display__](__id__)" trigger="@" />
          </Mentions>
        </Stack>
      </Demo>

      <Demo title="Pill" description="Compact tag, standalone or grouped, with remove buttons.">
        <Stack>
          <Group>
            <Pill>Design</Pill>
            <Pill withRemoveButton>Removable</Pill>
            <Pill disabled withRemoveButton>
              Disabled
            </Pill>
            <Pill size="lg">Large</Pill>
          </Group>
          <Pill.Group>
            {pills.map((pill) => (
              <Pill key={pill} onRemove={() => setPills((prev) => prev.filter((p) => p !== pill))} withRemoveButton>
                {pill}
              </Pill>
            ))}
          </Pill.Group>
        </Stack>
      </Demo>

      <Demo title="PillsInput" description="Input that hosts pills, building block for tag-style fields.">
        <Stack maw={420}>
          <PillsInput description="Type and press Enter" label="Skills">
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
          <PillsInput disabled label="Disabled">
            <Pill.Group>
              <Pill>Locked</Pill>
              <PillsInput.Field placeholder="Unavailable" />
            </Pill.Group>
          </PillsInput>
        </Stack>
      </Demo>

      <Demo title="Combobox" description="Custom picker built from useCombobox with a button trigger and search.">
        <CustomCombobox />
      </Demo>
    </Section>
  )
}
