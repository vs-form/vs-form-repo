import * as React from 'react'
import FormControl, { FormControlProps as MuiFormControlProps } from '@material-ui/core/FormControl'
import FormHelperText, { FormHelperTextProps as MuiFormHelperTextProps } from '@material-ui/core/FormHelperText'
import FormLabel, { FormLabelProps as MuiFormLabelProps } from '@material-ui/core/FormLabel'
import { isUndefined } from '../schemaManager/lodash'

import VsBaseDataComponent from './BaseDataComponent'
import * as types from '../schemaManager/types'
import { ItemProps, ItemDataProps } from '../common/propTypes'

export default class VsBaseFormControl extends React.Component<ItemProps> {
  private FormControlProps: MuiFormControlProps = {}
  private FormHelperTextProps: MuiFormHelperTextProps = {}
  private FormLabelProps: MuiFormLabelProps = {}

  constructor(props: ItemProps) {
    super(props)
    this.initProps()
  }

  public render() {
    return (
      <VsBaseDataComponent {...this.props}>
        {this.renderComp}
      </VsBaseDataComponent>
    )
  }

  public renderComp = (dataProps: ItemDataProps) => {
    const comp = this.props.comp as types.IComponentTextInput
    const formhelpertext = dataProps.state.error || (this.props.comp as types.IComponentTextInput).hint || ''
    return (
      <FormControl error={!!dataProps.state.error} {...this.FormControlProps}>
        {this.props.showLabel && <FormLabel  {...this.FormLabelProps}>{comp.label}</FormLabel>}
        {this.props.children({ ...dataProps })}
        {formhelpertext && <FormHelperText error={!!dataProps.state.error} {...this.FormHelperTextProps}>{formhelpertext}</FormHelperText>}
      </FormControl>
    )
  }

  private initProps() {
    const { FormControlProps, FormHelperTextProps, FormLabelProps } = this.props.comp.props!
    if (FormControlProps) { this.FormControlProps = FormControlProps }
    if (FormHelperTextProps) {
      this.FormHelperTextProps = FormHelperTextProps
    }
    if (FormLabelProps) { this.FormLabelProps = FormLabelProps }

    if (isUndefined(this.FormControlProps.fullWidth)) {
      this.FormControlProps.fullWidth = true
    }
  }

}
