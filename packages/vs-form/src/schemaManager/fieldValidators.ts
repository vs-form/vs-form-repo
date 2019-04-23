// import * as validators from './validators'
import { has, isObject, isString, uniq, isFunction } from './lodash'
import * as errs from './str_err'

import * as types from './types'
import * as enums from './enums'

export const required = (name: string) => (v: any) => !!v || `${name} is required`

export const checkItemsInSelect = (_items: types.ISelectItemList | types.ISelectItemListFunction | string[], dataType: enums.DataType): types.ISchemaError | string => {
  if (isFunction(_items)) { return '' }
  const items = _items as types.ISelectItemList
  let arr: types.ISelectItemList = []
  let sortedArr: types.ISelectItemList = []
  const dataTypeValue = () => dataType === enums.DataType.arrayString ? enums.DataType.string : (dataType === enums.DataType.arrayNumber || dataType === enums.DataType.integer || dataType === enums.DataType.arrayInteger) ? enums.DataType.number : dataType
  const getLineNumbers = (orig: types.ISelectItemList, error: types.ISelectItemList) => {
    return error.map(el => orig.indexOf(el) + 1)
  }
  const arrToString = (a: types.ISelectItemList): string => {
    return a.map(e => e && e.value ? e.value.toString() : '' + ',' + (e ? e.text : '')).toString()
  }

  // each item must be object
  arr = items.filter(el => !(isObject(el)))
  if (arr.length > 0) { return { errcode: errs.ErrorCode.selectItemsMustBeObjects, addOn: arrToString(arr), itemNo: getLineNumbers(items, arr).toString() } }
  // each item must have text and value items
  arr = items.filter(el => !(has(el, 'value') && has(el, 'text')))
  if (arr.length > 0) { return { errcode: errs.ErrorCode.selectItemsMustHaveValueAndText, addOn: arrToString(arr), itemNo: getLineNumbers(items, arr).toString() } }
  arr = items.filter((el: types.ISelectItem) => typeof el.value !== dataTypeValue())
  if (arr.length > 0) { return { errcode: errs.ErrorCode.selectItemsMustHaveCorrectDataType, addOn: arrToString(arr), itemNo: getLineNumbers(items, arr).toString() } }
  // each item must be the same type
  // const typ = typeof property[0]
  // arr = items.filter((el) => typeof el.value !== typ)
  // if (arr.length > 0) return { errcode: errs.ErrorCode.selectItemsMustBeSameType, addOn: arr.toString(), itemNo: getLineNumbers(property, arr).toString() }

  // if items must have unique values
  sortedArr = items.map(e => e)
  if (dataTypeValue() === enums.DataType.number) {
    sortedArr.sort((a, b) => ((a.value as number) - (b.value as number)))
  } else {
    sortedArr.sort((a, b) => {
      if (a.value < b.value) {
        return -1
      } else
        if (a.value > b.value) {
          return 1
        } else { return 0 }
    })
  }
  arr = []
  for (let i = 0; i < sortedArr.length - 2; i++) {
    if (sortedArr[i + 1] && sortedArr[i + 1].value === sortedArr[i].value) {
      arr.push(sortedArr[i])
    }
  }

  arr = uniq(arr)
  if (arr.length > 0) { return { errcode: errs.ErrorCode.selectItemsUnique, addOn: arrToString(arr), itemNo: getLineNumbers(items, arr).toString() } }

  arr = items.filter(el => !isString(el.text))
  if (arr.length > 0) { return { errcode: errs.ErrorCode.selectItemsTextMusBeString, addOn: arrToString(arr) } }
  // only one text item must have empty string
  arr = items.filter(el => (el.text.trim() === ''))
  if (arr.length > 1) { return { errcode: errs.ErrorCode.selectItemsTextOnlyOneEmpty, addOn: arrToString(arr) } }

  // check items unique text
  sortedArr = items.sort((a, b) => {
    if (a.text < b.text) {
      return -1
    } else
      if (a.text > b.text) {
        return 1
      } else { return 0 }
  })
  arr = []
  for (let i = 0; i < sortedArr.length - 1; i++) {
    if (sortedArr[i + 1].text === sortedArr[i].text) {
      arr.push(sortedArr[i])
    }
  }
  arr = uniq(arr)
  if (arr.length > 0) { return { errcode: errs.ErrorCode.selectItemsTextNotUnique, type: types.SchemaErrorType.warning, addOn: arrToString(arr), itemNo: getLineNumbers(items, arr).toString() } }
  return ''
}
