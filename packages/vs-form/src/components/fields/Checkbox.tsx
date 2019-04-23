import * as React from 'react'
import Checkbox, { CheckboxProps as MuiCheckboxProps } from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import * as types from '../../schemaManager/types'
import { ItemProps, ItemDataProps } from '../../common/propTypes'

import BaseFormControl from '../../baseComponents/BaseFormControl'

export default class VsCheckbox extends React.Component<ItemProps> {
  private get comp(): types.IComponentCheckbox { return this.props.comp as types.IComponentCheckbox }
  private CheckboxProps: MuiCheckboxProps = {}
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
      <BaseFormControl {...this.props}>
        {this.renderComp}
      </BaseFormControl>
    )
  }

  public renderComp = (dataProps: ItemDataProps) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={dataProps.state.value}
            onChange={this.changeValue(dataProps)}
            {...this.CheckboxProps}
          />}
        label={this.comp.label as string}
        inputRef={this.inputRef}
        {...this.FormControlLabelProps}
      />
    )
  }

  public changeValue = (dataProps: ItemDataProps) => (_evt: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    dataProps.updateValue(checked)
  }

  private initProps() {

    const { FormControlProps, FormHelperTextProps, FormLabelProps, FormControlLabelProps, ...CheckboxProps } = this.comp.props!
    if (CheckboxProps) { this.CheckboxProps = CheckboxProps }
    if (FormControlLabelProps) { this.FormControlLabelProps = FormControlLabelProps }
  }

}
