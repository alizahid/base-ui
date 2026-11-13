import stylex from '@stylexjs/unplugin'
import esbuild from 'esbuild'

/** @type {import('esbuild').BuildOptions} */
const options = {
  banner: {
    js: "'use client'",
  },
  bundle: true,
  entryPoints: ['src/index.ts'],
  external: ['react', 'cn'],
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
