import * as React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export enum IDialogBoxButton {
  ok = 'Ok',
  cancel = 'Cancel',
  yes = 'Yes',
  no = 'No',
}
export interface IDialogBoxExtProps {
  open: boolean,
  title: string,
  text: string,
  buttons: IDialogBoxButton[]
  onCloseDialog: (ok: IDialogBoxButton) => void
}

export class VsDialogBoxExt extends React.Component<IDialogBoxExtProps> {
  constructor(props: IDialogBoxExtProps) {
    super(props)
  }

  public render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
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
            {this.getButtons()}
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  public getButtons = () => {
    return this.props.buttons.map((btn) => {
      return (
        <Button key={btn} onClick={this.handleClose(btn)} color="primary" autoFocus={btn === IDialogBoxButton.ok || btn === IDialogBoxButton.yes}>
          {btn}
        </Button>
      )
    })
  }

  public handleClose = (btn: IDialogBoxButton) => () => {
    this.props.onCloseDialog(btn)
  }

}
