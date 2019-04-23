import * as React from 'react'
import * as types from '../schemaManager/types'
import * as enums from '../schemaManager/enums'
import { ItemProps } from '../common/propTypes'

import Element from './Element'
import { has } from '../schemaManager/lodash'
import Grid from './Grid'
import ValidationErrors from '../common/ValidationErrors'

class Item extends React.Component<ItemProps, {}> {
  private counter = 0
  constructor(props: ItemProps) {
    super(props)
  }

  public render(): any {
    const VsGrid = this.WrapperGrid(false)
    return (
      <VsGrid key={this.getKey()}>
        {this.validationErrorPanel()}
        <Element {...this.props} comp={this.props.comp}>
          {this.getChildrenList(this.props)}
        </Element >
      </VsGrid>
    )
  }

  public componentDidMount() {
    this.registerSchemaEvents()
  }

  public componentWillUnMount() {
    this.unRegisterSchemaEvents()
  }

  public validationErrorPanel = (): any => {
    if (this.props.comp.id === 'root' && !this.props.schemaManager.schema.hideValidationErrorPanel && this.props.schemaManager.validationErrors.length > 0) {
      return <ValidationErrors errors={this.props.schemaManager.validationErrors} onErrorClick={this.onValidationErrorClick} />
    }
    return null
  }

  public WrapperGrid = (container: boolean) => (props: any): any => {
    if (this.props.node === 'root' && !container) {
      return props.children
    } else {
      return (
        <Grid container={container} {...this.props}>
          {props.children}
        </Grid>
      )
    }
  }

  // <Grid container={container} onChange={this.changeOrder} options={{ group: this.props.schema.id || this.props.schema.name, onStart: this.changeOrderStart }} {...this.props}>
  // public changeOrder: any = (list: string[]) => {
  //   // list: siehe data-id unten
  //   if (!this.props.designMode) { return }
  //   this.props.schemaManager.changeOrder(this.props.comp, list)
  // }

  // public changeOrderStart: any = () => {
  //   // for undo
  //   this.props.schemaManager.changeOrderStarted()
  // }

  public getChildrenList: any = (props: ItemProps) => {
    if (!this.isContainer()) {
      return null
    }
    const compList: any[] = []
    const list = props.schemaManager.getChildrenComponents(props.schema, props.node)
    if (list.length === 0) {
      return null
    }

    list.forEach((c: types.IComponent) => {
      const entry: any = <Item key={c.id} {...props} node={c.node!} comp={props.schema.components[c.node!]} />
      compList.push(entry)
    })
    const VsGrid = this.WrapperGrid(true)
    return (
      <VsGrid>
        {compList}
      </VsGrid>
    )
  }

  private isContainer = (): boolean => {
    return has(this.props.comp, 'children')
  }

  private getKey = (): string => {
    // use key to regenerate component completely (incl. constructor)
    return this.props.comp.id! + (this.counter > 0 ? '_' + this.counter : '')
  }

  private onRenderComponent = (comp: types.IComponent, callback?: () => void) => {
    if (comp === this.props.comp) {
      this.counter++
      this.forceUpdate(callback)
    }
  }

  private onFocusComponent = (comp: types.IComponent) => {
    if (comp === this.props.comp) {
      const ref = this.props.schemaManager.getInputRef(comp)
      if (ref && ref.current) {
        ref.current.focus()
      }
    }
  }

  private onValidationErrorClick = (e: types.IValidationError) => {
    this.props.schemaManager.focusComponent(e.comp)
  }

  private registerSchemaEvents = () => {
    this.props.schemaManager.on(enums.SchemaEventType.onRenderComponent, this.onRenderComponent)
    this.props.schemaManager.on(enums.SchemaEventType.onFocusComponent, this.onFocusComponent)
  }

  private unRegisterSchemaEvents = () => {
    this.props.schemaManager.removeListener(enums.SchemaEventType.onRenderComponent, this.onRenderComponent)
    this.props.schemaManager.removeListener(enums.SchemaEventType.onFocusComponent, this.onFocusComponent)
  }

}

export default Item