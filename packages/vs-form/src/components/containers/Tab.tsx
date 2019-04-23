import * as React from 'react'
import { ItemProps } from '../../common/propTypes'

const VsTab: React.SFC<ItemProps> =props => {
  return (
    <div>
      {props.children}
    </div>
  )
}

export default VsTab
