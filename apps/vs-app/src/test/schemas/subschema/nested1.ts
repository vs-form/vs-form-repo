import { ISchemaDesign, Component, DataType } from '@vs-form/vs-form'

const schema: ISchemaDesign = {
  name: 'subNested1',
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
      label: 'Text  in Subschema 2',
      gridItem: {md: 6}
    },
    done: {
      type: Component.checkbox,
      data: {
        field: 'done',
        dataType: DataType.boolean,
        default: true
      },
      label: 'Done',
      gridItem: {md: 3}
    },
    sub: {
      type: Component.subschema,
      data: {
        field: 'nested2',
        dataType: DataType.object
      },
      schemaName: 'subNested2',
      label: 'Subschema nested 2'
    }
  }
}

export default schema
