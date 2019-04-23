import * as React from 'react'
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton'

import { SvgIconProps } from '@material-ui/core/SvgIcon'

import BaseIcon from '../baseComponents/BaseIcon'
import Tooltip from '@material-ui/core/Tooltip'

export interface IconBtnProps extends IconButtonProps {
  svg: string,
  iconProps?: SvgIconProps,
  tooltip?: string
}

const VsIconButton: React.SFC<IconBtnProps> = (props: IconBtnProps) => {
  const { iconProps, ...other } = props
  const btn = (
    <IconButton color="primary" {...other}>
      <BaseIcon svg={props.svg} {...iconProps} />
    </IconButton>
  )
  const tooltip = props.tooltip ? props.tooltip : null
  return tooltip ? <Tooltip title={tooltip}><span>{btn}</span></Tooltip> : btn
}

export default VsIconButton
