import { ISchemaDesign, Component, DataType } from '@vs-form/vs-form'

const nested1: ISchemaDesign = {
  name: 'subNested',
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
      label: 'Text in Subschema 1',
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
        field: 'nested1',
        dataType: DataType.object
      },
      schemaName: 'subNested1',
      label: 'Subschema nested 1'
    }
  }
}

export default nested1
