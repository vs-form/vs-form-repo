import * as React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import { set, isArray } from '../../schemaManager/lodash'

import * as types from '../../schemaManager/types'
import * as common from '../../schemaManager/common'
import { ItemProps, ItemDataProps } from '../../common/propTypes'

import BaseInput from '../../baseComponents/BaseInput'

export default class VsSelect extends React.Component<ItemProps> {
  private get comp(): types.IComponentSelect { return this.props.comp as types.IComponentSelect }
  constructor(props: ItemProps) {
    super(props)
    this.getProps()
  }

  public render() {
    return <BaseInput value={this.getValue} onChange={this.changeValue} renderItems={this.getItems} {...this.props} />
  }

  public getValue(dataProps: ItemDataProps): any {
    let defaultValue

    if (common.dataTypeIsArray(this.comp.data.dataType)) {
      // Select with multiple=true is array
      defaultValue = []
    } else {
      defaultValue = ''
    }
    return dataProps.state.value || defaultValue
  }

  public changeValue = (dataProps: ItemDataProps) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value
    dataProps.updateValue(value)
  }

  private getProps = () => {
    set(this.comp, 'props.select', true)
    if (common.dataTypeIsArray(this.comp.data.dataType)) {
      set(this.comp, 'props.SelectProps.multiple', true)
      set(this.comp, 'props.SelectProps.renderValue', this.renderValue)
    }
  }

  private renderValue = (selected: any[]): string => {
    const items = this.comp.data.items as types.ISelectItemList
    const findItem = (s: string) => items.find(i => i.value === s) || { text: '' }
    const find = (s: string) => findItem(s).text

    const res = selected.map(s => find(s))
    return res.join(', ')
  }

  private getItems = (value: any) => {
    const items = this.comp.data.items as types.ISelectItemList
    return items.map((item: types.ISelectItem) => {
      return (
        <MenuItem key={item.value} value={item.value}>
          {isArray(value) && <Checkbox checked={value.indexOf(item.value) > -1} />}
          {item.text}
        </MenuItem>
      )
    })
  }

}
