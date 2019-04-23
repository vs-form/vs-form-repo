import * as React from 'react'
import * as types from '../../schemaManager/types'
import * as enums from '../../schemaManager/enums'
import Text from '../../common/Text'
import { ItemProps } from '../../common/propTypes'
import { TypographyProps as MuiTypographyProps } from '@material-ui/core/Typography'
import { isUndefined } from '../../schemaManager/lodash'

export default class VsPanelWithLabel extends React.Component<ItemProps> {
  private get comp(): types.IComponentPanel { return this.props.comp as types.IComponentPanel }
  private PanelProps: any = {}
  private HeaderTypographyProps: MuiTypographyProps = {}

  constructor(props: ItemProps) {
    super(props)
    this.initProps()
  }

  public render() {
    return (
      <div {...this.PanelProps}>
        {this.comp.label ? <Text text={this.comp.label as string} {...this.HeaderTypographyProps} /> : null}
        {this.props.children}
      </div>
    )
  }

  private initProps() {

    const { HeaderTypographyProps, ...PanelProps } = this.comp.props!
    if (PanelProps) { this.PanelProps = PanelProps }
    if (HeaderTypographyProps) { this.HeaderTypographyProps = HeaderTypographyProps }
    if (isUndefined(this.HeaderTypographyProps.variant)) {
      this.HeaderTypographyProps.variant = 'h6'
    }
  }
}

import { registerComponent } from '../../registerComponent'
registerComponent(enums.Component.panel, VsPanelWithLabel)
