import * as React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import * as strings from './strings'

export interface IDialogBoxProps {
  open: boolean,
  title: string,
  text: string,
  onCloseDialog: (ok: boolean) => void
}

class AlertDialog extends React.Component<IDialogBoxProps> {
  constructor(props: IDialogBoxProps) {
    super(props)
  }

  public handleClose = (ok: boolean) => () => {
    this.props.onCloseDialog(ok)
  }

  public render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose(true)} color="primary">
              {strings.buttons.ok}
            </Button>
            <Button onClick={this.handleClose(false)} color="primary" autoFocus={true}>
              {strings.buttons.cancel}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default AlertDialog