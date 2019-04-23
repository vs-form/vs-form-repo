import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'cjs',
    },
    {
      dir: 'dist/es',
      format: 'es',
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true
    }),
  ],
}