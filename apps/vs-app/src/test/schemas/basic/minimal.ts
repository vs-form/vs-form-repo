import { ISchemaDesign, Component, DataType } from '@vs-form/vs-form'

const schema: ISchemaDesign = {
  name: 'simple1',
  label: 'Simple',
  components: {
    root: {
      type: Component.form,
      children: ['text'],
    },
    text: {
      type: Component.textinput,
      data: {
        field: 'text',
        dataType: DataType.string,
      },
      label: 'Text',
    }
  }
}

export default schema
