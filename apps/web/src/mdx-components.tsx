import {
  Accordion,
  AlertDialog,
  Avatar,
  Badge,
  BaseProvider,
  Button,
  Callout,
  Card,
  Checkbox,
  CheckboxGroup,
  Combobox,
  Dialog,
  Drawer,
  Field,
  IconButton,
  Link,
  Menu,
  NavigationMenu,
  NumberField,
  OTPField,
  Popover,
  PreviewCard,
  Progress,
  Radio,
  RadioGroup,
  ScrollArea,
  SegmentedControl,
  Select,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Table,
  Tabs,
  TextArea,
  TextField,
  Toolbar,
  Tooltip,
} from '@repo/ui'
import { cn } from 'cn'
// biome-ignore lint/correctness/noUndeclaredDependencies: types-only module from @types/mdx
import { type MDXComponents } from 'mdx/types'
import { type ComponentProps } from 'react'

import { AsyncCombobox, CollapsedCombobox } from './components/demos/combobox'
import { CollapsedSelect } from './components/demos/select'
import { ToastDemo, ToastPromiseDemo } from './components/demos/toast'
import { Source } from './components/source'
import { Text } from './components/text'

type ExampleProps = ComponentProps<'div'> & {
  orientation?: 'horizontal' | 'vertical'
}

// vertical stacks larger components instead of wrapping them
function Example({ orientation = 'horizontal', ...props }: ExampleProps) {
  return (
    <div
      className={cn(
        'mt-4 flex min-h-32 items-center justify-center gap-4 border border-(--gray-a6) p-6',
        orientation === 'vertical' ? 'flex-col' : 'flex-wrap',
      )}
      {...props}
    />
  )
}

const components: MDXComponents = {
  AsyncCombobox,
  Avatar,
  Badge,
  BaseProvider,
  Button,
  Card,
  Checkbox,
  CollapsedCombobox,
  CollapsedSelect,
  Example,
  Field,
  h1: (props) => (
    <div className="mb-4 flex flex-col items-start gap-2">
      <h1 className="text-4xl font-bold text-(--accent-11)" {...props} />

      <Source>
        <Text id="common.view-as-markdown" />
      </Source>
    </div>
  ),
  h2: (props) => <h2 className="mt-10 mb-4 text-2xl font-bold" {...props} />,
  h3: (props) => <h3 className="mt-8 text-lg font-bold" {...props} />,
  IconButton,
  Link,
  NumberField,
  OTPField,
  Radio,
  ScrollArea,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Text,
  ToastDemo,
  ToastPromiseDemo,
  Tooltip,
}

export function useMDXComponents(): MDXComponents {
  // nested components don't fit the MDXComponents index signature
  return {
    ...components,
    Accordion,
    AlertDialog: {
      Action: AlertDialog.Action,
      Cancel: AlertDialog.Cancel,
      Content: AlertDialog.Content,
      Description: AlertDialog.Description,
      Root: AlertDialog.Root,
      Title: AlertDialog.Title,
      Trigger: AlertDialog.Trigger,
    },
    Callout,
    CheckboxGroup: {
      Item: CheckboxGroup.Item,
      Root: CheckboxGroup.Root,
    },
    Combobox,
    Dialog: {
      Close: Dialog.Close,
      Content: Dialog.Content,
      Description: Dialog.Description,
      Root: Dialog.Root,
      Title: Dialog.Title,
      Trigger: Dialog.Trigger,
    },
    Drawer: {
      Close: Drawer.Close,
      Content: Drawer.Content,
      Description: Drawer.Description,
      Root: Drawer.Root,
      Title: Drawer.Title,
      Trigger: Drawer.Trigger,
    },
    Menu,
    NavigationMenu: {
      Content: NavigationMenu.Content,
      Item: NavigationMenu.Item,
      Link: NavigationMenu.Link,
      List: NavigationMenu.List,
      Root: NavigationMenu.Root,
      Trigger: NavigationMenu.Trigger,
    },
    Popover,
    PreviewCard,
    Progress,
    RadioGroup: {
      Item: RadioGroup.Item,
      Root: RadioGroup.Root,
    },
    SegmentedControl,
    Select: {
      Content: Select.Content,
      Group: Select.Group,
      Item: Select.Item,
      Label: Select.Label,
      Root: Select.Root,
      Separator: Select.Separator,
      Trigger: Select.Trigger,
    },
    Table,
    Tabs,
    TextArea: {
      Root: TextArea.Root,
      Slot: TextArea.Slot,
    },
    TextField: {
      Root: TextField.Root,
      Slot: TextField.Slot,
    },
    Toolbar: {
      Button: Toolbar.Button,
      Group: Toolbar.Group,
      Input: Toolbar.Input,
      Link: Toolbar.Link,
      Root: Toolbar.Root,
      Separator: Toolbar.Separator,
    },
  } as unknown as MDXComponents
}
