import { ISchemaDesign, Component, DataType, types } from '@vs-form/vs-form'

const schema: ISchemaDesign = {
  name: 'focus',
  label: 'Focus',
  onCreated(p) {
    const s = p.schema.components.Select_Component_To_Focus as types.IComponentSelect
    s.data.items = Object.keys(p.schema.components).map(c => ({ text: c, value: c }))
  },
  components: {
    root: {
      type: Component.form,
      children: ['Select_Component_To_Focus', 'ok', 'text', 'tabs', 'radio'],
    },
    text: {
      type: Component.textinput,
      data: {
        field: 'text',
        dataType: DataType.string,
      },
      label: 'Text',
    },
    btn1: {
      type: Component.button,
      label: 'btn1'
    },
    sel1: {
      type: Component.select,
      label: 'sel1',
      data: { field: 'sel1', dataType: DataType.string, items: [] }
    },
    exp1: {
      type: Component.expansionpanel,
      label: 'exp1',
      children: ['cb', 'date'],
      expanded: true
    },
    tabs: {
      type: Component.tabs,
      label: 'tabs',
      tabs: ['tab1', 'tab2'],
      activeTab: 0
    },
    tab1: {
      type: Component.tab,
      label: 'tab1',
      children: ['sel1', 'btn1', 'selext']
    },
    tab2: {
      type: Component.tab,
      label: 'tab2',
      children: ['btnsel', 'int', 'number', 'formattedNumber', 'exp1', 'switch']
    },
    selext: {
      type: Component.selectext,
      label: 'selext',
      data: { field: 'selext', dataType: DataType.string, items: [] }
    },
    btnsel: {
      type: Component.button,
      label: 'btnsel'
    },
    int: {
      type: Component.integer,
      label: 'int',
      data: { field: 'int', dataType: DataType.integer }
    },
    number: {
      type: Component.number,
      label: 'number',
      data: { field: 'number', dataType: DataType.number }
    },
    formattedNumber: {
      type: Component.numberformat,
      label: 'formattedNumber',
      data: { field: 'formattedNumber', dataType: DataType.number },
      numberFormatProps: {
        thousandSeparator: '\'',
        decimalSeparator: '.',
        decimalScale: 2
      }
    },
    date: {
      type: Component.date,
      label: 'date',
      data: {
        field: 'date',
        dataType: DataType.date
      }
    },
    cb: {
      type: Component.checkbox,
      label: 'cb',
      data: {
        field: 'cb',
        dataType: DataType.boolean
      }
    },
    switch: {
      type: Component.switch,
      label: 'switch',
      data: {
        field: 'switch',
        dataType: DataType.boolean
      }
    },
    Select_Component_To_Focus: {
      type: Component.selectext,
      label: 'Select Component To Focus',
      data: {
        field: 'selcomp',
        dataType: DataType.string,
        items: []
      },
      gridItem: { xs: 8 }
    },
    ok: {
      type: Component.button,
      label: 'ok',
      gridItem: { xs: 6 },
      onClick(p) {
        const comp = p.schema.components[p.schema.values.selcomp]

        if (comp) {
          p.schemaManager.focusComponent(comp)
        }

      }
    },
    radio: {
      type: Component.radiogroup,
      label: 'radio',
      data: {
        field: 'radio',
        dataType: DataType.string,
        items: [{ value: '1', text: '1' }, { value: '2', text: '2' }, { value: '3', text: '3' }]
      }
    }
  }
}

export default schema
