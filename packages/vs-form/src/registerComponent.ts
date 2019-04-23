import { Component } from './schemaManager/enums'

export interface IRegisteredComponent {
  component: any,
  defaultStyle?: any
}

export const getRegisteredComponentList = (): IRegisteredComponents => {
  // @ts-ignore
  if (!window.vsformregisteredComponents) {
    // @ts-ignore
    window.vsformregisteredComponents = {
      standard: {},
      custom: {}
    }
  }
  // @ts-ignore
  return window.vsformregisteredComponents as IRegisteredComponents
}
interface IRegisteredComponents {
  standard: {
    [key: string]: IRegisteredComponent
  },
  custom: {
    [key: string]: IRegisteredComponent
  }
}

export const registerComponent = (type: Component, component: any, defaultStyle?: any) => {
  getRegisteredComponentList().standard[type] = { component, defaultStyle }
}

export const registerCustomComponent = (name: string, component: any, defaultStyle?: any) => {
  getRegisteredComponentList().custom[name] = { component, defaultStyle }
}

// export const getRegisteredComponent = async (comp: IComponent) => {
//   const rc = comp.type !== Component.custom ? getRegisteredComponentList().standard[comp.type] : getRegisteredComponentList().custom[comp.name]
//   if (rc) { return rc }
//   if (comp.type === Component.textinput) {
//     const imp = await import(`../components/fields/TextInput`)
//     registerComponent(comp.type, imp.default, imp['styles'])
//     return getRegisteredComponentList().standard[comp.type]
//   }
//   return undefined
// }

export const getRegisteredComponent = async (type: Component, name?: string) => {
  const rc = type !== Component.custom ? getRegisteredComponentList().standard[type] : getRegisteredComponentList().custom[name!]
  if (rc) { return rc }
  let imp: any
  // container
  if (type === Component.panel) {
    imp = await import('./components/containers/PanelWithLabel')
  } else if (type === Component.form) {
    imp = await import('./components/containers/Form')
  } else if (type === Component.tabs) {
    imp = await import('./components/containers/VsTabs')
  } else if (type === Component.tab) {
    imp = await import('./components/containers/Tab')
  } else if (type === Component.card) {
    imp = await import('./components/containers/Card')
  } else if (type === Component.expansionpanel) {
    imp = await import('./components/containers/ExpansionPanel')
  } else if (type === Component.subschema) {
    imp = await import('./components/containers/Subschema')
    // fields
  } else if (type === Component.textinput) {
    imp = await import('./components/fields/TextInput')
  } else if (type === Component.number) {
    imp = await import('./components/fields/Number')
  } else if (type === Component.integer) {
    imp = await import('./components/fields/Integer')
  } else if (type === Component.select) {
    imp = await import('./components/fields/Select')
  } else if (type === Component.date || type === Component.datetime || type === Component.time) {
    imp = await import('./components/fields/Date')
  } else if (type === Component.radiogroup) {
    imp = await import('./components/fields/Radiogroup')
  } else if (type === Component.checkbox) {
    imp = await import('./components/fields/Checkbox')
  } else if (type === Component.switch) {
    imp = await import('./components/fields/Switch')
  } else if (type === Component.checklistbox) {
    imp = await import('./components/fields/Checklistbox')
  // static
  } else if (type === Component.text) {
    imp = await import('./components/static/Text')
  } else if (type === Component.button) {
    imp = await import('./components/static/Button')
  } else if (type === Component.iconbutton) {
    imp = await import('./components/static/IconButton')
  } else if (type === Component.icon) {
    imp = await import('./components/static/Icon')
  } else if (type === Component.divider) {
    imp = await import('./components/static/Divider')
  } else if (type === Component.mediastatic) {
    imp = await import('./components/static/MediaStatic')
  }
  if (imp) {
    registerComponent(type, imp.default, imp.styles)
    return getRegisteredComponentList().standard[type]
  } else {
    return undefined
  }

}

// const defaultComponents: IRegisteredComponentList = {
//   // containers
//   [Component.form]: Form,
//   [Component.panel]: VsPanelWithLabel.VsPanelWithLabel,
//   [Component.card]: VsCard.VsCard,
//   [Component.tabs]: VsVsTabs.VsTabs,
//   [Component.tab]: VsPanel,
//   [Component.subschema]: VsSubschema,
//   [Component.expansionpanel]: VsExpansionPanel.VsExpansionPanel,
//   // fields
//   [Component.textinput]: VsTextInput,
//   [Component.number]: VsNumber,
//   [Component.integer]: VsInteger,
//   [Component.numberformat]: VsNumberFormat,
//   [Component.select]: VsSelect,
//   [Component.selectext]: null,
//   [Component.date]: VsDate,
//   [Component.dateext]: null,
//   [Component.datetime]: VsDate,
//   [Component.time]: VsDate,
//   [Component.radiogroup]: VsRadioGroup.VsRadioGroup,
//   [Component.checkbox]: VsCheckbox.VsCheckbox,
//   [Component.switch]: VsSwitch.VsSwitch,
//   [Component.slider]: VsSlider.VsSlider,
//   [Component.checklistbox]: VsChecklistbox.VsChecklistBox,
//   // static
//   [Component.text]: VsTextStatic.VsText,
//   [Component.button]: VsButton.VsButton,
//   [Component.iconbutton]: VsIconButton.VsIconButton,
//   [Component.icon]: VsIconStatic.VsIcon,
//   [Component.divider]: VsDivider.VsDivider,
//   [Component.mediastatic]: VsMediaStatic.VsMediaStatic,
//   [Component.speeddial]: VsSpeedDial.VsSpeedDial,

//   // todo
//   [Component.dataTable]: null,
//   [Component.custom]: null,
// }
