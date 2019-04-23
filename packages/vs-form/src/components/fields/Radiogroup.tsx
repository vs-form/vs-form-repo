import * as React from 'react'
import Radio, { RadioProps as MuiRadioProps } from '@material-ui/core/Radio'
import RadioGroup, { RadioGroupProps as MuiRadioGroupProps } from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import classNames from 'classnames'

import BaseFormControl from '../../baseComponents/BaseFormControl'
import { isUndefined, isNull, toNumber } from '../../schemaManager/lodash'
import { ItemProps, ItemDataProps } from '../../common/propTypes'

import * as types from '../../schemaManager/types'
import * as enums from '../../schemaManager/enums'

export const styles = {
  radioHeight: {
    height: '30px'
  }
}

export default class VsRadioGroup extends React.Component<ItemProps> {
  private get comp(): types.IComponentRadioGroup { return this.props.comp as types.IComponentRadioGroup }
  private RadioGroupProps: MuiRadioGroupProps = {}
  private RadioProps: MuiRadioProps = {}
  private FormControlLabelProps: any = {}
  private inputRef: any

  constructor(props: ItemProps) {
    super(props)
    this.initProps()
    this.inputRef = React.createRef()
    props.schemaManager.addInputRef(props.comp, this.inputRef)
  }

  public render() {
    return (
      <BaseFormControl {...this.props} showLabel={true}>
        {this.renderComp}
      </BaseFormControl>
    )
  }

  public renderComp = (dataProps: ItemDataProps) => {
    return (
      <RadioGroup value={this.getValue(dataProps.state.value)} onChange={this.changeValue(dataProps)} {...this.RadioGroupProps} >
        {this.renderItems(dataProps)}
      </RadioGroup>
    )
  }

  public renderItems = (_dataProps: ItemDataProps) => {
    const items = this.comp.data.items as types.ISelectItemList
    return items.map((item, ind) => {
      // todo style ausserhalb
      return <FormControlLabel inputRef={ind === 0 && this.inputRef} value={item.value.toString()} key={item.value} control={<Radio {...this.RadioProps} />} label={item.text} {...this.FormControlLabelProps} />
    })
  }

  public getValue(value: any): any {
    return (isUndefined(value) || isNull(value)) ?  '' : value.toString()
  }

  public changeValue = (dataProps: ItemDataProps) => (_evt: React.ChangeEvent<{}>, value: string) => {
    const schemaValue = this.comp.data.dataType === enums.DataType.number ? toNumber(value) : value
    dataProps.updateValue(value, schemaValue)
  }

  private initProps() {

    const { FormControlProps, FormHelperTextProps, FormLabelProps, RadioProps, FormControlLabelProps, ...RadioGroupProps } = this.comp.props!
    if (RadioGroupProps) {
      this.RadioGroupProps = RadioGroupProps
    }
    if (RadioProps) {
      this.RadioProps = RadioProps
    }
    if (FormControlLabelProps) {
      this.FormControlLabelProps = FormControlLabelProps
    }
    this.RadioProps.className = classNames(this.props.classes.radioHeight, this.RadioProps.className)
  }

}
