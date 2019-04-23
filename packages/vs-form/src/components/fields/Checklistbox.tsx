import * as React from 'react'
// import { FormLabelProps } from '@material-ui/core/FormLabel'
import FormGroup, { FormGroupProps as MuiFormGroupProps } from '@material-ui/core/FormGroup'
import Checkbox, { CheckboxProps as MuiCheckboxProps } from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { isUndefined, isArray, isString } from '../../schemaManager/lodash'

import BaseFormControl from '../../baseComponents/BaseFormControl'
import IconButton from '@material-ui/core/IconButton'
import * as types from '../../schemaManager/types'
import { ItemProps, ItemDataProps } from '../../common/propTypes'
import Item from '../../baseComponents/Item'
import BaseIcon from '../../baseComponents/BaseIcon'

const cssFlex = {
  display: 'flex',
}

const cssShiftRight = {
  flexGrow: 1
}

export default class VsChecklistBox extends React.Component<ItemProps> {
  private get comp(): types.IComponentChecklistbox { return this.props.comp as types.IComponentChecklistbox }
  private FormGroupProps: MuiFormGroupProps = {}
  private CheckboxProps: MuiCheckboxProps = {}
  private FormControlLabelProps: any = {}
  private IconButtonProps: types.IIconButtonProps = {}
  private componentEventParams: types.IComponentEventParams = this.props.schemaManager.getComponentEventParams(this.props.comp)
  private inputRef: any

  constructor(props: ItemProps) {
    super(props)
    this.initProps()
    this.inputRef = React.createRef()
    props.schemaManager.addInputRef(props.comp, this.inputRef)
  }

  public render() {
    return (
      <BaseFormControl showLabel={true} {...this.props}>
        {this.renderComp}
      </BaseFormControl>
    )
  }

  public renderComp = (dataProps: ItemDataProps) => {
    return (
      <FormGroup {...this.FormGroupProps}>
        {this.renderItems(dataProps)}
      </FormGroup>
    )
  }

  public renderItems = (dataProps: ItemDataProps) => {
    return this.comp.data.items.map((item: types.IChecklistboxItem) => {
      return (
        <div key={item.value} style={cssFlex}>
          <FormControlLabel
            label={item.text}
            control={
              <Checkbox
                checked={dataProps.state.value.indexOf(item.value) !== -1}
                onChange={this.handleToggle(item.value, dataProps)}
                {...this.CheckboxProps}
              />
            }
            inputRef={this.inputRef}
            {...this.FormControlLabelProps}
          />
          <div style={cssShiftRight} />
          {this.actionButton(dataProps, item)}
        </div >
      )
    })
  }

  public actionButton = (dataProps: ItemDataProps, item: types.IChecklistboxItem) => {
    let iconComp = this.getIcon(item.actionIcon)
    if (!iconComp) {
      iconComp = this.getIcon(this.comp.actionIcon)
    }
    if (iconComp) {
      return (
        <IconButton onClick={this.actionBtnClick(dataProps, item)} {...this.IconButtonProps}>
          {iconComp}
        </IconButton>
      )
    } else {
      return null
    }
  }

  public getIcon = (icon: string | string[] | undefined) => {
    if (isArray(icon) && icon.length > 0) {
      const iconComp = this.props.schema.components[icon[0]]
      if (iconComp) {
        return <Item {...iconComp.props} schemaManager={this.props.schemaManager} schema={this.props.schema} node={iconComp.node!} comp={iconComp} />
      } else {
        return <div>Icon not found {icon[0]}</div>
      }
    } else if (isString(icon)) {
      return <BaseIcon icon={icon} color="primary" />
    } else {
      return null
    }
  }

  public handleToggle = (value: any, dataProps: ItemDataProps) => () => {
    const currentIndex = dataProps.state.value.indexOf(value)
    const newValue = [...dataProps.state.value]

    if (currentIndex === -1) {
      newValue.push(value)
    } else {
      newValue.splice(currentIndex, 1)
    }
    dataProps.updateValue(newValue)
  }

  public actionBtnClick = (dataProps: ItemDataProps, item: types.IChecklistboxItem) => () => {
    if (this.comp.onActionClick) {
      const params = { value: dataProps.state.value, ...this.componentEventParams, item }
      this.comp.onActionClick(params)
    }
  }

  private initProps() {

    const { FormControlProps, FormHelperTextProps, FormLabelProps, CheckboxProps, FormControlLabelProps, IconButtonProps, ...FormGroupProps } = this.comp.props!
    if (FormGroupProps) {
      this.FormGroupProps = FormGroupProps
    }
    if (FormControlLabelProps) {
      this.FormControlLabelProps = FormControlLabelProps
    }
    if (CheckboxProps) {
      this.CheckboxProps = CheckboxProps
    }
    if (IconButtonProps) {
      this.IconButtonProps = IconButtonProps
    }
    if (isUndefined(this.FormGroupProps.row)) {
      this.FormGroupProps.row = this.comp.rowDisplay
    }
    if (isUndefined(this.CheckboxProps.disableRipple)) {
      this.CheckboxProps.disableRipple = true
    }
  }

}
