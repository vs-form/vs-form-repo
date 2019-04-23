import { enums } from '../../index'
import * as types from '../types'

export const schemaCorrectSimple: types.ISchemaDesign = {
  name: 'schemaCorrectTypeSimple',
  components: {
    root: {
      type: enums.Component.panel,
      children: ['tab', 'slider', 'textmask', 'select1', 'select2', 'exp1', 'exp2', 'sub', 'subArray', 'btn1', 'btnShow', 'btnOk', 'btnCancel', 'btnValidate', 'check', 'switch'],
    },
    tab: {
      type: enums.Component.tabs,
      label: 'Tab',
      tabs: ['pntab1', 'pntab2', 'pntab3'],
    },
    pntab1: {
      type: enums.Component.tab,
      label: 'Tab 1',
      icon: 'access-point',
      children: ['card'],
    },
    pntab2: {
      type: enums.Component.tab,
      label: 'Tab 2',
      icon: 'android',
      children: ['text3', 'radiogroup', 'radiogroupString', 'integer']
    },
    pntab3: {
      type: enums.Component.tab,
      label: 'Dates',
      icon: 'calendar-range',
      children: ['date1', 'date2', 'date3', 'date4', 'date5']
    },
    card: {
      type: enums.Component.card,
      tooltip: 'Tooltip Card',
      children: ['text1', 'text2', 'checklistbox', 'checklistboxInt'],
    },
    text1: {
      type: enums.Component.textinput,
      data: {
        field: 'text1',
        dataType: enums.DataType.string,
        validations: {
          required: true,
          min: 3,
          max: 6
        },
      },
      gridItem: {
        md: 4
      },
      label: 'Text1',
      hint: 'minimal 3 characters, maximal 6'
    },
    text2: {
      type: enums.Component.textinput,
      data: {
        field: 'text2',
        dataType: enums.DataType.string,
      },
      gridItem: {
        md: 4
      },
      label: 'Text2',
      tooltip: 'Tooltip für Text2'
    },
    checklistbox: {
      type: enums.Component.checklistbox,
      data: {
        field: 'clb',
        dataType: enums.DataType.arrayString,
        items: [{ value: '1', text: 'first', actionIcon: 'tractor' }, { value: '2', text: 'second' }],
        default: ['1', '2']
      },
      label: 'Checklistbox',
      gridItem: {
        md: 3
      },
      actionIcon: 'account',
      onActionClick: p => {
        // tslint:disable-next-line:no-console
        console.log('value: ', p.value, p.item.value, p.item.text, ' clicked')
      }
    },
    checklistboxInt: {
      type: enums.Component.checklistbox,
      data: {
        field: 'clbInt',
        dataType: enums.DataType.arrayNumber,
        items: [{ value: 1, text: 'first' }, { value: 2, text: 'second' }],
        default: [1]
      },
      label: 'Checklistbox Integer',
      gridItem: {
        md: 3
      },
      actionIcon: 'account'
    },
    text3: {
      type: enums.Component.textinput,
      data: {
        field: 'text3',
        dataType: enums.DataType.string,
      },
      label: 'Text3',
      tooltip: 'Tooltip für Text3'
    },
    slider: {
      type: enums.Component.slider,
      data: {
        field: 'slider',
        dataType: enums.DataType.number,
        default: 1
      },
      label: 'Slider',
    },
    textmask: {
      type: enums.Component.maskinput,
      data: {
        field: 'textmask',
        dataType: enums.DataType.string,
      },
      maskProps: {
        mask: [/\d/, /\d/, /\d/],
        guide: true
      },
      label: 'Textmask'
    },
    check: {
      type: enums.Component.checkbox,
      data: {
        field: 'check',
        dataType: enums.DataType.boolean,
        default: true
      },
      label: 'Checkbox',
    },
    switch: {
      type: enums.Component.switch,
      data: {
        field: 'switch',
        dataType: enums.DataType.boolean,
      },
      label: 'Switch',
    },
    select1: {
      type: enums.Component.select,
      data: {
        field: 'select1',
        dataType: enums.DataType.string,
        items: [{ value: '1', text: 'first' }, { value: '2', text: 'second' }],
        default() {
          return this.items[0].value
        }
      },
      label: 'Select',
      hint: 'Das ist der Hint für Select1',
      gridItem: {
        md: 5
      },
    },
    select2: {
      type: enums.Component.select,
      data: {
        field: 'select2',
        dataType: enums.DataType.number,
        items: [{ value: 1, text: 'one' }, { value: 2, text: 'two' }, { value: 3, text: 'three' }],
      },
      label: 'Select number',
      gridItem: {
        md: 5
      },
    },
    exp1: {
      type: enums.Component.expansionpanel,
      label: 'Exp',
      children: ['expText1', 'expText2']
    },
    expText1: {
      type: enums.Component.textinput,
      data: {
        field: 'expText1',
        dataType: enums.DataType.string,
      },
      gridItem: {
        md: 12
      },
      label: 'TextExp',
    },
    expText2: {
      type: enums.Component.textinput,
      data: {
        field: 'expText2',
        dataType: enums.DataType.string,
      },
      gridItem: {
        md: 6
      },
      label: 'TextExp2',
    },
    exp2: {
      type: enums.Component.expansionpanel,
      label: 'Exp2',
      children: ['expText3']
    },
    expText3: {
      type: enums.Component.textinput,
      data: {
        field: 'expText3',
        dataType: enums.DataType.string,
      },
      gridItem: {
        md: 6
      },
      label: 'TextExp3',
    },
    btn1: {
      type: enums.Component.button,
      label: 'change value',
      onClick: (p: types.IComponentEventParams) => {
        if (p.schemaManager.getValue('text1') === '') {
          p.schemaManager.updateValue('text1', 'hallo')
        }
        p.schemaManager.render()
      },
      gridItem: {
        md: 1
      }
    },

    btnShow: {
      type: enums.Component.button,
      label: 'show values',
      onClick: (p: types.IComponentEventParams) => { console.info(p.schemaManager.schema.values) },
      gridItem: {
        md: 1
      }
    },
    btnOk: {
      type: enums.Component.button,
      action: enums.ButtonAction.save,
      gridItem: {
        md: 1
      }
    },
    btnCancel: {
      type: enums.Component.button,
      action: enums.ButtonAction.cancel,
      gridItem: {
        md: 1
      }
    },
    btnValidate: {
      type: enums.Component.button,
      label: 'validate values',
      onClick: (p: types.IComponentEventParams) => { p.schemaManager.validateValuesSchema(), console.info(p.schemaManager.printValueErrors()) },
      gridItem: {
        md: 1
      }
    },
    sub: {
      data: {
        field: 'sub',
        dataType: enums.DataType.object
      },
      label: 'Subschema',
      type: enums.Component.subschema,
      schemaName: 'subschema',
    },
    subArray: {
      data: {
        field: 'subArray',
        dataType: enums.DataType.array
      },
      label: 'Subschema Array',
      type: enums.Component.subschema,
      schemaName: 'subschema',
      columnSettings: [{
        compId: 'phone',
        alignRight: false,
        autowidth: false,
        width: 100,
        widthUnit: 'px'
      }, {
        compId: 'slider',
        alignRight: true,
        autowidth: true,
        sortable: true,
        widthUnit: 'px'
      }, {
        compId: 'vText',
        alignRight: false,
        autowidth: false,
        sortable: true,
        width: 500,
        widthUnit: 'px'
      }]
    },
    radiogroup: {
      type: enums.Component.radiogroup,
      data: {
        field: 'radiogroup',
        dataType: enums.DataType.number,
        default: 2,
        items: [{ value: 1, text: 'Radio1' }, { value: 2, text: 'Radio2' }]
      },
      label: 'Radio (number)',
      gridItem: {
        xl: 4
      },
    },
    radiogroupString: {
      type: enums.Component.radiogroup,
      data: {
        field: 'radiogroupString',
        dataType: enums.DataType.string,
        default: 'b',
        items: [{ value: 'a', text: 'Radio1' }, { value: 'b', text: 'Radio2' }]
      },
      label: 'Radio (string)',
      gridItem: {
        xl: 4
      },
    },
    integer: {
      type: enums.Component.integer,
      data: {
        field: 'int',
        dataType: enums.DataType.integer,
      },
      label: 'Integer',
      gridItem: {
        xl: 4
      },
    },
    date1: {
      type: enums.Component.date,
      data: {
        field: 'date1',
        dataType: enums.DataType.date,
        default() {
          return new Date()
        }
      },
      label: 'Date',
      gridItem: {
        xl: 4
      },
    },
    date2: {
      type: enums.Component.datetime,
      data: {
        field: 'date2',
        dataType: enums.DataType.date,
        default() {
          return new Date()
        }
      },
      label: 'Date & Time',
      gridItem: {
        xl: 4
      },
    },
    date3: {
      type: enums.Component.time,
      data: {
        field: 'date3',
        dataType: enums.DataType.date,
        default() {
          return new Date()
        }
      },
      label: 'Time',
      gridItem: {
        xl: 4
      },
    },
    date4: {
      type: enums.Component.date,
      data: {
        field: 'date_4',
        dataType: enums.DataType.date,
        default: new Date('1968-04-24')
      },
      label: 'Date fix',
      gridItem: {
        xl: 4
      },
    },
    date5: {
      type: enums.Component.time,
      data: {
        field: 'date5',
        dataType: enums.DataType.date,
      },
      label: 'Time fix',
      gridItem: {
        xl: 4
      },
    },
  }
}
