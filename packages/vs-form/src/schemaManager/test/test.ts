import { constants, enums, errs, types, SchemaManager } from '../../index'
import * as strings from '../strings'
import listSchemas from '../test-schemas/schemaValidTestList'
const listSchemasArray = Object.keys(listSchemas).map(s => listSchemas[s])

// ==================
// Test Schema
// ==================

let sm: SchemaManager

describe('Schema is not an object', () => {
  it('schema is an array', () => {
    sm = new SchemaManager(listSchemas.schemaNotObject)
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.wrongPropertyType })]))
  })

})

describe('Schema has no components', () => {
  it('has no components', () => {
    sm = new SchemaManager(listSchemas.schemaNoComponents)
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.requiredPropMissing })]))
  })
})

describe('Schema has no root component', () => {

  it('root component has been added', () => {
    sm = new SchemaManager(listSchemas.schemahasNoRootComponent)
    expect(sm.getAllErrors.length).toEqual(0)
    expect(sm.schema.components.root).toEqual(expect.objectContaining({ type: enums.Component.panel, children: ['text1'] }))
  })

  it('root component has been added 2', () => {
    sm = new SchemaManager(listSchemas.schemahasNoRootComponent2)
    expect(sm.getAllErrors.length).toEqual(0)
    expect(sm.schema.components.root).toEqual(expect.objectContaining({ type: enums.Component.panel, children: ['input1', 'text1', 'panel1', 'input3'] }))
  })

  it('root component is there but some children are missing', () => {
    sm = new SchemaManager(listSchemas.schemahasNoRootComponent3)
    sm.checkSchema()
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.fieldsHasNoParent, addOn: 'input3' })]))
  })

})

describe('Schema root Key has wrong type', () => {
  it('Schema root Key has wrong type', () => {
    sm = new SchemaManager(listSchemas.schemaRootKeyWrongType)
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.wrongPropertyType })]))
  })
})

describe('Schema root Key Type', () => {
  it('not a container', () => {
    sm = new SchemaManager(listSchemas.schemaRootKeyTypeWrongType)
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.rootnotContainer })]))
  })

  it('no children', () => {
    sm = new SchemaManager(listSchemas.schemaRootKeyNoChildren)
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.requiredPropMissing, prop: 'components.root.children' })]))
  })

  it('empty children', () => {
    sm = new SchemaManager(listSchemas.schemaRootKeyEmptyChildren)
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.rootChildrenEmpty })]))
  })
})

describe('Schema root Key Children Array bad Types', () => {
  it('array has Integers', () => {
    sm = new SchemaManager(listSchemas.schemaRootKeyChildrenAreBad)
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.wrongPropertyTypeInArray })]))
  })
})

// describe('Schema has an additional invalid prop', () => {
//
//   beforeEach(() => {
//     sm = new SchemaManager(listSchemas.schemahasInvalidProp)
//     // console.log(sm.printErrors())
//   })
//   it('has an additional invalid prop', () => {
//     expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.hasInvalidProp })]))
//   })
// })

describe('Schema has wrong Property type', () => {
  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemaWrongPropertyType)
    sm.checkSchema()
  })
  it('has wrong Property type name', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.wrongPropertyType, prop: 'name' })]))
  })
  it('root key has no type', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.hasNoComponentType, prop: 'type' })]))
  })
})

describe('Recursive SubSchema and recursive Containers', () => {

  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemawithRecursivebSchema1, listSchemasArray)
  })
  it('has recursion', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.possibleRecursion, schemaName: 'schemawithRecursivebSchema1' })]))
  })

  it('has recursive children', () => {
    // console.log('errors1',errors)
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.recursiveChildren })]))
    const err = sm.filterErrors(errs.ErrorCode.recursiveChildren)
    expect(err[0].addOn).toContain('card1')
  })
})

describe('Sub Schema unresolvable', () => {

  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemaUnresolvableSubschema, listSchemasArray)
  })

  it('not found subschema Name', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.subSchemaNotFound })]))
    // let err = sm.filterErrors(errs.ErrorCode.subSchemaNotFound)
    // expect(err[0].addOn).toContain('subNotFound')
  })
})

describe('Sub Schema errors', () => {
  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemaSubSchemaError, listSchemasArray)
    sm.checkSchema()
    // console.log(sm.printErrors())
  })

  it('keyfield defined but not found ', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.subSchemaKeyInvalid, key: 'sub1' })]))
  })

  it('columns not found', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.invalidColumns, key: 'sub1', addOn: 'email1,vText1' })]))
  })

  it('keyfield and columns defined and correct ', () => {
    expect(sm.getAllErrors.filter(e => e.key === 'sub').length).toEqual(0)
  })

  it('no keyfield and columns defined: correct and takes defaults ', () => {
    expect(sm.getAllErrors.filter(e => e.key === 'sub2').length).toEqual(0)
  })

})

describe('Post Validation errors', () => {
  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemaErrorType, listSchemasArray)
    sm.checkSchema()
  })

  it('has duplicate Fields', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.duplicateFields })]))
  })

  it('field has no parent (not in any children array)', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.fieldsHasNoParent })]))
  })

  it('field occures in several parents', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.fieldhasDuplicatesInChildren })]))
    const err = sm.filterErrors(errs.ErrorCode.fieldhasDuplicatesInChildren)
    expect(err[0].addOn).toContain('duplicateParents')
  })

  it('values has field key with no corresponding component', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.valuesKeyHasNoField, addOn: 'fieldHasNoComponent' })]))
  })

})

// ==================
// Test Components
// ==================
describe('Test Components', () => {

  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemaComponentHasNoType)
    // console.log(sm.printErrors())
  })
  it('schema passes first schema check', () => {
    expect(sm.getAllErrors.length).toEqual(0)
  })

  it('component Name has no type', () => {
    sm.checkSchema()
    // console.log(sm.printErrors())
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.hasNoComponentType, key: 'name' })]))
  })
})

describe('Diverse Errors in Components', () => {

  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemaErrorType, listSchemasArray)
    sm.checkSchema()
    // console.log(sm.printErrors())
  })

  it('form tag is allowed only once in the root component', () => {
    // let err = sm.filterErrors(errs.ErrorCode.onlyFormTagForRootComp)
    // console.log('here',err)

    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ addOn: 'formTagnotAllowed', errcode: errs.ErrorCode.onlyFormTagForRootComp })]))
  })

  it('required property (label) missing 1', () => {
    // expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'noLabel', errcode: errs.ErrorCode.labelOrlabelFuncRequired })]))
    // let err = sm.filterErrors(errs.ErrorCode.labelOrlabelFuncRequired)
    // console.log('here',err)

  })

  it('property "field" has wrong type (int statt string)', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'wrongfieldPropertyType', prop: 'data.field', errcode: errs.ErrorCode.wrongPropertyType })]))
  })

  it('has wrong data-type from enum (must be string or number)', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'wrongDataType', prop: 'data.dataType', errcode: errs.ErrorCode.valueNotInEnum })]))
  })

  // it('has wrong html-input-type from enum (text, password, url,...)', () => {
  //   expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'wrongInputType', prop: 'inputType', errcode: errs.ErrorCode.valueNotInEnum })]))
  // })

  it('not in min max bereich', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'wrongDataType', prop: 'gridItem.xl', errcode: errs.ErrorCode.valueNotInEnum })]))
    // let err = sm.getAllErrors.filter((e) => {
    //   return e.errcode === errs.ErrorCode.valueNotInEnum
    // })
    // console.log('here',err)
  })

  it('has useless property (which is not in valid schema)', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'hasUselessProperty', prop: 'uselessProperty', errcode: errs.ErrorCode.hasInvalidProp })]))
    // let err = sm.getAllErrors.filter((e) => {
    //   return e.errcode === errs.ErrorCode.hasInvalidProp
    // })
    // console.log('here',err)
  })

  it('card with no children', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'cardEmpty', errcode: errs.ErrorCode.noChildrenKeys })]))
  })

  it('has card with invalid children (non existant keys)', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'cardWrongKeys', errcode: errs.ErrorCode.invalidChildrenKeys })]))
  })

  it('has tabs with wrong children (only tab allowed)', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'tabHasNotTabAsChildren', errcode: errs.ErrorCode.invalidTabsKeys })]))

  })
  // it('card has tab as chidren (not allowed)', () => {
  //   expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'cardHasTabAsChildren', errcode: errs.ErrorCode.notAllowedChildren })]))
  //   // let err = sm.getAllErrors.filter((e) => {
  //   //   return e.errcode === errs.ErrorCode.notAllowedChildren
  //   // })
  //   // console.log('here',err)
  // })

  it('has wrong default value', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'wrongDefaultValue', errcode: errs.ErrorCode.wrongDataTypeDefaultValue })]))
  })

  it('has wrong date default value', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'wrongDefaultValueDate', errcode: errs.ErrorCode.wrongDataTypeDefaultValue })]))
  })

  it('has wrong time default value', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'wrongDefaultValueTime', errcode: errs.ErrorCode.wrongDataTypeDefaultValue })]))
  })

  it('select field must have datatype string or number', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'selectWrong', errcode: errs.ErrorCode.valueNotInEnum })]))
  })

  it('select field with no items', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'selectWrong', prop: 'data.items', errcode: errs.ErrorCode.requiredPropMissing })]))
  })

  // it('select with empty array items', () => {
  // expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({key: 'selectItemsEmptyArray', prop: 'data.items', errcode: errs.ErrorCode.valueSmallerThanMin})]))
  // })

  it('radio group must have datatype string or number', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'radioWrong', errcode: errs.ErrorCode.valueNotInEnum })]))
  })

  it('checkbox must have datatype boolean', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'checkboxWrong', errcode: errs.ErrorCode.valueNotInEnum })]))
  })

  it('data table with empty columns', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'tableWrongEmptyColumns', errcode: errs.ErrorCode.valueSmallerThanMin })]))
  })

  it('data table with columns are not objects', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'tableWrongWrongColumnsType', prop: 'columns', errcode: errs.ErrorCode.wrongPropertyTypeInArray })]))
  })

  it('textCorrect is correct text field', () => {
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'textCorrect' })]))
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'textCorrect' })]))
  })

  // it('data table with columns that are not components', () => {
  //   expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({key: 'tableWrong1', errcode: errs.ErrorCode.invalidColumns})]))
  // })

  // it('data table with columns that are not data-bound fields', () => {
  //   expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({key: 'tableWrong2', errcode: errs.ErrorCode.notDataFieldColumns})]))
  // })

  it('data table with columns align not in enum', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'tableWrong1', prop: 'columns.align', errcode: errs.ErrorCode.valueNotInEnum })]))
  })

  it('data table: object in array has invalid prop', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'tableWrong1', errcode: errs.ErrorCode.hasInvalidProp })]))
  })

})

describe('grid item settings ', () => {

  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemaErrorType, listSchemasArray)
    sm.checkSchema()
  })
  it('wrong xl... sizes', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'gridSizeWrong', prop: 'gridItem.xl', errcode: errs.ErrorCode.valueNotInEnum })]))
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'gridSizeWrong', prop: 'gridItem.lg', errcode: errs.ErrorCode.valueNotInEnum })]))
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'gridSizeWrong', prop: 'gridItem.md', errcode: errs.ErrorCode.valueNotInEnum })]))
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'gridSizeWrong', prop: 'gridItem.sm', errcode: errs.ErrorCode.valueNotInEnum })]))
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'gridSizeWrong', prop: 'gridItem.xs', errcode: errs.ErrorCode.valueNotInEnum })]))
    // const err = sm.filterErrors(errs.ErrorCode.valueNotInEnum)
    // tslint:disable-next-line:no-console
    // console.log(err)

  })
  it('wrong xl... sizes 2', () => {
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'gridSizeWrong2', prop: 'gridItem.xl', errcode: errs.ErrorCode.valueNotInEnum })]))
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'gridSizeWrong2', prop: 'gridItem.lg', errcode: errs.ErrorCode.valueNotInEnum })]))
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'gridSizeWrong2', prop: 'gridItem.md', errcode: errs.ErrorCode.valueNotInEnum })]))
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'gridSizeWrong2', prop: 'gridItem.sm', errcode: errs.ErrorCode.valueNotInEnum })]))
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'gridSizeWrong2', prop: 'gridItem.xs', errcode: errs.ErrorCode.valueNotInEnum })]))

  })
  it('wrong parent props', () => {
    // const err = sm.filterErrors(errs.ErrorCode.valueNotInEnum)
    // // tslint:disable-next-line:no-console
    // console.log(err)
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'gridParentWrong1', prop: 'gridContainer.alignContent', errcode: errs.ErrorCode.valueNotInEnum })]))
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'gridParentWrong1', prop: 'gridContainer.alignItems', errcode: errs.ErrorCode.valueNotInEnum })]))
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'gridParentWrong1', prop: 'gridContainer.direction', errcode: errs.ErrorCode.valueNotInEnum })]))
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'gridParentWrong1', prop: 'gridContainer.justify', errcode: errs.ErrorCode.valueNotInEnum })]))
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'gridParentWrong1', prop: 'gridContainer.spacing', errcode: errs.ErrorCode.valueNotInEnum })]))
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'gridParentWrong1', prop: 'gridContainer.wrap', errcode: errs.ErrorCode.valueNotInEnum })]))
  })
  it('wrong parent props 2', () => {
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'gridParentWrong2', prop: 'gridContainer.alignContent', errcode: errs.ErrorCode.valueNotInEnum })]))
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'gridParentWrong2', prop: 'gridContainer.alignItems', errcode: errs.ErrorCode.valueNotInEnum })]))
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'gridParentWrong2', prop: 'gridContainer.direction', errcode: errs.ErrorCode.valueNotInEnum })]))
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'gridParentWrong2', prop: 'gridContainer.justify', errcode: errs.ErrorCode.valueNotInEnum })]))
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'gridParentWrong2', prop: 'gridContainer.spacing', errcode: errs.ErrorCode.valueNotInEnum })]))
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'gridParentWrong2', prop: 'gridContainer.wrap', errcode: errs.ErrorCode.valueNotInEnum })]))
  })

})

describe('input prefix and suffix ', () => {

  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemaErrorType, listSchemasArray)
    sm.checkSchema()
  })
  it('prefix has wrong type', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'prefixStringOrArray', errcode: errs.ErrorCode.typeStringOrArray })]))
  })

  it('suffix has wrong type', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'suffixStringOrArray', errcode: errs.ErrorCode.typeStringOrArray })]))
  })

  it('prefix not found', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'prefixCompNotFound', errcode: errs.ErrorCode.compNotFound })]))
  })

  it('suffix not found', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'suffixCompNotFound', errcode: errs.ErrorCode.compNotFound })]))
  })

  it('prefix not found array', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'prefixCompNotFoundArray', errcode: errs.ErrorCode.compNotFound })]))
  })

  it('suffix not found array', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'suffixCompNotFoundArray', errcode: errs.ErrorCode.compNotFound })]))
  })

  it('prefix wrong component-type (not text or button)', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'prefixInvalidType', errcode: errs.ErrorCode.invalidPrefixType })]))
  })

  it('suffix wrong component-type (not text or button)', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'suffixInvalidType', errcode: errs.ErrorCode.invalidPrefixType })]))
  })

  it('suffix and prefix wrong component-type', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'suffixPrefixInvalidType', prop: 'prefix', errcode: errs.ErrorCode.invalidPrefixType })]))
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'suffixPrefixInvalidType', prop: 'suffix', errcode: errs.ErrorCode.invalidPrefixType })]))
  })

  it('prefix correct', () => {
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'prefixCompNotFoundCorrect', errcode: errs.ErrorCode.compNotFound })]))
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'prefixCompNotFoundCorrect', errcode: errs.ErrorCode.invalidPrefixType })]))
  })

})

describe('Icons ', () => {
  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemaErrorType, listSchemasArray)
    sm.checkSchema()
  })

  it('icon needs Icon Or Svg property', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'iconNoIconOrSvg', errcode: errs.ErrorCode.iconOrSvg })]))
  })

  it('icon has Icon property', () => {
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'iconHasIcon', errcode: errs.ErrorCode.iconOrSvg })]))
  })

  it('icon has Svg property', () => {
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'iconHasSVG', errcode: errs.ErrorCode.iconOrSvg })]))
  })

  it('icon has component property', () => {
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'iconHasComponent', errcode: errs.ErrorCode.iconOrSvg })]))
  })

})

describe('Text Masks ', () => {

  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemaErrorType, listSchemasArray)
    sm.checkSchema()
  })

  it('only in input', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'maskOnlyInMaskInputComponent', errcode: errs.ErrorCode.hasInvalidProp })]))
    // const f = sm.getAllErrors.filter((e) => e.key === 'maskOnlyInInputComponent')
    // tslint:disable-next-line:no-console
    // console.log(f)
  })

  // it('inputtype must be text', () => {
  //   expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'maskOnlyInInputTextComponent', errcode: errs.ErrorCode.maskOnlyInInputTextComponent })]))
  // })

  it('not in multiline text', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'maskNotMultilineInput', errcode: errs.ErrorCode.maskNotMultilineInput })]))
  })

  it('items in array string or regex', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'maskArrayItemsStringOrRegExp', errcode: errs.ErrorCode.maskArrayItemsStringOrRegExp })]))
  })

  it('mask is array or function', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'maskArrayOrFunction1', errcode: errs.ErrorCode.maskArrayOrFunction })]))
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'maskArrayOrFunction2', errcode: errs.ErrorCode.maskArrayOrFunction })]))
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'maskArrayOrFunctionCorrect', errcode: errs.ErrorCode.maskArrayOrFunction })]))
  })
})

describe('Formatted Numbers ', () => {

  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemaErrorType, listSchemasArray)
    sm.checkSchema()
  })

  it('only in numberFormat', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'numberFormatwrongType', errcode: errs.ErrorCode.hasInvalidProp })]))
  })

  it('must have numberFormatProps', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'numberFormatNoProps', errcode: errs.ErrorCode.requiredPropMissing })]))
  })

  it('datatype number or integer', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'numberFormatwrongDataType', prop: 'data.dataType', errcode: errs.ErrorCode.valueNotInEnum })]))
  })

  it('format stringOrFunction', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'numberFormatwrongFormat', prop: 'numberFormatProps.format', errcode: errs.ErrorCode.stringOrFunction })]))
  })

  it('format stringOrFunction', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'numberFormatwrongMask', prop: 'numberFormatProps.mask', errcode: errs.ErrorCode.typeStringOrArray })]))
  })
})

describe('Styles object', () => {

  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemaErrorType, listSchemasArray)
    sm.checkSchema()
  })

  it('styles wrong type', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'styleWrongType', prop: 'styles', errcode: errs.ErrorCode.wrongPropertyType })]))
  })

  it('single style not an object', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'stylesNotObject', prop: 'styles.color', errcode: errs.ErrorCode.styleMustBeObject })]))
  })

  // it('style-attribute should not be an object', () => {
  //   expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'stylesAttrWrong', prop: 'styles.root.button', errcode: errs.ErrorCode.styleAttrNotObject })]))
  // })

  it('style correct', () => {
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'stylesCorrect', prop: 'styles', errcode: errs.ErrorCode.wrongPropertyType })]))
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'stylesCorrect', errcode: errs.ErrorCode.styleMustBeObject })]))
  })

})

describe('Property string or function ', () => {

  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemaErrorType, listSchemasArray)
    sm.checkSchema()
  })

  it('text prop wrong type', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'textWrongTextType', prop: 'text', errcode: errs.ErrorCode.wrongPropertyType })]))
  })

  // it('text no text prop', () => {
  //   expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'textWrongNoType', errcode: errs.ErrorCode.textOrtextFuncRequired })]))
  // })

  // it('text and textfunc prop', () => {
  //   expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'textFuncAndText', errcode: errs.ErrorCode.textAndtextFuncWarning })]))
  // })

  it('text prop correct type', () => {
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'textCorrectTextType', prop: 'text', errcode: errs.ErrorCode.wrongPropertyType })]))
  })

  it('text prop correct function', () => {
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'textCorrectTextFunctionType', prop: 'text', errcode: errs.ErrorCode.wrongPropertyType })]))
  })
  it('text prop resolves function correctly', () => {
    const comp = sm.schema.components.textCorrectTextFunctionType as types.IComponentText
    sm.resolvePropertyFunctions(comp)
    expect(comp.text).toEqual('hello textCorrectTextFunctionType')
  })
  it('items select prop resolves function correctly', () => {
    const comp = sm.schema.components.itemsSelectCorrectFunctionType as types.IComponentSelect
    sm.resolvePropertyFunctions(comp)
    expect(comp.data.items).toEqual([{ value: '1', text: '1' }, { value: '2', text: '2' }])
  })

  it('text prop correct type', () => {
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'textCorrectTextType', prop: 'text', errcode: errs.ErrorCode.wrongPropertyType })]))
  })

  it('label prop wrong type', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'labelWrongType', prop: 'label', errcode: errs.ErrorCode.wrongPropertyType })]))
  })

  // it('label string or func required', () => {
  //   expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'labelStringOrFunc', errcode: errs.ErrorCode.labelOrlabelFuncRequired })]))
  //   // const err = sm.filterErrors(errs.ErrorCode.labelOrlabelFuncRequired)
  //   // tslint:disable-next-line:no-console
  //   // console.log(err)

  // })

  it('label prop correct function type', () => {
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'labelCorrectFunctionType', prop: 'label', errcode: errs.ErrorCode.wrongPropertyType })]))
    // expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'labelCorrectFunctionType', errcode: errs.ErrorCode.labelOrlabelFuncRequired })]))
  })

  it('label prop resolves function correctly', () => {
    const comp = sm.schema.components.labelCorrectFunctionType  as types.IComponentSelect
    sm.resolvePropertyFunctions(comp)
    expect(comp.label).toEqual('hello labelCorrectFunctionType')
    expect(comp.hint).toEqual('hello labelCorrectFunctionType')
    expect(comp.tooltip).toEqual('hello labelCorrectFunctionType')
    expect(comp.placeholder).toEqual('hello labelCorrectFunctionType')
  })

  // it('label and labelFunc Warning', () => {
  //   expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'labelANdlabelFunc', errcode: errs.ErrorCode.labelAndlabelFuncWarning })]))
  //   expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'labelANdlabelFuncBtn', errcode: errs.ErrorCode.labelAndlabelFuncWarning })]))
  // })
  // it('hint and hintFunc Warning', () => {
  //   expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'hintAndHintFunc', errcode: errs.ErrorCode.hintAndhintFuncWarning })]))
  // })
  // it('tooltip and tooltipFunc Warning', () => {
  //   expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'tooltipAndtooltipFunc', errcode: errs.ErrorCode.tooltipAndtooltipFuncWarning })]))
  // })

})

describe('Speed dial component ', () => {

  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemaErrorType, listSchemasArray)
    sm.checkSchema()
  })

  it('no actions defined', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'speedDialNoActions', errcode: errs.ErrorCode.requiredPropMissing, prop: 'actions' })]))
  })

  it('actions wrong type', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'speedDialActionsWrong', errcode: errs.ErrorCode.wrongPropertyType, prop: 'actions' })]))
    // let err = sm.getAllErrors.filter((e) => {
    //   return e.key === 'speedDialActionsWrong'
    // })
    // console.log('here',err)
  })
  it('actions empty', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'speedDialEmptyActions', errcode: errs.ErrorCode.arrayIsEmpty })]))
  })

  it('items in arrray are not objects', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'speedDialActionsWrongInArray', errcode: errs.ErrorCode.speedDialActionObject, itemNo: '1' })]))
    // let err = sm.getAllErrors.filter((e) => {
    //   return e.key === 'speedDialActionsWrongInArray'
    // })
    // console.log('here',err)
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'speedDialActionsWrongInArray2', errcode: errs.ErrorCode.speedDialActionObject, itemNo: '2' })]))

  })

  it('items in arrray: props missing', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'speedDialActionsWrongInArrayPropMissing', errcode: errs.ErrorCode.requiredPropMissing, itemNo: '1', addOn: 'prop: tooltip' })]))
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'speedDialActionsWrongInArrayPropMissing2', errcode: errs.ErrorCode.requiredPropMissing, itemNo: '2', addOn: 'prop: tooltip' })]))
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'speedDialActionsWrongInArrayPropMissing3', errcode: errs.ErrorCode.requiredPropMissing, itemNo: '2', addOn: 'prop: icon' })]))
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'speedDialActionsWrongInArrayPropMissing4', errcode: errs.ErrorCode.requiredPropMissing, itemNo: '2', addOn: 'prop: onClick', type: types.SchemaErrorType.warning })]))
  })

  it('items in arrray: props wrong', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'speedDialActionsWrongInArrayPropWrong1', errcode: errs.ErrorCode.wrongPropertyTypeInArray, itemNo: '1', addOn: 'prop: icon' })]))
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'speedDialActionsWrongInArrayPropWrong2', errcode: errs.ErrorCode.wrongPropertyTypeInArray, itemNo: '2', addOn: 'prop: tooltip' })]))
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'speedDialActionsWrongInArrayPropWrong3', errcode: errs.ErrorCode.wrongPropertyTypeInArray, itemNo: '2', addOn: 'prop: onClick' })]))
  })

  it('correct def', () => {
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'speedDialActionsCorrect' })]))

  })

})

describe('Select Items ', () => {

  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemaErrorType, listSchemasArray)
    sm.checkSchema()
  })
  it('Items in select must be either string, number or an object', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'selectItemStringOrNumber', errcode: errs.ErrorCode.selectItemsMustBeObjects })]))
  })

  it('If Items in select is string array then must be dataType string', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'stringArrayDataTypeString', errcode: errs.ErrorCode.selectItemsMustBeObjects })]))
    expect(sm.getAllErrors).not.toEqual(expect.arrayContaining([expect.objectContaining({ key: 'stringArrayDataTypeStringOk', errcode: errs.ErrorCode.selectItemsMustBeObjects })]))
  })

  // it('All Items in select must be of the same type', () => {
  //   expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({key: 'selectItemStringOrNumber2', errcode: errs.ErrorCode.selectItemsMustBeSameType})]))
  // })

  it('All Items in select must have a text and a value property', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'selectItem3', errcode: errs.ErrorCode.selectItemsMustHaveValueAndText })]))
  })

  it('All Item-Values must have the type defined in the datatype (string)', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'selectItem4', errcode: errs.ErrorCode.selectItemsMustHaveCorrectDataType })]))
  })

  it('All Item-Values must have the type defined in the datatype (number)', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'selectItem5', errcode: errs.ErrorCode.selectItemsMustHaveCorrectDataType })]))
  })

  // it('All Item-Values must be unique', () => {
  //   // expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'selectItem6', errcode: errs.ErrorCode.selectItemsUnique })]))
  //   // tslint:disable-next-line:no-console
  //   console.log(sm.filterErrors(errs.ErrorCode.selectItemsUnique))
  // })

  it('All Item-Values must be unique (object)', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'selectItem7', errcode: errs.ErrorCode.selectItemsUnique })]))
  })

  it('All Item-Texts must be string', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'selectItem8', errcode: errs.ErrorCode.selectItemsTextMusBeString })]))
  })

  it('Only one Item should have empty string', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'selectItem9', errcode: errs.ErrorCode.selectItemsTextOnlyOneEmpty })]))
  })

  it('Text in items are not unique', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'selectItem10', type: types.SchemaErrorType.warning, errcode: errs.ErrorCode.selectItemsTextNotUnique })]))
  })
})

describe('Sub Schema with errors', () => {

  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemaWithSubSchema1, listSchemasArray)
    sm.checkSchema()
  })

  it('has subschema with a component with InvalidProp property', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'subError.email', prop: 'wrongProperty', errcode: errs.ErrorCode.hasInvalidProp })]))
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'subError.email', prop: 'data.wrongProperty2', errcode: errs.ErrorCode.hasInvalidProp })]))
  })

  it('required property (label) missing 2', () => {
    // expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'subError.vorname', prop: 'label', errcode: errs.ErrorCode.labelOrlabelFuncRequired })]))
    // expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.labelOrlabelFuncRequired })]))
  })

  it('property "field" has wrong type (int statt string)', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'subError.vorname', prop: 'data.field', errcode: errs.ErrorCode.wrongPropertyType })]))
  })

  it('has wrong data-type from enum (must be string or number)', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'subError.vorname', prop: 'data.dataType', errcode: errs.ErrorCode.valueNotInEnum })]))
  })

  it('not in min max bereich', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'subError.vorname', prop: 'gridItem.xs', errcode: errs.ErrorCode.valueNotInEnum })]))
  })

  it('card with no children', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'subError.cardEmpty', errcode: errs.ErrorCode.noChildrenKeys })]))
  })

  it('has card with invalid children (non existant keys)', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ key: 'subError.cardWrongKeys', errcode: errs.ErrorCode.invalidChildrenKeys })]))
  })

  it('column settings for subschema wrong', () => {
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.invalidColumns, addOn: 'tubel' })]))
    // tslint:disable-next-line:no-console
    // console.log(sm.printErrors())
    // expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.requiredPropMissing, prop: 'columnSettings.autowidth' })]))
    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.wrongPropertyType, prop: 'columnSettings.width' })]))
  })

  it('values has no field key with corresponding component', () => {
    // let err = sm.filterErrors(errs.ErrorCode.valuesKeyHasNoField)
    // console.log('here',err)

    expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.valuesKeyHasNoField, addOn: 'sub.noField,sub.thisnoFieldToo' })]))
  })

})

it('schema with this name not found', () => {

  sm = new SchemaManager('namenot present', listSchemasArray)
  expect(sm.getAllErrors.length).toEqual(1)
  expect(sm.getAllErrors).toEqual(expect.arrayContaining([expect.objectContaining({ errcode: errs.ErrorCode.schemaNotFound })]))
})

describe('Correct simple schema', () => {

  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemaCorrectSimple, listSchemasArray)
    sm.checkSchema()
    // console.log('errors', sm.getAllErrors)
  })
  it('is correct', () => {
    expect(sm.getAllErrors.length).toEqual(0)
  })

  it('check datastate', () => {
    expect(sm.dataStateChanged).toEqual(false)
  })

  it('datastate doesnt change on update field and value is = old value', () => {
    sm.updateValue('text2', '')
    expect(sm.dataStateChanged).toEqual(false)

    sm.updateValue('radiogroup', 2)
    expect(sm.dataStateChanged).toEqual(false)

    sm.updateValue('select1', '1')
    expect(sm.dataStateChanged).toEqual(false)

  })

  // it('buttons with actions states save and cancel are disabled', () => {
  //   expect(!!sm.schema.components.btnOk.disabled).toEqual(true)
  // })

  it('datastate change on update field', () => {
    sm.updateValue('select1', '2')
    expect(sm.dataStateChanged).toEqual(true)
  })

  // it('buttons with actions states save and cancel are enabled', () => {
  //   expect(!!sm.schema.components.btnOk.disabled).toEqual(false)
  // })

})

describe('Correct schema', () => {

  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemaCorrectType, listSchemasArray)
    sm.checkSchema()
    // tslint:disable-next-line:no-console
    // console.log(sm.printErrors())
  })
  it('is correct', () => {
    expect(sm.getAllErrors.length).toEqual(0)
  })
  it('find component by id', () => {
    const comp = sm.getComponentById('age')
    // expect(comp).to.be.an('object')
    expect(comp!.node!).toEqual('age')
    // expect(comp).toHaveProperty('id')
  })
  it('find component by id in subschema', () => {
    let comp = sm.getComponentById('sub.email')
    // expect(comp).to.be.an('object')
    comp = sm.getComponentById('duplicateSub.phone')
    // expect(comp).to.be.an('object')
    expect(comp!.node!).toEqual('phone')
  })
  it('find component by id in sub-subschema', () => {
    const comp = sm.getComponentById('sub_with_sub.sub.email')
    // expect(comp).to.be.an('object')
    expect(comp!.node!).toEqual('email')
  })

  it('find schema by id', () => {
    const schema = sm.getSchemaFromComponentId('age')
    // tslint:disable-next-line:no-unused-expression
    expect(schema).toBeDefined
    // expect(schema!.components!.age).to.be.an('object')
  })

  it('find subschema by id', () => {
    let schema = sm.getSchemaFromComponentId('sub.email')
    // tslint:disable-next-line:no-unused-expression
    expect(schema).toBeDefined
    // expect(schema).to.be.an('object')
    // expect(schema!.components!.email).to.be.an('object')

    schema = sm.getSchemaFromComponentId('duplicateSub.email')
    // tslint:disable-next-line:no-unused-expression
    expect(schema).toBeDefined
    // expect(schema).to.be.an('object')
    // expect(schema!.components!.email).to.be.an('object')

  })

  it('find sub-subschema by id', () => {
    const schema = sm.getSchemaFromComponentId('sub_with_sub.sub.email')
    // tslint:disable-next-line:no-unused-expression
    expect(schema).toBeDefined
    // expect(schema).to.be.an('object')
    // expect(schema!.components!.email).to.be.an('object')
  })

  it('find original schema by id', () => {
    let schema = sm.getOrigSchemaFromComponentId('age')
    // expect(schema).to.be.an('object')
    // expect(schema!.components!.age).to.be.an('object')
    expect(schema!.components!.age).not.toHaveProperty('id')

    schema = sm.getOrigSchemaFromComponentId('sub.email')
    // expect(schema).to.be.an('object')
    // expect(schema!.components!.email).to.be.an('object')
    expect(schema!.components!.email).not.toHaveProperty('id')

    schema = sm.getOrigSchemaFromComponentId('duplicateSub.email')
    // expect(schema).to.be.an('object')
    // expect(schema!.components!.email).to.be.an('object')
    expect(schema!.components!.email).not.toHaveProperty('id')

    schema = sm.getOrigSchemaFromComponentId('sub_with_sub.sub.email')
    // expect(schema).to.be.an('object')
    // expect(schema!.components!.email).to.be.an('object')
    expect(schema!.components!.email).not.toHaveProperty('id')

  })

  it('find original component by id', () => {
    let comp = sm.getOrigComponentById('age')
    // expect(comp).to.be.an('object')
    expect(comp).toHaveProperty('data')
    expect(comp).not.toHaveProperty('id')

    comp = sm.getOrigComponentById('sub.email')
    // expect(comp).to.be.an('object')
    expect(comp).toHaveProperty('data')
    expect(comp).not.toHaveProperty('id')

    comp = sm.getOrigComponentById('sub_with_sub.sub.email')
    // expect(comp).to.be.an('object')
    expect(comp).toHaveProperty('data')
    expect(comp).not.toHaveProperty('id')
  })

  it('select items string array get converted', () => {
    const comp = sm.getComponentById('selectItemsStringArray')
    expect(comp).toHaveProperty('data.items')
    // @ts-ignore
    expect(comp.data.items).toEqual(expect.arrayContaining([{value: 'fritz', text: 'fritz'}]))
    // @ts-ignore
    expect(comp.data.items).toEqual(expect.arrayContaining([{value: 'car', text: 'car'}]))
  })

  it('select items string array in origSchema get not converted', () => {
    const comp = sm.getOrigComponentById('selectItemsStringArray')
    // @ts-ignore
    expect(comp.data.items).toEqual(['fritz', 'franz', 'albert', 'car'])
  })

  it('radiogroup items string array get converted', () => {
    const comp = sm.getComponentById('rgItemsStringArray')
    expect(comp).toHaveProperty('data.items')
    // @ts-ignore
    expect(comp.data.items).toEqual(expect.arrayContaining([{value: 'fritz', text: 'fritz'}]))
    // @ts-ignore
    expect(comp.data.items).toEqual(expect.arrayContaining([{value: 'car', text: 'car'}]))
  })

  it('radiogroup items string array in origSchema get not converted', () => {
    const comp = sm.getOrigComponentById('rgItemsStringArray')
    // @ts-ignore
    expect(comp.data.items).toEqual(['fritz', 'franz', 'albert', 'car'])
  })

  it('schema has subschemas', () => {
    const hasSubschema = SchemaManager.hasSubschema(sm.schema)
    expect(hasSubschema).toEqual(true)
  })

  it('schema has no subschemas', () => {
    const hasSubschema = SchemaManager.hasSubschema(listSchemas.schemahasNoRootComponent)
    expect(hasSubschema).toEqual(false)
  })

})

describe('values subschema array ', () => {

  beforeAll(() => {
    sm = new SchemaManager(listSchemas.schemaCorrectSimple, listSchemasArray)
  })
  it('insert record in subschema', () => {
    const comp = sm.getComponentById('subArray') as types.IComponent
    expect(sm.getSchemaValue(comp).length).toEqual(0)
    sm.insertSubschemaArrayRecord(comp)
    expect(sm.getSchemaValue(comp).length).toEqual(1)
    expect(sm.getSchemaValue(comp)).toEqual(expect.arrayContaining([expect.objectContaining({ [constants.arrayKeyField]: 1, slider: null, email: '', validateText: '' })]))
  })
  it('validations fails', () => {
    const comp = sm.getComponentById('subArray') as types.IComponent
    const arr = sm.getSchemaValue(comp)
    const errors = sm.validateValueComp(comp, arr)
    // tslint:disable-next-line:no-unused-expression
    expect(errors.length > 0).toBeTruthy
  })

  it('validation is ok after set values', () => {
    const comp = sm.getComponentById('subArray') as types.IComponent
    const arr = sm.getSchemaValue(comp)
    const r = arr[0]
    r['email'] = 'sone'
    r['slider'] = 10
    r['validateText'] = 'abc'
    const errors = sm.validateValueComp(comp, arr)
    expect(errors.length).toEqual(0)
  })

  it('validations whole form fails', () => {
    sm.validateValuesSchema()
    // tslint:disable-next-line:no-unused-expression
    expect(sm.validationErrors.length > 0).toBeTruthy
  })

  it('validation whole form is ok after set all values', () => {
    sm.updateValue('text1', 'hallo')
    sm.updateValue('sub.email', 'some')
    sm.updateValue('sub.slider', 10)
    sm.updateValue('sub.validateText', 'hallo')
    // const comp = sm.getComponentById('subArray') as types.IComponent
    // const arr = sm.getSchemaValue(comp)
    // console.log(JSON.stringify(arr, null, 2))

    sm.validateValuesSchema()
    expect(sm.validationErrors.length).toEqual(0)
  })

  it('temp array id has been removed after save', () => {
    const res = sm.submit()
    // tslint:disable-next-line:no-unused-expression
    expect(res).toBeTruthy

    const comp = sm.getComponentById('subArray') as types.IComponent
    const arr = sm.getSchemaValue(comp)
    const r = arr[0]
    expect(r).toEqual({email: 'sone', phone: '01 23', slider: 10, validateText: 'abc'})
  })
})

describe('Validate Values (validation-Method = validate on Submit)', () => {

  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemaCorrectType, listSchemasArray)
    // validateOnSubmit !
    sm.schema.validationMethod = enums.ValidationMethod.validateOnSubmit
  })

  it('wrong Data Type for text field', () => {
    sm.updateValue('validateRequired1', 10)
    expect(sm.getValue('validateRequired1')).toEqual(10)
    sm.validateValuesSchema()
    // tslint:disable-next-line:no-console
    // console.log(sm.printValueErrors())
    expect(sm.getValueErrorsForTest()).toEqual(expect.arrayContaining([{ field: 'validateRequired1', msg: strings.errorMessagesFields.wrongDataType }]))
  })

  it('required string missing', () => {
    sm.updateValue('validateRequired1', '')
    expect(sm.getValue('validateRequired1')).toEqual('')
    sm.validateValuesSchema()
    expect(sm.getValueErrorsForTest()).toEqual(expect.arrayContaining([{ field: 'validateRequired1', msg: 'Required string' + strings.errorMessagesFields.required }]))

    sm.updateValue('validateRequired1', 'tilt')
    expect(sm.getValue('validateRequired1')).toEqual('tilt')
    sm.validateValuesSchema()
    // console.log(sm.getValueErrorsForTest())
  })

  it('required string corrected', () => {
    sm.updateValue('validateRequired1', 'tilt')
    expect(sm.getValue('validateRequired1')).toEqual('tilt')
    sm.validateValuesSchema()
    expect(sm.getValueErrorsForTest()).not.toEqual(expect.arrayContaining([expect.objectContaining({ field: 'validateRequired1' })]))
  })

  it('wrong Data Type for number field', () => {
    sm.updateValue('validateRequired2', '10')
    expect(sm.getValue('validateRequired2')).toEqual('10')
    sm.validateValuesSchema()
    expect(sm.getValueErrorsForTest()).toEqual(expect.arrayContaining([{ field: 'validateRequired2', msg: strings.errorMessagesFields.wrongDataType }]))
  })

  it('required number is 0', () => {
    sm.updateValue('validateRequired2', 0)
    expect(sm.getValue('validateRequired2')).toEqual(0)
    sm.validateValuesSchema()
    expect(sm.getValueErrorsForTest()).toEqual(expect.arrayContaining([{ field: 'validateRequired2', msg: 'Required Number' + strings.errorMessagesFields.required }]))
  })

  it('required string corrected', () => {
    sm.updateValue('validateRequired2', 10.7)
    expect(sm.getValue('validateRequired2')).toEqual(10.7)
    sm.validateValuesSchema()
    expect(sm.getValueErrorsForTest()).not.toEqual(expect.arrayContaining([expect.objectContaining({ field: 'validateRequired2' })]))
  })

  it('string is not ion allowed values', () => {
    sm.updateValue('validateAllowedValues', 'tilt')
    expect(sm.getValue('validateAllowedValues')).toEqual('tilt')
    sm.validateValuesSchema()
    expect(sm.getValueErrorsForTest()).toEqual(expect.arrayContaining([{ field: 'validateAllowedValues', msg: strings.errorMessagesFields.allowedValues }]))
  })

  it('string in allowed values', () => {
    sm.updateValue('validateAllowedValues', 'hans')
    expect(sm.getValue('validateAllowedValues')).toEqual('hans')
    sm.validateValuesSchema()
    expect(sm.getValueErrorsForTest()).not.toEqual(expect.arrayContaining([expect.objectContaining({ field: 'validateAllowedValues', msg: strings.errorMessagesFields.allowedValues })]))
  })

  it('validate with function', () => {
    sm.updateValue('validateWithFunction', 'hans')
    expect(sm.getValue('validateWithFunction')).toEqual('hans')
    sm.validateValuesSchema()
    expect(sm.getValueErrorsForTest()).toEqual(expect.arrayContaining([{ field: 'validateWithFunction', msg: 'Du Tubel' }]))
    // console.log(sm.getValueErrorsForTest())
  })

  it('validate with function correct', () => {
    sm.updateValue('validateWithFunction', 'tubel')
    sm.validateValuesSchema()
    expect(sm.getValueErrorsForTest()).not.toEqual(expect.arrayContaining([expect.objectContaining({ field: 'validateWithFunction', msg: 'Du Tubel' })]))
    // console.log(sm.getValueErrorsForTest())
  })

  it('validate min and max with number', () => {
    sm.updateValue('validateWMinMaxNumber', 2)
    sm.validateValuesSchema()
    expect(sm.getValueErrorsForTest()).toEqual(expect.arrayContaining([{ field: 'validateWMinMaxNumber', msg: strings.errorMessagesFields.minValueNumber + '3' }]))
    // console.log(sm.getValueErrorsForTest())
    sm.updateValue('validateWMinMaxNumber', 21)
    sm.validateValuesSchema()
    expect(sm.getValueErrorsForTest()).toEqual(expect.arrayContaining([{ field: 'validateWMinMaxNumber', msg: strings.errorMessagesFields.maxValueNumber + '20' }]))

    sm.updateValue('validateWMinMaxNumber', 12)
    sm.validateValuesSchema()
    expect(sm.getValueErrorsForTest()).not.toEqual(expect.arrayContaining([expect.objectContaining({ field: 'validateWMinMaxNumber' })]))
  })

  it('validate min and max with string', () => {
    sm.updateValue('validateWMinMaxString', 'hi')
    sm.validateValuesSchema()
    expect(sm.getValueErrorsForTest()).toEqual(expect.arrayContaining([{ field: 'validateWMinMaxString', msg: strings.errorMessagesFields.minValueString + '3' }]))
    // console.log(sm.getValueErrorsForTest())
    sm.updateValue('validateWMinMaxString', 'was geht alter')
    sm.validateValuesSchema()
    expect(sm.getValueErrorsForTest()).toEqual(expect.arrayContaining([{ field: 'validateWMinMaxString', msg: strings.errorMessagesFields.maxValueString + '5' }]))

    sm.updateValue('validateWMinMaxString', 'gut')
    sm.validateValuesSchema()
    expect(sm.getValueErrorsForTest()).not.toEqual(expect.arrayContaining([expect.objectContaining({ field: 'validateWMinMaxString' })]))
  })

  it('validate regex alphanumeric letters, no leading numbers', () => {
    sm.updateValue('validateRegexAlphaNoLeadingNumbers', '3hi')
    sm.validateValuesSchema()
    expect(sm.getValueErrorsForTest()).toEqual(expect.arrayContaining([{ field: 'validateRegexAlphaNoLeadingNumbers', msg: strings.errorMessagesFields.regexNotMatch }]))

    sm.updateValue('validateRegexAlphaNoLeadingNumbers', 'hi')
    sm.validateValuesSchema()
    expect(sm.getValueErrorsForTest()).not.toEqual(expect.arrayContaining([{ field: 'validateRegexAlphaNoLeadingNumbers', msg: strings.errorMessagesFields.regexNotMatch }]))
  })

})

describe('Validate Values (validation-Method = validate on Change)', () => {

  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemaCorrectType, listSchemasArray)
    sm.clearValueErrors()
  })

  it(' 2 wrong Data Type for text field', () => {
    sm.updateValue('validateRequired1', 10)
    const error = sm.getValueErrorsComp(sm.schema.components.validateRequired1)
    expect(error.length).toEqual(1)
    expect(error[0].error).toEqual(strings.errorMessagesFields.wrongDataType)
  })

  it(' 2 required string missing', () => {
    sm.updateValue('validateRequired1', '')
    expect(sm.getValue('validateRequired1')).toEqual('')
    sm.validateValuesSchema()
    expect(sm.getValueErrorsForTest()).toEqual(expect.arrayContaining([expect.objectContaining({ field: 'validateRequired1', msg: 'Required string' + strings.errorMessagesFields.required })]))

    sm.updateValue('validateRequired1', 'tilt')
    expect(sm.getValue('validateRequired1')).toEqual('tilt')
    sm.validateValuesSchema()
    // console.log(sm.getValueErrorsForTest())
  })

  it(' 2 required string corrected', () => {
    sm.updateValue('validateRequired1', 'tilt')
    expect(sm.getValue('validateRequired1')).toEqual('tilt')
    sm.validateValuesSchema()
    expect(sm.getValueErrorsForTest()).not.toEqual(expect.arrayContaining([expect.objectContaining({ field: 'validateRequired1' })]))
  })

  it(' 2 wrong Data Type for number field', () => {
    sm.updateValue('validateRequired2', '10')
    const error = sm.getValueErrorsComp(sm.schema.components.validateRequired2)
    // tslint:disable-next-line:no-console
    // console.log(sm.getValueErrorsForTest())
    expect(error.length).toEqual(1)
    expect(error[0].error).toEqual(strings.errorMessagesFields.wrongDataType)

  })

  it(' 2 required number is 0', () => {
    sm.updateValue('validateRequired2', 0)
    const error = sm.getValueErrorsComp(sm.schema.components.validateRequired2)
    expect(error.length).toEqual(1)
    expect(error[0].error).toEqual('Required Number' + strings.errorMessagesFields.required)
  })

  it(' 2 string is not in allowed values', () => {
    sm.updateValue('validateAllowedValues', 'tilt')
    const error = sm.getValueErrorsComp(sm.schema.components.validateAllowedValues)
    expect(error.length).toEqual(1)
    expect(error[0].error).toEqual(strings.errorMessagesFields.allowedValues)
  })

  it(' 2 string in allowed values', () => {
    sm.updateValue('validateAllowedValues', 'hans')
    const error = sm.getValueErrorsComp(sm.schema.components.validateAllowedValues)

    expect(error.length).toEqual(0)
  })

  it(' 2 validate with function', () => {
    sm.updateValue('validateWithFunction', 'hans')
    const error = sm.getValueErrorsComp(sm.schema.components.validateWithFunction)
    expect(error.length).toEqual(1)
    expect(error[0].error).toEqual('Du Tubel')

    // expect(sm.getValueErrorsForTest()).toEqual(expect.arrayContaining([{ field: 'validateWithFunction', msg: 'Du Tubel' }]))
    // console.log(sm.getValueErrorsForTest())
  })

  it(' 2 validate with function correct', () => {
    sm.updateValue('validateWithFunction', 'tubel')
    const error = sm.getValueErrorsComp(sm.schema.components.validateWithFunction)
    expect(error.length).toEqual(0)
    // sm.validateValuesSchema()
    // expect(sm.getValueErrorsForTest()).not.toEqual(expect.arrayContaining([expect.objectContaining({ field: 'validateWithFunction', msg: 'Du Tubel' })]))
    // console.log(sm.getValueErrorsForTest())
  })

  it(' 2 validate min and max with number', () => {
    sm.updateValue('validateWMinMaxNumber', 2)
    let error = sm.getValueErrorsComp(sm.schema.components.validateWMinMaxNumber)
    expect(error.length).toEqual(1)
    expect(error[0].error).toEqual(strings.errorMessagesFields.minValueNumber + '3')
    // expect(sm.getValueErrorsForTest()).toEqual(expect.arrayContaining([{ field: 'validateWMinMaxNumber', msg: strings.errorMessagesFields.minValueNumber + '3' }]))
    // console.log(sm.getValueErrorsForTest())
    // const error = sm.updateValue('validateWMinMaxNumber', 21)
    // sm.validateValuesSchema()
    // expect(sm.getValueErrorsForTest()).toEqual(expect.arrayContaining([{ field: 'validateWMinMaxNumber', msg: strings.errorMessagesFields.maxValueNumber + '20' }]))

    sm.updateValue('validateWMinMaxNumber', 12)
    error = sm.getValueErrorsComp(sm.schema.components.validateWMinMaxNumber)
    expect(error.length).toEqual(0)

    // sm.validateValuesSchema()
    // expect(sm.getValueErrorsForTest()).not.toEqual(expect.arrayContaining([expect.objectContaining({ field: 'validateWMinMaxNumber' })]))
  })

  // it('validate min and max with string', () => {
  //   sm.updateValue('validateWMinMaxString', 'hi')
  //   sm.validateValuesSchema()
  //   expect(sm.getValueErrorsForTest()).toEqual(expect.arrayContaining([{ field: 'validateWMinMaxString', msg: strings.errorMessagesFields.minValueString + '3' }]))
  //   // console.log(sm.getValueErrorsForTest())
  //   sm.updateValue('validateWMinMaxString', 'was geht alter')
  //   sm.validateValuesSchema()
  //   expect(sm.getValueErrorsForTest()).toEqual(expect.arrayContaining([{ field: 'validateWMinMaxString', msg: strings.errorMessagesFields.maxValueString + '5' }]))

  //   sm.updateValue('validateWMinMaxString', 'gut')
  //   sm.validateValuesSchema()
  //   expect(sm.getValueErrorsForTest()).not.toEqual(expect.arrayContaining([expect.objectContaining({ field: 'validateWMinMaxString' })]))
  // })

  // it('modifiers', () => {
  //   sm.updateValue('modifier1', '   hallo Du was ZurIGO   ')
  //   expect(sm.getValue('modifier1') === 'HALLO DU WAS ZURIGO').toBeTruthy

  //   sm.updateValue('modifier2', 'SPInnschE eigeTli WAS isch de dertr HINNE')
  //   expect(sm.getValue('modifier2') === 'Spinnsche eigetli was isch de dertr hinne').toBeTruthy

  // })

})

// xxxxx here diese

/*

})
 */

/*

describe('Set and get Correct values in schemas and subschemas',  ( =>) {

  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemaCorrectType,listSchemasArray)
  })
  it('has correct initialzed values',  ( =>) {
    expect(sm.schema.values.vorname).toEqual('')
  })
  it('get correct values from schema-manager',  ( =>) {
    const compo = sm.schema.components.vorname
    expect(sm.getSchemaValue(compo)).toEqual('')
  })
  it('sets correctly values',  ( =>) {
    const compo = sm.schema.components.vorname
    let ret = sm.updateSchemaValue(compo, 'tilt')
    expect(ret).toEqual('')
    expect(sm.schema.values.vorname).toEqual('tilt')
  })
  it('updates values in subschema',  ( =>) {
    const compo = sm.schema.components.sub_with_sub.schema.components.sub.schema.components.email
    let ret = sm.updateSchemaValue(compo, 'tilt_77')
    expect(ret).toEqual('')
    expect(sm.getSchemaValue(compo)).toEqual('tilt_77')
  })
  it('refuses to update value with wrong datatype in subschema',  ( =>) {
    const compo = sm.schema.components.sub_with_sub.schema.components.sub.schema.components.email
    let ret = sm.updateSchemaValue(compo, {})
    expect(ret.errcode).toEqual(errs.ErrorCode.wrongDataType)
    expect(sm.getSchemaValue(compo)).toEqual('tilt_77')
  })
  it('refuses to update value with wrong datatype',  ( =>) {
    const compo = sm.schema.components.vorname
    let ret = sm.updateSchemaValue(compo, 0)
    expect(ret.errcode).toEqual(errs.ErrorCode.wrongDataType)
    expect(sm.schema.values.vorname).toEqual('tilt')
  })
})

describe('Set and get Correct Default values',  ( =>) {

  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemaCorrectType,listSchemasArray)
  })
  it('does not overwrite predefined value',  ( =>) {
    expect(sm.schema.values.name).toEqual('Thaler')
    expect(sm.schema.values.select3).toEqual(10)
    expect(sm.schema.values.sub.email).toEqual('super@supi.ch')
  })
  it('set default value',  ( =>) {
    expect(sm.schema.values.integer).toEqual(100)
  })
  it('set default value with  t =>o first item in select',  ( =>) {
    expect(sm.schema.values.select1).toEqual('1')
  })
  it('resets values correctly',  ( =>) {
    sm.resetSchemaValues()
    expect(sm.schema.values.name).toEqual('Name')
    expect(sm.schema.values.select3).toEqual(0)
    expect(sm.schema.values.sub.email).toEqual('default@gmail.com')
  })

  it('update some values and reset again',  ( =>) {
    let compo = sm.schema.components.name
    sm.updateSchemaValue(compo, 'meier')
    expect(sm.schema.values.name).toEqual('meier')
    expect(sm.getSchemaValue(compo)).toEqual('meier')
    sm.resetSchemaValues()
    expect(sm.getSchemaValue(compo)).toEqual('Name')

    compo = sm.schema.components.select1
    sm.updateSchemaValue(compo, '2')
    expect(sm.getSchemaValue(compo)).toEqual('2')
    sm.resetSchemaValues()
    expect(sm.getSchemaValue(compo)).toEqual('1')

  })

})

describe('Fix schema',  ( =>) {
  , res: SchemaManager
  beforeEach(() => {
    sm = new SchemaManager(listSchemas.schemaToFix,listSchemasArray)
    res = sm.fixSchema()
  })
  it('has fixed all errors',  ( =>) {
    expect(res.remainingErrors.length).toEqual(0)
  })
})

 */
