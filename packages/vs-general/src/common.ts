import { DataType, Component, has, isArray, isNumber, isInteger, isString, isNull, isFunction, isRegExp, isObject, isDate } from '@vs-form/vs-form'
// import { IComponent, IComponentPanel, IComponentTextInput, IComponentButton } from './types'
// import * as constants from './constants'

export const convertObjToText = (obj: any) => {
  // create an array that will later be joined into a string.
  const str: string[] = []

  if (isDate(obj)) {
    str.push(JSON.stringify(obj))
    // is function
  } else if (isRegExp(obj)) {
    str.push(obj.toString())
  } else if (isFunction(obj)) {
    str.push(obj.toString())
  } else if (isArray(obj)) {
    str.push('[')
    Object.keys(obj).forEach((prop, ind, arr) => { const suff: string = ind < (arr.length - 1) ? ',' : ''; str.push(convertObjToText(obj[prop]), suff) })
    str.push(']')
  } else if (isObject(obj)) {
    str.push('{')
    Object.keys(obj).forEach((prop, ind, arr) => {
      let validProp = prop
      const suff: string = ind < (arr.length - 1) ? ',' : ''
      const validIdentifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/
      if (!validIdentifier.test(prop)) {
        validProp = '"' + validProp + '"'
      }
      str.push(validProp, ': ', convertObjToText(obj[prop]), suff)
    })
    str.push('}')
  } else {
    str.push(JSON.stringify(obj))
  }

  return str.join('')
}
