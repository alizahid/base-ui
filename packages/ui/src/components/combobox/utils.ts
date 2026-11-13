// what to show for an item: its `label` if it is an object with one
export function itemLabel(item: unknown) {
  return typeof item === 'object' && item !== null && 'label' in item
    ? String(item.label)
    : String(item)
}
