import { ISchemaDesign, Component, DataType, enums } from '@vs-form/vs-form'

const schema: ISchemaDesign = {
  name: 'buttons',
  label: 'Buttons',
  components: {
    root: {
      type: Component.panel,
      children: ['checkDisabled', 'text', 'text1', 'text2', 'btnOk', 'btnCancel', 'btn1', 'btnR'],
    },
    checkDisabled: {
      type: Component.checkbox,
      label: 'Check to disable Form Inputs',
      data: {
        field: 'checkDisabled',
        dataType: DataType.boolean,
        onChange(p) {
          p.schema.disabled = p.value
          p.schemaManager.render()
        }
      }
    },
    text: {
      type: Component.textinput,
      data: {
        field: 'text',
        dataType: DataType.string
      },
      hint: 'tooltip above',
      tooltip: 'test tooltip',
      tooltipProps: {
        placement: 'top'
      },
      label: 'Text'
    },
    text1: {
      type: Component.textinput,
      data: {
        field: 'text1',
        dataType: DataType.string
      },
      label: 'Text1'
    },
    text2: {
      type: Component.textinput,
      data: {
        field: 'text2',
        dataType: DataType.string
      },
      label: 'Text2'
    },
    btnOk: {
      type: Component.button,
      label: '',
      tooltip: 'Click to save',
      action: enums.ButtonAction.save,
      gridItem: {
        md: 2
      }
    },
    btnCancel: {
      type: Component.button,
      label: '',
      action: enums.ButtonAction.cancel,
      gridItem: {
        md: 2
      },
    },
    btnR: {
      type: Component.button,
      label: 'icon right',
      icon: 'settings',
      iconRight: true,
      gridItem: {
        md: 2
      },

    },

    btn1: {
      type: Component.button,
      label: 'styled button',
      icon: 'account-circle',
      styles: {
        root: {
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          borderRadius: 3,
          border: 0,
          color: 'white',
          height: 48,
          padding: '0 30px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
        label: {
          textTransform: 'capitalize',
          color: 'green' // theme.palette.primary
        }
      },
      gridItem: {
        md: 2
      },
      props: {
        className: 'root'
      }
    }

  },
}

export default schema
