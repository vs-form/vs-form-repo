import * as React from 'react'
import { has, isArray, isObject, get, set } from '../schemaManager/lodash'
import * as enums from '../schemaManager/enums'
import { IComponent } from '../schemaManager/types'
import { ItemProps } from '../common/propTypes'
import Item from './Item'
import BaseIcon from '../baseComponents/BaseIcon'
import { IconProps } from '@material-ui/core/Icon'

const disableItemsDesignMode = {
  [enums.Component.textinput]: ['disabled'],
  [enums.Component.checkbox]: ['FormControlLabelProps.disabled'],
  [enums.Component.checklistbox]: ['disabled'],
  [enums.Component.date]: ['disabled'],
  [enums.Component.dateext]: ['disabled'],
  [enums.Component.time]: ['disabled'],
  [enums.Component.datetime]: ['disabled'],
  [enums.Component.integer]: ['disabled'],
  [enums.Component.number]: ['disabled'],
  [enums.Component.numberformat]: ['disabled'],
  [enums.Component.radiogroup]: ['FormControlLabelProps.disabled'],
  [enums.Component.select]: ['disabled'],
  [enums.Component.selectext]: ['disabled'],
  [enums.Component.slider]: ['disabled'],
  [enums.Component.button]: ['disabled'],
  [enums.Component.iconbutton]: ['disabled'],
}

export const getIcon = (props: ItemProps): any | undefined => {
  const { classes, ...other } = props
  const prop = get(props.comp, 'icon')
  const comp = props.comp
  if (prop) {
    if (isArray(prop) && prop.length > 0) {
      const iconComp = props.schema.components[prop[0]]
      if (iconComp) {
        // return () => <div>Icon not found {prop[0]}</div>
        return () => <Item {...other} schema={props.schema} node={comp.node!} comp={iconComp} />
      } else {
        return () => <div>Icon not found {prop[0]}</div>
      }
    } else {
      let colorProp: string = 'props.IconProps.color'
      if (comp.type === enums.Component.icon) {
        colorProp = 'props.color'
      }
      if (!get(comp, colorProp)) {
        set(comp, colorProp, 'primary')
      }
      return (p: IconProps) => <BaseIcon icon={prop as string} {...p} />
    }
  }
  return undefined
}

export default class VsBaseComponent extends React.Component<ItemProps> {
  constructor(props: ItemProps) {
    super(props)
    this.initProps()
  }

  public render() {
    return this.props.children
  }

  private classNameToMuiClass = (className: string | undefined, classes: any): string | undefined => {
    if (className) {
      return className
        .split(' ')
        .map((c: string) => has(classes, c) ? classes[c] : c)
        .join(' ')
    } else {
      return undefined
    }
  }

  private initProps = (): void => {
    const props = this.props.comp.props || {}
    // const schema = this.props.schemaManager.getOrigSchemaFromComponentId(this.props.comp.id!)
    // const orig: IComponent | undefined = schema ? schema.components[this.props.comp.node!] : undefined
    const orig: IComponent | undefined = this.props.schemaManager.getOrigComponentById(this.props.comp.id!)
    if (orig && orig.props && this.props.classes) {
      let className = this.classNameToMuiClass(orig.props.className, this.props.classes)
      if (className) { props.className = className }
      Object.keys(orig.props).forEach((key: string) => {
        if (isObject(orig.props[key]) && isObject(props[key])) {
          className = this.classNameToMuiClass(orig.props[key].className, this.props.classes)
          if (className) { props[key].className = className }
        }
      })
    }

    const icon = getIcon(this.props)
    if (icon) {
      set(this.props.comp, 'iconComp', icon)
    }

    if (this.props.designMode || this.props.comp.disabled || this.props.schema.disabled || this.props.schemaManager.schema.disabled) {
      const disableItem = disableItemsDesignMode[this.props.comp.type]
      if (disableItem) {
        disableItem.forEach((p: string) => set(this.props.comp.props, p, true))
      }
    }

    this.props.schemaManager.resolvePropertyFunctions(this.props.comp)
  }

}

// const updateClassNames = (props: any[], classes: any) => {
//   props.forEach((p) => p.className = classNameToMuiClass(p.className, classes))
// }

// export const setComponentDisabledMode = (props: any[], comp: IComponent, designMode?: boolean) => {
//   const disabled = designMode ? true : comp.disabled
//   props.forEach((p) => p.disabled = disabled)
// }
