import { ISchemaDesign, enums, DataType } from '@vs-form/vs-form'

const styles = {
  settings: {
    background: 'snow'
  }
}

const schema: ISchemaDesign = {
  name: 'fieldValidations',
  label: 'Field Validations',
  styles,
  components: {
    root: {
      type: enums.Component.panel,
      children: ['pnsettings', 'card', 'btnOk', 'btnCancel'],
    },
    pnsettings: {
      type: enums.Component.panel,
      children: ['cardsettings'],
      gridContainer: {
        direction: 'column',
        alignItems: 'center'
      }
    },
    cardsettings: {
      label: 'Settings',
      type: enums.Component.card,
      children: ['radioValMethod', 'checkErrPanel', 'btnResetErrors', 'btnResetValues'],
      props: {
        className: 'settings',
        elevation: 1
      }
    },
    radioValMethod: {
      type: enums.Component.radiogroup,
      label: 'Validation Method',
      data: {
        field: 'radio',
        dataType: DataType.number,
        items: [{ value: 0, text: 'validate on Change' }, { value: 1, text: 'validate on Submit' }],
        default: 0,
        onChange(p) {
          if (p.value === 0) {
            p.schema.validationMethod = enums.ValidationMethod.validateOnChange
          } else { p.schema.validationMethod = enums.ValidationMethod.validateOnSubmit }
          p.schemaManager.render()
        }
      },
    },
    checkErrPanel: {
      type: enums.Component.checkbox,
      data: {
        field: 'check1',
        dataType: DataType.boolean,
        default: true,
        onChange(p) {
          p.schema.hideValidationErrorPanel = !p.value
          p.schemaManager.render()
        }
      },
      label: 'Show Error Panel',
    },
    btnResetErrors: {
      type: enums.Component.button,
      label: 'Reset errors',
      onClick(p) {
        p.schemaManager.resetValidationErrors()
        p.schemaManager.render()
      },
      gridItem: {
        xs: 4
      },
    },
    btnResetValues: {
      type: enums.Component.button,
      label: 'Reset values',
      onClick(p) {
        p.schemaManager.resetSchemaValues()
        p.schemaManager.resetValidationErrors()
        p.schemaManager.render()
      },
      gridItem: {
        xs: 4
      },
    },
    card: {
      label: 'Validations',
      type: enums.Component.card,
      children: ['validateRequired1', 'validateRequired2', 'validateAllowedValues', 'validateWithFunction', 'validateWMinMaxNumber', 'validateWMinMaxString', 'validateRegexAlphaNoLeadingNumbers'],
      props: {
        elevation: 6
      }
    },
    validateRequired1: {
      type: enums.Component.textinput,
      data: {
        field: 'validateRequired1',
        dataType: DataType.string,
        validations: {
          required: true
        }
      },
      label: 'Adress',
      gridItem: {
        xl: 6
      },
    },
    validateRequired2: {
      type: enums.Component.number,
      data: {
        field: 'validateRequired2',
        dataType: DataType.number,
        validations: {
          required: true
        }
      },
      label: 'Amount',
      gridItem: {
        xl: 6
      },
    },
    validateAllowedValues: {
      type: enums.Component.textinput,
      data: {
        field: 'validateAllowedValues',
        dataType: DataType.string,
        validations: {
          allowedValues: ['hans', 'fritz', 'marcus']
        }
      },
      label: 'name',
      hint: 'only values "hans", "fritz" or "marcus" are allowed',
    },
    validateWithFunction: {
      type: enums.Component.textinput,
      data: {
        field: 'validateWithFunction',
        dataType: DataType.string,
        validations: {
          validate(p) {
            if (p.value !== 'xxx') { return 'only value "xxx" is allowed' }
            return ''
          }
        }
      },
      hint: 'validate with function and custom error message: only value "xxx" is allowed',
      label: 'Special',
    },
    validateWMinMaxNumber: {
      type: enums.Component.number,
      data: {
        field: 'validateWMinMaxNumber',
        dataType: DataType.number,
        validations: {
          min: 3,
          max: 20
        }
      },
      label: 'Code',
      hint: 'number is minimal value 3, maximal 20 ',
    },
    validateWMinMaxString: {
      type: enums.Component.textinput,
      data: {
        field: 'validateWMinMaxString',
        dataType: DataType.string,
        validations: {
          min: 3,
          max: 5
        }
      },
      hint: 'string length is minimal 3, maximal 5 characters ',
      label: 'Postal Code'
    },
    validateRegexAlphaNoLeadingNumbers: {
      type: enums.Component.textinput,
      data: {
        field: 'validateRegexAlphaNoLeadingNumbers',
        dataType: DataType.string,
        validations: {
          regex: /^[a-zA-Z_][a-zA-Z_0-9]*$/,
        }
      },
      hint: 'regex-validation: only alphanumeric characters, no leading numbers',
      label: 'validateRegex',
    },
    btnOk: {
      type: enums.Component.button,
      tooltip: 'Click to save',
      disabled: false,
      action: enums.ButtonAction.save,
      gridItem: {
        md: 2
      },
    },
    btnCancel: {
      type: enums.Component.button,
      action: enums.ButtonAction.cancel,
      gridItem: {
        md: 2
      },
    },
  }
}

export default schema
