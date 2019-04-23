import { ISchemaDesign, Component, DataType, types } from '@vs-form/vs-form'

import * as styles from '../../styles'
import classNames from 'classnames'

const clicked = (p: any) => {
  // tslint:disable-next-line:no-console
  console.log('clicked: ', p.component.node)
}

const schema: ISchemaDesign = {
  name: 'styles',
  label: 'Styles',
  validationMethod: 1,
  components: {
    root: {
      type: Component.panel,
      children: ['tabs'],
    },
    tabs: {
      type: Component.tabs,
      tabs: ['tabButton', 'tabContainer', 'tabInput']
    },
    tabButton: {
      type: Component.tab,
      label: 'Buttons',
      children: ['button1', 'button2', 'button3', 'button6', 'iconbutton1', 'iconbutton2',
      'divider1', 'text1', 'icon1', 'icon2', 'icon3', 'icon4', 'icon5',
      'divider2', 'text2', 'icon10', 'icon11', 'icon12', 'icon13', 'icon14',
      'divider31', 'text31', 'icon31', 'icon32', 'icon33', 'icon34', 'icon35',
    ]
    },
    tabContainer: {
      type: Component.tab,
      label: 'Container',
      children: ['panel1', 'panel2', 'divider11', 'expPanel1', 'expPanel2', 'divider12', 'card1']
    },
    tabInput: {
      type: Component.tab,
      label: 'Inputs',
      children: ['textInput1', 'numberInput1', 'numberInput2', 'dateInput1', 'numberFormat1', 'select1']
    },
    button1: {
      type: Component.button,
      label: 'Styled Button',
      icon: 'tractor',
      props: {
        className: 'button'
      },
      onClick(p) { clicked(p) },
      styles: styles.fancyButton
    },
    button2: {
      type: Component.button,
      label: 'Styled Button 2',
      icon: 'weather-night',
      onClick(p) { clicked(p) },
      props: {
        className: 'button'
      },
      styles: styles.roundedButton
    },
    button3: {
      type: Component.button,
      label: 'Colored Icon',
      icon: 'weather-sunny',
      onClick(p) { clicked(p) },
      props: {
        IconProps: {
          className: 'iconColor'
        },
      },
      styles: styles.colorButton
    },
    iconbutton1: {
      type: Component.iconbutton,
      icon: 'car',
      onClick(p) { clicked(p) },
      props: {
        className: 'buttonMargin',
        IconProps: {
          className: 'iconColor'
        },
      },
      styles: styles.colorButton
    },
    iconbutton2: {
      type: Component.iconbutton,
      icon: 'beer',
      onClick(p) { clicked(p) },
      props: {
        IconProps: {
          className: 'iconSize'
        },
      },
      styles: styles.fontIcon
    },
    button6: {
      type: Component.button,
      label: 'Normal Button',
    },
    divider1: {
      type: Component.divider
    },
    text1: {
      type: Component.text,
      text: 'Icons:',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'textpad'
      },
      styles: styles.textpad
    },
    icon1: {
      type: Component.icon,
      icon: 'battery-charging-wireless',
      gridItem: {
        xs: 'auto'
      },
    },
    icon2: {
      type: Component.icon,
      icon: 'audio-video',
      gridItem: {
        xs: 'auto'
      },
    },
    icon3: {
      type: Component.icon,
      icon: 'badminton',
      gridItem: {
        xs: 'auto'
      },
    },
    icon4: {
      type: Component.icon,
      icon: 'bed-empty',
      gridItem: {
        xs: 'auto'
      },
    },
    icon5: {
      type: Component.icon,
      icon: 'brain',
      gridItem: {
        xs: 'auto'
      },
    },
    divider2: {
      type: Component.divider
    },
    text2: {
      type: Component.text,
      text: 'Icons with effects:',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'textpad'
      },
      styles: styles.textpad
    },
    icon10: {
      type: Component.icon,
      icon: 'battery-charging-wireless',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'mdi-rotate-45'
      }
    },
    icon11: {
      type: Component.icon,
      icon: 'audio-video',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'mdi-flip-h'
      }
    },
    icon12: {
      type: Component.icon,
      icon: 'audio-video',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'mdi-flip-v'
      }
    },
    icon13: {
      type: Component.icon,
      icon: 'loading',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'mdi-spin'
      }
    },
    icon14: {
      type: Component.icon,
      icon: 'audio-video',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'mdi-spin'
      }
    },
    panel1: {
      type: Component.panel,
      label: 'Plain Panel with bigger title',
      children: ['text4'],
      props: {
        HeaderTypographyProps: {
          variant: 'h4'
        }
      }
    },
    panel2: {
      type: Component.panel,
      children: ['text5'],
      props: {
        className: 'root'
      },
      styles: styles.panel

    },
    expPanel1: {
      type: Component.expansionpanel,
      label: 'Normal Expansions-Panel',
      children: ['text11'],
    },
    expPanel2: {
      type: Component.expansionpanel,
      label: 'Change style upon expand',
      children: ['text12'],
      onChange: p => {
        const comp = p.component as types.IComponentExpansionPanel
        comp.props!.className = classNames({ background: p.expanded })
        comp.props!.TypographyProps = {}
        comp.props!.TypographyProps!.className = classNames({ font: p.expanded })
        comp.expanded = p.expanded
        p.schemaManager.renderComponents([comp])
      },
      styles: styles.expPanel
    },
    text11: {
      type: Component.text,
      text: 'Some text'
    },
    text12: {
      type: Component.text,
      text: 'Some other text'
    },
    card1: {
      type: Component.card,
      label: 'Card Title',
      subheader: 'Subheader Title',
      children: ['text3']
    },
    text3: {
      type: Component.text,
      text: 'Some other text'
    },
    text4: {
      type: Component.text,
      text: 'Some useful text inside panel'
    },
    text5: {
      type: Component.text,
      text: 'Panel with custom style'
    },
    divider11: {
      type: Component.divider,
      props: {
        className: 'divider'
      },
      styles: styles.divider
    },
    divider12: {
      type: Component.divider,
      props: {
        className: 'divider'
      },
      styles: styles.divider
    },
    divider31: {
      type: Component.divider
    },
    text31: {
      type: Component.text,
      text: 'Icons-Sizes',
      gridItem: {
        xs: 'auto'
      },
    },
    icon31: {
      type: Component.icon,
      icon: 'battery-charging-wireless',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'small'
      },
      styles: styles.iconSizes
    },
    icon32: {
      type: Component.icon,
      icon: 'audio-video',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'normal'
      },
      styles: styles.iconSizes
    },
    icon33: {
      type: Component.icon,
      icon: 'badminton',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'big'
      },
      styles: styles.iconSizes
    },
    icon34: {
      type: Component.icon,
      icon: 'bed-empty',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'bigger'
      },
      styles: styles.iconSizes
    },
    icon35: {
      type: Component.icon,
      icon: 'brain',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'biggest'
      },
      styles: styles.iconSizes
    },
    textInput1 : {
      type: Component.textinput,
      label: 'Styled Input',
      data: {
        dataType: DataType.string,
        field: 'textInput1'
      },
      props: {
        InputLabelProps: {
          className: 'label'
        },
        InputProps: {
          className: 'inputColor'
        }
      },
      styles: styles.textInput
    },
    numberInput1 : {
      type: Component.number,
      label: 'Styled Input',
      data: {
        dataType: DataType.number,
        field: 'numberInput1'
      },
      props: {
        InputLabelProps: {
          className: 'label'
        },
        InputProps: {
          className: 'inputColor'
        }
      },
      styles: styles.textInput
    },
    numberInput2 : {
      type: Component.integer,
      label: 'Styled Input',
      data: {
        dataType: DataType.integer,
        field: 'numberInput2'
      },
      props: {
        InputLabelProps: {
          className: 'label'
        },
        InputProps: {
          className: 'inputColor'
        }
      },
      styles: styles.textInput
    },
    dateInput1 : {
      type: Component.date,
      label: 'Styled Input',
      data: {
        dataType: DataType.date,
        field: 'dateInput1'
      },
      props: {
        InputLabelProps: {
          className: 'label'
        },
        InputProps: {
          className: 'inputColor'
        }
      },
      styles: styles.textInput
    },
    select1 : {
      type: Component.select,
      label: 'Styled Input',
      data: {
        dataType: DataType.number,
        items: [{ value: 1, text: 'one' }, { value: 2, text: 'two' }, { value: 3, text: 'three' }],
        field: 'select1'
      },
      props: {
        InputLabelProps: {
          className: 'label'
        },
        InputProps: {
          className: 'inputColor'
        }
      },
      styles: styles.textInput
    },
    numberFormat1 : {
      type: Component.numberformat,
      label: 'Styled Input',
      data: {
        dataType: DataType.number,
        field: 'numberFormat1'
      },
      numberFormatProps: {
        thousandSeparator: '\'',
        decimalSeparator: '.',
        decimalScale: 2,
        fixedDecimalScale: true,
      },
      props: {
        InputLabelProps: {
          className: 'label'
        },
        InputProps: {
          className: 'inputColor'
        }
      },
      styles: styles.textInput
    },
  }
}
export default schema
