import * as React from 'react'
// import classNames from 'classnames'
import SpeedDial, { SpeedDialProps } from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'

import { ItemProps, types, BaseIcon } from '@vs-form/vs-form'

export const styles = {
  actionIcon: {
    fontSize: '1.5em'
  }
}

export interface ISpeedDialState {
  open: boolean
}

export default class VsSpeedDial extends React.Component<ItemProps, ISpeedDialState> {
  private get comp(): types.IComponentSpeediDial { return this.props.comp as types.IComponentSpeediDial }
  private SpeedDialProps: types.ISpeedDialProps = {}
  constructor(props: ItemProps) {
    super(props)
    this.initProps()
    this.state = {
      open: false
    }
  }

  public render() {
    const { SpeedDialActionProps, ...other } = this.SpeedDialProps
    return (
      <SpeedDial {...other as SpeedDialProps} open={this.state.open} onClick={this.handleClick}>
        {this.getActions()}
      </SpeedDial>
    )
  }

  private getActions = () => {
    const params = this.props.schemaManager.getComponentEventParams(this.comp)
    return this.comp.actions.map((item: types.ISpeedDialAction) => {
      return (
        <SpeedDialAction
          key={item.id || item.icon}
          icon={<BaseIcon icon={item.icon} className={this.props.classes.actionIcon} />}
          tooltipTitle={item.tooltip}
          onClick={this.handleActionClick(item, params)}
          {...this.SpeedDialProps.SpeedDialActionProps}
        />
      )
    })
  }

  private handleClick = () => {
    this.setState({ open: !this.state.open })
  }

  private handleActionClick = (item: types.ISpeedDialAction, params: types.IComponentEventParams) => () => {
    if (item.onClick) {
      item.onClick(params)
    }
    this.setState({ open: false })
  }

  private initProps() {

    this.SpeedDialProps = this.comp.props!
    if (!this.SpeedDialProps.ariaLabel) {
      this.SpeedDialProps.ariaLabel = this.comp.id!
    }
    if (!this.SpeedDialProps.icon) {
      this.SpeedDialProps.icon = <SpeedDialIcon />
    }
  }

}
