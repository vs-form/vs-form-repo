import * as React from 'react'
import { isDate, has, set } from '../../schemaManager/lodash'
import { TextFieldProps } from '@material-ui/core/TextField'

import { ItemProps, ItemDataProps } from '../../common/propTypes'

import * as types from '../../schemaManager/types'
import * as enums from '../../schemaManager/enums'
import * as common from '../../schemaManager/common'

import BaseInput from '../../baseComponents/BaseInput'

export default class VsDate extends React.Component<ItemProps> {
  private get comp(): types.IComponentDate { return this.props.comp as types.IComponentDate }
  constructor(props: ItemProps) {
    super(props)
    this.initProps()
  }

  public render() {
    return <BaseInput value={this.getValue} onChange={this.changeValue} {...this.props} />
  }

  public getValue(dataProps: ItemDataProps): string {
    if (isDate(dataProps.state.value)) {
      const withSeconds = has(this.comp, 'props.inputProps.step')
      return common.dateToString(dataProps.state.value, this.comp.type, withSeconds)
    } else {
      return ''
    }
  }

  public changeValue = (dataProps: ItemDataProps) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value
    const dt = value ? common.stringToDate(this.comp.type, evt.target.value) : null
    dataProps.updateValue(dt)
  }

  private initProps = () => {
    if (!this.comp.props) {
      this.comp.props = {}
    }
    const props: TextFieldProps = this.comp.props
    const type = this.comp.type
    if (type === enums.Component.date) {
      props.type = 'date'
    } else if (type === enums.Component.datetime) {
      props.type = 'datetime-local'
    } else if (type === enums.Component.time) {
      props.type = 'time'
    }
    set(props, 'InputLabelProps.shrink', true)
  }

}