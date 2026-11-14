// remark plugin: gives every <Example> its own contents as a `code` prop, so
// it can show the source next to the preview
export default function source() {
  return (tree, file) => {
    for (const node of tree.children) {
      const first = node.children?.[0]
      const last = node.children?.at(-1)

      if (
        node.type !== 'mdxJsxFlowElement' ||
        node.name !== 'Example' ||
        !first?.position ||
        !last?.position
      ) {
        continue
      }

      // the first line starts at its tag; the rest carry its indentation
      const indent = `\n${' '.repeat(first.position.start.column - 1)}`

      node.attributes.push({
        name: 'code',
        type: 'mdxJsxAttribute',
        value: String(file)
          .slice(first.position.start.offset, last.position.end.offset)
          .replaceAll(indent, '\n'),
      })
    }
  }
}
