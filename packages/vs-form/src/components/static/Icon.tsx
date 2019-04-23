import * as React from 'react'
import classNames from 'classnames'
import { isUndefined } from '../../schemaManager/lodash'

import * as types from '../../schemaManager/types'
import { ItemProps } from '../../common/propTypes'
import { IconProps } from '@material-ui/core/Icon'
import { SvgIconProps } from '@material-ui/core/SvgIcon'

import BaseIcon from '../../baseComponents/BaseIcon'

export const styles = {
  iconSize: {
    fontSize: '1.5em'
  }
}

export default class VsIcon extends React.Component<ItemProps> {
  private get comp(): types.IComponentIcon { return this.props.comp as types.IComponentIcon }
  private IconProps: SvgIconProps | IconProps = this.comp.props || {}
  constructor(props: ItemProps) {
    super(props)
    this.initProps()
  }
  public render() {
    if (this.comp.icon) {
      return <BaseIcon {...this.IconProps as IconProps} icon={this.comp.icon} />
    } else if (this.comp.svg) {
      return <BaseIcon {...this.IconProps as SvgIconProps} svg={this.comp.svg}  />
    } else if (this.comp.component) {
      return <BaseIcon {...this.IconProps as SvgIconProps} component={this.comp.component}  />
    } else {
      return <div>Icon: either property icon, svg or component must be provided</div>
    }
  }
  private initProps() {
    this.IconProps.className = classNames(this.props.classes.iconSize, this.IconProps.className)
    if (isUndefined(this.IconProps.color)) {
      this.IconProps.color = 'primary'
    }

  }
}
