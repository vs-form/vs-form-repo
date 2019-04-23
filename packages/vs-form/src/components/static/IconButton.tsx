import * as React from 'react'
import IconButton, { IconButtonProps as MuiIconButtonProps } from '@material-ui/core/IconButton'

import * as types from '../../schemaManager/types'
import { ItemProps, ItemButtonProps } from '../../common/propTypes'
import ButtonBase from '../../baseComponents/ButtonBase'
import { IconProps as MuiIconProps } from '@material-ui/core/Icon'

export const styles = {
  icon: {
    fontSize: '1em',
    paddingRight: '5px'
  }
}

export default class VsIconButton extends React.Component<ItemProps> {
  private get comp(): types.IComponentIconButton { return this.props.comp as types.IComponentIconButton }
  private buttonProps: MuiIconButtonProps = {}
  private IconProps: MuiIconProps = {}
  constructor(props: ItemProps) {
    super(props)
    this.initProps()
  }

  public render() {
    return (
      <ButtonBase comp={this.comp} schemaManager={this.props.schemaManager} buttonProps={this.buttonProps} IconProps={this.IconProps} classes={this.props.classes}>
        {this.renderComp}
      </ButtonBase>
    )
  }

  private renderComp = (_p: ItemButtonProps) => {
    const Icon = this.comp.iconComp
    return (
      <IconButton {...this.buttonProps}>
        {Icon && <Icon {...this.IconProps} />}
      </IconButton>
    )
  }

  private initProps() {

    const { IconProps, ...buttonProps } = this.comp.props!
    if (buttonProps) {
      this.buttonProps = buttonProps
    }
    if (IconProps) {
      this.IconProps = IconProps
    }
  }

}
