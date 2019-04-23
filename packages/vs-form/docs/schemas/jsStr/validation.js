
const validation = `import { Component, ButtonAction, DataType, ValidationMethod } from '@vs-form/vs-form';
const styles = {
    settings: {
        background: 'snow'
    }
};
const schema = {
    name: 'fieldValidations',
    label: 'Field Validations',
    validate(p) {
        const country = p.schema.values.country;
        const zip = p.schema.values.zipCode && p.schema.values.zipCode.length || 0;
        let error = '';
        if (country === 'switzerland' && zip !== 4) {
            error = 'postal code for switzerland must be 4 digits';
        }
        if (country === 'germany' && zip !== 5) {
            error = 'postal code for germany must be 5 digits';
        }
        if (country === 'japan' && zip !== 7) {
            error = 'postal code for japan must be 7 digits';
        }
        return { error, comp: zip, arrayId: -1 };
    },
    styles,
    components: {
        root: {
            type: Component.panel,
            children: ['pnsettings', 'card', 'btnOk', 'btnCancel'],
        },
        pnsettings: {
            type: Component.panel,
            children: ['cardsettings'],
            gridContainer: {
                direction: 'column',
                alignItems: 'center'
            }
        },
        cardsettings: {
            label: 'Settings',
            type: Component.card,
            children: ['radioValMethod', 'checkErrPanel', 'btnResetErrors', 'btnResetValues'],
            props: {
                className: 'settings',
                elevation: 1
            }
        },
        radioValMethod: {
            type: Component.radiogroup,
            label: 'Validation Method',
            data: {
                field: 'radio',
                dataType: DataType.number,
                items: [{ value: 0, text: 'validate on Change' }, { value: 1, text: 'validate on Submit' }],
                default: 0,
                onChange(p) {
                    if (p.value === 0) {
                        p.schema.validationMethod = ValidationMethod.validateOnChange;
                    }
                    else {
                        p.schema.validationMethod = ValidationMethod.validateOnSubmit;
                    }
                    p.schemaManager.render();
                }
            },
        },
        checkErrPanel: {
            type: Component.checkbox,
            data: {
                field: 'check1',
                dataType: DataType.boolean,
                default: true,
                onChange(p) {
                    p.schema.hideValidationErrorPanel = !p.value;
                    p.schemaManager.render();
                }
            },
            label: 'Show Error Panel',
        },
        btnResetErrors: {
            type: Component.button,
            label: 'Reset errors',
            onClick(p) {
                p.schemaManager.resetValidationErrors();
                p.schemaManager.render();
            },
            gridItem: {
                xs: 4
            },
        },
        btnResetValues: {
            type: Component.button,
            label: 'Reset values',
            onClick(p) {
                p.schemaManager.resetSchemaValues();
                p.schemaManager.resetValidationErrors();
                p.schemaManager.render();
            },
            gridItem: {
                xs: 4
            },
        },
        card: {
            label: 'Validations',
            type: Component.card,
            children: ['validateRequired1', 'validateRequired2', 'validateAllowedValues', 'validateWithFunction', 'validateWMinMaxNumber', 'validateWMinMaxString', 'validateRegexAlphaNoLeadingNumbers', 'zipCode', 'country'],
            props: {
                elevation: 6
            }
        },
        validateRequired1: {
            label: 'Adress',
            hint: 'required',
            type: Component.textinput,
            data: {
                field: 'validateRequired1',
                dataType: DataType.string,
                validations: {
                    required: true
                },
            },
            gridItem: {
                xl: 6
            },
            props: {
                required: true
            },
        },
        validateRequired2: {
            label: 'Amount',
            hint: 'required',
            type: Component.number,
            data: {
                field: 'validateRequired2',
                dataType: DataType.number,
                validations: {
                    required: true
                }
            },
            gridItem: {
                xl: 6
            },
            props: {
                required: true
            },
        },
        validateAllowedValues: {
            label: 'name',
            hint: 'only values "joe", "quentin" or "jenna" are allowed',
            type: Component.textinput,
            data: {
                field: 'validateAllowedValues',
                dataType: DataType.string,
                validations: {
                    allowedValues: ['joe', 'quentin', 'jenna']
                }
            },
        },
        validateWithFunction: {
            type: Component.textinput,
            data: {
                field: 'validateWithFunction',
                dataType: DataType.string,
                validations: {
                    validate(p) {
                        if (p.value !== 'xxx') {
                            return 'only value "xxx" is allowed';
                        }
                        return '';
                    }
                }
            },
            hint: 'validate with function and custom error message: only value "xxx" is allowed',
            label: 'Special',
        },
        validateWMinMaxNumber: {
            type: Component.number,
            data: {
                field: 'validateWMinMaxNumber',
                dataType: DataType.number,
                validations: {
                    min: 3,
                    max: 20
                }
            },
            label: 'Numeric Code',
            hint: 'number is minimal value 3, maximal 20 ',
        },
        validateWMinMaxString: {
            type: Component.textinput,
            data: {
                field: 'validateWMinMaxString',
                dataType: DataType.string,
                validations: {
                    min: 3,
                    max: 5
                }
            },
            hint: 'string length is minimal 3, maximal 5 characters ',
            label: 'String Code'
        },
        validateRegexAlphaNoLeadingNumbers: {
            type: Component.textinput,
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
        zipCode: {
            type: Component.textinput,
            label: 'Postal Code',
            hint: 'length 4-7 digits depending on country',
            data: {
                field: 'zipCode',
                dataType: DataType.string,
                validations: {
                    min: 4,
                    max: 7
                }
            },
            props: {
                inputProps: {
                    maxLength: 7
                }
            },
            gridItem: {
                md: 4
            },
        },
        country: {
            type: Component.select,
            label: 'Country',
            data: {
                field: 'country',
                dataType: DataType.string,
                items: ['switzerland', 'germany', 'japan'],
                validations: {
                    required: true
                }
            },
            gridItem: {
                md: 8
            },
        },
        btnOk: {
            type: Component.button,
            tooltip: 'Click to save',
            disabled: false,
            action: ButtonAction.save,
            gridItem: {
                md: 2
            },
        },
        btnCancel: {
            type: Component.button,
            action: ButtonAction.cancel,
            gridItem: {
                md: 2
            },
        },
    }
};
export default schema;
`

export default validation