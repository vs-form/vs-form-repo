import * as React from 'react'
import classNames from 'classnames'

import { ItemProps } from '../../common/propTypes'
import * as types from '../../schemaManager/types'

import CardMedia from '@material-ui/core/CardMedia'

export const styles = {
  mediaSize: {
    height: '240px',
    width: '240px'
  }
}

export default class VsMediaStatic extends React.Component<ItemProps> {
  private get comp(): types.IComponentDivider { return this.props.comp as types.IComponentDivider }
  private CardMediaProps: any = this.comp.props || {}

  constructor(props: ItemProps) {
    super(props)

    this.CardMediaProps.className = classNames(this.props.classes.mediaSize, this.CardMediaProps.className)
  }

  public render() {
    return (
      <CardMedia {...this.CardMediaProps} />
    )
  }
}
