import { ISchemaDesign, Component, DataType, enums, types } from '@vs-form/vs-form'

const curTabText = (tab: number, s: ISchemaDesign): string => {
  const tabsComp = s.components.tabs as types.IComponentTabs
  const activeTab = s.components[tabsComp.tabs[tab]] as types.IComponentPanel
  return 'Current Tab is: ' + activeTab.label
}

const schema: ISchemaDesign = {
  name: 'tabs',
  label: 'Tabs',
  onCreated(p) {
    const t = p.schema.components.tabs as types.IComponentTabs
    (p.schema.components.curTabLabel as types.IComponentText).text = curTabText(t.activeTab || 0, p.schema)
  },
  components: {
    root: {
      type: Component.panel,
      children: ['checkChange', 'curTabLabel', 'tabs', 'btnOk', 'btnCancel'],
    },
    checkChange: {
      type: Component.checkbox,
      label: 'Prevent change to Tab "Address"',
      data: {
        dataType: DataType.boolean,
        field: 'checkChange'
      },
      gridItem: {
        sm: 'auto'
      },
    },
    curTabLabel: {
      type: Component.text,
      text: '',
      gridItem: {
        sm: 'auto'
      },
    },
    tabs: {
      type: Component.tabs,
      onBeforeChange(p) {
        if (p.newTab === 1 && p.schemaManager.getSchemaValue(p.schema.components.checkChange) === true) {
          p.canChange = false
        }
      },
      onChange(p) {
        (p.schema.components.curTabLabel as types.IComponentText).text = curTabText(p.newTab, p.schema)
        p.schemaManager.renderComponents([p.schema.components.curTabLabel])
      },
      label: 'Tab',
      tabs: ['tab0', 'tab1', 'tab2', 'tab3', 'tab4', 'tab5'],
    },
    tab0: {
      type: Component.tab,
      label: 'Containers',
      icon: ['contain'],
      children: ['panel', 'divider0', 'card', 'divider1', 'checkChangeExp', 'curExp', 'exp']
    },
    contain: {
      type: Component.icon,
      icon: 'contain',
    },
    tab1: {
      type: Component.tab,
      label: 'Address',
      icon: 'account',
      children: ['customerAddress']
    },
    tab2: {
      type: Component.tab,
      label: 'Billing address',
      icon: 'credit-card',
      children: ['billingAddress']
    },
    tab3: {
      type: Component.tab,
      label: 'Shipping Adress',
      icon: 'truck-delivery',
      children: ['shippingAddress']
    },
    tab4: {
      type: Component.tab,
      label: 'Notes',
      icon: 'note-text',
      children: ['text1']
    },
    tab5: {
      type: Component.tab,
      label: 'Styles',
      icon: 'note-text',
      children: ['stylesSub']
    },
    panel: {
      type: Component.panel,
      children: ['subSimple1'],
      label: 'Panel',
    },
    card: {
      type: Component.card,
      children: ['subSimple2'],
      label: 'Card',
    },
    divider0: {
      type: Component.divider
    },
    divider1: {
      type: Component.divider
    },
    checkChangeExp: {
      type: Component.checkbox,
      label: 'Prevent expand of panel',
      data: {
        dataType: DataType.boolean,
        field: 'checkChangeExp'
      },
      gridItem: {
        xs: 'auto'
      },
    },
    curExp: {
      type: Component.text,
      text(p) {
        const expanded = (p.schema.components.exp as types.IComponentExpansionPanel).expanded
        return 'Panel is: ' + (expanded ? 'expanded' : 'collapsed')
      },
      gridItem: {
        xs: 'auto'
      },
    },
    exp: {
      type: Component.expansionpanel,
      onBeforeChange(p) {
        if (p.expanded && p.schemaManager.getValue('checkChangeExp') === true) {
          p.canChange = false
        }
      },
      onChange(p) {
        const comps = p.schema.components
        const textComp = comps.curExp as types.IComponentText
        textComp.text = 'Panel is: ' + (p.expanded ? 'expanded' : 'collapsed')
        p.schemaManager.renderComponents([textComp])
      },
      children: ['subSimple3'],
      label: 'Expansion Panel',
    },
    text1: {
      type: Component.textinput,
      data: {
        field: 'text',
        dataType: DataType.string
      },
      label: 'Text'
    },
    subSimple1: {
      type: Component.subschema,
      data: {
        field: 'subSimple1',
        dataType: DataType.object
      },
      schemaName: 'subSimple'
    },
    subSimple2: {
      type: Component.subschema,
      data: {
        field: 'subSimple2',
        dataType: DataType.object
      },
      schemaName: 'subSimple'
    },
    subSimple3: {
      type: Component.subschema,
      data: {
        field: 'subSimple3',
        dataType: DataType.object
      },
      schemaName: 'subSimple'
    },
    stylesSub: {
      type: Component.subschema,
      data: {
        field: 'styles',
        dataType: DataType.object
      },
      schemaName: 'styles',
      label: 'Styles'
    },
    customerAddress: {
      type: Component.subschema,
      data: {
        field: 'customerAddress',
        dataType: DataType.object
      },
      schemaName: 'address',
      label: 'Customer Address'
    },
    billingAddress: {
      type: Component.subschema,
      data: {
        field: 'billingAddress',
        dataType: DataType.object
      },
      schemaName: 'address',
      label: 'Billing Address'
    },
    shippingAddress: {
      type: Component.subschema,
      data: {
        field: 'shippingAddress',
        dataType: DataType.object
      },
      schemaName: 'address',
      label: 'Shipping Address'
    },
    btnOk: {
      type: Component.button,
      tooltip: 'Click to save',
      disabled: false,
      action: enums.ButtonAction.save,
      gridItem: {
        md: 2
      },
    },
    btnCancel: {
      type: Component.button,
      action: enums.ButtonAction.cancel,
      gridItem: {
        md: 2
      },
    },

  }
}

export default schema
