import * as React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import ErrorBoundary from './ErrorBoundary'
import { ItemProps } from '../common/propTypes'
import SelectDiv from '../common/SelectDiv'
import { enums } from '../index'
import BaseComponent from '../baseComponents/BaseComponent'
import { IRegisteredComponent, getRegisteredComponent, getRegisteredComponentList } from '../registerComponent'
import { addStyles } from '../common/addStyle'
import Text from '../common/Text'

interface ItemState {
  registeredComponent?: IRegisteredComponent
  loading: boolean
}

class Element extends React.Component<ItemProps, ItemState> {
  constructor(props: ItemProps) {
    super(props)
    const regComp = getRegisteredComponentList().standard[this.props.comp.type]
    this.state = {
      registeredComponent: regComp,
      loading: true
    }
  }

  public changeSelection = (e: any): void => {

    e.stopPropagation()
    if (!this.props.designMode) {
      return
    }
    this.props.schemaManager.changeSelection(this.props.comp, e.shiftKey || e.ctrlKey)
  }

  public WrapperSelectDiv = ({ children }: any): any => {
    if (this.props.designMode) {
      return (
        <div onClick={this.changeSelection}>
          <SelectDiv {...this.props} />
          {children}
        </div>
      )
    } else {
      return children
    }
  }

  public WrapperTooltip = ({ children }: any): any => {
    if (this.props.comp.tooltip) {
      return (
        <Tooltip title={this.props.comp.tooltip} {...this.props.comp.tooltipProps}>
          <div>
            {children}
          </div>
        </Tooltip>
      )
    } else {
      return children
    }
  }

  public render() {
    let Elem
    // const Elem = getComponent(this.props)
    if (this.state && this.state.registeredComponent) {
      const ReactComp = this.state.registeredComponent.component
      if (!ReactComp) {
        return <p>Component not found: {this.props.comp.type}</p>
      }
      const Comp = (p: ItemProps) => <BaseComponent {...p}><ReactComp {...p} /></BaseComponent>
      const composedStyles = this.props.schemaManager.mergeStyles(this.props.comp, this.state.registeredComponent.defaultStyle)
      Elem = composedStyles ? addStyles(Comp, composedStyles) : Comp
    }
    if (Elem) {
      return (
        <this.WrapperTooltip>
          <this.WrapperSelectDiv>
            <ErrorBoundary {...this.props}>
              <Elem {...this.props} />
            </ErrorBoundary>
          </this.WrapperSelectDiv>
        </this.WrapperTooltip>
      )
    } else if (this.state.loading) {
      return <Text text="loading..."/>
    } else {
      const text = `Component not found: ${this.props.comp.type} ` + (this.props.comp.type === enums.Component.custom ? ' name: ' + this.props.comp.name : '')
      return <Text text={text}/>
    }
  }

  public async componentDidMount() {
    if (!this.state.registeredComponent) {
      const regComp = await getRegisteredComponent(this.props.comp.type, this.props.comp['name'])
      this.setState({ registeredComponent: regComp, loading: false })
    }
  }

}

export default Element
