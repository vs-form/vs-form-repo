import { ISchemaDesign, Component, DataType } from '@vs-form/vs-form'

const schema: ISchemaDesign = {
  name: 'address',
  components: {
    root: {
      type: Component.card,
      children: ['type', 'name', 'gender', 'birthdate', 'address', 'country'],
    },
    type: {
      type: Component.radiogroup,
      data: {
        field: 'type',
        dataType: DataType.number,
        items: [{ value: 1, text: 'customer address' }, { value: 2, text: 'billing address' }, { value: 3, text: 'shipping address' }],
        validations: {
          required: true
        }
      },
      props: {
        row: true
      },
      label: 'Adress Type'
    },
    name: {
      type: Component.textinput,
      label: 'name',
      data: {
        field: 'name',
        dataType: DataType.string,
        validations: {
          required: true
        },
      },
      props: {
        required: true
      },
    },
    gender: {
      type: Component.radiogroup,
      label: 'gender',
      data: {
        field: 'gender',
        dataType: DataType.number,
        items: [{ value: 1, text: 'male' }, { value: 2, text: 'female' }],
        default: 1,
      },
      props: {
        row: true,
      },
      gridItem: { xs: 12, md: 6, lg: 4 },
    },
    birthdate: {
      type: Component.date,
      label: 'birthdate',
      data: {
        field: 'birthdate',
        dataType: DataType.date,
        validations: {
          required: true
        }
      },
      gridItem: { xs: 12, md: 6, lg: 4 },
    },
    address: {
      type: Component.textinput,
      label: 'address',
      data: {
        field: 'address',
        dataType: DataType.string,
        validations: {
          required: true
        }
      },
      gridItem: { xs: 12, md: 8 },
      props: {
        required: true,
      },
    },
    country: {
      type: Component.textinput,
      label: 'country',
      data: {
        field: 'country',
        dataType: DataType.string,
        validations: {
          required: true
        },
      },
      props: {
        required: true,
      },
      gridItem: { xs: 12, md: 4 },
    },
  }
}

export default schema
