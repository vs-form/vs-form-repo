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
    '@material-ui/lab/Slider',
    '@material-ui/lab/SpeedDial',
    '@material-ui/lab/SpeedDialIcon',
    '@material-ui/lab/SpeedDialAction',
  ],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true
    }),
  ],
}