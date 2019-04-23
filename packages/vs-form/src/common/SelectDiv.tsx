import * as React from 'react'
import { createStyles } from '@material-ui/core/styles'

import { ItemProps } from './propTypes'
import { addStyles } from './addStyle'

const styles = createStyles({
  itemSelected: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '10px',
    height: '10px',
    background: 'lightgray',
    border: '1px solid #333',
    zIndex: 1,
  },
  dragArea: {
    minHeight: '50px',
  },
  itemFocused: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '10px',
    height: '10px',
    background: 'greenyellow',
    border: '1px solid #333',
    zIndex: 1,
  }
})

const getSelectedClass = (props: ItemProps): string => {
  if (isFocused(props)) {
    return props.classes.itemFocused
  } else if (isSelected(props)) {
    return props.classes.itemSelected
  } else {
    return ''
  }
}
const isFocused = (props: ItemProps): boolean => {
  return props.schemaManager.selection.length >= 1 && props.schemaManager.selection[0] === props.comp
}

const isSelected = (props: ItemProps): boolean => {
  return !isFocused(props) && props.schemaManager.selection.includes(props.comp)
}

const SelectDiv: React.SFC<ItemProps> = (props: ItemProps) => (
  <div className={getSelectedClass(props)}/>
)

export default addStyles(SelectDiv, styles)
