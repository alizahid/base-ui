import stylex from '@stylexjs/unplugin'
import esbuild from 'esbuild'

/** @type {import('esbuild').BuildOptions} */
const options = {
  // unbundled, so each file keeps its own 'use client' and namespaces
  // like TextField.Root can be used from server components
  entryPoints: ['src/**/*.ts', 'src/**/*.tsx'],
  format: 'esm',
  metafile: true,
  outdir: 'dist',
  plugins: [
    stylex.esbuild({
      importSources: ['@stylexjs/stylex'],
      useCSSLayers: true,
    }),
  ],
  target: 'es2020',
}

if (process.argv.includes('--watch')) {
  const ctx = await esbuild.context(options)

  await ctx.watch()
} else {
  await esbuild.build(options)
}
