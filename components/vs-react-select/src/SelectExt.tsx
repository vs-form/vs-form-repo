import * as React from 'react'
import classNames from 'classnames'
import Select from 'react-select'
import { withStyles, createStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField, { TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import MenuItem from '@material-ui/core/MenuItem'
import { emphasize } from '@material-ui/core/styles/colorManipulator'

import { types, set, isArray } from '@vs-form/vs-form'

const styles = (theme: Theme) => createStyles({
  inputBrd: {
    display: 'flex',
    padding: '6px 0 2px',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
})

function NoOptionsMessage(props: any) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function inputComponent(props: any) {
  const { inputRef, ...other } = props
  return <div ref={inputRef} {...other} />
}

function Control(props: any) {
  return (
    <TextField
      label={props.selectProps.label}
      InputLabelProps={{shrink: true}}
      fullWidth={true}
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.inputBrd,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.TextFieldProps}
    />
  )
}

function Option(props: any) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  )
}

function Placeholder(props: any) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function SingleValue(props: any) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  )
}

function ValueContainer(props: any) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>
}

function MultiValue(props: any) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
    />
  )
}

function Menu(props: any) {
  return (
    <Paper square={true} className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  )
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
}

export interface ISelectExProps {
  label: string,
  items: types.ISelectItemList,
  value?: any,
  onChange?: any,
  isMulti?: boolean,
  autoFocus?: boolean,
  placeholder?: string,
  isSearchable?: boolean,
  classes?: any,
  theme?: any,
  options?: any
  style?: any,
  TextFieldProps?: MuiTextFieldProps
  inputRef?: any
}

interface ISelectExState {
  selectedOption: any
}

class SelectExt extends React.Component<ISelectExProps, ISelectExState> {
  private items: any[] = []
  private SelectProps: any
  constructor(props: ISelectExProps) {
    super(props)

    this.getItems()

    this.SelectProps = this.props || {}
    set(this.SelectProps, 'TextFieldProps.label', this.SelectProps.label)
    set(this.SelectProps, 'TextFieldProps.InputLabelProps.shrink', true)

    const defaultValue: any = this.props.isMulti ? [] : {}

    const value = this.props.isMulti ? this.findItems(this.props.value) : this.findItem(this.props.value)

    const selectedOption = value || defaultValue
    this.state = {
      selectedOption
    }
  }

  public render() {
    const { theme } = this.props
    const selectStyles = {
      input: (base: any) => ({
        ...base,
        'color': theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    }

    return (
      <Select
        {...this.SelectProps}
        styles={selectStyles}
        components={components}
        options={this.items}
        value={this.state.selectedOption}
        onChange={this.changeValue}
      />
    )
  }

  public changeValue = (value: any) => {
    this.setState({ selectedOption: value })
    let val
    if (this.SelectProps.isMulti && isArray(value)) {
      val = value.map((v: any) => v.value)
    } else {
      val = value.value
    }
    this.props.onChange(val)
  }

  private findItem = (value: any) => {
    return this.items.find((item) => item.value === value)
  }

  private findItems = (value: any) => {
    if (isArray(value)) {
      return value.reduce((result: any, v: any) => {
        const item = this.items.find((i) => i.value === v)
        if (item) {
          result.push({ value: item.value, label: item.label })
        }
        return result
      },                  [])
    } else {
      return []
    }
  }

  private getItems = () => {
    this.items = this.props.items.map((item: types.ISelectItem) => ({ value: item.value, label: item.text }))
  }

}

export default withStyles(styles, { withTheme: true })(SelectExt)