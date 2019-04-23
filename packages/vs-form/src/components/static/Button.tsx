import * as React from 'react'
import Button, { ButtonProps } from '@material-ui/core/Button'
import { TypographyProps } from '@material-ui/core/Typography'
import { IconProps as MuiIconProps } from '@material-ui/core/Icon'

import * as types from '../../schemaManager/types'
import * as enums from '../../schemaManager/enums'
import { ItemProps, ItemButtonProps } from '../../common/propTypes'
import ButtonBase from '../../baseComponents/ButtonBase'
import { isUndefined } from '../../schemaManager/lodash'
import Text from '../../common/Text'

export const styles = {
  icon: {
    fontSize: '1.5em',
    height: '1.5em',
  }
}

export default class VsButton extends React.Component<ItemProps> {
  private get comp(): types.IComponentButton { return this.props.comp as types.IComponentButton }
  private ButtonProps: ButtonProps = {}
  private LabelProps: TypographyProps = {}
  private IconProps: MuiIconProps = {}
  constructor(props: ItemProps) {
    super(props)
    this.initProps()
  }

  public render() {
    return (
      <ButtonBase comp={this.comp} schemaManager={this.props.schemaManager} buttonProps={this.ButtonProps} IconProps={this.IconProps} classes={this.props.classes} designMode={this.props.designMode}>
        {this.renderComp}
      </ButtonBase>
    )
  }

  private renderComp = (_p: ItemButtonProps) => {
    const iconRight = !!this.comp.iconRight
    const Icon = this.comp.iconComp
    return (
      <Button {...this.ButtonProps}>
        {Icon && !iconRight && <Icon style={{ marginRight: 8 }} {...this.IconProps}/>}
        {this.LabelProps ? (<Text text={this.comp.label as string} {...this.LabelProps} />) : this.comp.label as string}
        {Icon  && iconRight && <Icon style={{ marginLeft: 8 }} {...this.IconProps}/>}
      </Button>
    )
  }

  private initProps() {
    const { LabelProps, IconProps, ...buttonProps } = this.comp.props!
    if (buttonProps) { this.ButtonProps = buttonProps }
    if (IconProps) { this.IconProps = IconProps }
    if (LabelProps) { this.LabelProps = LabelProps }
    if (isUndefined(this.ButtonProps.variant)) {
      this.ButtonProps.variant = 'outlined'
    }
  }

}

import { registerComponent } from '../../registerComponent'
registerComponent(enums.Component.button, VsButton, styles)
