import { ISchemaDesign, Component, DataType } from '@vs-form/vs-form'

const styles = {
  spacing: {
    paddingTop: '1px',
    paddingBottom: '1px',
  }
}

const schema: ISchemaDesign = {
  name: 'columns',
  label: 'Columns',
  components: {
    root: {
      type: Component.panel,
      children: ['card'],
    },
    card: {
      type: Component.card,
      label: 'columns',
      children: ['name', 'vorname', 'notes', 'check1', 'check2', 'check3', 'text1', 'card1', 'card2', 'card3'],
    },
    name: {
      type: Component.textinput,
      data: {
        field: 'name',
        dataType: DataType.string
      },
      label: 'Name',
      gridItem: { xs: 12, sm: 10, md: 8, lg: 6, xl: 4 }
    },
    vorname: {
      type: Component.textinput,
      data: {
        field: 'vorname',
        dataType: DataType.string
      },
      label: 'Vorname',
      gridItem: { xs: 12, sm: 10, md: 8, lg: 6, xl: 4 }
    },
    notes: {
      type: Component.textinput,
      label: 'Notes',
      data: {
        field: 'notes',
        dataType: DataType.string
      },
      gridItem: { xs: 12, lg: 6 },
      props: {
        multiline: true,
      },
    },
    check1: {
      type: Component.checkbox,
      label: 'Checkbox 1',
      gridItem: {
        xs: true
      },
      data: {
        field: 'check1',
        dataType: DataType.boolean
      }
    },
    check2: {
      type: Component.checkbox,
      label: 'Checkbox 2',
      gridItem: {
        xs: true
      },
      data: {
        field: 'check2',
        dataType: DataType.boolean
      }
    },
    check3: {
      type: Component.checkbox,
      label: 'Checkbox 3',
      gridItem: { xs: 6 },
      data: {
        field: 'check_3',
        dataType: DataType.boolean
      }
    },
    text1: {
      type: Component.textinput,
      data: {
        field: 'text1',
        dataType: DataType.string
      },
      label: 'text1',
      gridItem: {
        xl: 3
      },
    },
    card1: {
      type: Component.card,
      label: 'Columns1',
      children: ['checkRows', 'textarea', 'text2', 'text3'],
      gridItem: {
        md: 6
      },
      gridContainer: {
        spacing: 24
      },
    },
    checkRows: {
      type: Component.checkbox,
      data: {
        field: 'checkRows',
        dataType: DataType.boolean,
        // onChange(v, p) {
        //   // const rows = v ? 3 : 1
        //   // p.schemaManager.schema.components.textarea.rows = rows
        //   // p.schemaManager.render()
        // },
      },
      label: 'columns',
    },
    textarea: {
      type: Component.textinput,
      data: {
        field: 'textarea',
        dataType: DataType.string
      },
      props: {
        multiline: true,
        rows: 10,
        variant: 'outlined'
      },
      label: 'textarea',
      gridItem: { md: 6 }
    },
    text2: {
      type: Component.textinput,
      data: {
        field: 'text2',
        dataType: DataType.string
      },
      label: 'text2',
      gridItem: {
        xl: 3
      },
    },
    text3: {
      type: Component.textinput,
      data: {
        field: 'text3',
        dataType: DataType.string
      },
      label: 'text3',
      gridItem: {
        xl: 3
      },
    },
    card2: {
      type: Component.card,
      label: 'Columns2',
      children: ['text4', 'check10', 'check11'],
      gridItem: {
        md: 3
      },
      gridContainer: {
        // style: styles.spacing
      },
    },
    text4: {
      type: Component.textinput,
      data: {
        field: 'text4',
        dataType: DataType.string
      },
      label: 'text4',
    },
    check10: {
      type: Component.checkbox,
      label: 'Checkbox 10',
      data: {
        field: 'check10',
        dataType: DataType.boolean
      },
      props: {
        style: styles.spacing,
      },
      gridItem: {
        style: styles.spacing
      },
    },
    check11: {
      type: Component.checkbox,
      label: 'Checkbox 10',
      data: {
        field: 'check11',
        dataType: DataType.boolean
      },
      props: {
        style: styles.spacing,
      },
      gridItem: {
        style: styles.spacing,
      },
    },
    card3: {
      type: Component.card,
      label: 'Columns2',
      children: ['text400', 'check100', 'check110'],
      gridItem: {
        md: 3
      },
    },
    text400: {
      type: Component.textinput,
      data: {
        field: 'text400',
        dataType: DataType.string
      },
      label: 'text400',
    },
    check100: {
      type: Component.checkbox,
      label: 'Checkbox 10',
      data: {
        field: 'check100',
        dataType: DataType.boolean
      },
    },
    check110: {
      type: Component.checkbox,
      label: 'Checkbox 10',
      data: {
        field: 'check110',
        dataType: DataType.boolean
      },
    },

  }
}

export default schema
