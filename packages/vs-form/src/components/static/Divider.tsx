import * as React from 'react'

import { ItemProps } from '../../common/propTypes'

import Divider from '@material-ui/core/Divider'

export default class VsDivider extends React.Component<ItemProps> {

  constructor(props: ItemProps) {
    super(props)

  }

  public render() {
    return (
      <Divider {...this.props.comp.props} />
    )
  }

}
