import createMDX from '@next/mdx'
import createNextIntlPlugin from 'next-intl/plugin'

const withMDX = createMDX()
const withNextIntl = createNextIntlPlugin('./src/intl/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {}

export default withNextIntl(withMDX(nextConfig))
