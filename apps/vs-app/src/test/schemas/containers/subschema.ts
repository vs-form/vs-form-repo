import { ISchemaDesign, Component, DataType } from '@vs-form/vs-form'

const schema: ISchemaDesign = {
  name: 'subschema',
  label: 'Subschema',
  components: {
    root: {
      type: Component.form,
      children: ['tabs'],
    },
    tabs: {
      type: Component.tabs,
      tabs: ['tab1', 'tab2', 'tab3', 'tab4']
    },
    tab1: {
      type: Component.tab,
      label: 'Address',
      children: ['text', 'customerAddress']
    },
    tab2: {
      type: Component.tab,
      label: 'Simple',
      children: ['subSimple']
    },
    tab3: {
      type: Component.tab,
      label: 'Inputs',
      children: ['subInputs']
    },
    tab4: {
      type: Component.tab,
      label: 'Tabs',
      children: ['subTabs']
    },
    text: {
      type: Component.textinput,
      data: {
        field: 'text',
        dataType: DataType.string
      },
      label: 'Text'
    },
    customerAddress: {
      type: Component.subschema,
      data: {
        field: 'ca',
        dataType: DataType.object
      },
      schemaName: 'address',
      label: 'Customer Address'
    },
    subInputs: {
      type: Component.subschema,
      label: 'Subschema Inputs',
      schemaName: 'inputs',
      data: {
        dataType: DataType.object,
        field: 'subInputs'
      }
    },
    subTabs: {
      type: Component.subschema,
      label: 'Subschema Tabs',
      schemaName: 'tabs',
      data: {
        dataType: DataType.object,
        field: 'subTabs'
      }
    },
    subSimple: {
      type: Component.subschema,
      label: 'Subschema Tabs',
      schemaName: 'simple1',
      data: {
        dataType: DataType.object,
        field: 'subSimple'
      }
    },

  }
}

export default schema
