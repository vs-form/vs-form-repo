import React from 'react'

// import { SchemaManagerDesigner } from 'vs-design'
// import { types } from '@vs-form/vs-form'
import BaseIcon from '../baseComponents/BaseIcon'
import Text from '../common/Text'
import IconButton from '../common/IconButton'
import * as types from '../schemaManager/types'
import * as svg from '../common/svgIcons'
import { withStyles, createStyles } from '@material-ui/core/styles'
const cssRoot = (hidden: boolean) => ({
  maxHeight: 400,
  overflowY: hidden ? 'hidden' : 'auto'
}) as React.CSSProperties

const styles = createStyles({
  cssError: {
    display: 'flex',
    alignItems: 'center'
  },
  text: {
    '&:hover': {
      cursor: 'pointer',
      textShadow: '0.1px 0',
    }
  },
  cssMargin: {
    width: 10
  },
  cssShiftRight: {
    flexGrow: 1
  },
  cssBtn: {
    height: 20,
    padding: 0
  },
  cssIconBtn: {
    padding: 0
  },
})

export interface ISchemaErrorProps {
  errors: types.IValidationErrorList,
  onErrorClick: (e: types.IValidationError) => void,
  classes?: any
}

export interface ISchemaErrorState {
  hideDetails: boolean,
}

class ValidationErrors extends React.Component<ISchemaErrorProps, ISchemaErrorState> {
  constructor(props: any) {
    super(props)
    this.state = {
      hideDetails: false,
    }
  }

  public render() {
    const { classes } = this.props
    return (
      <div style={cssRoot(this.state.hideDetails)} >
        <div className={classes.cssError}>
          <Text text={'Errors'} />
          <div className={classes.cssShiftRight} />
          <IconButton className={classes.cssBtn} svg={this.state.hideDetails ? svg.chevronDown : svg.chevronUp} iconProps={{ className: classes.cssIconBtn }} onClick={this.toggleShowDetails} />
        </div>
        {this.getErrors()}
      </div>
    )
  }

  private getErrors() {
    const { classes } = this.props
    if (this.state.hideDetails) { return null }
    return (
      this.props.errors.map((e: types.IValidationError, ind: number) => {
        return (
          <div key={ind}>
            <div className={classes.cssError} onClick={this.onErrorClick(e)}>
              <BaseIcon svg={svg.alertOutline} />
              <div className={classes.cssMargin} />
              <Text variant="caption" className={classes.text} text={this.getErrorMessage(e)} />
              <div className={classes.cssMargin} />
            </div>
          </div>
        )
      })
    )
  }

  private getErrorMessage = (e: types.IValidationError): string => {
    return `${e.comp.id}: ${e.error}`
  }

  private onErrorClick = (e: types.IValidationError) => () => {
    this.props.onErrorClick(e)
  }

  private toggleShowDetails = () => {
    this.setState({ hideDetails: !this.state.hideDetails })
  }

}

export default withStyles(styles)(ValidationErrors)
