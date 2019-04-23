import * as React from 'react'
import * as types from '../../schemaManager/types'
import Text from '../../common/Text'
import { ItemProps } from '../../common/propTypes'
import { TypographyProps as MuiTypographyProps } from '@material-ui/core/Typography'
import { isUndefined } from '../../schemaManager/lodash'

export default class Form extends React.Component<ItemProps> {
  private get comp(): types.IComponentForm { return this.props.comp as types.IComponentForm }
  private PanelProps: any = {}
  private HeaderTypographyProps: MuiTypographyProps = {}

  constructor(props: ItemProps) {
    super(props)
    this.initProps()
  }

  public render() {
    return (
      <this.FormTag>
        {this.comp.label ? <Text text={this.comp.label as string} {...this.HeaderTypographyProps} /> : null}
        {this.props.children}
      </this.FormTag>
    )
  }

  private FormTag = ({ children }: any) => {
    if (!this.props.schemaManager.componentIsInSubschema(this.comp)) {
      return <form  {...this.PanelProps}>{children}</form>
    } else {
      return <div  {...this.PanelProps}>{children}</div>
    }
  }

  private initProps() {
    const { HeaderTypographyProps, ...PanelProps } = this.comp.props!
    if (PanelProps) { this.PanelProps = PanelProps }
    if (HeaderTypographyProps) { this.HeaderTypographyProps = HeaderTypographyProps }
    if (isUndefined(this.HeaderTypographyProps.variant)) {
      this.HeaderTypographyProps.variant = 'h6'
    }
  }
}
