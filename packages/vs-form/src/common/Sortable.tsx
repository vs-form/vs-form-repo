import * as React from 'react'

import * as types from '../schemaManager/types'
import { getSortable } from '../index'

const VsSortable: React.SFC<types.ISortableProps> = (props: types.ISortableProps) => {
  const Elem = getSortable()
  return <Elem {...props} />
}

export default VsSortable
