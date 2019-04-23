import { ISchemaDesign, Component, DataType } from '@vs-form/vs-form'

const schema: ISchemaDesign = {
  name: 'subSimple',
  components: {
    root: {
      type: Component.panel,
      children: ['text', 'done'],
    },
    text: {
      type: Component.textinput,
      data: {
        field: 'text',
        dataType: DataType.string,
        validations: {
          required: true
        }
      },
      label: 'Text',
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
    }

  }
}

export default schema
