import { fileURLToPath } from 'node:url'

import createMDX from '@next/mdx'
import createNextIntlPlugin from 'next-intl/plugin'

const withMDX = createMDX({
  options: {
    // a path, not an import: turbopack needs plugins it can serialize. it is
    // resolved from each MDX file's folder, so it has to be absolute
    remarkPlugins: [
      fileURLToPath(new URL('./src/mdx/source.js', import.meta.url)),
    ],
  },
})
const withNextIntl = createNextIntlPlugin('./src/intl/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
}

export default withNextIntl(withMDX(nextConfig))
