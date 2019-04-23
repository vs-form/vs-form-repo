import React from 'react'
import { ItemProps, types } from '@vs-form/vs-form'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

export default class VsSpeedDial extends React.Component<ItemProps> {
  constructor(props: ItemProps) {
    super(props)
  }

  public render() {
    const comp = this.props.comp as types.IComponentCustom

    return (
      <Paper>
        {comp.label &&
          <Typography variant="h5" component="h3">
            {comp.label}
          </Typography>
        }
        {this.props.children}
      </Paper>
    )
  }

}
