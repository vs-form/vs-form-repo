import * as React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

export interface IMenuItemProp {
  label: string,
  onClick: any,
}

export interface IMenuItemPropList extends Array<IMenuItemProp> { }

export interface IMenuProps {
  anchorEl?: HTMLElement,
  onRequestClose: any,
  items: IMenuItemPropList,
}

class VsMenu extends React.Component<IMenuProps> {
  constructor(props: IMenuProps) {
    super(props)
  }

  public handleClick = (item: IMenuItemProp) => () => {
    item.onClick()
    this.props.onRequestClose()
  }

  public getItems = () => {
    return this.props.items.map((i, ind) => {
      return <MenuItem key={ind} onClick={this.handleClick(i)}>{i.label}</MenuItem>
    })
  }

  public render() {
    return (
      <Menu
        anchorEl={this.props.anchorEl}
        open={Boolean(this.props.anchorEl)}
      >
        <ClickAwayListener onClickAway={this.props.onRequestClose}>
          {this.getItems()}
        </ClickAwayListener>
      </Menu>
    )
  }
}

export default VsMenu
