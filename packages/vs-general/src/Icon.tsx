import * as React from 'react'
import classNames from 'classnames'
import Icon, { IconProps } from '@material-ui/core/Icon'
import Tooltip from './Tooltip'

export interface IIconProps extends IconProps {
  icon: string,
  tooltip?: string,
}

const VsIcon: React.SFC<IIconProps> = (props: IIconProps) => {
  const { icon, className, ...other } = props
  const cl = classNames('mdi', 'mdi-' + icon, className)
  const ic = <Icon className={cl} {...other} />
  return props.tooltip ? <Tooltip tooltip={props.tooltip}><span>{ic}</span></Tooltip> : ic

}

export default VsIcon
