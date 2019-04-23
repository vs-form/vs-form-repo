import * as React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles'
import classNames from 'classnames'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
// import Split from 'react-split'

import IconButton from './IconButton'

const mediaQueryMediumUp = window.matchMedia('(min-width: 960px)')

export const styles: any = (theme: Theme) => createStyles({
  'root': {
    flexGrow: 1,
    height: '100%',
    width: '100%',
    margin: 0,
  },
  'appFrame': {
    height: '100%',
    margin: 0,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  'appBar': {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'appBarShift': {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
  },
  'menuButton': {
    marginLeft: 12,
    marginRight: 20,
  },
  'hide': {
    display: 'none',
  },
  'drawerPaper': {
    position: 'relative',
  },
  'drawerHeader': {
    display: 'flex',
    padding: '0 8px',
    alignItems: 'center',
    ...theme.mixins.toolbar,
  },
  'drawerHeaderBody': {
    height: '100%',
  },
  'drawerHeaderMenu': {
  },
  'drawerHeaderClose': {
    marginLeft: 'auto'
  },
  'content': {
    height: '100%',
    width: '100%',
    margin: 0,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: '10px',  // theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'contentShift': {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0
  },
})

export interface IToolbarProps extends WithStyles<typeof styles> {
  sidebar: {
    menu?: any,
    comp: any,
  },
  toolbarMenu?: any,
  drawerWidth?: number,
  classes: any
}

// export type PropsWithStyles = IToolbarProps & WithStyles<keyof ReturnType<typeof styles>>

const PersistentDrawer: any = withStyles(styles)(
  class extends React.Component<IToolbarProps> {
    public static defaultProps: Partial<IToolbarProps> = {
      drawerWidth: 350
    }

    public state = {
      open: mediaQueryMediumUp.matches
    }

    public handleDrawerOpen = () => {
      this.setState({ open: true })
    }

    public handleDrawerClose = () => {
      this.setState({ open: false })
    }

    public drawer = () => {
      const { classes, sidebar } = this.props
      return (
        <Drawer
          variant="persistent"
          anchor="left"
          open={this.state.open}
          style={{ width: this.props.drawerWidth }}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            {sidebar.menu}
            <IconButton className={classes.drawerHeaderClose} onClick={this.handleDrawerClose} icon="close" />
          </div>
          {sidebar.comp}
        </Drawer >
      )
    }

    public render() {
      const { classes, toolbarMenu, children } = this.props
      const { open } = this.state

      return (
        <React.Fragment>
          <CssBaseline />
          <div className={classes.root}>
            <div className={classes.appFrame}>
              <AppBar
                style={open ? { width: `calc(100% - ${this.props.drawerWidth}px)` } : { marginLeft: this.props.drawerWidth }}
                className={classNames(classes.appBar, {
                  [classes.appBarShift]: open,
                  [classes[`appBarShift-left`]]: open,
                })}
              >
                <Toolbar disableGutters={!open}>
                  <IconButton icon="menu" color="inherit" aria-label="open drawer" onClick={this.handleDrawerOpen} className={classNames(classes.menuButton, open && classes.hide)} />
                  {toolbarMenu}
                </Toolbar>
              </AppBar>
              {this.drawer()}
              <main
                style={!open ? { marginLeft: -this.props.drawerWidth! } : {}}
                className={classNames(classes.content, {
                  [classes.contentShift]: open,
                })}
              >
                <div className={classes.drawerHeader} />
                {children}
              </main>
            </div>
          </div>
        </React.Fragment>
      )
    }
  })

export default PersistentDrawer