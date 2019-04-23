import { withStyles } from '@material-ui/core/styles'

export const addStyles = (component: any, styles: any): any => {
  // const s = createStyles(styles)
  return withStyles(styles)(component)
}
