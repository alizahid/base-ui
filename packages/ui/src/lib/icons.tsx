import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

// from radix icons (radix-ui.com/icons), with their names. the paths are
// copied in rather than adding the package as a dependency. drawn on a 15x15
// grid. internal: not exported from the package. size them with a className;
// standalone ones are 1lh, as tall as a line of the text beside them

type Props = ComponentProps<'svg'>

// the two sizes the library's own icons come in
export const icon = stylex.create({
  // as tall as a line of the text beside it
  line: {
    height: '1lh',
    width: '1lh',
  },
  // a step smaller: chevrons, clear buttons and the checks in lists
  small: {
    height: 'calc(1lh - var(--spacing))',
    width: 'calc(1lh - var(--spacing))',
  },
})

function Icon(props: Props) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 15 15"
      {...props}
    />
  )
}

export function CheckIcon(props: Props) {
  return (
    <Icon {...props}>
      <path d="M10.6015 3.90815C10.7903 3.61941 11.1779 3.53792 11.4667 3.72651C11.7555 3.91533 11.837 4.30288 11.6484 4.59175L7.39837 11.0917C7.29822 11.2449 7.13558 11.3469 6.95404 11.3701C6.77251 11.3932 6.58945 11.3359 6.45404 11.2128L3.70404 8.71284L3.62005 8.61811C3.44857 8.38342 3.4589 8.05252 3.66205 7.82905C3.86511 7.60576 4.19344 7.56371 4.4433 7.71186L4.54584 7.78706L6.75287 9.79292L10.6015 3.90815Z" />
    </Icon>
  )
}

export function ChevronDownIcon(props: Props) {
  return (
    <Icon {...props}>
      <path d="M11.1581 6.13499C11.3595 5.94644 11.6763 5.95708 11.8651 6.15843C12.0536 6.3599 12.043 6.67669 11.8416 6.86546L7.84165 10.6155C7.64941 10.7954 7.35029 10.7954 7.15805 10.6155L3.15805 6.86546L3.09165 6.78831C2.95746 6.59859 2.96967 6.33468 3.13461 6.15843C3.29985 5.98217 3.56347 5.95169 3.76157 6.07347L3.84165 6.13499L7.49985 9.5637L11.1581 6.13499Z" />
    </Icon>
  )
}

export function ChevronRightIcon(props: Props) {
  return (
    <Icon {...props}>
      <path d="M6.15879 11.8651C6.36026 12.0536 6.67706 12.043 6.86582 11.8416L10.6158 7.84162C10.7957 7.64939 10.7957 7.35026 10.6158 7.15803L6.86582 3.15803L6.78868 3.09162C6.59895 2.95743 6.33504 2.96965 6.15879 3.13459C5.98254 3.29983 5.95206 3.56345 6.07383 3.76155L6.13535 3.84162L9.56407 7.49983L6.13535 11.158C5.94681 11.3595 5.95745 11.6763 6.15879 11.8651Z" />
    </Icon>
  )
}

export function Cross2Icon(props: Props) {
  return (
    <Icon {...props}>
      <path d="M10.9688 3.21871C11.1933 2.99416 11.5567 2.99416 11.7813 3.21871C12.0056 3.44328 12.0057 3.80673 11.7813 4.03121L8.31251 7.49996L11.7813 10.9687L11.8555 11.0586C12.0026 11.2817 11.9777 11.5848 11.7813 11.7812C11.5849 11.9776 11.2818 12.0026 11.0586 11.8554L10.9688 11.7812L7.50001 8.31246L4.03126 11.7812C3.80677 12.0057 3.44332 12.0056 3.21876 11.7812C2.99421 11.5567 2.99421 11.1933 3.21876 10.9687L6.68751 7.49996L3.21876 4.03121L3.14454 3.94137C2.99723 3.71819 3.0223 3.41517 3.21876 3.21871C3.41522 3.02225 3.71823 2.99719 3.94141 3.14449L4.03126 3.21871L7.50001 6.68746L10.9688 3.21871Z" />
    </Icon>
  )
}

export function MinusIcon(props: Props) {
  return (
    <Icon {...props}>
      <path d="M12.25 7C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25Z" />
    </Icon>
  )
}

export function PlusIcon(props: Props) {
  return (
    <Icon {...props}>
      <path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" />
    </Icon>
  )
}
