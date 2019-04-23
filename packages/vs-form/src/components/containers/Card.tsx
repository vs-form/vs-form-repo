import * as React from 'react'
import Card, { CardProps as MuiCardProps } from '@material-ui/core/Card'
import CardHeader, { CardHeaderProps as MuiCardHeaderProps } from '@material-ui/core/CardHeader'
import CardContent, { CardContentProps as MuiCardContentProps } from '@material-ui/core/CardContent'
import { TypographyProps as MuiTypographyProps } from '@material-ui/core/Typography'
import { isUndefined } from '../../schemaManager/lodash'

import * as types from '../../schemaManager/types'
import { ItemProps } from '../../common/propTypes'
import Text from '../../common/Text'

export default class VsCard extends React.Component<ItemProps> {
  private get comp(): types.IComponentCard { return this.props.comp as types.IComponentCard }
  private CardProps: MuiCardProps = {}
  private CardHeaderProps: MuiCardHeaderProps = {}
  private CardContentProps: MuiCardContentProps = {}
  private HeaderTypographyProps: MuiTypographyProps = {}
  private SubHeaderTypographyProps: MuiTypographyProps = {}

  constructor(props: ItemProps) {
    super(props)
    this.initProps()
  }

  public render() {
    return (
      <Card {...this.CardProps}>
        {this.comp.label &&
          <CardHeader
            title={this.comp.label && <Text text={this.comp.label as string} {...this.HeaderTypographyProps} />}
            subheader={this.comp.subheader && <Text text={this.comp.subheader} {...this.SubHeaderTypographyProps} />}
            {...this.CardHeaderProps}
          />}
        <CardContent {...this.CardContentProps}>
          {this.props.children}
        </CardContent>
      </Card>
    )
  }

  private initProps() {

    const { CardHeaderProps, CardContentProps, HeaderTypographyProps, SubHeaderTypographyProps, ...CardProps } = this.comp.props!
    if (CardProps) { this.CardProps = CardProps }
    if (CardHeaderProps) { this.CardHeaderProps = CardHeaderProps }
    if (CardContentProps) { this.CardContentProps = CardContentProps }
    if (HeaderTypographyProps) { this.HeaderTypographyProps = HeaderTypographyProps }
    if (SubHeaderTypographyProps) { this.SubHeaderTypographyProps = SubHeaderTypographyProps }
    if (isUndefined(this.HeaderTypographyProps.variant)) {
      this.HeaderTypographyProps.variant = 'h6'
    }
    if (isUndefined(this.SubHeaderTypographyProps.variant)) {
      this.SubHeaderTypographyProps.variant = 'subtitle1'
    }
  }
}
