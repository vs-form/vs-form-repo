import * as React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import VsText from './Text'
import * as strings from './strings'

export interface IDialogPromptProps {
  open: boolean,
  title: string,
  text: string,
  onCloseDialog: (text: string) => void,
  defaultValue?: string,
  suffix?: string,
}

export interface IDialogPromptState {
  value: string,
}

class VsDialogPrompt extends React.Component<IDialogPromptProps, IDialogPromptState> {
  private inputRef: any
  constructor(props: IDialogPromptProps) {
    super(props)
    this.inputRef = React.createRef()
    this.state = {
      value: this.props.defaultValue || ''
    }
  }

  // public componentDidMount() {
  //   // setTimeout(() => {
  //   //   // this.inputRef && this.inputRef.current && this.inputRef.current.focus()
  //   // }, 100)
  // }

  public handleClose = (text: string) => (evt: any) => {
    evt.preventDefault()
    this.props.onCloseDialog(text)
    this.setState({ value: '' })
  }

  public onChange = (ev: any) => {
    this.setState({ value: ev.target.value })
  }

  public render() {
    if (!this.props.open) { return null }
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose('')}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            {this.props.text.split('\n').map((i, key) => <VsText key={key} text={i} />)}
            <form onSubmit={this.handleClose(this.state.value)}>
              <TextField
                inputRef={this.inputRef}
                autoFocus={true}
                value={this.state.value}
                onChange={this.onChange}
                margin="dense"
                fullWidth={true}
                InputProps={{
                  endAdornment: this.props.suffix && <InputAdornment position="end">{this.props.suffix}</InputAdornment>
                }}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose(this.state.value)} type="submit" color="primary">
              {strings.buttons.ok}
            </Button>
            <Button onClick={this.handleClose('')} color="primary" autoFocus={true}>
              {strings.buttons.cancel}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default VsDialogPrompt