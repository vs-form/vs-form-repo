import * as React from 'react'
// import { format, parse } from 'date-fns'
// import Utils from '@date-io/date-fns'
// import { MuiPickersUtilsProvider, DatePicker, TimePicker, DateTimePicker } from 'material-ui-pickers'

import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'

import { DatePicker, TimePicker, DateTimePicker } from 'material-ui-pickers'
import { isUndefined } from '@vs-form/vs-form'

import { BaseFormControl, BaseIcon, ItemProps, ItemDataProps } from '@vs-form/vs-form'
import { types, enums } from '@vs-form/vs-form'

export default class VsDateExt extends React.Component<ItemProps> {
  private get comp(): types.IComponentDate { return this.props.comp as types.IComponentDate }
  private pickerProps: any = {}
  private type: enums.Component = enums.Component.date
  private inputRef: any
  constructor(props: ItemProps) {
    super(props)
    this.inputRef = React.createRef()
    props.schemaManager.addInputRef(props.comp, this.inputRef)
    this.pickerProps = this.comp.props
    const { type, ...other } = this.pickerProps
    if (type) {
      this.type = type
      this.pickerProps = other
    }

    if (isUndefined(this.pickerProps.keyboard)) {
      this.pickerProps.keyboard = true
    }
    // calendar
    this.pickerProps.keyboardIcon = <BaseIcon svg="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
    // cevron-left -right
    if (this.type === enums.Component.date || this.type === enums.Component.datetime) {
      this.pickerProps.leftArrowIcon = <BaseIcon svg="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
      this.pickerProps.rightArrowIcon = <BaseIcon svg="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
    }

    if (this.type === enums.Component.date) {
      if (isUndefined(this.pickerProps.format)) {
        this.pickerProps.format = 'dd.MM.yyyy'
      }
      if (isUndefined(this.pickerProps.mask)) {
        this.pickerProps.mask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]
      }
    } else if (this.type === enums.Component.time) {
      if (isUndefined(this.pickerProps.ampm)) {
        this.pickerProps.ampm = false
      }
      if (isUndefined(this.pickerProps.format)) {
        this.pickerProps.format = 'HH:mm'
      }
      if (isUndefined(this.pickerProps.mask)) {
        this.pickerProps.mask = [/\d/, /\d/, ':', /\d/, /\d/]
      }
    } else if (this.type === enums.Component.datetime) {
      if (isUndefined(this.pickerProps.ampm)) {
        this.pickerProps.ampm = false
      }
      if (isUndefined(this.pickerProps.format)) {
        this.pickerProps.format = 'dd.MM.yyyy HH:mm'
      }
      if (isUndefined(this.pickerProps.mask)) {
        this.pickerProps.mask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]
      }
      // timer calendar-range
      this.pickerProps.timeIcon = <BaseIcon svg="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
      this.pickerProps.dateRangeIcon = <BaseIcon svg="M9,10H7V12H9V10M13,10H11V12H13V10M17,10H15V12H17V10M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z" />

    }

  }

  public render() {
    return (
      <BaseFormControl {...this.props}>
        {this.renderComp}
      </BaseFormControl>
    )
  }

  // todo <MuiPickersUtilsProvider utils={DateFnsUtils}> in app root
  // <MuiPickersUtilsProvider utils={Utils}>
  // </MuiPickersUtilsProvider>

  private renderComp = (p: ItemDataProps) => {
    const DateComp = this.Comp()
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateComp
          label={this.comp.label}
          value={p.state.value}
          onChange={this.handleDateChange(p)}
          inputRef={this.inputRef}
          {...this.pickerProps}
        />
      </MuiPickersUtilsProvider>
    )
  }

  private Comp = (): any => {
    if (this.type === enums.Component.datetime) {
      return DateTimePicker
    } else if (this.type === enums.Component.time) {
      return TimePicker
    } else {
      return DatePicker
    }

  }

  private handleDateChange = (dataProps: ItemDataProps) => (date: any) => {
    dataProps.updateValue(date)
  }

}
