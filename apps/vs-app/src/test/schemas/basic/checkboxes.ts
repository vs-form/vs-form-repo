import { ISchemaDesign, Component, DataType } from '@vs-form/vs-form'

const schema: ISchemaDesign = {
  name: 'checkboxes',
  label: 'Checkboxes & Radiogroups',
  values: {
    radio_1: 3,
    radio_10: 'albert'
  },
  components: {
    root: {
      type: Component.panel,
      children: ['radio1', 'radio2', 'radio10', 'check1', 'check2', 'switch'],
    },
    radio1: {
      type: Component.radiogroup,
      data: {
        field: 'radio_1',
        dataType: DataType.number,
        items: [{ value: 1, text: 'Radio1' }, { value: 2, text: 'Radio2' }, { value: 3, text: 'Radio3' }],
        default: 2
      },
      label: 'radio1',
    },
    radio2: {
      type: Component.radiogroup,
      data: {
        field: 'radio_2',
        dataType: DataType.string,
        items: [{ value: 'a', text: 'Radio1' }, { value: 'b', text: 'Radio2' }],
        default: 'a'
      },
      label: 'radio2',
    },
    radio10: {
      type: Component.radiogroup,
      data: {
        field: 'radio_10',
        dataType: DataType.string,
        items: ['albert', 'hans', 'fritz'],
        default: 'hans'
      },
      label: 'radio10',
      tooltip: 'string array'
    },
    check1: {
      type: Component.checkbox,
      data: {
        field: 'check1',
        dataType: DataType.boolean,
        default: false
      },
      label: 'Checkbox1',
    },
    check2: {
      type: Component.checkbox,
      data: {
        field: 'check2',
        dataType: DataType.boolean,
        default: true
      },
      props: {
        FormHelperTextProps: {
          style: {
            height: 1000,
          }
        }
      },
      label: 'Checkbox2',
    },
    switch: {
      type: Component.switch,
      data: {
        field: 'switch1',
        dataType: DataType.boolean,
        default: true
      },
      label: 'Switch',
    }

  }
}

export default schema
