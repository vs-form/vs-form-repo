import { ISchemaDesign, Component, DataType, types } from '@vs-form/vs-form'

import { countries, animals } from '../../lookupItems'

const updateItems = (s: ISchemaDesign, list: string[]) => {
  const listInt = list.map((c, ind) => ({ value: ind + 1, text: c }))
  const listStr: types.ISelectItemList = list.map(c => ({ value: c, text: c }))
  Object.keys(s.components).map(key => s.components[key])
    .forEach((comp: any) => {
      if (comp.data && comp.data.items) {
        if (comp.data.dataType === DataType.number || comp.data.dataType === DataType.arrayNumber) {
          comp.data.items = listInt
        } else {
          comp.data.items = listStr
        }
      }
    })
}

const schema: ISchemaDesign = {
  name: 'selects',
  label: 'Selects',
  components: {
    root: {
      type: Component.panel,
      children: ['card', 'cardExt', 'cardBtn'],
    },
    card: {
      type: Component.card,
      label: 'Select Inputs',
      children: ['select1', 'select2', 'select3', 'select4', 'select5', 'select6', 'select7', 'select8']
    },
    select1: {
      type: Component.select,
      data: {
        field: 'select1',
        dataType: DataType.string,
        items: ['first', 'second', 'third', 'fourth' ],
      },
      label: 'Select1',
      gridItem: { md: 6 },
      hint: 'select with string value',
    },
    select2: {
      type: Component.select,
      data: {
        field: 'select2',
        dataType: DataType.number,
        items: [{ value: 1, text: 'one' }, { value: 2, text: 'two' }, { value: 3, text: 'three' }],
      },
      label: 'Select2',
      gridItem: { md: 6 },
      hint: 'select with numeric value'
    },
    select3: {
      type: Component.select,
      data: {
        field: 'selec3',
        dataType: DataType.string,
        items: [{ value: '1', text: 'first' }, { value: '2', text: 'second' }],
      },
      label: 'Selec3',
      gridItem: { md: 6 },
      hint: 'select with prefix',
      prefix: '$ ',
    },
    select4: {
      type: Component.select,
      data: {
        field: 'select4',
        dataType: DataType.string,
        items: [{ value: '1', text: 'first' }, { value: '2', text: 'second' }],
      },
      label: 'Select4',
      hint: 'select with suffix button',
      gridItem: { md: 6 },
      suffix: ['buttonSuff'],
    },
    select5: {
      type: Component.select,
      data: {
        field: 'select5',
        dataType: DataType.arrayString,
        items: [{ value: '1', text: 'first' }, { value: '2', text: 'second' }],
      },
      label: 'Select5',
      gridItem: { md: 6 },
      hint: 'multi-select',
    },
    select6: {
      type: Component.select,
      data: {
        field: 'select6',
        dataType: DataType.arrayNumber,
        items: [{ value: 1, text: 'one' }, { value: 2, text: 'two' }, { value: 3, text: 'three' }],
      },
      label: 'Select6',
      gridItem: { md: 6 },
      hint: 'multi-select (number)',
    },
    select7: {
      type: Component.select,
      data: {
        field: 'select7',
        dataType: DataType.arrayString,
        items: ['one', 'two', 'three', 'four'],
      },
      label: 'Select7',
      gridItem: { md: 6 },
      hint: 'multi-select (string array)',
    },
    select8: {
      type: Component.select,
      data: {
        field: 'select8',
        dataType: DataType.string,
        items: ['one', 'two', 'three', 'four'],
      },
      label: 'Select8',
      gridItem: { md: 6 },
      hint: 'string items as string array',
    },
    buttonSuff: {
      type: Component.iconbutton,
      icon: 'tractor'
    },
    cardExt: {
      type: Component.expansionpanel,
      label: 'Extended Select',
      children: ['select10', 'select101', 'select11', 'select12', 'select121', 'input12', 'select13']
    },
    select10: {
      type: Component.selectext,
      data: {
        field: 'select10',
        dataType: DataType.string,
        items: [{ value: '1', text: 'first' }, { value: '2', text: 'second' }],
      },
      label: 'Select 10',
      gridItem: { md: 6 },
      hint: 'select with string value',
    },
    select101: {
      type: Component.selectext,
      data: {
        field: 'select101',
        dataType: DataType.string,
        items: ['first', 'secon', 'albert', 'fritz'],
      },
      label: 'Select 101',
      gridItem: { md: 6 },
      hint: 'select with string value items is string array',
    },
    select11: {
      type: Component.selectext,
      data: {
        field: 'select11',
        dataType: DataType.number,
        items: [{ value: 1, text: 'first' }, { value: 2, text: 'second' }],
      },
      label: 'Select 11',
      gridItem: { md: 6 },
      hint: 'select with number value',
    },
    select12: {
      type: Component.selectext,
      data: {
        field: 'select12',
        dataType: DataType.arrayString,
        items: [{ value: '1', text: 'first' }, { value: '2', text: 'second' }],
      },
      label: 'Select 12',
      gridItem: { md: 6 },
      hint: 'multi-select (string)',
    },
    select121: {
      type: Component.selectext,
      data: {
        field: 'select121',
        dataType: DataType.arrayString,
        items: ['hallo', 'first', 'albert'],
      },
      label: 'Select 121',
      gridItem: { md: 6 },
      hint: 'multi-select (string items is string array)',
    },
    select13: {
      type: Component.selectext,
      data: {
        field: 'select13',
        dataType: DataType.arrayNumber,
        items: [{ value: 1, text: 'first' }, { value: 2, text: 'second' }],
      },
      label: 'Select 13',
      gridItem: { md: 6 },
      hint: 'multi-select (number)',
    },
    input12: {
      type: Component.textinput,
      data: {
        field: 'input12',
        dataType: DataType.string,
      },
      label: 'input12',
      gridItem: { md: 6 },
    },
    cardBtn: {
      type: Component.card,
      label: 'Populate Items',
      children: ['button1', 'button2', 'button3']
    },
    button1: {
      type: Component.button,
      label: 'Populate Items with Countries',
      gridItem: { md: 4 },
      onClick: (p: types.ISchemaEventParams) => {
        updateItems(p.schemaManager.schema, countries)
        p.schemaManager.render()
      }
    },
    button2: {
      type: Component.button,
      label: 'Populate Items with Animals',
      gridItem: { md: 4 },
      onClick: (p: types.ISchemaEventParams) => {
        updateItems(p.schemaManager.schema, animals)
        p.schemaManager.render()
      }
    },
    button3: {
      type: Component.button,
      label: 'Clear Lookup-Items',
      gridItem: { md: 4 },
      onClick: (p: types.ISchemaEventParams) => {
        updateItems(p.schemaManager.schema, [])
        p.schemaManager.render()
      }
    },

  }
}

export default schema
