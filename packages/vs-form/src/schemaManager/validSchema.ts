// analog zu  https://cswr.github.io/JsonSchema/
import * as enums from './enums'
import * as validators from './validators'
import { isPlainObject, has } from './lodash'
import {
  required, typeString,
  typeNumber, typeObject, typeArray, typeStringOrStringArray, typeBooleanOrFunction,
  typeBoolean, typeAny, typeFunction, typeRegex, objectRequired, booleanRequired, arrayRequired, arrayNotRequired, fieldRequired,
  labelRequired, label, hint, tooltip, text,
  stringRequired, validatorsChildren, itemsChildren, validatorsTabsChildren,
  validatorsColumns, validatorsDefaultValue, validatorsStyles, validatorsSpeedDialActions, validatorsPrefixComp, validatorsIcon, validatorsIconComp, validatorsNumberFormat, validatorsSubschemaKeyField,
  modifyDataPropsText, modifyDataPropsSelect, modifyDataPropsRadio, modifyDataPropsCheckListBox, modifyDataPropsNumber, modifyDataPropsSlider, modifyDataPropsNumberFormat, modifyDataPropsInteger,
  modifyDataPropsDate, modifyDataPropsBoolean, modifyDataPropsSubschema,
  gridProps, maskProps, numberFormatProps,
} from './validschemaSub'

const commonProps = (modifyPropsProps?: () => any) => {
  const fn = modifyPropsProps ? modifyPropsProps : () => ({})
  return {
    type: { ...stringRequired() },
    id: { ...typeString() },
    node: { ...typeString() },
    ...tooltip(),
    gridItem: { ...gridProps() },
    styles: { ...typeObject(), ...validatorsStyles() },
    ...commonPropsProps(fn),
    disabled: { ...typeBoolean() },
    hidden: { ...typeBoolean() },
  }
}

const _validSchemaSchema = () => ({
  ...typeObject(),
  preValidators: [validators.rootIsWrong, validators.hasRecursion, validators.childrenHasRecursion, validators.hasUnresolvedSubschemaNames],
  postValidators: [validators.hasDuplicateFields, validators.hasFieldsNotInChildren, validators.isDuplicateInChildren, validators.onlyFormTagForRoot, validators.valuesKeyHasNoComponent],
  additionalProperties: true,
  properties: {
    id: { ...typeString() },
    name: { ...stringRequired() },
    node: { ...typeString() },
    validationMethod: {
      ...typeNumber(),
      enum: [enums.ValidationMethod.validateOnChange, enums.ValidationMethod.validateOnSubmit]
    },
    hideValidationErrorPanel: { ...typeBoolean() },
    label: { ...typeString() },
    values: { ...typeObject() },
    components: {
      ...objectRequired(),
      additionalProperties: true,
      properties: {
        root: {
          ...objectRequired(),
          properties: {
            label: { ...typeString() },
            ...commonProps(),
            ...label(),
            gridContainer: { ...gridProps() },
            children: {
              ...arrayRequired(),
              ...required(),
              ...itemsChildren(),
            },
          }
        },
      }
    },
    styles: { ...typeObject(), ...validatorsStyles() },
    disabled: { ...typeBoolean() },
    onCreated: { ...typeFunction() },
    onDidMount: { ...typeFunction() },
    onWillUnmount: { ...typeFunction() },
    onChange: { ...typeFunction() },
    onSubmit: { ...typeFunction() },
    onCancelValues: { ...typeFunction() },
    validate: { ...typeFunction() },
  }
})

const commonDataProps = (modifyProps?: (obj: any) => any): any => {
  const obj = {
    ...objectRequired(),
    properties: {
      ...fieldRequired(),
      dataType: { ...stringRequired(), enum: [] },
      fieldPath: { ...typeString() },
      default: { ...typeAny(), ...validatorsDefaultValue() },
      onBeforeChange: { ...typeFunction() },
      onChange: { ...typeFunction() },
      validations: {
        ...typeObject(),
        properties: {
          required: { ...typeBooleanOrFunction() },
          allowedValues: { ...typeArray() },
          min: { ...typeNumber() },
          max: { ...typeNumber() },
          // step: { ...typeNumber() }, // slider
          regex: { ...typeRegex() },
          validate: { ...typeFunction() }
        }
      },
      modifiers: {
        ...typeObject(),
        properties: {
          trim: { ...typeBoolean() },
          toLowerCase: { ...typeBoolean() },
          toUpperCase: { ...typeBoolean() },
          capitalize: { ...typeBoolean() },
        }
      },
      errors: { ...typeArray() },
    }
  }
  if (modifyProps) {
    modifyProps(obj)
  }
  return obj
}

const commonPropsProps = (modifyProps: () => any): any => {
  return {
    // props will be passed to the mui-components
    props: {
      ...typeObject(),
      additionalProperties: true,
      properties: {
        className: { ...typeString() },
        style: { ...typeObject() },
        ...modifyProps()
      }
    }
  }
}

const propsPropsInputField = (): any => {
  return {
    variant: { ...typeString(), enum: Object.keys(enums.InputVariant).map(key => enums.InputVariant[key]) },
    multiline: { ...typeBoolean() }
  }
}

const commonInputFieldProps = () => ({
  ...labelRequired(),
  ...hint(),
  // { ...typeStringOrStringArray(), ...validatorsIconComp() }
  prefix: { ...typeStringOrStringArray(), ...validatorsPrefixComp() },
  suffix: { ...typeStringOrStringArray(), ...validatorsPrefixComp() },
})

const commonContainerProps = () => ({
  ...label(),
  gridContainer: { ...gridProps() },
  children: {
    ...typeArray(),
    ...required(),
    ...itemsChildren(),
    ...validatorsChildren()
  },
})

const commonButtonProps = () => ({
  action: { ...typeString(), enum: Object.keys(enums.ButtonAction).map(key => enums.ButtonAction[key]) },
  onClick: { ...typeFunction() },
})

const _validSchemaComponents = () => ({
  // data-fields
  [enums.Component.textinput]: {
    ...commonInputFieldProps(),
    ...commonProps(propsPropsInputField),
    data: { ...commonDataProps(modifyDataPropsText) }
  },
  [enums.Component.maskinput]: {
    ...commonInputFieldProps(),
    ...commonProps(propsPropsInputField),
    data: { ...commonDataProps(modifyDataPropsText) },
    maskProps: { ...maskProps() },
  },
  [enums.Component.number]: {
    ...commonInputFieldProps(),
    ...commonProps(propsPropsInputField),
    data: { ...commonDataProps(modifyDataPropsNumber) },
  },
  [enums.Component.integer]: {
    ...commonInputFieldProps(),
    ...commonProps(propsPropsInputField),
    data: { ...commonDataProps(modifyDataPropsInteger) },
  },
  [enums.Component.numberformat]: {
    ...commonInputFieldProps(),
    ...commonProps(propsPropsInputField),
    numberFormatProps: { ...numberFormatProps(), ...validatorsNumberFormat() },
    data: { ...commonDataProps(modifyDataPropsNumberFormat) },
  },
  [enums.Component.slider]: {
    ...labelRequired(),
    ...commonProps(),
    ...hint(),
    data: { ...commonDataProps(modifyDataPropsSlider) },
  },
  [enums.Component.select]: {
    ...commonInputFieldProps(),
    ...commonProps(propsPropsInputField),
    autocomplete: { ...typeBoolean() },
    data: { ...commonDataProps(modifyDataPropsSelect) },
  },
  [enums.Component.selectext]: {
    ...commonInputFieldProps(),
    ...commonProps(propsPropsInputField),
    autocomplete: { ...typeBoolean() },
    data: { ...commonDataProps(modifyDataPropsSelect) },
  },
  [enums.Component.radiogroup]: {
    ...labelRequired(),
    ...commonProps(),
    ...hint(),
    data: { ...commonDataProps(modifyDataPropsRadio) },
  },
  [enums.Component.checklistbox]: {
    ...labelRequired(),
    ...commonProps(),
    data: { ...commonDataProps(modifyDataPropsCheckListBox) },
    rowDisplay: { ...typeBoolean() },
    actionIcon: { ...typeStringOrStringArray(), ...validatorsIconComp() }, // icon for action
    onActionClick: { ...typeFunction() },
  },
  [enums.Component.date]: {
    ...commonInputFieldProps(),
    ...commonProps(propsPropsInputField),
    data: { ...commonDataProps(modifyDataPropsDate) },
  },
  [enums.Component.dateext]: {
    ...commonInputFieldProps(),
    ...commonProps(propsPropsInputField),
    data: { ...commonDataProps(modifyDataPropsDate) },
  },
  [enums.Component.datetime]: {
    ...commonInputFieldProps(),
    ...commonProps(propsPropsInputField),
    data: { ...commonDataProps(modifyDataPropsDate) },
  },
  [enums.Component.time]: {
    ...commonInputFieldProps(),
    ...commonProps(propsPropsInputField),
    data: { ...commonDataProps(modifyDataPropsDate) },
  },
  [enums.Component.checkbox]: {
    ...labelRequired(),
    ...commonProps(),
    ...hint(),
    data: { ...commonDataProps(modifyDataPropsBoolean) },
  },
  [enums.Component.switch]: {
    ...labelRequired(),
    ...commonProps(),
    ...hint(),
    data: { ...commonDataProps(modifyDataPropsBoolean) },
  },
  [enums.Component.subschema]: {
    ...label(),
    ...commonProps(),
    schemaName: { ...stringRequired() },
    schema: { ...typeObject() },
    data: { ...commonDataProps(modifyDataPropsSubschema) },
    keyField: { ...typeString(), ...validatorsSubschemaKeyField() },
    columnSettings: {
      ...arrayNotRequired(),
      ...validatorsColumns(),
      items: {
        ...objectRequired(),
        properties: {
          compId: { ...stringRequired() },
          autowidth: { ...typeBoolean() },
          width: { ...typeNumber() },
          widthUnit: { ...typeString() },
          alignRight: { ...typeBoolean() },
          sortable: { ...typeBoolean() },
          sortDirection: { ...typeString(), enum: [enums.SortDirection.none, enums.SortDirection.asc, enums.SortDirection.desc] },
        }
      },
    },
    rowsPerPage: { ...typeNumber() },
    hidePagination: { ...typeBoolean() }
  },
  // Containers
  [enums.Component.form]: {
    ...commonContainerProps(),
    ...commonProps(),
  },
  [enums.Component.panel]: {
    ...commonContainerProps(),
    ...commonProps(),
  },
  [enums.Component.tab]: {
    ...commonContainerProps(),
    ...commonProps(),
  },
  [enums.Component.card]: {
    ...commonContainerProps(),
    subheader: { ...typeString() },
    ...commonProps(),
  },
  [enums.Component.expansionpanel]: {
    ...commonContainerProps(),
    expanded: { ...typeBoolean() },
    onBeforeChange: { ...typeFunction() },
    onChange: { ...typeFunction() },
    dense: { ...typeBoolean() },
    ...commonProps(),
  },
  [enums.Component.tabs]: {
    ...label(),
    tabs: {
      ...typeArray(),
      ...required(),
      ...itemsChildren(),
      ...validatorsTabsChildren()
    },
    activeTab: { ...typeNumber() },
    onBeforeChange: { ...typeFunction() },
    onChange: { ...typeFunction() },
    ...commonProps(),
  },
  [enums.Component.tab]: {
    icon: { ...typeStringOrStringArray(), ...validatorsIconComp() },
    ...commonContainerProps(),
    ...commonProps(),
  },
  // data Table
  [enums.Component.dataTable]: {
    columns: {
      ...arrayRequired(),
      // ...validatorsColumns(),
      min: 1,
      items: {
        ...objectRequired(),
        properties: {
          component: { ...stringRequired() },
          align: { ...typeString(), enum: ['left', 'center', 'right'] },
          sortable: { ...typeBoolean() },
          width: { ...typeString() }
        }
      },
    },
    ...commonProps(),
  },
  // static
  [enums.Component.text]: {
    ...text(),
    ...commonProps(),
  },
  [enums.Component.button]: {
    ...label(),
    icon: { ...typeStringOrStringArray(), ...validatorsIconComp() },
    iconRight: { ...typeBoolean() },
    ...commonButtonProps(),
    ...commonProps(),
  },
  [enums.Component.iconbutton]: {
    icon: { ...typeStringOrStringArray(), ...validatorsIconComp() },
    ...commonButtonProps(),
    ...commonProps(),
  },
  [enums.Component.speeddial]: {
    ...label(),
    icon: { ...typeStringOrStringArray(), ...validatorsIconComp() },
    actions: { ...arrayRequired(), ...validatorsSpeedDialActions() },
    ...commonProps(),
  },
  [enums.Component.icon]: {
    ...validatorsIcon(),
    icon: { ...typeString() },
    svg: { ...typeString() },
    component: { ...typeAny() },
    ...commonProps(),
  },
  [enums.Component.divider]: {
    ...commonProps(),
  },
  [enums.Component.mediastatic]: {
    ...commonProps(),
  },
  // custom component
  [enums.Component.custom]: {
    name: { ...stringRequired() },
    ...commonProps(),
  },
})

const validSchemaInit: any = () => {
  const setIds = (prop: any, parent: any) => {
    Object.keys(prop).forEach(key => {
      if (isPlainObject(prop[key])) {
        prop[key].prop = parent ? parent + '.' + key : key
        prop[key].key = key
        if (has(prop[key], 'properties')) { setIds(prop[key].properties, parent ? parent + '.' + key : key) }
        if (has(prop[key], 'items') && has(prop[key].items, 'properties')) {
          prop[key].items.prop = parent ? parent + '.' + key : key
          prop[key].items.key = key
          setIds(prop[key].items.properties, parent ? parent + '.' + key : key)
        }
      }
    })
  }
  const validSchemaSchema1 = _validSchemaSchema()
  setIds(validSchemaSchema1.properties, null)
  const validSchemaComponents1 = _validSchemaComponents()
  Object.keys(validSchemaComponents1).forEach(key => {
    if (isPlainObject(validSchemaComponents1[key])) { setIds(validSchemaComponents1[key], null) }
  })
  return { validSchemaSchema: validSchemaSchema1, validSchemaComponents: validSchemaComponents1 }

}

export const { validSchemaSchema, validSchemaComponents } = validSchemaInit()

// export { validSchemaSchema, validSchemaComponents }
