
const addressesArray = `import { ISchemaDesign, Component, DataType } from '@vs-form/vs-form'

const schema: ISchemaDesign = {
  components: {
    root: {
      type: Component.form,
      children: ['addresses'],
    },
    addresses: {
      type: Component.subschema,
      label: 'Addresses',
      schemaName: 'address',
      data: {
        field: 'addresses',
        dataType: DataType.array,
      },
      columnSettings: [
        {
          compId: 'name',
          width: 200
        },
        {
          compId: 'address',
          autowidth: true
        },
      ]
    },
  }
}

export default schema
`

export default addressesArray