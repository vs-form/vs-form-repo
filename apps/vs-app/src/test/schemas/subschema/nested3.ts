import { ISchemaDesign, Component, DataType } from '@vs-form/vs-form'

const schema: ISchemaDesign = {
  name: 'subNested3',
  components: {
    root: {
      type: Component.panel,
      children: ['text', 'done'],
    },
    text: {
      type: Component.textinput,
      data: {
        field: 'text',
        dataType: DataType.string
      },
      label: 'Text  in Subschema 4',
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
    }
  }
}

export default schema
