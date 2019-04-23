import { has, get, isFunction, isUndefined, uniq, isArray, isObject, isInteger, isDate, isString, isRegExp } from './lodash'

import * as errs from './str_err'
import * as common from './common'
import * as enums from './enums'
import * as fieldValidators from './fieldValidators'
import {
  ISchema, ISchemaDesign, IValidatorSchema, ISchemaError, SchemaErrorType,
  IComponent,
  IComponentCallback, IComponentSubschema,
  IValidatorComponent, ICounter, ISchemaList, IDataTableColumnSetting,
  IComponentSelect, IComponentPanel,
  IComponentNumberFormat
} from './types'
import SchemaManager from './schemaManager'

//  Schema-Validators
//  =================

export const rootIsWrong: IValidatorSchema = sm => {
  const comp = sm.schema.components.root as IComponentPanel
  if ([enums.Component.form, enums.Component.panel, enums.Component.card, enums.Component.expansionpanel, enums.Component.tabs].indexOf(comp.type) === -1) {
    return { errcode: errs.ErrorCode.rootnotContainer, schemaName: sm.schema.name }
  }
  if (comp.children && isArray(comp.children) && comp.children.length === 0) {
    return { errcode: errs.ErrorCode.rootChildrenEmpty, schemaName: sm.schema.name }
  }

  return ''
}

export const hasRecursion: IValidatorSchema = sm => {
  const counter: ICounter = { count: 0, max: 100 }
  hasRecursion1(sm, sm.schema, sm.schemaList, counter)
  return counter.count >= counter.max
    ? { errcode: errs.ErrorCode.possibleRecursion, schemaName: sm.schema.name }
    : ''
}

function hasRecursion1(schemaManager: SchemaManager, schema: ISchema | ISchemaDesign, schemaList: ISchemaList, counter: ICounter) {
  if (counter.count >= counter.max) {
    counter.count = counter.max + 1
    return
  }
  Object.keys(schema.components).forEach(key => {
    const comp: IComponent = schema.components[key]
    if (comp.type === enums.Component.subschema) {
      counter.count++
      if (comp.schemaName && counter.count < counter.max) {
        const s = schemaManager.getSchemaFromList(comp.schemaName)
        if (s) {
          hasRecursion1(schemaManager, s, schemaList, counter)
        }
      }
    }
  })
}

export const hasUnresolvedSubschemaNames: IValidatorSchema = sm => {
  const arr: string[] = []
  const componentCallback: IComponentCallback = p => {
    if (p.comp && p.comp.type === enums.Component.subschema && p.comp.schemaName) {
      const s = sm.getSchemaFromList(p.comp.schemaName)
      if (!s) {
        arr.push(p.comp.schemaName)
      }
    }
  }
  const options = { processSubSchemas: true }
  SchemaManager.processSchema({ componentCallback, schema: sm.schema, options })
  return arr.length > 0
    ? {
      errcode: errs.ErrorCode.subSchemaNotFound,
      addOn: arr.toString(),
      schemaName: sm.schema.name
    }
    : ''
}

export const onlyFormTagForRoot: IValidatorSchema = sm => {
  const arr: string[] = []
  const componentCallback: IComponentCallback = p => {
    if (p.comp && p.comp.type === enums.Component.form && p.comp.id !== 'root') {
      arr.push(p.comp.id!)
    }
  }
  const options = { processSubSchemas: false }
  SchemaManager.processSchema({ componentCallback, schema: sm.schema, options })
  return arr.length > 0
    ? {
      errcode: errs.ErrorCode.onlyFormTagForRootComp,
      addOn: arr.toString(),
      schemaName: sm.schema.name
    }
    : ''
}

export const hasDuplicateIds: IValidatorSchema = sm => {
  const arr: string[] = []
  const dup: string[] = []

  const componentCallback: IComponentCallback = p => {
    if (p.comp && p.comp.id) {
      if (arr.includes(p.comp.id)) {
        dup.push(p.comp.id)
      }
      arr.push(p.comp.id)
    }
  }
  const options = { processSubSchemas: true }
  SchemaManager.processSchema({ componentCallback, schema: sm.schema, options })

  if (dup.length > 0) {
    return {
      errcode: errs.ErrorCode.duplicateIds,
      addOnMsg: 'duplicate Ids',
      addOn: dup.toString(),
      schemaName: sm.schema.name
    }
  } else {
    return ''
  }
}

export const hasDuplicateFieldPaths: IValidatorSchema = sm => {
  const arr: string[] = []
  const dup: string[] = []

  const componentCallback: IComponentCallback = p => {
    const cd = common.checkIsDataComponent(p.comp)
    if (cd) {
      const fieldPath = cd.data.fieldPath
      if (fieldPath) {
        if (arr.includes(fieldPath)) {
          dup.push(fieldPath)
        }
        arr.push(fieldPath)
      }
    }
  }
  const options = { processSubSchemas: true }
  SchemaManager.processSchema({ componentCallback, schema: sm.schema, options })

  if (dup.length > 0) {
    return {
      errcode: errs.ErrorCode.duplicateFieldPaths,
      addOnMsg: 'duplicate Field-Paths',
      addOn: dup.toString(),
      schemaName: sm.schema.name
    }
  } else {
    return ''
  }
}

export const isDuplicateInChildren: IValidatorSchema = sm => {
  const parents = Object.keys(sm.schema.components).map(c => sm.schema.components[c]).filter(c => has(c, 'children'))
  const getParents = (key: string) => parents.filter(c => ((c as IComponentPanel).children as string[]).includes(key))

  const dup: string[] = []

  const componentCallback: IComponentCallback = p => {
    const pr = getParents(p.comp.node as string)
    if (pr.length > 1) { dup.push(p.comp.node as string) }
  }
  const options = { processSubSchemas: true }
  SchemaManager.processSchema({ componentCallback, schema: sm.schema, options })

  if (dup.length > 0) {
    return {
      errcode: errs.ErrorCode.fieldhasDuplicatesInChildren,
      type: SchemaErrorType.warning,
      addOn: dup.toString(),
      schemaName: sm.schema.name
    }
  } else {
    return ''
  }
}

export const childrenHasRecursion: IValidatorSchema = sm => {
  const dup: string[] = []
  const recursiveChildren = (comp: IComponent, counter: ICounter) => {
    if (counter.count >= counter.max) {
      counter.count = counter.max + 1
      return
    }
    const cp = common.checkIsParentComponent(comp)

    if (cp) {
      cp.children.forEach((child: string) => {
        counter.count++
        if (has(sm.schema.components, child) && counter.count < counter.max) {
          recursiveChildren(sm.schema.components[child], counter)
        }
      })
    }
  }

  const componentCallback: IComponentCallback = p => {
    const counter: ICounter = { count: 0, max: 500 }
    recursiveChildren(p.comp, counter)
    if (counter.count >= counter.max) {
      const key: string = p.key as string
      if (!dup.includes(key)) { dup.push(key) }
    }
  }
  const options = { processSubSchemas: true }
  SchemaManager.processSchema({ componentCallback, schema: sm.schema, options })

  if (dup.length > 0) {
    return { errcode: errs.ErrorCode.recursiveChildren, addOn: dup.toString(), schemaName: sm.schema.name }
  } else {
    return ''
  }
}

export const hasDuplicateFields: IValidatorSchema = sm => {
  const arr: string[] = []
  let dup: string[] = []

  const componentCallback: IComponentCallback = p => {
    const cd = common.checkIsDataComponent(p.comp)
    if (cd) {
      const field = cd.data.field
      if (arr.includes(field)) {
        dup.push(field)
      }
      arr.push(field)
    }
  }
  const options = { processSubSchemas: false }
  SchemaManager.processSchema({ componentCallback, schema: sm.schema, options })

  dup = uniq(dup)
  if (dup.length > 0) {
    return { errcode: errs.ErrorCode.duplicateFields, addOn: dup.toString(), type: SchemaErrorType.warning, schemaName: sm.schema.name }
  } else {
    return ''
  }
}

export const hasFieldsNotInChildren: IValidatorSchema = sm => {
  const missing = sm.getComponentsWithNoParent()
  return missing.length > 0
    ? {
      errcode: errs.ErrorCode.fieldsHasNoParent,
      addOn: missing.toString(),
      type: SchemaErrorType.warning,
      schemaName: sm.schema.name
    }
    : ''
}

export const valuesKeyHasNoComponent: IValidatorSchema = sm => {
  const arr: string[] = []

  const getFields = (values: any, parent: string) => {
    Object.keys(values).forEach(key => {
      const comp = sm.getComponentByFieldPath(parent + key)
      if (!comp) {
        arr.push(parent + key)
      } else if (comp.type === enums.Component.subschema) {
        getFields(values[key], parent + key + '.')
      }
    })
  }

  if (sm.schema.values) {
    getFields(sm.schema.values, '')
  }

  if (arr.length > 0) {
    return { errcode: errs.ErrorCode.valuesKeyHasNoField, addOn: arr.toString(), type: SchemaErrorType.warning, schemaName: sm.schema.name }
  } else {
    return ''
  }
}

// Component-Validators
// ====================

export const hasValidChildrenKeys: IValidatorComponent = (validSchema, component, schema) => {
  const property = get(component, validSchema.prop)
  if (property.length === 0) {
    return { errcode: errs.ErrorCode.noChildrenKeys, type: SchemaErrorType.warning }
  }

  const arr: string[] = []
  property.forEach((el: string) => {
    if (!has(schema.components, el)) {
      arr.push(el)
    }
  })
  if (arr.length > 0) {
    return { errcode: errs.ErrorCode.invalidChildrenKeys, addOn: arr.toString() }
  }

  return ''
}

export const hasValidTabsKeys: IValidatorComponent = (validSchema, component, schema) => {
  const property = get(component, validSchema.prop)
  if (property.length === 0) {
    return { errcode: errs.ErrorCode.noChildrenKeys, type: SchemaErrorType.warning }
  }

  let arr: string[] = []
  property.forEach((el: string) => {
    if (!has(schema.components, el)) {
      arr.push(el)
    }
  })
  if (arr.length > 0) {
    return { errcode: errs.ErrorCode.invalidChildrenKeys, addOn: arr.toString() }
  }
  arr = []
  property.forEach((el: string) => {
    if (schema.components[el].type !== enums.Component.tab) {
      arr.push(el)
    }
  })
  if (arr.length > 0) {
    return { errcode: errs.ErrorCode.invalidTabsKeys, addOn: arr.toString() }
  }

  return ''
}

export const stylesValid: IValidatorComponent = (validSchema, component, _schema) => {
  let err: ISchemaError | string = ''
  const property = get(component, validSchema.prop)
  if (isObject(property)) {
    Object.keys(property).forEach(key => {
      if (!isObject(property[key])) {
        err = { errcode: errs.ErrorCode.styleMustBeObject, prop: 'styles.' + key }
        return
      }
    })
  }
  return err

}

export const speedDialActionsValid: IValidatorComponent = (validSchema, component, _schema) => {
  let err: ISchemaError | string = ''
  const property = get(component, validSchema.prop)
  if (isArray(property)) {
    if (property.length === 0) {
      return { errcode: errs.ErrorCode.arrayIsEmpty }
    }
    property.forEach((obj, ind) => {
      const sInd = (ind + 1).toString()
      if (isObject(obj)) {
        if (isUndefined(obj['icon'])) {
          err = { errcode: errs.ErrorCode.requiredPropMissing, addOn: 'prop: icon', itemNo: sInd }
          return
        }
        if (!isString(obj['icon'])) {
          err = { errcode: errs.ErrorCode.wrongPropertyTypeInArray, addOn: 'prop: icon', itemNo: sInd }
          return
        }

        if (isUndefined(obj['tooltip'])) {
          err = { errcode: errs.ErrorCode.requiredPropMissing, addOn: 'prop: tooltip', itemNo: sInd }
          return
        }
        if (!isString(obj['tooltip'])) {
          err = { errcode: errs.ErrorCode.wrongPropertyTypeInArray, addOn: 'prop: tooltip', itemNo: sInd }
          return
        }

        if (isUndefined(obj['onClick'])) {
          err = { errcode: errs.ErrorCode.requiredPropMissing, addOn: 'prop: onClick', itemNo: sInd, type: SchemaErrorType.warning }
          return
        }
        if (!isFunction(obj['onClick'])) {
          err = { errcode: errs.ErrorCode.wrongPropertyTypeInArray, addOn: 'prop: onClick', itemNo: sInd }
          return
        }

      } else {
        err = { errcode: errs.ErrorCode.speedDialActionObject, addOn: 'Entry No.: ' + sInd, itemNo: sInd }
        return
      }
    })
  }
  return err

}

export const prefixSuffixCompValid: IValidatorComponent = (validSchema, component, schema) => {
  const property = get(component, validSchema.prop)
  if (!(isArray(property) || isString(property))) {
    return { errcode: errs.ErrorCode.typeStringOrArray }
  }
  if (isArray(property)) {
    const arr: string[] = []
    property.forEach((s: string) => {
      const c = schema.components[s]
      if (!c) {
        arr.push(s)
      }
    })
    if (arr.length > 0) {
      return { errcode: errs.ErrorCode.compNotFound, addOn: arr.toString() }
    }

    property.forEach((s: string) => {
      const c = schema.components[s]
      // text, icons and iconbutton allowed
      if ([enums.Component.button, enums.Component.iconbutton, enums.Component.icon, enums.Component.text].indexOf(c.type) === -1) {
        arr.push(s)
      }
    })
    if (arr.length > 0) {
      return { errcode: errs.ErrorCode.invalidPrefixType, addOn: arr.toString() }
    }
  }
  return ''
}

export const iconValid: IValidatorComponent = (_validSchema, component, _schema) => {
  // const property = get(component, validSchema.prop)
  if (!(component['icon'] || component['svg'] || component['component'])) {
    return { errcode: errs.ErrorCode.iconOrSvg }
  }
  return ''
}

export const iconCompValid: IValidatorComponent = (validSchema, component, schema) => {
  const property = get(component, validSchema.prop)
  if (!(isArray(property) || isString(property))) {
    return { errcode: errs.ErrorCode.typeStringOrArray }
  }
  if (isArray(property)) {
    const arr: string[] = []
    property.forEach((s: string) => {
      const c = schema.components[s]
      if (!c) {
        arr.push(s)
      }
    })
    if (arr.length > 0) {
      return { errcode: errs.ErrorCode.compNotFound, addOn: arr.toString() }
    }

    property.forEach((s: string) => {
      const c = schema.components[s]
      // text, icons and iconbutton allowed
      if (c.type !== enums.Component.icon) {
        arr.push(s)
      }
    })
    if (arr.length > 0) {
      return { errcode: errs.ErrorCode.invalidIconType, addOn: arr.toString() }
    }
  }
  return ''
}

export const subschemaKeyField: IValidatorComponent = (validSchema, component, schema) => {
  const property = get(component, validSchema.prop)
  const subschema = component['schema']

  const options = { done: false }
  let fieldFound = false
  const componentCallback: IComponentCallback = p => {
    const cd = common.checkIsDataComponent(p.comp)
    if (cd) {
      if (cd.data.field === property) {
        options.done = true
        fieldFound = true
      }
    }
  }
  SchemaManager.processSchema({ componentCallback, schema: subschema, options })

  if (!fieldFound) {
    return { errcode: errs.ErrorCode.subSchemaKeyInvalid }
  }

  return ''

}

export const maskInput: IValidatorComponent = (_validSchema, component, _schema) => {
  if (component.type === enums.Component.maskinput) {
    if (component.props && component.props.multiline) {
      return { errcode: errs.ErrorCode.maskNotMultilineInput }
    }
    const mask = component.maskProps!.mask
    if (isFunction(mask)) {
      return ''
    } else if (isArray(mask)) {
      const arr = mask.filter(e => !(isString(e) || isRegExp(e)))
      if (arr.length > 0) {
        return { errcode: errs.ErrorCode.maskArrayItemsStringOrRegExp }
      }
    } else {
      return { errcode: errs.ErrorCode.maskArrayOrFunction }
    }
  } else {
    return { errcode: errs.ErrorCode.maskOnlyInMaskInputComponent }
  }
  return ''
}

export const numberFormat: IValidatorComponent = (_validSchema, component, _schema) => {
  const ci = component as IComponentNumberFormat
  if (!ci.numberFormatProps) {
    return { errcode: errs.ErrorCode.requiredPropMissing }
  }
  if (ci.numberFormatProps.format) {
    if (!(isString(ci.numberFormatProps.format) || isFunction(ci.numberFormatProps.format))) {
      return { errcode: errs.ErrorCode.stringOrFunction, prop: 'numberFormatProps.format' }
    }
  }
  if (ci.numberFormatProps.mask) {
    if (!(isString(ci.numberFormatProps.mask) || isArray(ci.numberFormatProps.mask))) {
      return { errcode: errs.ErrorCode.typeStringOrArray, prop: 'numberFormatProps.mask' }
    }
  }

  return ''
}

export const defaultValue: IValidatorComponent = (validSchema, component, _schema) => {
  // default value can be a value or a function
  let err = false
  const cd = common.checkIsDataComponent(component)
  if (cd) {
    const property = get(component, validSchema.prop)
    if (isUndefined(property) || !cd.data.dataType) { return '' }
    if (isFunction(property)) { return '' }
    if (get(cd, 'data.dataType') === enums.DataType.integer) {
      err = !(isInteger(property))
    } else if (get(cd, 'data.dataType') === enums.DataType.date) {
      err = !(isDate(property))
    } else if (get(cd, 'data.dataType') === enums.DataType.arrayNumber) {
      if (!isArray(property)) {
        err = true
      } else {
        property.forEach(item => {
          if (typeof item !== enums.DataType.number) { err = true }
        })
      }
    } else if (get(cd, 'data.dataType') === enums.DataType.arrayInteger) {
      if (!isArray(property)) {
        err = true
      } else {
        property.forEach(item => {
          if (!isInteger(item)) { err = true }
        })
      }
    } else if (get(cd, 'data.dataType') === enums.DataType.arrayString) {
      if (!isArray(property)) {
        err = true
      } else {
        property.forEach(item => {
          if (typeof item !== enums.DataType.string) { err = true }
        })
      }
    } else if (get(cd, 'data.dataType') === enums.DataType.arrayObject) {
      if (!isArray(property)) {
        err = true
      } else {
        property.forEach(item => {
          if (!isObject(item)) { err = true }
        })
      }
    } else if (typeof property !== get(cd, 'data.dataType')) {
      err = true
      return { errcode: errs.ErrorCode.wrongDataTypeDefaultValue }
    }
  }
  if (err) {
    return { errcode: errs.ErrorCode.wrongDataTypeDefaultValue }
  } else {
    return ''
  }
}

export const hasValidColumns: IValidatorComponent = (validSchema, component, _schema) => {
  const property = get(component, validSchema.prop)
  const arr: string[] = []
  if (property) {
    property.forEach((el: IDataTableColumnSetting) => {
      const comp = get((component as IComponentSubschema).schema!.components, el.compId)
      const cd = common.checkIsDataComponent(comp)
      if (!cd) {
        arr.push(el.compId)
      }
    })
    if (arr.length > 0) {
      return { errcode: errs.ErrorCode.invalidColumns, addOn: arr.toString() }
    }
  }
  return ''
}

// export const hasValidDataTableColumns: IValidatorComponent = (validSchema, component, schema) => {
// todo const property = component.columns
// let arr: string[] = []
// if (property) {
//   property.forEach((el) => {
//     if (!has(schema.components, el.component)) {
//       arr.push(el.component)
//     }
//   })
//   if (arr.length > 0) {
//     return { errcode: errs.ErrorCode.invalidColumns, addOn: arr.toString() }
//   }

//   arr = []
//   property.forEach((el) => {
//     if (!has(schema.components[el.component], 'data')) {
//       arr.push(el.component)
//     }
//   })

//   if (arr.length > 0) {
//     return { errcode: errs.ErrorCode.notDataFieldColumns, addOn: arr.toString() }
//   }
// }
// return ''
// }

export const itemsInSelect: IValidatorComponent = (_validSchema, component, _schema) => {
  if (has(component, 'data.items')) {
    return fieldValidators.checkItemsInSelect((component as IComponentSelect).data.items, (component as IComponentSelect).data.dataType)
  }
  return ''
}
