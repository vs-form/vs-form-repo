import * as React from 'react'
import { ItemProps } from '../common/propTypes'

import Grid, { GridProps } from '@material-ui/core/Grid'

import * as types from '../schemaManager/types'

export interface IGridProps extends ItemProps {
  container?: boolean,
}

class VsGrid extends React.Component<IGridProps, {}> {
  private gridProps: GridProps = {}
  constructor(props: IGridProps) {
    super(props)
    this.initProps()
  }
  public render() {
    return (
      <Grid  {...this.gridProps}>
        {this.props.children}
      </Grid>
    )
  }

  private initProps() {
    if (this.props.container) {
      const comp = this.props.comp as types.ICommonContainerProps
      if (comp.gridContainer) {
        this.gridProps = comp.gridContainer
      }
    } else {
      const comp = this.props.comp as types.IComponent
      if (comp.gridItem) {
        this.gridProps = comp.gridItem
      }
    }
    if (this.props.container) {
      this.gridProps.container = true
      if (!this.gridProps.spacing) {
        this.gridProps.spacing = 16
      }
    } else {
      this.gridProps.item = true
      if (!this.gridProps.xs) {
        this.gridProps.xs = 12
      }
    }
  }
}

//   private updateProps()
//     // let props: GridProps = {}
// if (this.props.container) {
//   const comp = this.props.comp as types.ICommonContainerProps
//   if (comp.gridContainer) {
//     props = { ...comp.gridContainer }
//   }
//   props.container = true
//   if (!props.spacing) {
//     props.spacing = 16
//   }
//   // if (this.props.designMode) {
//   //   props.component = this.sortable
//   // }
// } else {
//   const comp = this.props.comp
//   if (comp.gridItem) {
//     props = { ...comp.gridItem }
//   }
//   props.item = true
//   if (this.props.designMode) {
//     set(props, 'data-id', comp.node)
//   }

//   // provide xs
//   if (!props.xs) {
//     props.xs = 12
//   }
// }
// return props
//   }

// private sortable = () => {
//   return (
//     <Sortable onChange={this.props.onChange} options={this.props.options} >{this.props.children}</Sortable>
//   )
// }

export default VsGrid