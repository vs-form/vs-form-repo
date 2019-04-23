import * as React from 'react'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { isArray, has, set } from '../schemaManager/lodash'
import * as types from '../schemaManager/types'
import { ItemProps, ItemDataProps } from '../common/propTypes'

import Item from './Item'
import VsBaseDataComponent from './BaseDataComponent'

export default class VsBaseInput extends React.Component<ItemProps> {
  private get comp(): types.IComponentTextInput { return this.props.comp as types.IComponentTextInput }
  private TextFieldProps: TextFieldProps = {}
  private inputRef: any

  constructor(props: ItemProps) {
    super(props)
    this.initProps()
    this.inputRef = React.createRef()
    props.schemaManager.addInputRef(props.comp, this.inputRef)
  }

  public render() {
    return (
      <VsBaseDataComponent {...this.props}>
        {this.renderComp}
      </VsBaseDataComponent>
    )
  }

  public renderComp = (dataProps: ItemDataProps) => {
    this.updateErrorProps(dataProps)
    return (
      <TextField
        value={this.props.value(dataProps)}
        onChange={this.props.onChange(dataProps)}
        inputRef={this.inputRef}
        {...this.TextFieldProps}
      >
        {this.props.renderItems && this.props.renderItems(dataProps.state.value)}
      </TextField>
    )
  }

  private getPrefix = (isPrefix: boolean): React.ReactNode => {
    const { classes, ...other } = this.props
    const prop = isPrefix ? this.comp.prefix : this.comp.suffix
    if (prop) {
      if (isArray(prop)) {
        const arrProp = prop as string[]
        const components = this.props.schema.components
        const startAdornment: React.ReactNode[] = arrProp
          .filter((c: string) => has(components, c))
          .map((c: string) => (<Item {...other} key={components[c].id} schema={this.props.schema} node={c} comp={components[c]} />))
        if (startAdornment.length > 0) {
          return <InputAdornment position={isPrefix ? 'start' : 'end'}> {startAdornment}</InputAdornment>
        }
      } else {
        return <InputAdornment position={isPrefix ? 'start' : 'end'}> {prop}</InputAdornment>
      }
    }
    return undefined
  }

  private initProps = () => {
    this.TextFieldProps = this.comp.props!
    this.TextFieldProps.id = this.comp.id
    this.TextFieldProps.label = this.comp.label as string
    this.TextFieldProps.fullWidth = true

    const prefix = this.getPrefix(true)
    if (prefix) {
      set(this.TextFieldProps, 'InputProps.startAdornment', prefix)
      set(this.TextFieldProps, 'InputLabelProps.shrink', true)
    }
    const suffix = this.getPrefix(false)
    if (suffix) {
      set(this.TextFieldProps, 'InputProps.endAdornment', suffix)
    }
    const props: any[] = [this.TextFieldProps]
    if (this.TextFieldProps.InputLabelProps) {
      props.push(this.TextFieldProps.InputLabelProps)
    }
    if (this.TextFieldProps.InputProps) {
      props.push(this.TextFieldProps.InputProps)
    }
    if (this.TextFieldProps.FormHelperTextProps) {
      props.push(this.TextFieldProps.FormHelperTextProps)
    }

  }

  private updateErrorProps = (dataProps: ItemDataProps) => {
    if (dataProps.state.error) {
      this.TextFieldProps.error = true
      // set(this.TextFieldProps, 'FormHelperTextProps.error', true)
      set(this.TextFieldProps, 'error', true)
      set(this.TextFieldProps, 'helperText', dataProps.state.error)
    } else {
      // set(this.TextFieldProps, 'FormHelperTextProps.error', false)
      set(this.TextFieldProps, 'error', false)
      set(this.TextFieldProps, 'helperText', this.comp.hint)
    }

  }
}
