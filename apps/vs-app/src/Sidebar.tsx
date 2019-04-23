import * as React from 'react'
// import { withStyles } from '@material-ui/core/styles'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { types } from '@vs-form/vs-form'
import { VsIcon, VsText } from '@vs-form/vs-general'

// const styles = {
//   listItemNormal: {
//     fontWeight: 'normal'
//   },
//   listItemSelected: {
//     fontWeight: 'bold'
//   }
// }

// const addStyles = (component: any, styles1: any): any => {
//   // const s = createStyles(styles)
//   return withStyles(styles1)(component)
// }

export interface ISidebarProps {
  schemaListCategories: any,
  onSchemaClick: any,
  selectedSchema?: string,
  classes?: any
}

export default class Sidebar extends React.Component<ISidebarProps> {
  constructor(props: ISidebarProps) {
    super(props)
  }

  public render() {
    return (
      <React.Fragment>
        {this.props.schemaListCategories.map((p: any) => this.panel(p))}
      </React.Fragment>
    )
  }

  public clickSchema = (schema: types.ISchemaDesign) => () => {
    this.props.onSchemaClick(schema)
  }
  public listItem = (item: types.ISchemaDesign) => {
    return (
      <ListItem selected={item.name === this.props.selectedSchema} button={true} onClick={this.clickSchema(item)} key={item.name}>
        <ListItemText primary={item.label} />
      </ListItem>
    )
  }

  public panel = (p: any) => {
    return (
      <div style={{ width: '100%' }} key={p.title}>
        <ExpansionPanel style={{ width: '100%' }} defaultExpanded={p.expanded}>
          <ExpansionPanelSummary expandIcon={<VsIcon icon='chevron-down' />}>
            <VsText text={p.title} />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ padding: '10px' }}>
            <List style={{ width: '100%' }}>
              {p.list.map((item: any) => this.listItem(item))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div >
    )
  }
}
