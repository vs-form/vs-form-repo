import { has, isArray, isNumber, isInteger, isString, isNull, isFunction, isRegExp, isObject, isDate } from './lodash'
import { format } from 'date-fns'
import { DataType, Component } from './enums'
import { IComponent, IComponentPanel, IComponentTextInput, IComponentButton, IComponentSelect } from './types'
import * as constants from './constants'

export const dataTypeIsArray = (dataType: DataType) => [DataType.array, DataType.arrayString, DataType.arrayNumber, DataType.arrayObject].indexOf(dataType) > -1

export const dataTypeToValue = (dataType: DataType) => {
  if (dataType === DataType.string) {
    return ''
  } else if (dataType === DataType.date) {
    // return new Date('0000-01-01T00:00')
    return null
  } else if (dataType === DataType.number || dataType === DataType.integer) {
    return null
  } else if (dataType === DataType.boolean) {
    return false
  } else if (dataType === DataType.object) {
    return {}
  } else if (dataTypeIsArray(dataType)) {
    return []
  } else {
    return ''
  }
}

export const checkType = (type: DataType, value: any) => {
  if (type === DataType.any) {
    return true
  } else if (type === DataType.string) {
    return isString(value) || isNull(value)
  } else if (type === DataType.number) {
    return isNumber(value) || isNull(value)
  } else if (type === DataType.integer) {
    return isInteger(value) || isNull(value)
  } else if (type === DataType.date) {
    return isDate(value) || isNull(value)
  } else if (type === DataType.function) {
    return isFunction(value)
  } else if (type === DataType.regex) {
    return isRegExp(value)
  } else if (type === DataType.array) {
    return isArray(value)
  } else if (type === DataType.arrayString) {
    return isArray(value) && value.filter(e => !isString(e)).length === 0
  } else if (type === DataType.arrayNumber) {
    return isArray(value) && value.filter(e => !isNumber(e)).length === 0
  } else if (type === DataType.arrayObject) {
    return isArray(value) && value.filter(e => !isObject(e)).length === 0
  }
  if (dataTypeIsArray(type)) {
    return isArray(value)
  }
  if (isArray(value)) {
    return (dataTypeIsArray(type))
  }
  return typeof value === type
}

export const formatJSON = (obj: object) => {
  return JSON.stringify(obj, null, 2)
}

export const valueIsNumber = (val: any) => {
  if (typeof val === 'string') {
    return !isNaN(Number(val))
  }
  return typeof val === 'number'

}

export const dateToString = (date: Date, compType: Component, withSeconds: boolean): string => {
  const f = withSeconds ? constants.htmlTimeFormatWithSeconds : constants.htmlTimeFormat
  if (compType === Component.date) {
    return format(date, constants.htmlDateFormat)
  } else if (compType === Component.datetime) {
    return format(date, constants.htmlDateFormat) + 'T' + format(date, f)
  } else if (compType === Component.time) {
    return format(date, f)
  }
  return ''
}

export const stringToDate = (compType: Component, val: string): Date | null => {
  let dt: Date | null = null
  if ([Component.date, Component.datetime].indexOf(compType) > -1) {
    try {
      dt = new Date(val)
    } catch (error) {
      //
    }
  } else if (compType === Component.time) {
    try {
      dt = new Date('1970-01-01T' + val)
    } catch (error) {
      //
    }
  }
  return dt
}

export const checkIsParentComponent = (comp?: IComponent): IComponentPanel | undefined => {
  if (comp && has(comp, 'children')) {
    return comp as IComponentPanel
  } else {
    return undefined
  }
}

export const checkIsDataComponent = (comp?: IComponent): IComponentTextInput | undefined => {
  if (comp && has(comp, 'data.field')) {
    return comp as IComponentTextInput
  } else {
    return undefined
  }
}

export const checkIsButtonComponent = (comp?: IComponent): IComponentButton | undefined => {
  if (comp && (comp.type === Component.button || comp.type === Component.iconbutton)) {
    return comp as IComponentButton
  } else {
    return undefined
  }
}

export const checkIsSelectComponent = (comp?: IComponent): IComponentSelect | undefined => {
  if (comp && (comp.type === Component.select || comp.type === Component.radiogroup || comp.type === Component.selectext)) {
    return comp as IComponentSelect
  } else {
    return undefined
  }
}
