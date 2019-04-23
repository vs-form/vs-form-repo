import * as React from 'react'
import { set, toNumber, isNumber, toInteger, isNull } from '@vs-form/vs-form'
import NumberFormat from 'react-number-format'

import { types, enums, BaseInput, ItemProps, ItemDataProps } from '@vs-form/vs-form'

export default class VsNumberFormat extends React.Component<ItemProps> {
  private get comp(): types.IComponentNumberFormat { return this.props.comp as types.IComponentNumberFormat }
  constructor(props: ItemProps) {
    super(props)
    this.initProps()
  }

  public render() {
    return <BaseInput value={this.getValue} onChange={this.changeValue} {...this.props} />
  }

  public getValue(dataProps: ItemDataProps): any {
    const numValue = isNull(dataProps.state.value) ? '' : this.comp.data.dataType === enums.DataType.integer ? toInteger(dataProps.state.value) : toNumber(dataProps.state.value)
    return isNumber(numValue) ? dataProps.state.value : ''
  }

  public changeValue = (dataProps: ItemDataProps) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value
    const schemaValue = value === '' ? null : this.comp.data.dataType === enums.DataType.integer ?  toInteger(value) : toNumber(value)
    dataProps.updateValue(value, schemaValue)
  }

  private initProps = () => {
    set(this.comp.props!, 'InputProps.inputComponent', this.NumberFormatCustom)
  }

  private NumberFormatCustom = (p: any) => {
    const { inputRef, onChange, ...other } = p
    if (this.comp.numberFormatProps) {
      return (
        <NumberFormat
          {...other}
          {...this.comp.numberFormatProps}
          getInputRef={p.inputRef}
          onValueChange={(values: any) => {
            onChange({
              target: {
                value: values.value
              }
            })
          }}
        />
      )
    } else {
      return null
    }
  }
}
