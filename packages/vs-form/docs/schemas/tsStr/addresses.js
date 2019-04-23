
const addresses = `import { ISchemaDesign, Component, DataType, ButtonAction } from '@vs-form/vs-form'

const schema: ISchemaDesign = {
  values: {
    customerAddress: {
      type: 1
    },
    billingAddress: {
      type: 2
    },
    shippingAddress: {
      type: 3
    },
  },
  components: {
    root: {
      type: Component.form,
      children: ['tabs', 'btnOk'],
    },
    tabs: {
      type: Component.tabs,
      tabs: ['tab1', 'tab2', 'tab3']
    },
    tab1: {
      type: Component.tab,
      label: 'Customer address',
      children: ['customerAddress']
    },
    tab2: {
      type: Component.tab,
      label: 'Billing address',
      children: ['billingAddress']
    },
    tab3: {
      type: Component.tab,
      label: 'Shipping Address',
      children: ['shippingAddress']
    },
    customerAddress: {
      type: Component.subschema,
      label: 'Customer address',
      schemaName: 'address',
      data: {
        field: 'customerAddress',
        dataType: DataType.object
      },
    },
    billingAddress: {
      type: Component.subschema,
      label: 'Billing address',
      schemaName: 'address',
      data: {
        field: 'billingAddress',
        dataType: DataType.object
      },
    },
    shippingAddress: {
      type: Component.subschema,
      label: 'Shipping Address',
      schemaName: 'address',
      data: {
        field: 'shippingAddress',
        dataType: DataType.object
      },
    },
    btnOk: {
      type: Component.button,
      disabled: false,
      tooltip: 'Click to save',
      action: ButtonAction.save,
      gridItem: {
        md: 2
      },
    },
  }
}

export default schema
`

export default addresses