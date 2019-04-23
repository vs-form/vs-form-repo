import { enums, types } from '../../index'

export const schemaCheckEvents: types.ISchemaDesign = {
  numtext1Changes: 0,
  numSchemaChanges: 0,
        // tslint:disable-next-line:typedef
        onChange(p) {
    p.schema.numSchemaChanges++
  },
  components: {
    root: {
      type: enums.Component.panel,
      children: ['text1', 'text2', 'text3'],
    },
    text1: {
      type: enums.Component.textinput,
      label: 'Text1',
      data: {
        field: 'text1',
        // tslint:disable-next-line:typedef
        onChange(p) {
          p.schema.numtext1Changes++
        },
        dataType: enums.DataType.string,
      },
    },
    text2: {
      type: enums.Component.textinput,
      label: 'Text2',
      data: {
        field: 'text2',
        dataType: enums.DataType.string,
      },
    },
    text3: {
      type: enums.Component.textinput,
      label: 'text3',
      data: {
        field: 'text3',
        // tslint:disable-next-line:typedef
        onBeforeChange(p) {
          if (p.value === 'Fritz' || p.value === 'Max') {
            p.value = 'Hello ' + p.value
          }
        },
        dataType: enums.DataType.string,
      },
    }

  }
}