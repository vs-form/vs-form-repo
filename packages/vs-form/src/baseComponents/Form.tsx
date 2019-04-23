import * as React from 'react'
import Item from './Item'
import { IFormProps } from '../common/propTypes'

export class VsForm extends React.Component<IFormProps, {}> {
  public static defaultProps: Partial<IFormProps> = {
    node: 'root',
    designMode: false
  }

  private counter = 0
  constructor(props: IFormProps) {
    super(props)
  }

  public render() {
    return (
      <Item {...this.props} schema={this.props.schemaManager.schema} node={this.props.node!} comp={this.props.schemaManager.schema.components[this.props.node!]} key={this.getKey()} />
    )
  }

  public componentDidMount() {
    this.props.schemaManager.callSchemaEvent('onDidMount')
  }

  public componentWillUnmount() {
    this.props.schemaManager.clearInputRefList()
    this.props.schemaManager.callSchemaEvent('onWillUnmount')
  }

  private getKey = (): string => {
    const s = this.props.schemaManager.schema
    return s.name + (this.counter > 0 ? '_' + this.counter : '')
  }
}
