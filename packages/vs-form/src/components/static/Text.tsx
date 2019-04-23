import * as React from 'react'
import { ItemProps } from '../../common/propTypes'
import { TypographyProps } from '@material-ui/core/Typography'
import classNames from 'classnames'

import * as types from '../../schemaManager/types'

import Text from '../../common/Text'

export const styles = {
  textPaddingTop: {
    paddingTop: '1em'
  }
}

export default class VsText extends React.Component<ItemProps> {
  private get comp(): types.IComponentText { return this.props.comp as types.IComponentText }
  private TypographyProps: TypographyProps = {}
  constructor(props: ItemProps) {
    super(props)
    this.initProps()
  }

  public render() {
    return (
      <Text text={this.comp.text as string} {...this.TypographyProps} />
    )
  }

  private initProps() {

    this.TypographyProps = this.comp.props!
    this.TypographyProps.className = classNames(this.props.classes.textPaddingTop, this.TypographyProps.className)
  }
}
