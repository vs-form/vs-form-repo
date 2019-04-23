import * as React from 'react'
import AppBar, { AppBarProps as MuiAppBarProps } from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab, { TabProps as MuiTabProps } from '@material-ui/core/Tab'
import Paper, { PaperProps as MuiPaperProps } from '@material-ui/core/Paper'
import { isUndefined } from '../../schemaManager/lodash'
import { IconProps as MuiIconProps } from '@material-ui/core/Icon'
import classNames from 'classnames'

import Item from '../../baseComponents/Item'
import { getIcon } from '../../baseComponents/BaseComponent'

import * as types from '../../schemaManager/types'
import { ItemProps } from '../../common/propTypes'

export const styles = {
  tabIcon: {
    fontSize: '2em',
    paddingRight: '5px',
    paddingBottom: '35px'
  }
}

export interface ITabsState {
  activeTab: number
}

export default class VsTabs extends React.Component<ItemProps, ITabsState> {
  private get comp(): types.IComponentTabs { return this.props.comp as types.IComponentTabs }
  private PaperProps: MuiPaperProps = {}
  private AppBarProps: MuiAppBarProps = {}
  private TabsProps: any = {}
  private TabProps: MuiTabProps = {}
  private IconProps: MuiIconProps = {}
  private componentEventParams: types.IComponentEventParams = this.props.schemaManager.getComponentEventParams(this.props.comp)

  constructor(props: ItemProps) {
    super(props)
    this.initProps()
    if (isUndefined(this.comp.activeTab)) {
      this.comp.activeTab = 0
    }
    const activeTab = this.comp.activeTab || 0
    this.state = {
      activeTab
    }
  }

  public handleChange = (_event: any, value: number) => {
    let canChange = true
    const params = { ...this.componentEventParams, newTab: value }
    if (this.comp.onBeforeChange) {
      const p = { ...params, canChange: true }
      this.comp.onBeforeChange(p)
      canChange = p.canChange
    }
    if (canChange) {
      this.setState({ activeTab: value })
      this.props.schemaManager.changeActiveTab(this.comp, value, this.props.designMode!)
      if (this.comp.onChange) {
        this.comp.onChange(params)
      }
    }
  }

  public getTabs = () => {
    const list = this.comp.tabs.filter((key: string) => {
      const comp = this.props.schema.components[key]
      return comp && !comp.hidden
    }).map((key: string) => this.props.schema.components[key])
    if (list.length === 0) {
      return null
    }

    const compList: any[] = []

    list.forEach((t: types.IComponent) => {
      const { comp, ...other } = this.props

      const c = t as types.IComponentTab
      const Icon = getIcon({ comp: c, ...other })
      const entry: any = (
        <Tab key={c.id!} label={c.label} icon={Icon && <Icon {...this.IconProps} />} {...this.TabProps} />
      )
      compList.push(entry)
    })
    return compList
  }

  public getComponent = () => {
    let c = null
    if (this.comp.tabs.length > this.state.activeTab) {
      const tab = this.comp.tabs[this.state.activeTab]
      const { classes, ...other } = this.props
      c = <Item {...other} node={tab} comp={this.props.schema.components[tab]} />
    }
    return c
  }

  public render() {
    return (
      <Paper {...this.PaperProps}>
        <AppBar {...this.AppBarProps}>
          <Tabs value={this.state.activeTab} onChange={this.handleChange} {...this.TabsProps}>
            {this.getTabs()}
          </Tabs>
        </AppBar>
        {this.getComponent()}
      </Paper>
    )
  }

  private initProps() {

    const { AppBarProps, TabsProps, TabProps, IconProps, ...PaperProps } = this.comp.props!
    if (PaperProps) { this.PaperProps = PaperProps }
    if (AppBarProps) { this.AppBarProps = AppBarProps }
    if (TabsProps) { this.TabsProps = TabsProps }
    if (TabProps) { this.TabProps = TabProps }
    if (IconProps) { this.IconProps = IconProps }
    this.IconProps.className = classNames(this.IconProps.className, this.props.classes.tabIcon)
    if (isUndefined(this.AppBarProps.position)) {
      this.AppBarProps.position = 'static'
    }
    if (isUndefined(this.AppBarProps.color)) {
      this.AppBarProps.color = 'default'
    }
    // if (isUndefined(this.TabsProps.activeTab)) {
    //   this.TabsProps.activeTab = 0
    // }
  }

}
