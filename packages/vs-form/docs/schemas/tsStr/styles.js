
const styles = `import { ISchemaDesign, Component, DataType, ButtonAction } from '@vs-form/vs-form'

const styles = {
  input: {
    '&:focus,&:hover': {
      boxShadow: '0px 0px 7px 0px rgba(21,127,219,.63)',
      borderColor: '#4ab1ff',
      background: '#F5F5F5',
    }
  },
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    width: 200
  },
}

const schema: ISchemaDesign = {
  styles, // style defined on the schema
  components: {
    root: {
      type: Component.form,
      children: ['text1', 'number1', 'select1', 'btnOk'],
    },
    text1: {
      type: Component.textinput,
      data: {
        field: 'text1',
        dataType: DataType.string,
      },
      label: 'Text1',
      props: {
        InputProps: {
          className: 'input'
        },
        InputLabelProps: {
          shrink: true
        }
      }
    },
    number1: {
      type: Component.number,
      label: 'Number1',
      data: {
        dataType: DataType.number,
        field: 'numberInput1'
      },
      props: {
        InputProps: {
          className: 'input'
        },
        InputLabelProps: {
          shrink: true
        }
      }
    },
    select1: {
      type: Component.select,
      data: {
        field: 'select',
        dataType: DataType.string,
        items: ['car', 'house', 'garden', 'bed', 'chair']
      },
      label: 'Select1',
      props: {
        InputProps: {
          className: 'input'
        },
        InputLabelProps: {
          shrink: true
        }
      }
    },
    btnOk: {
      type: Component.button,
      disabled: false,
      tooltip: 'Click to save',
      action: ButtonAction.save,
      gridItem: {
        md: 2
      },
      props: {
        className: 'button'
      },
    },
  }
}

export default schema
`

export default styles