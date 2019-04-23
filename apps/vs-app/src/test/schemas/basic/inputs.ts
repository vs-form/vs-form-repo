import { ISchemaDesign, Component, DataType, enums, types } from '@vs-form/vs-form'

import createNumberMask from 'text-mask-addons/dist/createNumberMask'

const numberMask = createNumberMask({
  prefix: '',
  suffix: '',
  thousandsSeparatorSymbol: '\'',
  allowDecimal: true,
})

const schema: ISchemaDesign = {
  name: 'inputs',
  label: 'Text Inputs',
  components: {
    root: {
      type: Component.form,
      children: ['cardvariants', 'cardmultiline', 'cardprefix', 'cardMasks', 'cardProps'],
    },
    cardvariants: {
      type: Component.expansionpanel,
      label: 'Input Variants',
      children: ['normalInput', 'outlinedInput', 'filledInput', 'disabledInput'],
      props: {
        expanded: true
      }
    },
    normalInput: {
      type: Component.textinput,
      data: {
        field: 'normalInput',
        dataType: DataType.string
      },
      props: {
        placeholder: 'Placeholder for Input',
      },
      gridItem: { md: 4 },
      label: 'Normal Input',
      hint: 'Input with tooltip',
      tooltip: 'Tooltip for Input',
    },
    outlinedInput: {
      type: Component.textinput,
      props: {
        variant: enums.InputVariant.outlined,
        placeholder: 'Placeholder for Input',
      },
      data: {
        field: 'outlinedInput',
        dataType: DataType.string
      },
      gridItem: { md: 4 },
      label: 'Outlined Input'
    },
    filledInput: {
      type: Component.textinput,
      props: {
        variant: enums.InputVariant.filled,
        placeholder: 'Placeholder for Input',
      },
      data: {
        field: 'filledInput',
        dataType: DataType.string
      },
      gridItem: { md: 4 },
      label: 'Filled Input'
    },
    disabledInput: {
      type: Component.textinput,
      data: {
        field: 'disabledInput',
        dataType: DataType.string
      },
      disabled: true,
      gridItem: { md: 4 },
      label: 'Disabled Input',
      tooltip: 'Tooltip for Input',
    },
    cardmultiline: {
      type: Component.expansionpanel,
      label: 'Multiline Inputs',
      children: ['normalInputMulti', 'outlinedInputMulti', 'filledInputMulti'],
      props: {
        expanded: true
      }
    },
    normalInputMulti: {
      type: Component.textinput,
      data: {
        field: 'normalInputMulti',
        dataType: DataType.string
      },
      props: {
        multiline: true,
        rows: 4,
        placeholder: 'Placeholder for Input',
      },
      gridItem: { md: 4 },
      label: 'Multiline Input',
    },
    outlinedInputMulti: {
      type: Component.textinput,
      props: {
        variant: enums.InputVariant.outlined,
        multiline: true,
        rows: 4
      },
      data: {
        field: 'outlinedInputMulti',
        dataType: DataType.string
      },
      gridItem: { md: 4 },
      label: 'Outlined multiline Input'
    },
    filledInputMulti: {
      type: Component.textinput,
      props: {
        variant: enums.InputVariant.filled,
        multiline: true,
        rows: 4
      },
      data: {
        field: 'filledInputMulti',
        dataType: DataType.string
      },
      gridItem: { md: 4 },
      label: 'Filled multiline Input'
    },
    cardprefix: {
      type: Component.expansionpanel,
      label: 'Prefix and Suffix',
      props: {
        expanded: true
      },
      children: ['prefixText', 'suffixText', 'prefixIcon', 'prefixTextButton']
    },
    prefixText: {
      type: Component.textinput,
      label: 'Text',
      hint: 'text prefix',
      prefix: '$',
      data: {
        field: 'prefixText',
        dataType: DataType.string
      },
      gridItem: { md: 4 },
    },
    suffixText: {
      type: Component.textinput,
      label: 'Text',
      hint: 'text suffix',
      suffix: 'KG',
      data: {
        field: 'suffixText',
        dataType: DataType.string
      },
      gridItem: { md: 4 },
    },
    prefixIcon: {
      type: Component.textinput,
      hint: 'icon prefix',
      prefix: ['icon1'],
      data: {
        field: 'prefixIcon',
        dataType: DataType.string
      },
      gridItem: { md: 4 },
      label: 'Text'
    },
    prefixTextButton: {
      type: Component.textinput,
      hint: 'text prefix, 2 buttons suffix',
      prefix: '$',
      suffix: ['button1', 'button2'],
      data: {
        field: 'prefixTextButton',
        dataType: DataType.string
      },
      gridItem: { md: 4 },
      label: 'Text'
    },
    icon1: {
      type: Component.icon,
      icon: 'tractor'
    },
    button1: {
      type: Component.iconbutton,
      icon: 'tractor'
    },
    button2: {
      type: Component.iconbutton,
      icon: 'anchor'
    },
    cardMasks: {
      type: Component.expansionpanel,
      label: 'Input Masks',
      props: {
        expanded: true
      },
      children: ['textmask', 'textmask1', 'textmaskFunc']
    },
    textmask: {
      type: Component.maskinput,
      maskProps: {
        mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      },
      data: {
        field: 'textmask',
        dataType: DataType.string
      },
      gridItem: { md: 4 },
      label: 'Text',
      hint: 'text with telephone mask'
    },
    textmask1: {
      type: Component.maskinput,
      maskProps: {
        mask: [/\d/, /\d/, '-', /\d/, /\d/, /\d/]
      },
      data: {
        field: 'textmask1',
        dataType: DataType.string
      },
      gridItem: { md: 4 },
      label: 'Text',
      hint: 'text with number mask'
    },
    textmaskFunc: {
      type: Component.maskinput,
      maskProps: {
        mask(value: any) {
          return numberMask(value)
        }
      },
      data: {
        field: 'textmaskFunc',
        dataType: DataType.string
      },
      gridItem: { md: 4 },
      label: 'Text',
      hint: 'text with mask as a function'
    },
    cardProps: {
      type: Component.expansionpanel,
      label: 'Change props dynamically',
      children: ['textChange1', 'textChange2', 'divider1', 'staticText1', 'staticText2', 'buttonChangeProp1', 'buttonChangeProp2', 'divider2', 'clbShowHide', 'panelShowHide', 'divider3', 'textChanging']
    },
    textChange1: {
      type: Component.textinput,
      data: {
        field: 'textChange1',
        dataType: DataType.string,
        onChange(p) {
          const comp = p.schema.components.textChange2
          p.schemaManager.updateValue('textChange2', p.value)
          p.schemaManager.renderComponents([comp])
        },
      },
      gridItem: { md: 6 },
      label: 'Text1',
      hint: 'Text2 changes if this text changes'
    },
    textChange2: {
      type: Component.textinput,
      data: {
        field: 'textChange2',
        dataType: DataType.string,
      },
      gridItem: { md: 6 },
      label: 'Text2',
    },
    divider1: {
      type: Component.divider
    },
    staticText1: {
      type: Component.text,
      text: 'static Text',
      props: {
        color: 'textPrimary'
      },
      gridItem: { md: 3 },
    },
    staticText2: {
      type: Component.text,
      text: 'static Text2',
      gridItem: { md: 3 },
      props: {}
    },
    buttonChangeProp1: {
      type: Component.button,
      label: 'Change Text color',
      gridItem: { md: 3 },
      onClick(p) {
        const comp1 = p.schema.components.staticText1
        const comp2 = p.schema.components.staticText2
        comp1.props.variant = 'body2'
        comp2.props.variant = 'body2'
        comp1.props.color = 'error'
        comp2.props.color = 'error'
        p.schemaManager.renderComponents([comp1, comp2])
      }
    },
    buttonChangeProp2: {
      type: Component.button,
      label: 'Change Text size',
      gridItem: { md: 3 },
      onClick(p) {
        const comp1 = p.schema.components.staticText1
        const comp2 = p.schema.components.staticText2
        comp1.props.variant = 'h4'
        comp2.props.variant = 'h4'
        comp1.props.color = 'default'
        comp2.props.color = 'default'
        p.schemaManager.renderComponents([comp1, comp2])
      }
    },
    divider2: {
      type: Component.divider
    },
    clbShowHide: {
      type: Component.checklistbox,
      gridItem: { md: 4 },
      data: {
        field: 'clbShowHide',
        dataType: DataType.arrayString,
        items: [{ value: 'inputShowHide', text: 'show Input' }, { value: 'buttonShowHide', text: 'show Button' }, { value: 'textShowHide', text: 'show Text' }],
        onChange(p) {
          [p.schema.components.inputShowHide, p.schema.components.buttonShowHide, p.schema.components.textShowHide].forEach(cmp => cmp.hidden = true)
          const cs: types.IComponentList = p.value.map((v: string) => p.schema.components[v])
          cs.forEach(cmp => cmp.hidden = false)
          p.schemaManager.renderComponent(p.schema.components.panelShowHide)
        }
      },
      label: 'Show / Hide elements',
    },
    panelShowHide: {
      type: Component.panel,
      gridItem: { md: 8 },
      children: ['inputShowHide', 'buttonShowHide', 'textShowHide']
    },
    inputShowHide: {
      type: Component.textinput,
      data: {
        field: 'inputShowHide',
        dataType: DataType.string
      },
      hidden: true,
      label: 'Input'
    },
    buttonShowHide: {
      type: Component.button,
      hidden: true,
      label: 'Button'
    },
    textShowHide: {
      type: Component.text,
      hidden: true,
      text: 'Some text'
    },
    divider3: {
      type: Component.divider
    },
    textChanging: {
      type: Component.textinput,
      data: {
        field: 'textChanging',
        dataType: DataType.string,
        onBeforeChange(p) {
          if (p.value === 'hello') {
            p.value = 'hello World!'
          }
        }
      },
      label: 'Text with changing value',
      hint: 'type "hello"'
    },

  }
}

// const c = schema.components.textmaskFunc as types.IComponentTextInput
// c.maskProps!.mask = numberMask

export default schema
