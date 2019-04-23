import * as enums from './enums'
import * as validators from './validators'

export const required = () => ({
  required: true
})

export const typeString = () => ({
  type: enums.DataType.string
})

export const typeNumber = () => ({
  type: enums.DataType.number
})

export const typeObject = () => ({
  type: enums.DataType.object
})

export const typeObjectOrFunction = () => ({
  type: [enums.DataType.object, enums.DataType.function]
})

export const typeStringOrFunction = () => ({
  type: [enums.DataType.string, enums.DataType.function]
})

export const typeStringOrStringArray = () => ({
  type: [enums.DataType.string, enums.DataType.arrayString]
})

export const typeArray = () => ({
  type: enums.DataType.array
})

export const typeBoolean = () => ({
  type: enums.DataType.boolean
})

export const typeBooleanOrFunction = () => ({
  type: [enums.DataType.boolean, enums.DataType.function]
})

export const typeAny = () => ({
  type: enums.DataType.any
})

export const typeDate = () => ({
  type: enums.DataType.date
})

export const typeFunction = () => ({
  type: enums.DataType.function
})

export const typeRegex = () => ({
  type: enums.DataType.regex
})

// export const minmaxColumns = () => ({
//   minmax: [1, 12]
// })

export const gridSize = () => ({
  enum: [true, false, 'auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
})

export const objectRequired = () => ({
  ...required(), ...typeObject()
})

export const booleanRequired = () => ({
  ...required(), ...typeBoolean()
})

export const arrayRequired = () => ({
  ...required(), ...typeArray()
})

export const arrayNotRequired = () => ({
  ...typeArray()
})

export const labelRequired = () => ({
  label: { ...required(), ...typeStringOrFunction() },
})

export const label = () => ({
  label: { ...typeStringOrFunction() },
})

export const placeholder = () => ({
  placeholder: { ...typeStringOrFunction() },
})

export const hint = () => ({
  hint: { ...typeStringOrFunction() },
})

export const tooltip = () => ({
  tooltip: { ...typeStringOrFunction() },
  tooltipProps: { ...typeObject() }
})

export const text = () => ({
  text: { ...typeStringOrFunction() },
})

export const fieldRequired = () => ({
  field: { ...required(), ...typeString() }
})

export const stringRequired = () => ({
  ...required(), ...typeString()
})

export const validatorsChildren = () => ({
  validators: [validators.hasValidChildrenKeys]
})

export const validatorsTabsChildren = () => ({
  validators: [validators.hasValidTabsKeys]
})

export const itemsChildren = () => ({
  items: { ...typeString() }
})

export const validatorsLabelOrColumns = () => ({
  validators: [validators.hasValidColumns]
})

export const validatorsColumns = () => ({
  validators: [validators.hasValidColumns]
})

export const validatorsDefaultValue = () => ({
  validators: [validators.defaultValue]
})

export const validatorsMaskInput = () => ({
  validators: [validators.maskInput]
})

export const validatorsNumberFormat = () => ({
  validators: [validators.numberFormat]
})

export const validatorsPrefixComp = () => ({
  validators: [validators.prefixSuffixCompValid]
})

export const validatorsIconComp = () => ({
  validators: [validators.iconCompValid]
})

export const validatorsSubschemaKeyField = () => ({
  validators: [validators.subschemaKeyField]
})

export const validatorsIcon = () => ({
  validators: [validators.iconValid]
})

export const validatorsStyles = () => ({
  validators: [validators.stylesValid]
})

export const validatorsSpeedDialActions = () => ({
  validators: [validators.speedDialActionsValid]
})

export const gridProps = () => ({
  ...typeObject(),
  properties: {
    xl: { ...typeAny(), ...gridSize() },
    lg: { ...typeAny(), ...gridSize() },
    md: { ...typeAny(), ...gridSize() },
    sm: { ...typeAny(), ...gridSize() },
    xs: { ...typeAny(), ...gridSize() },
    alignContent: { ...typeString(), enum: ['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around'] },
    alignItems: { ...typeString(), enum: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'] },
    direction: { ...typeString(), enum: ['row', 'row-reverse', 'column', 'column-reverse'] },
    justify: { ...typeString(), enum: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'] },
    spacing: { ...typeNumber(), enum: [0, 8, 16, 24, 32, 40] },
    wrap: { ...typeString(), enum: ['nowrap', 'wrap', 'wrap-reverse'] },
    zeroMinWidth: { ...typeBoolean() },
    item: { ...typeBoolean() },
    container: { ...typeBoolean() },
    style: { ...typeObject() },
  }
})

export const maskProps = () => ({
  ...typeObject(),
  properties: {
    mask: { ...typeAny(), ...validatorsMaskInput() },
    guide: { ...typeBoolean() },
    placeholder: { ...typeString() },
    pipe: { ...typeFunction() },
    showMask: { ...typeBoolean() },
  }
})

export const numberFormatProps = () => ({
  ...objectRequired(),
  properties: {
    thousandSeparator: { ...typeString() },
    decimalSeparator: { ...typeString() },
    decimalScale: { ...typeNumber() },
    fixedDecimalScale: { ...typeBoolean() },
    displayType: { ...typeString(), enum: ['input', 'text'] },
    prefix: { ...typeString() },
    suffix: { ...typeString() },
    format: { ...typeStringOrFunction() },
    removeFormatting: { ...typeFunction() },
    mask: { ...typeStringOrStringArray() },
    allowNegative: { ...typeBoolean() },
    allowEmptyFormatting: { ...typeBoolean() },
    isAllowed: { ...typeFunction() }
  }
})

export const modifyDataPropsText = (obj: any) => {
  obj.properties.dataType.enum = [enums.DataType.string]
}

export const modifyDataPropsSelect = (obj: any) => {
  obj.properties.dataType.enum = [enums.DataType.string, enums.DataType.integer, enums.DataType.number, enums.DataType.arrayString, enums.DataType.arrayInteger, enums.DataType.arrayNumber]
  obj.properties.items = arrayRequired()
  obj.properties.items.validators = [validators.itemsInSelect]
}

export const modifyDataPropsCheckListBox = (obj: any) => {
  obj.properties.dataType.enum = [enums.DataType.arrayString, enums.DataType.arrayInteger, enums.DataType.arrayNumber]
  obj.properties.items = arrayRequired()
  obj.properties.items.validators = [validators.itemsInSelect]
}

export const modifyDataPropsRadio = (obj: any) => {
  obj.properties.dataType.enum = [enums.DataType.string, enums.DataType.integer, enums.DataType.number]
  obj.properties.items = arrayRequired()
  obj.properties.items.validators = [validators.itemsInSelect]
}

export const modifyDataPropsNumber = (obj: any) => {
  obj.properties.dataType.enum = [enums.DataType.number]
}

export const modifyDataPropsSlider = (obj: any) => {
  obj.properties.dataType.enum = [enums.DataType.number]
  obj.properties.validations.properties.step = { ...typeNumber() }
}

export const modifyDataPropsNumberFormat = (obj: any) => {
  obj.properties.dataType.enum = [enums.DataType.number, enums.DataType.integer]
}

export const modifyDataPropsInteger = (obj: any) => {
  obj.properties.dataType.enum = [enums.DataType.integer]
}

export const modifyDataPropsDate = (obj: any) => {
  obj.properties.dataType.enum = [enums.DataType.date]
}

export const modifyDataPropsBoolean = (obj: any) => {
  obj.properties.dataType.enum = [enums.DataType.boolean]
}

export const modifyDataPropsSubschema = (obj: any) => {
  obj.properties.dataType.enum = [enums.DataType.object, enums.DataType.array]
}

export const modifyDataPropsData = (obj: any) => {
  obj.properties.dataType.enum = [enums.DataType.string, enums.DataType.number, enums.DataType.boolean, enums.DataType.date, enums.DataType.object, enums.DataType.array]
}
