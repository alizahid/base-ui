import {
  AlertDialog,
  Avatar,
  Badge,
  BaseProvider,
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  Combobox,
  Dialog,
  Field,
  IconButton,
  Menu,
  NumberField,
  OTPField,
  Popover,
  PreviewCard,
  Progress,
  Radio,
  RadioGroup,
  ScrollArea,
  Select,
  Slider,
  Spinner,
  Switch,
  Tabs,
  TextArea,
  TextField,
  Tooltip,
} from '@repo/ui'
import { cn } from 'cn'
// biome-ignore lint/correctness/noUndeclaredDependencies: types-only module from @types/mdx
import { type MDXComponents } from 'mdx/types'
import { type ComponentProps } from 'react'

import { AsyncCombobox, CollapsedCombobox } from './components/demos/combobox'
import { CollapsedSelect } from './components/demos/select'
import { ToastDemo, ToastPromiseDemo } from './components/demos/toast'

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
    <h1 className="mb-4 text-4xl font-bold text-(--accent-11)" {...props} />
  ),
  h2: (props) => <h2 className="mt-10 mb-4 text-2xl font-bold" {...props} />,
  h3: (props) => <h3 className="mt-8 text-lg font-bold" {...props} />,
  IconButton,
  NumberField,
  OTPField,
  Radio,
  ScrollArea,
  Slider,
  Spinner,
  Switch,
  ToastDemo,
  ToastPromiseDemo,
  Tooltip,
}

export function useMDXComponents(): MDXComponents {
  // nested components don't fit the MDXComponents index signature
  return {
    ...components,
    AlertDialog: {
      Action: AlertDialog.Action,
      Cancel: AlertDialog.Cancel,
      Content: AlertDialog.Content,
      Description: AlertDialog.Description,
      Root: AlertDialog.Root,
      Title: AlertDialog.Title,
      Trigger: AlertDialog.Trigger,
    },
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
    Menu,
    Popover,
    PreviewCard,
    Progress,
    RadioGroup: {
      Item: RadioGroup.Item,
      Root: RadioGroup.Root,
    },
    Select: {
      Content: Select.Content,
      Group: Select.Group,
      Item: Select.Item,
      Label: Select.Label,
      Root: Select.Root,
      Separator: Select.Separator,
      Trigger: Select.Trigger,
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
  } as unknown as MDXComponents
}
