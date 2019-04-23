import * as React from 'react'
import { ItemProps, types } from '@vs-form/vs-form'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import { IconSVG } from '@vs-form/vs-general'
const icon = 'M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z'

export interface IAction {
  id: string,
  icon: string,
  tooltip: string,
  onClick: any
}

export interface ISpeedDialState {
  open: boolean
}

export const styles = {
  actionIcon: {
    fontSize: '1.5em'
  }
}

export default class VsSpeedDial extends React.Component<ItemProps, ISpeedDialState> {
  constructor(props: ItemProps) {
    super(props)
    this.state = {
      open: false
    }
  }

  public render() {
    const comp = this.props.comp as types.IComponentCustom
    return (
      <SpeedDial {...comp.props} icon={<IconSVG svg={icon} />} direction={comp.direction || 'left'} ariaLabel={comp.id} open={this.state.open} onClick={this.handleClick}>
        {this.getActions()}
      </SpeedDial>
    )
  }

  private getActions = () => {
    const comp = this.props.comp as types.IComponentCustom
    const actions = comp.actions as IAction[]
    const params = this.props.schemaManager.getComponentEventParams(comp)
    return actions.map((item) => {
      return (
        <SpeedDialAction
          key={item.id || item.icon}
          icon={<IconSVG svg={item.icon} />}
          tooltipTitle={item.tooltip}
          onClick={this.handleActionClick(item, params)}
        />
      )
    })
  }

  private handleClick = () => {
    this.setState({ open: !this.state.open })
  }

  private handleActionClick = (item: IAction, params: types.IComponentEventParams) => () => {
    if (item.onClick) {
      item.onClick(params)
    }
    this.setState({ open: false })
  }

}
