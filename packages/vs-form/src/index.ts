import { ItemProps, ItemDataProps } from './common/propTypes'
import BaseDataComponent from './baseComponents/BaseDataComponent'
import BaseFormControl from './baseComponents/BaseFormControl'
import BaseInput from './baseComponents/BaseInput'
import BaseIcon from './baseComponents/BaseIcon'

import { registerComponent, registerCustomComponent, getRegisteredComponent } from './registerComponent'

import { VsForm } from './baseComponents/Form'
import * as propTypes from './common/propTypes'

export const sortableComponent: any = {
  Sortable: null
}

export const getSortable = (): any => {
  return sortableComponent.Sortable
}

import * as common from './schemaManager/common'
import * as types from './schemaManager/types'
import * as constants from './schemaManager/constants'
import * as enums from './schemaManager/enums'
import { Component, DataType, ButtonAction, ValidationMethod } from './schemaManager/enums'
import { ISchema, ISchemaDesign, ISchemaList, IComponent } from './schemaManager/types'
import * as errs from './schemaManager/str_err'
import * as fieldValidators from './schemaManager/fieldValidators'
import SchemaManager from './schemaManager/schemaManager'
import { validSchemaSchema, validSchemaComponents } from './schemaManager/validSchema'

import {
  capitalize, cloneDeep, get, has, isArray,
  isDate, isBoolean, isEmpty, isFunction, isInteger, isNull, isNumber, isObject,
  isPlainObject, isRegExp, isString, isUndefined, merge, set, toInteger, toNumber, trimEnd, uniq,
  debounce, throttle
} from './schemaManager/lodash'

export {
  VsForm, types, enums, ISchema, ISchemaDesign, IComponent, ISchemaList, DataType, ButtonAction, ValidationMethod, Component, SchemaManager, errs,
  ItemProps, ItemDataProps, BaseDataComponent, BaseFormControl, BaseInput, BaseIcon, registerComponent, registerCustomComponent, getRegisteredComponent,
  propTypes, common, constants, fieldValidators,
  validSchemaSchema, validSchemaComponents,
  capitalize, cloneDeep, get, has, isArray,
  isDate, isBoolean, isEmpty, isFunction, isInteger, isNull, isNumber, isObject,
  isPlainObject, isRegExp, isString, isUndefined, merge, set, toInteger, toNumber, trimEnd, uniq,
  debounce, throttle

}
