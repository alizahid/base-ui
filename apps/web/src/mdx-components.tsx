import {
  Accordion,
  AlertDialog,
  Autocomplete,
  Avatar,
  Badge,
  BaseProvider,
  Button,
  Callout,
  Card,
  Checkbox,
  CheckboxGroup,
  Combobox,
  CommandBar,
  DataList,
  Dialog,
  Drawer,
  Field,
  FileField,
  IconButton,
  Inset,
  Kbd,
  KbdGroup,
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
  Slot,
  Spinner,
  Switch,
  Table,
  TabNav,
  Tabs,
  TextArea,
  TextField,
  Toolbar,
  Tooltip,
} from 'basedkit'
import { DateField } from 'basedkit/date-field'
import { PhoneField } from 'basedkit/phone-field'
// biome-ignore lint/correctness/noUndeclaredDependencies: types-only module from @types/mdx
import { type MDXComponents } from 'mdx/types'

import { AsyncCombobox, CollapsedCombobox } from './components/demos/combobox'
import { CommandBarDemo } from './components/demos/command-bar'
import { PhoneFieldDemo } from './components/demos/phone-field'
import { CollapsedSelect } from './components/demos/select'
import { ToastDemo, ToastPromiseDemo } from './components/demos/toast'
import { UseCopyDemo } from './components/demos/use-copy'
import { UseLocalStateDemo } from './components/demos/use-local-state'
import { Example } from './components/example'
import { Pre } from './components/pre'
import { Props } from './components/props'
import { Source } from './components/source'
import { Text } from './components/text'

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
  CommandBarDemo,
  Example,
  Field,
  FileField,
  h1: (props) => (
    <div className="mb-4 flex flex-col items-start gap-2 md:flex-row md:justify-between">
      <h1 className="text-4xl font-bold text-(--accent-11)" {...props} />

      <Source>
        <Text id="common.view-as-markdown" />
      </Source>
    </div>
  ),
  h2: (props) => <h2 className="mt-10 mb-4 text-2xl font-bold" {...props} />,
  h3: (props) => <h3 className="mt-8 text-lg font-bold" {...props} />,
  IconButton,
  Inset,
  Kbd,
  KbdGroup,
  Link,
  NumberField,
  OTPField,
  PhoneField,
  PhoneFieldDemo,
  Props,
  pre: Pre,
  Radio,
  ScrollArea,
  Separator,
  Skeleton,
  Slider,
  Slot,
  Spinner,
  Switch,
  Text,
  ToastDemo,
  ToastPromiseDemo,
  Tooltip,
  UseCopyDemo,
  UseLocalStateDemo,
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
    Autocomplete,
    Callout,
    CheckboxGroup: {
      Item: CheckboxGroup.Item,
      Root: CheckboxGroup.Root,
    },
    Combobox,
    CommandBar: {
      Items: CommandBar.Items,
      Root: CommandBar.Root,
      Trigger: CommandBar.Trigger,
    },
    DataList,
    DateField,
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
    TabNav: {
      Link: TabNav.Link,
      Root: TabNav.Root,
    },
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
