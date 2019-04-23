import * as React from 'react'
import * as types from '../../schemaManager/types'
import * as enums from '../../schemaManager/enums'
import { ItemProps } from '../../common/propTypes'
import Item from '../../baseComponents/Item'
import VsPanelWithLabel from './PanelWithLabel'
import SubschemaArray from './SubschemaArray'

const getComponent = (props: ItemProps) => {
  const comp = props.comp as types.IComponentSubschema
  const {classes, ...other} = props
  if (comp.data.dataType === enums.DataType.object) {
    return (
      <VsPanelWithLabel {...other}>
        <Item {...other} schema={comp.schema!} node="root" comp={comp.schema!.components.root} />
      </VsPanelWithLabel>
    )
  } else {
    return (
      <SubschemaArray {...other} schema={comp.schema!} />
    )
  }
}
const SubSchema: React.SFC<ItemProps> = props => {
  return getComponent(props)
}

export default SubSchema
