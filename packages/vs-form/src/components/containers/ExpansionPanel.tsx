import * as React from 'react'
import ExpansionPanel, { ExpansionPanelProps as MuiExpansionPanelProps } from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary, { ExpansionPanelSummaryProps as MuiExpansionPanelSummaryProps } from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails, { ExpansionPanelDetailsProps as MuiExpansionPanelDetailsProps } from '@material-ui/core/ExpansionPanelDetails'
import { TypographyProps as MuiTypographyProps } from '@material-ui/core/Typography'
import { isUndefined } from '../../schemaManager/lodash'
import BaseIcon from '../../baseComponents/BaseIcon'
import { chevronDown } from '../../common/svgIcons'
import classNames from 'classnames'

import * as types from '../../schemaManager/types'
import { ItemProps } from '../../common/propTypes'

// import Icon from '../generalComponents/Icon'
import Text from '../../common/Text'

export const styles = {
  root: {
    width: '100%'
  },
  dense: {
    padding: '5px',
  }
}

export interface IExpansionPanelState {
  expanded: boolean
}

export default class VsExpansionPanel extends React.Component<ItemProps, IExpansionPanelState> {
  private get comp(): types.IComponentExpansionPanel { return this.props.comp as types.IComponentExpansionPanel }
  private ExpansionPanelProps: MuiExpansionPanelProps = {}
  private ExpansionPanelSummaryProps: MuiExpansionPanelSummaryProps = {}
  private ExpansionPanelDetailsProps: MuiExpansionPanelDetailsProps = {}
  private TypographyProps: MuiTypographyProps = {}
  // private IconProps: MuiIconProps = {}
  private componentEventParams: types.IComponentEventParams = this.props.schemaManager.getComponentEventParams(this.props.comp)

  constructor(props: ItemProps) {
    super(props)
    this.initProps()
    this.state = {
      expanded: !!(this.comp.expanded)
    }
  }

  public render() {
    return (
      <ExpansionPanel {...this.ExpansionPanelProps} expanded={this.state.expanded} >
        <ExpansionPanelSummary {...this.ExpansionPanelSummaryProps}>
          <Text text={this.comp.label as string} {...this.TypographyProps} />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails {...this.ExpansionPanelDetailsProps}>{this.props.children}</ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }

  public changeExpanded = (_event: object, expanded: boolean) => {
    let canChange = true
    const params = { ...this.componentEventParams, expanded }
    if (this.comp.onBeforeChange) {
      const p = { ...params, canChange: true }
      this.comp.onBeforeChange(p)
      canChange = p.canChange
    }
    if (canChange) {
      this.setState({ expanded })
      this.props.schemaManager.changeExpanded(this.comp, expanded, !!this.props.designMode)
      if (this.comp.onChange) {
        this.comp.onChange(params)
      }
    }
  }

  private initProps() {

    const { ExpansionPanelSummaryProps, ExpansionPanelDetailsProps, TypographyProps, IconProps, ...ExpansionPanelProps } = this.comp.props!
    if (ExpansionPanelProps) { this.ExpansionPanelProps = ExpansionPanelProps }
    if (ExpansionPanelSummaryProps) { this.ExpansionPanelSummaryProps = ExpansionPanelSummaryProps }
    if (ExpansionPanelDetailsProps) { this.ExpansionPanelDetailsProps = ExpansionPanelDetailsProps }
    if (TypographyProps) { this.TypographyProps = TypographyProps }
    this.ExpansionPanelProps.onChange = this.changeExpanded
    this.ExpansionPanelProps.className = classNames(this.props.classes.root, this.ExpansionPanelProps.className)
    if (this.comp.dense) {
      this.ExpansionPanelDetailsProps.className = classNames(this.props.classes.dense, this.ExpansionPanelDetailsProps.className)
    }
    this.ExpansionPanelSummaryProps.expandIcon = <BaseIcon svg={chevronDown} />
    if (isUndefined(this.ExpansionPanelProps.expanded)) {
      this.ExpansionPanelProps.expanded = false
    }
  }
}
