import * as React from 'react'
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton'

import { IconProps } from '@material-ui/core/Icon'

import Icon from './Icon'
import Tooltip from './Tooltip'

import * as constants from './constants'

enum Shortcut {
  showPi = 'showPi',
  showSchemaManage = 'showSchemaManage',
  showStructure = 'showStructure',
  showAddComponent = 'showAddComponent',
  delComponent = 'delComponent',
  saveComponent = 'saveComponent',
}

export interface IconBtnProps extends IconButtonProps {
  icon: string,
  iconProps?: IconProps,
  tooltip?: string,
  shortcut?: Shortcut,
}

const VsIconButton: React.SFC<IconBtnProps> = (props: IconBtnProps) => {
  const { iconProps, ...other } = props
  const btn = (
    <IconButton color="primary" {...other}>
      <Icon icon={props.icon} {...iconProps} />
    </IconButton>
  )
  const tooltip = props.tooltip ? props.shortcut ? props.tooltip + constants.shortCutToString[props.shortcut] : props.tooltip : null
  return tooltip ? <Tooltip tooltip={tooltip}><span>{btn}</span></Tooltip> : btn
}

export default VsIconButton
