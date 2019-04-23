import * as React from 'react'
import { set } from '@vs-form/vs-form'
import MaskedInput from 'react-text-mask'

import { BaseInput, ItemProps, ItemDataProps } from '@vs-form/vs-form'
import { common, types } from '@vs-form/vs-form'

export default class VsMaskInput extends React.Component<ItemProps> {
  private get comp(): types.IComponentMaskInput { return this.props.comp as types.IComponentMaskInput }
  constructor(props: ItemProps) {
    super(props)
    this.initProps()
  }

  public render() {
    return <BaseInput value={this.getValue} onChange={this.changeValue} {...this.props} />
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

  private initProps = () => {
    const maskProps = this.comp.maskProps
    if (maskProps) {
      set(this.comp.props!, 'InputProps.inputComponent', this.TextMaskCustom)
    }
  }

  private TextMaskCustom = (p: any) => {
    const { inputRef, ...other } = p
    if (this.comp.maskProps) {
      return (
        <MaskedInput
          {...other}
          ref={p.inputRef}
          {...this.comp.maskProps}
        />
      )
    } else {
      return null
    }
  }
}
