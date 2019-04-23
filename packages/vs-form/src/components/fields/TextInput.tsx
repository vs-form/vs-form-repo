import * as React from 'react'

import { ItemProps, ItemDataProps } from '../../common/propTypes'

import BaseInput from '../../baseComponents/BaseInput'

export default class VsTextInput extends React.Component<ItemProps> {
  constructor(props: ItemProps) {
    super(props)
  }

  public render() {
    return <BaseInput value={this.getValue} onChange={this.changeValue} {...this.props} />
  }

  public getValue(dataProps: ItemDataProps): any {
    return dataProps.state.value || ''
  }

  public changeValue = (dataProps: ItemDataProps) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value
    dataProps.updateValue(value)
  }

}
