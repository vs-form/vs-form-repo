import * as React from 'react'
import { set, toNumber, isNumber, isNull } from '../../schemaManager/lodash'

import * as types from '../../schemaManager/types'
import { ItemProps, ItemDataProps } from '../../common/propTypes'

import BaseInput from '../../baseComponents/BaseInput'

export default class VsNumber extends React.Component<ItemProps> {
  private get comp(): types.IComponentNumber { return this.props.comp as types.IComponentNumber }
  constructor(props: ItemProps) {
    super(props)
    this.getProps()
  }

  public render() {
    return <BaseInput value={this.getValue} onChange={this.changeValue} {...this.props} />
  }

  public getValue(dataProps: ItemDataProps): any {
    const numValue = isNull(dataProps.state.value) ? '' : toNumber(dataProps.state.value)
    return isNumber(numValue) ? dataProps.state.value : ''
  }

  public changeValue = (dataProps: ItemDataProps) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value
    const schemaValue  = value === '' ? null : toNumber(value)
    dataProps.updateValue(value, schemaValue)
  }

  private getProps = () => {
    set(this.comp, 'props.type', 'number')
  }

}
