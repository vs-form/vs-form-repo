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
    '@material-ui/core/styles',
    '@material-ui/core/Typography',
    '@material-ui/core/TextField',
    '@material-ui/core/Paper',
    '@material-ui/core/Chip',
    '@material-ui/core/MenuItem',
    '@material-ui/core/styles/colorManipulator',
  ],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true
    }),
  ],
}