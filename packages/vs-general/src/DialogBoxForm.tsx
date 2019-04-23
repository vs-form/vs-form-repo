import * as React from 'react'
import { types, SchemaManager } from '@vs-form/vs-form'
import { VsForm } from '@vs-form/vs-form'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import * as strings from './strings'

export interface IDialogBoxFormProps {
  open: boolean,
  title: string,
  schema?: types.ISchemaDesign,
  onCloseDialog: (values: object | undefined) => void
}

export class VsDialogBoxForm extends React.Component<IDialogBoxFormProps> {
  private schemaManager?: SchemaManager
  constructor(props: IDialogBoxFormProps) {
    super(props)
  }

  public handleCloseOk = () => {
    if (this.schemaManager && this.schemaManager.validationErrors.length === 0) {
      if (this.schemaManager.submit()) {
        this.props.onCloseDialog(this.schemaManager.schema.values)
      }
    }
  }

  public handleCloseCancel = () => {
    this.props.onCloseDialog(undefined)
  }

  public render() {
    if (this.props.schema) {
      this.schemaManager = new SchemaManager(this.props.schema)
    } else {
      return null
    }

    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleCloseCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            <VsForm schemaManager={this.schemaManager} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseOk} color="primary">
              {strings.buttons.ok}
            </Button>
            <Button onClick={this.handleCloseCancel} color="primary" autoFocus={true}>
              {strings.buttons.cancel}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
