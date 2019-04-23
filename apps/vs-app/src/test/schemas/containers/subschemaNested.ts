import { ISchemaDesign, Component, DataType } from '@vs-form/vs-form'

const schema: ISchemaDesign = {
  name: 'subschemaNested',
  label: 'Nested Subschemas',
  components: {
    root: {
      type: Component.panel,
      children: ['text', 'sub'],
    },
    text: {
      type: Component.textinput,
      data: {
        field: 'text',
        dataType: DataType.string
      },
      label: 'Text'
    },
    sub: {
      type: Component.subschema,
      data: {
        field: 'sub',
        dataType: DataType.object
      },
      schemaName: 'subNested',
      label: 'Subschema'
    }

  }
}

export default schema
