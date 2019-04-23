import { ISchemaDesign, Component, DataType } from '@vs-form/vs-form'

const schema: ISchemaDesign = {
  name: 'subNested2',
  components: {
    root: {
      type: Component.panel,
      children: ['text', 'done', 'sub'],
    },
    text: {
      type: Component.textinput,
      data: {
        field: 'text',
        dataType: DataType.string
      },
      label: 'Text in Subschema 3',
      gridItem: {md: 6}
    },
    done: {
      type: Component.checkbox,
      data: {
        field: 'done',
        dataType: DataType.boolean
      },
      label: 'Done',
      gridItem: {md: 3}
    },
    sub: {
      type: Component.subschema,
      data: {
        field: 'nested3',
        dataType: DataType.object
      },
      schemaName: 'subNested3',
      label: 'Subschema nested 3'
    }
  }
}

export default schema
