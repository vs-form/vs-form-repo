import { enums } from '../../index'
import * as types from '../types'

export const schemaNone = {
  hans: 1
}

export const schemaNotObject = []

export const schemaNoComponents = {
}

export const schemahasNoRootComponent = {
  components: {
    text1: {
      type: enums.Component.text,
      text: 'dada'
    }
  }
}

export const schemahasNoRootComponent2 = {
  components: {
    input1: {
      type: enums.Component.textinput,
      data: {
        dataType: enums.DataType.string,
        field: 'input1'
      },
      prefix: ['icon1']
    },
    icon1: {
      type: enums.Component.icon,
      icon: 'dada'
    },
    text1: {
      type: enums.Component.text,
      text: 'dada'
    },
    panel1: {
      type: enums.Component.panel,
      children: ['input2']
    },
    input2: {
      type: enums.Component.textinput,
      data: {
        dataType: enums.DataType.string,
        field: 'input2'
      },
    },
    input3: {
      type: enums.Component.textinput,
      data: {
        dataType: enums.DataType.string,
        field: 'input3'
      },
    },

  }
}

export const schemahasNoRootComponent3 = {
  components: {
    root: {
      type: enums.Component.panel,
      children: ['input1', 'text1', 'panel1']
    },
    ...schemahasNoRootComponent2.components
  }
}

export const schemahasRootCompoent = {
  components: {
    text1: {
      type: enums.Component.text,
      text: 'dada'
    }
  }
}

export const schemahasInvalidProp = {
  tubel: {
  }
}

export const schemaWrongPropertyType = {
  name: 0,
  components: {
    root: {
    }
  }
}

export const schemaRootKeyWrongType = {
  components: {
    root: 0
  }
}

export const schemaRootKeyTypeWrongType = {
  components: {
    root: {
      type: enums.Component.textinput,
      children: []
    }
  }
}

export const schemaRootKeyNoChildren = {
  components: {
    root: {
      type: enums.Component.panel,
    }
  }
}

export const schemaRootKeyEmptyChildren = {
  components: {
    root: {
      type: enums.Component.panel,
      children: []
    }
  }
}

export const schemaRootKeyChildrenAreBad = {
  name: 'schema',
  components: {
    root: {
      type: enums.Component.panel,
      children: [0, 1],
    },
  }
}

export const schemawithRecursivebSchema1 = {
  name: 'schemawithRecursivebSchema1',
  components: {
    root: {
      type: enums.Component.panel,
      children: ['name', 'sub']
    },
    name: {
      data: {
        field: 'name',
        dataType: 'string',
      },
      type: enums.Component.textinput,
      label: 'Name',
    },
    card1: {
      type: enums.Component.card,
      label: 'Card1',
      children: ['name', 'card2']
    },
    card2: {
      type: enums.Component.card,
      label: 'Card2',
      children: ['name', 'card3']
    },
    card3: {
      type: enums.Component.card,
      label: 'Card3',
      children: ['name', 'card1', 'card4']
    },
    card4: {
      type: enums.Component.card,
      label: 'Card4',
      children: ['name']
    },
    sub: {
      data: {
        field: 'sub',
      },
      type: enums.Component.subschema,
      schemaName: 'schemawithRecursivebSchema1',
    },
  }
}

export const schemaUnresolvableSubschema = {
  components: {
    root: {
      type: enums.Component.panel,
      children: ['name', 'sub']
    },
    name: {
      data: {
        field: 'name',
        dataType: 'string',
      },
      type: enums.Component.textinput,
      label: 'Name',
    },
    sub: {
      data: {
        field: 'sub',
        dataType: 'object',
      },
      type: enums.Component.subschema,
      schemaName: 'Tubel',
    },
  }
}

export const schemaSubSchemaError = {
  components: {
    root: {
      type: enums.Component.panel,
      children: ['name', 'sub', 'sub1', 'sub2']
    },
    name: {
      data: {
        field: 'name',
        dataType: 'string',
      },
      type: enums.Component.textinput,
      label: 'Name',
    },
    sub: {
      data: {
        field: 'sub',
        dataType: 'array',
      },
      columnSettings: [
        {compId: 'email', sortDirection: 'asc', width: 200},
        {compId: 'vText', sortable: false}
      ],
      type: enums.Component.subschema,
      schemaName: 'subschema',
      keyField: 'email'
    },
    sub1: {
      type: enums.Component.subschema,
      data: {
        field: 'sub1',
        dataType: 'array',
      },
      columnSettings: [
        {compId: 'email1', sortDirection: 'asc', width: 200},
        {compId: 'vText1', sortable: false}
      ],
      schemaName: 'subschema',
      keyField: 'email1'
    },
    sub2: {
      type: enums.Component.subschema,
      data: {
        field: 'sub2',
        dataType: 'array',
      },
      schemaName: 'subschema',
    },
  }
}

// ==================
// Test Components
// ==================

export const schemaComponentHasNoType = {
  name: 'schema',
  components: {
    root: {
      type: enums.Component.panel,
      children: ['name'],
    },
    name: {
      label: 'Name'
    }
  }
}

export const schemaErrorType = {
  name: 'schemaErrorType',
  values: {
    fieldHasNoComponent: 1
  },
  components: {
    root: {
      type: enums.Component.panel,
      children: ['noLabel'],
    },
    noLabel: {
      data: {
        // field: 'noLabel',
        // dataType: 'string'
      },
      type: enums.Component.textinput,
    },
    wrongfieldPropertyType: {
      data: {
        field: 1,
      },
      type: enums.Component.textinput,
    },
    formTagnotAllowed: {
      type: enums.Component.form,
      children: ['wrongDataType']
    },
    wrongDataType: {
      data: {
        field: 'name',
        dataType: 'Tubel'
      },
      type: enums.Component.textinput,
      gridItem: {
        xl: 33
      }
    },
    tabHasNotTabAsChildren: {
      type: enums.Component.tabs,
      label: 'Tab',
      tabs: ['wrongDataType']
    },
    wrongDefaultValue: {
      data: {
        field: 'name',
        dataType: 'string',
        items: ['dada', 'dudu'],
        default: 0
      },
      type: enums.Component.textinput,
    },
    wrongDefaultValueDate: {
      data: {
        field: 'date',
        dataType: enums.DataType.date,
        default: '2017-12-111'
      },
      type: enums.Component.date,
    },
    wrongDefaultValueTime: {
      data: {
        field: 'date',
        dataType: enums.DataType.date,
        default: '12:101'
      },
      type: enums.Component.time,
    },
    selectWrong: {
      type: enums.Component.select,
      data: {
        field: 'selectWrong',
        dataType: 'boolean',
        default() {
          return 0
        }
      },
      label: 'Select',
      hint: 'Das ist der Hint für Select1',
    },
    selectItemStringOrNumber: {
      type: enums.Component.select,
      data: {
        field: 'selectItemStringOrNumber',
        dataType: 'string',
        items: [1, 2, true, 4]
      },
      label: 'Select',
    },
    stringArrayDataTypeString: {
      type: enums.Component.select,
      data: {
        field: 'stringArrayDataTypeString',
        dataType: 'number',
        items: ['1', '2']
      },
      label: 'Select',
    },
    stringArrayDataTypeStringOk: {
      type: enums.Component.select,
      data: {
        field: 'stringArrayDataTypeStringOk',
        dataType: 'string',
        items: ['1', '2']
      },
      label: 'Select',
    },
    selectItemStringOrNumber2: {
      type: enums.Component.select,
      data: {
        field: 'selectItemStringOrNumber2',
        dataType: 'string',
        items: [1, 2, 3, '4', '5']
      },
      label: 'Select',
    },
    selectItem3: {
      type: enums.Component.select,
      data: {
        field: 'selectItemStringOrNumber2',
        dataType: 'string',
        items: [{ value: 1, text: '1' }, { value: 2, tubel: '2' }]
      },
      label: 'Select',
    },
    selectItem4: {
      type: enums.Component.select,
      data: {
        field: 'selectItem4',
        dataType: 'string',
        items: [{ value: 1, text: '1' }, { value: 2, text: '2' }, { value: '3', text: '3' }, { value: 4, text: '4' }]
      },
      label: 'Select',
    },
    selectItem5: {
      type: enums.Component.select,
      data: {
        field: 'selectItem4',
        dataType: 'number',
        items: [{ value: '1', text: '1' }, { value: '2', text: '2' }]
      },
      label: 'Select',
    },
    selectItem6: {
      type: enums.Component.select,
      data: {
        field: 'selectItem4',
        dataType: 'number',
        items: [{ value: 1, text: '1' }, { value: 2, text: '2' }, { value: 3, text: '3' }, , { value: 2, text: '4' }, , { value: 4, text: '5' }]
      },
      label: 'Select',
    },
    selectItem7: {
      type: enums.Component.select,
      data: {
        field: 'selectItem4',
        dataType: 'number',
        items: [{ value: 1, text: '1' }, { value: 2, text: '2' }, { value: 3, text: '3' }, { value: 2, text: 'tueb' }]
      },
      label: 'Select',
    },
    selectItem8: {
      type: enums.Component.select,
      data: {
        field: 'selectItem4',
        dataType: 'number',
        items: [{ value: 1, text: '1' }, { value: 2, text: '2' }, { value: 3, text: true }, { value: 4, text: 'tueb' }]
      },
      label: 'Select',
    },
    selectItem9: {
      type: enums.Component.select,
      data: {
        field: 'selectItem4',
        dataType: 'number',
        items: [{ value: 1, text: '' }, { value: 2, text: '2' }, { value: 3, text: ' ' }, { value: 4, text: 'tueb' }]
      },
      label: 'Select',
    },
    selectItem10: {
      type: enums.Component.select,
      data: {
        field: 'selectItem4',
        dataType: 'number',
        items: [{ value: 1, text: '1' }, { value: 2, text: '2' }, { value: 3, text: '3' }, { value: 4, text: '1' }]
      },
      label: 'Select',
    },
    selectItemsEmptyArray: {
      type: enums.Component.select,
      data: {
        field: 'selectEmptyArray',
        dataType: 'number',
        items: []
      },
      label: 'Select',
      hint: 'Das ist der Hint für Select1',
    },
    iconNoIconOrSvg: {
      type: enums.Component.icon,
    },
    iconHasIcon: {
      icon: 'beer',
      type: enums.Component.icon,
    },
    iconHasSVG: {
      svg: 'dada',
      type: enums.Component.icon,
    },
    iconHasComponent: {
      component: 'dada',
      type: enums.Component.icon,
    },
    radioWrong: {
      type: enums.Component.radiogroup,
      data: {
        field: 'radioWrong',
        dataType: 'boolean',
        items: [{ value: '1', text: 'Radio1' }, { value: '2', text: 'Radio2' }]
      },
      label: 'Radio',
      gridItem: {
        xl: 4
      }
    },
    checkboxWrong: {
      data: {
        field: 'checkboxWrong',
        dataType: 'string',
      },
      type: enums.Component.checkbox,
    },
    tableWrong1: {
      type: enums.Component.dataTable,
      columns: [{
        component: 'textCorrect',
        align: 'left',
        sortable: false,
        width: ''
      },
      {
        component: 'furztubel',
        align: 'tubel',
        sortable: true,
        width: '',
        tubek: 4
      }
      ],
    },
    tableWrong2: {
      type: enums.Component.dataTable,
      columns: [{
        component: 'textCorrect',
        align: 'left',
        sortable: false,
        width: ''
      },
      {
        component: 'cardHasTabAsChildren',
        align: 'left',
        sortable: true,
        width: ''
      }
      ],
    },
    tableWrongEmptyColumns: {
      type: enums.Component.dataTable,
      columns: [],
    },
    tableWrongWrongColumnsType: {
      type: enums.Component.dataTable,
      columns: [0, 1],
    },
    textCorrect: {
      type: enums.Component.textinput,
      label: 'textCorrect',
      data: {
        field: 'textCorrect',
        dataType: 'string'
      }
    },
    notInValues: {
      data: {
        field: 'notInValues',

      },
      label: 'Name',
      type: enums.Component.textinput,
    },
    notString: {
      data: {
        field: 'name',

      },
      label: 'Name',
      type: enums.Component.textinput,
    },
    duplicateField: {
      data: {
        field: 'name',
        dataType: 'string'
      },
      label: 'Name',
      type: enums.Component.textinput,
    },
    duplicateParents: {
      data: {
        field: 'duplicateParents',
      },
      label: 'duplicateParents',
      type: enums.Component.textinput,
    },
    fieldHasNoParent: {
      data: {
        field: 'noparent',

      },
      label: 'noparent',
      type: enums.Component.textinput,
    },
    cardEmpty: {
      type: enums.Component.card,
      children: []
    },
    cardWrongKeys: {
      type: enums.Component.card,
      children: ['tubel', 'katze']
    },
    cardHasTabAsChildren: {
      type: enums.Component.card,
      children: ['notString', 'tabHere']
    },
    tabHere: {
      type: enums.Component.tab,
      label: 'Tab',
      children: []
    },
    cardDuplicateParents1: {
      type: enums.Component.card,
      children: ['duplicateParents']
    },
    cardDuplicateParents2: {
      type: enums.Component.card,
      children: ['duplicateParents']
    },
    hasUselessProperty: {
      data: {
        field: 'useless',
      },
      label: 'Useless',
      type: enums.Component.textinput,
      uselessProperty: 0
    },
    wrongArrayValueType: {
      data: {
        field: 'vorname1',
        dataType: 'string',

      },
      label: 'Vorname1',
      type: enums.Component.textinput,
    },
    prefixStringOrArray: {
      type: enums.Component.textinput,
      label: 'test',
      prefix: 1,
      data: {
        field: 'dada',
        dataType: enums.DataType.string
      }
    },
    suffixStringOrArray: {
      type: enums.Component.textinput,
      label: 'test',
      suffix: false,
      data: {
        field: 'dada1',
        dataType: enums.DataType.string
      }
    },
    prefixCompNotFound: {
      type: enums.Component.textinput,
      label: 'test',
      prefix: ['fock'],
      data: {
        field: 'dada1',
        dataType: enums.DataType.string
      }
    },
    suffixCompNotFound: {
      type: enums.Component.textinput,
      label: 'test',
      suffix: ['fock2'],
      data: {
        field: 'dada1',
        dataType: enums.DataType.string
      }
    },
    prefixCompNotFoundArray: {
      type: enums.Component.textinput,
      label: 'test',
      prefix: ['fock', 'button1'],
      data: {
        field: 'dada1',
        dataType: enums.DataType.string
      }
    },
    suffixCompNotFoundArray: {
      type: enums.Component.textinput,
      label: 'test',
      suffix: ['button1', 'fock2'],
      data: {
        field: 'dada1',
        dataType: enums.DataType.string
      }
    },
    prefixCompNotFoundCorrect: {
      type: enums.Component.textinput,
      label: 'test',
      prefix: ['button1', 'button2'],
      data: {
        field: 'dada1',
        dataType: enums.DataType.string
      }
    },
    prefixInvalidType: {
      type: enums.Component.textinput,
      label: 'test',
      prefix: ['text4299'],
      data: {
        field: 'dada1',
        dataType: enums.DataType.string
      }
    },
    suffixInvalidType: {
      type: enums.Component.textinput,
      label: 'test',
      suffix: ['text4299'],
      data: {
        field: 'dada1',
        dataType: enums.DataType.string
      }
    },
    suffixPrefixInvalidType: {
      type: enums.Component.textinput,
      label: 'test',
      prefix: ['button1', 'text4299'],
      suffix: ['text4299'],
      data: {
        field: 'dada1',
        dataType: enums.DataType.string
      }
    },
    button1: {
      type: enums.Component.button,
      icon: 'anchor'
    },
    button2: {
      type: enums.Component.button,
      icon: 'anchor'
    },
    text4299: {
      type: enums.Component.textinput,
      data: {
        field: 'text',
        dataType: enums.DataType.string
      },
      label: 'Text'
    },
    maskOnlyInMaskInputComponent: {
      type: enums.Component.text,
      maskProps: {
        mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      },
      data: {
        field: 'text',
        dataType: enums.DataType.date
      },
      label: 'Text'
    },
    maskOnlyInInputTextComponent: {
      type: enums.Component.textinput,
      maskProps: {
        mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      },
      data: {
        field: 'text',
        dataType: enums.DataType.string
      },
      label: 'Text',
    },
    maskNotMultilineInput: {
      type: enums.Component.maskinput,
      maskProps: {
        mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      },
      data: {
        field: 'text',
        dataType: enums.DataType.string
      },
      props: {
        multiline: true
      },
      label: 'Text',
    },
    maskArrayItemsStringOrRegExp: {
      type: enums.Component.maskinput,
      maskProps: {
        mask: ['(', /[1-9]/, /\d/, /\d/, 1, ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      },
      data: {
        field: 'text',
        dataType: enums.DataType.string
      },
      label: 'Text',
    },
    maskArrayOrFunction1: {
      type: enums.Component.maskinput,
      maskProps: {
        mask: { f: ['(', /[1-9]/] }
      },
      data: {
        field: 'text',
        dataType: enums.DataType.string
      },
      label: 'Text',
    },
    maskArrayOrFunction2: {
      type: enums.Component.maskinput,
      maskProps: {
        mask: 1
      },
      data: {
        field: 'text',
        dataType: enums.DataType.string
      },
      label: 'Text',
    },
    maskArrayOrFunctionCorrect: {
      type: enums.Component.maskinput,
      maskProps: {
        mask(_rawValue: string) { return ['(', /[1-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] }
      },
      data: {
        field: 'text',
        dataType: enums.DataType.string
      },
      label: 'Text',
    },
    numberFormatwrongType: {
      type: enums.Component.textinput,
      numberFormatProps: {

      },
      data: {
        field: 'text',
        dataType: enums.DataType.string
      },
      label: 'Text',
    },
    numberFormatNoProps: {
      type: enums.Component.numberformat,
      data: {
        field: 'text',
        dataType: enums.DataType.number
      },
      label: 'Text',
    },
    numberFormatwrongDataType: {
      type: enums.Component.numberformat,
      numberFormatProps: {

      },
      data: {
        field: 'text',
        dataType: enums.DataType.string
      },
      label: 'Text',
    },
    numberFormatwrongFormat: {
      type: enums.Component.numberformat,
      data: {
        field: 'text',
        dataType: enums.DataType.number
      },
      numberFormatProps: {
        format: true
      },
      label: 'Text',
    },
    numberFormatwrongMask: {
      type: enums.Component.numberformat,
      data: {
        field: 'text',
        dataType: enums.DataType.number
      },
      numberFormatProps: {
        mask: true
      },
      label: 'Text',
    },
    gridSizeWrong: {
      type: enums.Component.text,
      text: 'dada',
      gridItem: {
        xl: 13,
        lg: 'cool',
        md: true,
        sm: 'auto',
        xs: 6,
      }
    },
    gridSizeWrong2: {
      type: enums.Component.text,
      text: 'dada',
      gridItem: {
        xl: true,
        lg: 10,
        md: 'test',
        sm: 123,
        xs: 'frer',
      }
    },
    gridParentWrong1: {
      type: enums.Component.panel,
      children: [],
      gridContainer: {
        alignContent: 'tdaa',
        alignItems: 'test',
        direction: 'test',
        justify: 'flex-end',
        spacing: 24,
        wrap: 'nowrap',
      }
    },
    gridParentWrong2: {
      type: enums.Component.panel,
      children: [],
      gridContainer: {
        alignContent: 'space-between',
        alignItems: 'center',
        direction: 'column',
        justify: 'dada',
        spacing: 242,
        wrap: 'test',
      }
    },
    styleWrongType: {
      type: enums.Component.text,
      styles: 1
    },
    stylesNotObject: {
      type: enums.Component.text,
      styles: {
        color: 'blue'
      }
    },
    stylesAttrWrong: {
      type: enums.Component.text,
      styles: {
        label: {
          color: 'blue'
        },
        root: {
          button: {
            color: 'red'
          }
        }
      }
    },
    stylesCorrect: {
      type: enums.Component.text,
      styles: {
        label: {
          color: 'blue'
        },
        button: {
          color: 'red'
        },
      }
    },
    textWrongTextType: {
      type: enums.Component.text,
      text: 1
    },
    textWrongNoType: {
      type: enums.Component.text,
    },
    textFuncAndText: {
      type: enums.Component.text,
      text(p: types.IComponentEventParams) {
        return 'hello ' + p.component!.node
      }
    },
    textCorrectTextType: {
      type: enums.Component.text,
      text: '1'
    },
    textCorrectTextFunctionType: {
      type: enums.Component.text,
      text(p: types.IComponentEventParams) {
        return 'hello ' + p.component!.node
      }
    },
    itemsSelectCorrectFunctionType: {
      type: enums.Component.select,
      data: {
        dataType: enums.DataType.string,
        items() {
          const x = ['1', '2']
          return x.map(i => ({ value: i, text: i }))
        }
      },
    },
    labelWrongType: {
      type: enums.Component.textinput,
      label: 1
    },
    labelStringOrFunc: {
      type: enums.Component.textinput,
    },
    labelANdlabelFunc: {
      type: enums.Component.textinput,
      label: (p: types.IComponentEventParams) => 'hello ' + p.component!.node,
    },
    labelANdlabelFuncBtn: {
      type: enums.Component.button,
      label: (p: types.IComponentEventParams) => 'hello ' + p.component!.node,
    },
    hintAndHintFunc: {
      type: enums.Component.textinput,
      hint: (p: types.IComponentEventParams) => 'hello ' + p.component!.node,
    },
    tooltipAndtooltipFunc: {
      type: enums.Component.textinput,
      tooltip: (p: types.IComponentEventParams) => 'hello ' + p.component!.node,
    },
    labelCorrectFunctionType: {
      type: enums.Component.textinput,
      label(p: types.IComponentEventParams) {
        return 'hello ' + p.component!.node
      },
      tooltip: (p: types.IComponentEventParams) => 'hello ' + p.component!.node,
      hint: (p: types.IComponentEventParams) => 'hello ' + p.component!.node,
      placeholder: (p: types.IComponentEventParams) => 'hello ' + p.component!.node,
    },
    speedDialNoActions: {
      type: enums.Component.speeddial,
    },
    speedDialActionsWrong: {
      type: enums.Component.speeddial,
      actions: { icon: 'tractor' }
    },
    speedDialEmptyActions: {
      type: enums.Component.speeddial,
      actions: []
    },
    speedDialActionsWrongInArray: {
      type: enums.Component.speeddial,
      actions: [1, { icon: 'tractor', tooltip: 'da', onClick() { alert('a') } }]
    },
    speedDialActionsWrongInArray2: {
      type: enums.Component.speeddial,
      actions: [{ icon: 'tractor', tooltip: 'da', onClick() { alert('a') } }, 'icon']
    },
    speedDialActionsWrongInArrayPropMissing: {
      type: enums.Component.speeddial,
      actions: [{ icon: 'tractor', onClick() { alert('a') } }, { icon: 'tractor', tooltip: 'da', onClick() { alert('a') } }]
    },
    speedDialActionsWrongInArrayPropMissing2: {
      type: enums.Component.speeddial,
      actions: [{ icon: 'tractor', tooltip: 'da', onClick() { alert('a') } }, { icon: 'tractor', onClick() { alert('a') } }]
    },
    speedDialActionsWrongInArrayPropMissing3: {
      type: enums.Component.speeddial,
      actions: [{ icon: 'tractor', tooltip: 'da', onClick() { alert('a') } }, { tooltip: 'da', onClick() { alert('a') } }]
    },
    speedDialActionsWrongInArrayPropMissing4: {
      type: enums.Component.speeddial,
      actions: [{ icon: 'tractor', tooltip: 'da', onClick() { alert('a') } }, { icon: 'tractor', tooltip: 'da' }]
    },
    speedDialActionsWrongInArrayPropWrong1: {
      type: enums.Component.speeddial,
      actions: [{ icon: 1, tooltip: 'da', onClick() { alert('a') } }, { icon: 'tractor', tooltip: 'da', onClick() { alert('a') } }]
    },
    speedDialActionsWrongInArrayPropWrong2: {
      type: enums.Component.speeddial,
      actions: [{ icon: 'tractor', tooltip: 'da', onClick() { alert('a') } }, { icon: 'tractor', tooltip: 1, onClick() { alert('a') } }]
    },
    speedDialActionsWrongInArrayPropWrong3: {
      type: enums.Component.speeddial,
      actions: [{ icon: 'tractor', tooltip: 'da', onClick() { alert('a') } }, { icon: 'tractor', tooltip: '1', onClick: 1 }]
    },
    speedDialActionsCorrect: {
      type: enums.Component.speeddial,
      actions: [{ icon: 'tractor', tooltip: 'da', onClick() { alert('a') } }, { icon: 'tractor', tooltip: 'da', onClick() { alert('a') } }]
    },

  }
}

export const schemaWithSubSchema = {
  name: 'schemaWithSubSchema',
  values: {
    name: '',
  },
  components: {
    root: {
      type: enums.Component.panel,
      children: ['name', 'sub', 'subError']
    },
    name: {
      data: {
        field: 'name',
        dataType: 'string',

      },
      type: enums.Component.textinput,
      label: 'Name',
    },
    sub: {
      data: {

        field: 'sub',
      },
      type: enums.Component.subschema,
      schemaName: 'subschema',
    },
    subError: {
      data: {
        field: 'subError',

      },
      type: enums.Component.subschema,
      schemaName: 'subschemaError',
    },
    invalidsubSchema: {
      data: {
        field: 'sub',
      },
      type: enums.Component.subschema,
      schemaName: 'invalidsubSchema',
    },
  }
}

export const schemaWithSubSchema1 = {
  name: 'schemaWithSubSchema1',
  values: {
    name: '',
    sub: {
      email: 'm@t.cc',
      noField: 1,
      thisnoFieldToo: 'a'
    }
  },
  components: {
    root: {
      type: enums.Component.panel,
      children: ['name', 'subError', 'sub']
    },
    name: {
      data: {
        field: 'name',
        dataType: 'string',

      },
      type: enums.Component.textinput,
      label: 'Name',
    },
    subError: {
      data: {
        field: 'subError',
        dataType: enums.DataType.array
      },
      columnSettings: [
        { compId: 'tubel' },
        { compId: 'vorname', autowidth: false, width: '100' }
      ],
      type: enums.Component.subschema,
      schemaName: 'subschemaError',
    },
    sub: {
      data: {
        field: 'sub',
        dataType: 'object'
      },
      type: enums.Component.subschema,
      schemaName: 'subschema',
    },
  }
}

export const schemaToFix = {
  components: {
    name: {
    },
    vorname: {
      data: {
        dataType: 'hallo'
      },
    },
    strasse: {
      type: 'tubel',
      gridItem: {
        xl: 33
      }
    }
  }
}

export const schemaCorrectType = {
  // valuesDataTable: [{name: 'thaler', vorname: 'Matthias'}, {name: 'Meier', vorname: 'Fritz'}],
  name: 'schemaCorrectType',
  label: 'korrektes Schema',
  validationMethod: 1,
  values: {
    sub: { email: 'super@supi.ch' }
  },
  components: {
    root: {
      type: enums.Component.panel,
      children: ['tab1', 'pnexp1', 'pnexp2'],
    },
    card: {
      type: enums.Component.card,
      children: ['nameIsrOtherKeyThanField', 'age', 'selectItemsStringArray', 'rgItemsStringArray', 'sub', 'duplicateSub', 'sub_with_sub'],
    },
    table: {
      type: enums.Component.dataTable,
      columns: [{
        component: 'name',
        align: 'left',
        sortable: false,
        width: ''
      },
      {
        component: 'vorname',
        align: 'left',
        sortable: true,
        width: ''
      }
      ],
    },
    name: {
      type: enums.Component.textinput,
      data: {
        field: 'name',
        dataType: 'string',
        default: 'Name',
        validations: {
          required: true
        }
      },
      label: 'Name',
      hint: 'Das ist der Hint für Name',
      props: {
        placeholder: 'Name eingeben...',
      },
      gridItem: {
        xl: 8
      },
    },
    vorname: {
      type: enums.Component.textinput,
      data: {
        field: 'vorname',
        dataType: 'string',
        validations: {
          required: true
        },
      },
      label: 'Vorname',
      props: {
        placeholder: 'Vorname eingeben...',
      },
      tooltip: 'Dies ist ein Tooltip !!',
      gridItem: {
        xl: 8
      },
    },
    zahl: {
      type: enums.Component.number,
      data: {
        field: 'zahl',
        dataType: 'number',
      },
      label: 'Komma-Zahl',
      hint: 'Zahl kann nicht grösser als 5 sein',
      gridItem: {
        xl: 3
      },
    },
    select1: {
      type: enums.Component.select,
      data: {
        field: 'select1',
        dataType: 'string',
        items: [{ value: '1', text: 'first' }, { value: '2', text: 'second' }],
        default() {
          return this.items[0].value
        }
      },
      label: 'Select (string) with values and text',
      hint: 'Das ist der Hint für Select1',
      gridItem: {
        xl: 3
      },
    },
    select2: {
      type: enums.Component.select,
      data: {
        field: 'select2',
        dataType: 'number',
        default: 0,
        items: [{ value: 1, text: 'Erste Nummer' }, { value: 2, text: 'zweite Nummer' }]
      },
      label: 'Select (number-value)',
      props: {
        placeholder: 'Wählen',
      },
      gridItem: {
        xl: 3
      },
    },
    integer: {
      type: enums.Component.integer,
      data: {
        field: 'integer',
        dataType: 'integer',
        default: 100
      },
      label: 'Integer',
      gridItem: {
        xl: 4
      }
    },
    radiogroup: {
      type: enums.Component.radiogroup,
      data: {
        field: 'radiogroup',
        dataType: 'string',
        items: [{ value: '1', text: 'Radio1' }, { value: '2', text: 'Radio2' }]
      },
      label: 'Radio',
      gridItem: {
        xl: 4
      },
    },
    pnexp1: {
      type: enums.Component.expansionpanel,
      label: 'Expand 1',
      children: ['exp1']
    },
    pnexp2: {
      type: enums.Component.expansionpanel,
      label: 'Expand 2',
      children: ['exp2']
    },
    exp1: {
      type: enums.Component.textinput,
      data: {
        field: 'exp1',
        dataType: 'string',
      },
      label: 'Feld in Exp1',
      props: {
        placeholder: 'Nummer eingeben...',
      },
      gridItem: {
        xl: 4
      },
    },
    exp2: {
      type: enums.Component.textinput,
      data: {
        field: 'exp2',
        dataType: 'string',
      },
      label: 'Feld in Exp2',
      gridItem: {
        xl: 2
      },
    },
    tab1: {
      type: enums.Component.tabs,
      label: 'Tab',
      tabs: ['pntab1', 'pntab2', 'pntab3', 'pntab4']
    },
    pntab1: {
      type: enums.Component.tab,
      label: 'Tab 1',
      children: ['name', 'vorname', 'tab1feld']
    },
    pntab2: {
      type: enums.Component.tab,
      label: 'Tab 2',
      children: ['select1', 'select2', 'integer', 'zahl', 'radiogroup', 'card']
    },
    pntab3: {
      type: enums.Component.tab,
      label: 'Tab 3',
      children: ['table', 'tab2feld', 'check']
    },
    pntab4: {
      type: enums.Component.tab,
      label: 'Validations',
      children: ['validateRequired1', 'validateRequired2', 'validateAllowedValues', 'validateWithFunction', 'validateWMinMaxNumber', 'validateWMinMaxString', 'validateRegexAlphaNoLeadingNumbers', 'modifier1', 'modifier2']
    },
    check: {
      type: enums.Component.checkbox,
      data: {
        field: 'check',
        dataType: 'boolean',
        default: false,
        validations: {
          required: true
        }
      },
      label: 'Checkbox',
    },
    validateRequired1: {
      type: enums.Component.textinput,
      data: {
        field: 'validateRequired1',
        dataType: 'string',
        validations: {
          required: true
        }
      },
      label: 'Required string',
      gridItem: {
        xl: 2
      },
    },
    validateRequired2: {
      type: enums.Component.number,
      data: {
        field: 'validateRequired2',
        dataType: 'number',
        validations: {
          required: true
        }
      },
      label: 'Required Number',
      gridItem: {
        xl: 8
      },
    },
    validateAllowedValues: {
      type: enums.Component.textinput,
      data: {
        field: 'validateAllowedValues',
        dataType: 'string',
        validations: {
          allowedValues: ['hans', 'fritz']
        }
      },
      label: 'validateAllowedValues',
      gridItem: {
        xl: 8
      },
    },
    validateWithFunction: {
      type: enums.Component.textinput,
      data: {
        field: 'validateWithFunction',
        dataType: 'string',
        validations: {
          validate(p: any) {
            if (p.value !== 'tubel') { return 'Du Tubel' }
          }
        }
      },
      label: 'validateWithFunction',
      gridItem: {
        xl: 8
      },
    },
    validateWMinMaxNumber: {
      type: enums.Component.number,
      data: {
        field: 'validateWMinMaxNumber',
        dataType: 'number',
        validations: {
          min: 3,
          max: 20
        }
      },
      label: 'validateWMinMaxNumber',
      gridItem: {
        xl: 8
      },
    },
    validateWMinMaxString: {
      type: enums.Component.textinput,
      data: {
        field: 'validateWMinMaxString',
        dataType: 'string',
        validations: {
          min: 3,
          max: 5
        }
      },
      label: 'validateWMinMaxString',
      gridItem: {
        xl: 8
      },
    },
    validateRegexAlphaNoLeadingNumbers: {
      type: enums.Component.textinput,
      data: {
        field: 'validateRegexAlphaNoLeadingNumbers',
        dataType: 'string',
        validations: {
          regex: /^[a-zA-Z_][a-zA-Z_0-9]*$/,
        }
      },
      label: 'validateRegex',
    },
    modifier1: {
      type: enums.Component.textinput,
      data: {
        field: 'modifier1',
        dataType: 'string',
        modifiers: {
          trim: true,
          toUpperCase: true
        }
      },
      label: 'modifier trim an upper',
      gridItem: {
        xl: 8
      },
    },
    modifier2: {
      type: enums.Component.textinput,
      data: {
        field: 'modifier2',
        dataType: 'string',
        modifiers: {
          toLowerCase: true,
          capitalize: true
        }
      },
      label: 'modifier tolowerCase an capitalize',
    },
    tab1feld: {
      type: enums.Component.textinput,
      data: {
        field: 'tab1feld',
        dataType: 'string',
      },
      label: 'Feld in Tab1',
    },
    tab2feld: {
      type: enums.Component.textinput,
      data: {
        field: 'tab2feld',
        dataType: 'string',
      },
      label: 'Feld in Tab2',
    },
    nameIsrOtherKeyThanField: {
      type: enums.Component.textinput,
      data: {
        field: 'nummer',
        dataType: 'string',
      },
      label: 'Nummer',
    },
    age: {
      type: enums.Component.slider,
      data: {
        field: 'slider',
        dataType: 'number',

      },
      label: 'Age',
    },
    selectItemsStringArray: {
      type: enums.Component.select,
      data: {
        field: 'selectItemsStringArray',
        dataType: 'string',
        items: ['fritz', 'franz', 'albert', 'car']

      },
      label: 'Select',
    },
    rgItemsStringArray: {
      type: enums.Component.radiogroup,
      data: {
        field: 'rgItemsStringArray',
        dataType: 'string',
        items: ['fritz', 'franz', 'albert', 'car']
      },
      label: 'Radio1',
    },
    sub: {
      data: {
        field: 'sub',
        dataType: 'object'
      },
      type: enums.Component.subschema,
      schemaName: 'subschema',
    },
    duplicateSub: {
      data: {
        field: 'sub2',
        dataType: 'object'
      },
      type: enums.Component.subschema,
      schemaName: 'subschema',
    },
    sub_with_sub: {
      data: {
        field: 'sub_sub',
        dataType: 'object'
      },
      type: enums.Component.subschema,
      schemaName: 'subLevel1',
    }
  }
}
