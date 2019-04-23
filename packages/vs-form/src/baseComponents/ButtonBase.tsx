import * as React from 'react'
import { isUndefined } from '../schemaManager/lodash'
import * as enums from '../schemaManager/enums'
import * as strings from '../common/strings'
import * as types from '../schemaManager/types'
import { ItemButtonProps } from '../common/propTypes'
import classNames from 'classnames'

export default class VsButtonBase extends React.Component<ItemButtonProps> {
  private get comp(): types.IComponentButton { return this.props.comp as types.IComponentButton }
  private componentEventParams: types.IComponentEventParams = this.props.schemaManager.getComponentEventParams(this.props.comp)
  constructor(props: ItemButtonProps) {
    super(props)
    this.initProps()
  }

  public render() {
    const { btnClick } = this
    return this.props.children({ btnClick, ...this.props })
  }

  public btnClick = (event: any) => {
    const comp = this.props.comp as types.IComponentButton
    if (comp.action === enums.ButtonAction.save) {
      event.preventDefault()
      this.props.schemaManager.submit()
    }

    if (comp.action === enums.ButtonAction.cancel) {
      this.props.schemaManager.cancelValues()
    }

    if (comp.onClick) {
      comp.onClick(this.componentEventParams)
    }
  }

  private initProps = () => {
    if (this.comp.action) {
      if (isUndefined(this.comp.disabled)) {
        this.props.buttonProps.disabled = !this.props.schemaManager.dataStateChanged
      }
      if (!this.comp.label) {
        this.comp.label = strings.buttonAction[this.comp.action]
      }
      if (isUndefined(this.comp.icon)) {
        // this.comp.icon = strings.buttonActionIcon[this.comp.action]
      }
      if (this.comp.action === enums.ButtonAction.save) {
        this.props.buttonProps.type = 'submit'
      }
    }

    if (isUndefined(this.props.buttonProps.color)) {
      this.props.buttonProps.color = 'primary'
    }

    this.props.buttonProps.onClick = this.btnClick

    this.props.IconProps.className = classNames(this.props.IconProps.className, 'mdi', 'mdi-' + this.comp.icon, this.props.classes.icon)
  }
}
