import { ISchemaDesign, Component, DataType, ButtonAction } from '@vs-form/vs-form'

const schema: ISchemaDesign = {
  values: {
    text1: 'Hello',
    select: ''
  },
  onSubmit() {
    alert('Values have been saved')
  },
  onCancelValues() {
    alert('Values cancelled')
  },
  components: {
    root: {
      type: Component.form,
      children: ['text1', 'select', 'btnOk', 'btnCancel', 'btnValues'],
    },
    text1: {
      type: Component.textinput,
      data: {
        field: 'text1',
        dataType: DataType.string,
      },
      label: 'Text1',
    },
    select: {
      type: Component.select,
      data: {
        field: 'select',
        dataType: DataType.string,
        items: ['car', 'house', 'garden', 'bed', 'chair']
      },
      label: 'Text2',
    },
    btnOk: {
      type: Component.button,
      disabled: false,
      tooltip: 'Click to save',
      action: ButtonAction.save,
      gridItem: {
        md: 2
      },
    },
    btnCancel: {
      type: Component.button,
      action: ButtonAction.cancel,
      gridItem: {
        md: 2
      },
    },
    btnValues: {
      type: Component.button,
      label: 'Show Values',
      onClick(p) {
        alert('Values: ' + JSON.stringify(p.schema.values, null, 2))
      },
      gridItem: {
        md: 4
      },
    },

  }
}

export default schema
