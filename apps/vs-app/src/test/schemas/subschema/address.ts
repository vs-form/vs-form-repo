import { ISchemaDesign, Component, DataType, types } from '@vs-form/vs-form'

import { countries } from '../../lookupItems'

const schema: ISchemaDesign = {
  name: 'address',
  label: 'Address',
  validationMethod: 1,
  onCreated(p) {
    const countriesStr = countries.map(c => ({ value: c, text: c }))
    const country = p.schema.components.country as types.IComponentSelect
    country.data.items = countriesStr
  },
  components: {
    root: {
      type: Component.form,
      children: ['name', 'gender', 'birthdate', 'address', 'country', 'notes', 'photo'],
    },
    name: {
      type: Component.textinput,
      data: {
        field: 'name',
        dataType: DataType.string,
        validations: {
          required: true
        }
      },
      label: 'name'
    },
    gender: {
      type: Component.radiogroup,
      data: {
        field: 'gender',
        dataType: DataType.number,
        items: [{ value: 1, text: 'Male' }, { value: 2, text: 'Female' }],
        validations: {
          required: true
        }
      },
      gridItem: { xs: 12, md: 6, lg: 4 },
      label: 'gender'
    },
    birthdate: {
      type: Component.date,
      data: {
        field: 'birthdate',
        dataType: DataType.date,
        validations: {
          required: true
        }
      },
      gridItem: { xs: 12, md: 6, lg: 4 },
      label: 'birthdate'
    },
    address: {
      type: Component.textinput,
      data: {
        field: 'address',
        dataType: DataType.string,
        validations: {
          required: true
        }
      },
      props: {
        multiline: true,
        rows: 2
      },
      label: 'address'
    },
    country: {
      type: Component.select,
      data: {
        field: 'country',
        dataType: DataType.string,
        validations: {
          required: true
        },
        items: []
      },
      gridItem: { xs: 12, md: 6, lg: 4 },
      label: 'country'
    },
    notes: {
      type: Component.textinput,
      data: {
        field: 'notes',
        dataType: DataType.string,
        validations: {
          required: true
        }
      },
      props: {
        multiline: true,
        rows: 6
      },
      label: 'notes'
    },
    photo: {
      type: Component.textinput,
      data: {
        field: 'photo',
        dataType: DataType.string
      },
      label: 'photo'
    },
  }
}

export default schema
