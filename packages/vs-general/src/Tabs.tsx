import * as React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { addStyles } from './addStyle'

import Icon from './Icon'

export interface ITabProp {
  label: string,
  control: any,
  icon?: string,
}

export interface ITabPropList extends Array<ITabProp> { }

export interface ITabsProps {
  tabs: ITabPropList,
  activeTab?: number,
  tabProps?: any,
  classes?: any
}

export interface ITabsState {
  activeTab: number
}

const styles = {
  tabIcon: {
    fontSize: '2em',
    paddingRight: '5px',
    paddingBottom: '35px'
  }
}

class TabsVs extends React.Component<ITabsProps, ITabsState> {
  constructor(props: ITabsProps) {
    super(props)
    const activeTab = props.activeTab || 0
    this.state = {
      activeTab
    }
  }

  public handleChange = (_event: any, value: number) => {
    this.setState({ activeTab: value })
  }

  public getTabs = () => {
    return this.props.tabs.map((t) => {
      return <Tab key={t.label} label={t.label} icon={<Icon icon={t.icon!} className={this.props.classes.tabIcon} color="primary" />} />
    })
  }

  public getComponent = () => {
    let c = null
    if (this.props.tabs.length > this.state.activeTab) {
      c = this.props.tabs[this.state.activeTab].control
    }
    return c
  }

  public render() {
    return (
      <React.Fragment>
        <AppBar position="static" color="default">
          <Tabs value={this.state.activeTab} onChange={this.handleChange}>
            {this.getTabs()}
          </Tabs>
        </AppBar>
        {this.getComponent()}
      </React.Fragment>
    )
  }

}

export default addStyles(TabsVs, styles)