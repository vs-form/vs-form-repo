import { has, isUndefined, isObject, isArray } from './lodash'
import { validSchemaSchema, validSchemaComponents } from './validSchema'
import {
  ISchema, ISchemaDesign, ISchemaError, SchemaErrorType, ISchemaErrorList, IProcessSchemaParamsSchema, IProcessSchemaParamsComponent,
  IValidatorSchema, IValidatorComponent, IComponent
} from './types'
import * as common from './common'
import * as enums from './enums'

import SchemaManager from './schemaManager'
import * as errs from './str_err'

function _addError(err: ISchemaError, errors: ISchemaErrorList): void {
  const { errcode, schemaName, key, prop, addOn, itemNo } = err
  let { type } = err
  if (!type) {
    type = SchemaErrorType.error
  }
  errors.push({
    errcode,
    schemaName,
    key,
    prop,
    addOn,
    msg: errs.ErrorStrings[errcode],
    type,
    itemNo,
  })
}

export const checkSchema = (schemaManager: SchemaManager, onlySchemaValidation = false): ISchemaErrorList => {
  const errors: ISchemaErrorList = []
  // const {validSchemaComponents, validSchemaSchema} = validSchemaInit()

  const checkMinMax = (validSchema: any, property: string, errInfo: ISchemaError) => {
    if (validSchema.min) {
      let err = false
      if (validSchema.type === enums.DataType.array && property.length < validSchema.min) {
        err = true
      } else if (property < validSchema.min) {
        err = true
      }
      if (err) { _addError({ errcode: errs.ErrorCode.valueSmallerThanMin, addOn: validSchema.min, ...errInfo }, errors) }
    }

    if (validSchema.max) {
      let err = false
      if (validSchema.type === enums.DataType.array && property.length > validSchema.max) {
        err = true
      } else if (property > validSchema.max) {
        err = true
      }
      if (err) { _addError({ errcode: errs.ErrorCode.valueGreaterThanMax, addOn: validSchema.max, ...errInfo }, errors) }
    }

    if (validSchema.minmax) {
      let err = false
      if (validSchema.type === enums.DataType.array && (property.length < validSchema.minmax[0] || property.length > validSchema.minmax[1])) {
        err = true
      } else if (property < validSchema.minmax[0] || property > validSchema.minmax[1]) {
        err = true
      }
      if (err) { _addError({ errcode: errs.ErrorCode.valueNotInMinMax, addOn: validSchema.minmax[0] + ' - ' + validSchema.minmax[1], ...errInfo }, errors) }
    }
  }

  const checkProperty = (validSchema: any, property: any, schema: ISchema | ISchemaDesign, component: IComponent | ISchema | ISchemaDesign) => {
    const errInfo: ISchemaError = { key: component.id, prop: validSchema.prop, schemaName: schema.name } as ISchemaError
    if (validSchema.required && isUndefined(property)) {
      const err: ISchemaError = { errcode: errs.ErrorCode.requiredPropMissing, ...errInfo }
      _addError(err, errors)
      return
    }
    if (!isUndefined(property)) {
      if (!validSchema.type) {
        console.error('validschema misses type')
        return
      }
      if (isArray(validSchema.type)) {
        let valid = false
        validSchema.type.forEach((type: any) => {
          if (common.checkType(type, property)) {
            valid = true
            return
          }
        })
        if (!valid) {
          _addError({ errcode: errs.ErrorCode.wrongPropertyType, ...errInfo }, errors)
        }
      } else {
        if (!common.checkType(validSchema.type, property)) {
          _addError({ errcode: errs.ErrorCode.wrongPropertyType, ...errInfo }, errors)
        }
      }

      if (validSchema.enum && validSchema.enum.indexOf(property) === -1) {
        _addError({ errcode: errs.ErrorCode.valueNotInEnum, addOn: validSchema.enum.toString(), ...errInfo }, errors)
      }

      checkMinMax(validSchema, property, errInfo)

      if (validSchema.validators) {
        validSchema.validators.forEach((v: IValidatorComponent) => {
          const err = v(validSchema, component as IComponent, schema)
          if (isObject(err)) {
            const e = Object.assign({}, errInfo, err)
            _addError(e, errors)
          }
        })
      }

      if (validSchema.type === enums.DataType.object) {
        checkObject(validSchema, property, schema, component as IComponent)
      }

      if (validSchema.type === enums.DataType.array) {
        checkArray(validSchema, property, schema, component as IComponent)
      }
    }
  }

  const checkObject = (validSchema: any, object: any, schema: ISchema | ISchemaDesign, component: IComponent) => {
    if (validSchema.properties) {
      Object.keys(validSchema.properties).forEach(key => {
        const property = object[validSchema.properties[key].key]
        checkProperty(validSchema.properties[key], property, schema, component)
      })
      if (!(validSchema.additionalProperties || component.type === enums.Component.custom)) {
        Object.keys(object).forEach(key => {
          const errInfo = { key: component.id, prop: validSchema.prop ? validSchema.prop + '.' + key : key, schemaName: schema.name }
          if (!validSchema.properties[key]) {
            _addError({ errcode: errs.ErrorCode.hasInvalidProp, type: SchemaErrorType.warning, ...errInfo }, errors)
          }
        })
      }
    }
  }

  const checkArray = (validSchema: any, property: any[], schema: ISchema | ISchemaDesign, component: IComponent) => {
    const errInfo = { key: component.id, prop: validSchema.prop, schemaName: schema.name }
    if (property && isArray(property) && validSchema.items && validSchema.items.type) {
      property.forEach((el, ind) => {
        if (!common.checkType(validSchema.items.type, el)) {
          _addError({ errcode: errs.ErrorCode.wrongPropertyTypeInArray, ...errInfo, addOn: `Item Nr. ${ind}` }, errors)
        } else {
          if (validSchema.items.type === enums.DataType.object) {
            checkObject(validSchema.items, el, schema, component)
          }
        }
      })
    }
  }

  const schemaCallback = (p: IProcessSchemaParamsSchema) => {
    checkProperty(validSchemaSchema, p.schema, p.schema, p.schema)
    if (errors.length === 0) {
      validSchemaSchema.preValidators.forEach((v: IValidatorSchema) => {
        const err = v(schemaManager)
        if (err !== '') { _addError(err as ISchemaError, errors) }
      })
      if (!onlySchemaValidation) {
        validSchemaSchema.postValidators.forEach((v: IValidatorSchema) => {
          const err = v(schemaManager)
          if (err !== '') { _addError(err as ISchemaError, errors) }
        })
      }
    }
  }

  const componentCallback = (p: IProcessSchemaParamsComponent) => {
    if (onlySchemaValidation) { return }
    if (p.comp && !has(p.comp, 'type')) {
      _addError({ errcode: errs.ErrorCode.hasNoComponentType, key: p.comp.id, prop: 'type', schemaName: p.schema.name }, errors)
      return
    }
    let _validSchemaComp
    const comps = Object.keys(validSchemaComponents)
    if (p.comp && comps.includes(p.comp.type)) {
      _validSchemaComp = validSchemaComponents[p.comp.type]
    } else {
      _addError({ errcode: errs.ErrorCode.invalidtype, key: p.comp.id, prop: 'type', schemaName: p.schema.name }, errors)
      return
    }
    const {validators, ...other} = _validSchemaComp
    const validSchemaComp = {
      type: enums.DataType.object,
      validators,
      properties: {
        ...other
      }
    }

    checkProperty(validSchemaComp, p.comp, p.schema, p.comp)

  }

  const options = { processSubSchemas: !onlySchemaValidation }
  SchemaManager.processSchema({ schemaCallback, componentCallback, schema: schemaManager.schema, options })

  return errors
}

// export const checkStringToSchema = (code: string, schemaList: ISchemaList): IJSONSchema => {
//   const ret: IJSONSchema = {
//     errors: []
//   }
//   // tslint:disable-next-line:prefer-const
//   let schemaEval: any = {}
//   const c = 'schemaEval = ' + code
//   try {
//     // tslint:disable-next-line:no-eval
//     eval(c)
//   } catch (error) {
//     if (error instanceof SyntaxError) {
//       ret.errors.push({ errcode: errs.ErrorCode.errParseString, msg: error.message })
//     } else {
//       ret.errors.push({ errcode: errs.ErrorCode.errParseString, msg: error })
//     }
//     return ret
//   }
//   ret.schemaManager = new SchemaManager(schemaEval, schemaList)
//   ret.schemaManager.checkSchema()
//   ret.errors = ret.schemaManager.getAllErrors

//   return ret
// }
