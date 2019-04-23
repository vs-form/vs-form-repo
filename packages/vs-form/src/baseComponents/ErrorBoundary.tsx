import * as React from 'react'
import { ItemProps } from '../common/propTypes'

export interface IErrorBoundaryState {
  hasError: boolean
}

export default class ErrorBoundary extends React.Component<ItemProps, IErrorBoundaryState> {
  constructor(props: ItemProps) {
    super(props)
    this.state = { hasError: false }
  }

  public componentDidCatch(error: any, info: any) {
    // Display fallback UI
    this.setState({ hasError: true })
    // You can also log the error to an error reporting service
    // tslint:disable-next-line:no-console
    console.log(this.props, error, info)
    // logErrorToMyService(error, info)
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <React.Fragment>
          <p style={{ color: 'red' }}>Component with id: "{this.props.comp.node}" has errors! </p>
          <p style={{ color: 'red' }}>check the console for more info.</p>
        </React.Fragment>
      )
    }
    return this.props.children
  }
}
