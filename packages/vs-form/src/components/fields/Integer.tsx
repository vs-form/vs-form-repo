import * as React from 'react'
import { ItemProps, ItemDataProps } from '../../common/propTypes'

import { toInteger, isInteger, isNull } from '../../schemaManager/lodash'

import BaseInput from '../../baseComponents/BaseInput'

export default class VsInteger extends React.Component<ItemProps> {
  constructor(props: ItemProps) {
    super(props)
  }

  public render() {
    return <BaseInput value={this.getValue} onChange={this.changeValue} {...this.props} />
  }

  public getValue(dataProps: ItemDataProps): any {
    const numValue = isNull(dataProps.state.value) ? '' : toInteger(dataProps.state.value)
    return isInteger(numValue) ? dataProps.state.value : ''
  }

  public changeValue = (dataProps: ItemDataProps) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[-+]?\d*$/
    const value = evt.target.value
    if (value === '' || re.test(value)) {
      const schemaValue  = value === '' ? null : toInteger(value)
      dataProps.updateValue(value, schemaValue)
    }
  }

}
