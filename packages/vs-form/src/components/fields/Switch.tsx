import * as React from 'react'
import Switch, { SwitchProps as MuiSwitchProps } from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import * as types from '../../schemaManager/types'
import { ItemProps, ItemDataProps } from '../../common/propTypes'

import BaseFormControl from '../../baseComponents/BaseFormControl'

export default class VsSwitch extends React.Component<ItemProps> {
  private get comp(): types.IComponentSwitch { return this.props.comp as types.IComponentSwitch }
  private SwitchProps: MuiSwitchProps = {}
  private FormControlLabelProps: any = {}
  private inputRef: any

  constructor(props: ItemProps) {
    super(props)
    this.inputRef = React.createRef()
    props.schemaManager.addInputRef(props.comp, this.inputRef)
    const { FormControlProps, FormHelperTextProps, FormLabelProps, FormControlLabelProps, ...SwitchProps } = this.comp.props!
    if (SwitchProps) {
      this.SwitchProps = SwitchProps
    }
    if (FormControlLabelProps) {
      this.FormControlLabelProps = FormControlLabelProps
    }
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
        control={<Switch
          checked={dataProps.state.value}
          onChange={this.changeValue(dataProps)}
          {...this.SwitchProps}
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
}
