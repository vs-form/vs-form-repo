import { ISchemaDesign, Component, DataType, enums } from '@vs-form/vs-form'

const schema: ISchemaDesign = {
  name: 'simple1',
  label: 'Simple',
  onSubmit(p) {
    // tslint:disable-next-line:no-console
    console.log(p.schema.values)
  },
  onCancelValues(p) {
    // tslint:disable-next-line:no-console
    console.log(p.schema.values)
  },
  validate(p) {
    const country = p.schema.values.country
    const zip = p.schema.values.zipCode && p.schema.values.zipCode.length || 0
    let error = ''

    if (country === 'switzerland' && zip !== 4) {
      error = 'postal code for switzerland must be 4 digits'
    }
    if (country === 'germany' && zip !== 5) {
      error = 'postal code for germany must be 5 digits'
    }
    if (country === 'japan' && zip !== 7) {
      error = 'postal code for japan must be 7 digits'
    }
    return { error, comp: p.schema.components.zipCode, arrayId: -1 }
  },
  components: {
    root: {
      type: Component.form,
      children: ['text', 'zipCode', 'country', 'btnOk', 'btnCancel'],
    },
    text: {
      type: Component.textinput,
      data: {
        field: 'text',
        dataType: DataType.string,
      },
      label: 'Text',
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
      label: '',
      icon: 'weather-sunny',
      tooltip: 'Click to save',
      action: enums.ButtonAction.save,
      gridItem: {
        md: 2
      },
    },
    btnCancel: {
      type: Component.button,
      label: '',
      action: enums.ButtonAction.cancel,
      gridItem: {
        md: 2
      },
    }
  }
}

export default schema
