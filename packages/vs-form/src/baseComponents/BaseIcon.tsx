import * as React from 'react'
import classNames from 'classnames'
import Icon, { IconProps } from '@material-ui/core/Icon'
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon'
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip'

export interface IBaseIconProps {
  tooltip?: string,
  tooltipProps?: TooltipProps
}

export interface IconMdiProps extends IBaseIconProps, IconProps {
  icon: string,
}

export interface IconSvgProps extends IBaseIconProps, SvgIconProps {
  svg: string,
}

export interface IconCompProps extends IBaseIconProps, SvgIconProps {
  component: React.ComponentType<SvgIconProps>,
}

export type IconTypeProps = IconMdiProps | IconSvgProps | IconCompProps

const BaseIcon: React.SFC<IconTypeProps> = (props: IconTypeProps) => {
  let ic
  if (props['icon']) {
    const p = props as IconMdiProps
    const { tooltip, tooltipProps, icon, ...other } = p
    const cl = classNames('mdi', 'mdi-' + icon, p.className)
    ic = <Icon {...other} className={cl}/>
  } else if (props['svg']) {
    const p = props as IconSvgProps
    const { tooltip, tooltipProps, svg, ...other } = p
    ic = (
      <SvgIcon {...other}>
        <path d={p.svg} />
      </SvgIcon>
    )
  } else if (props['component']) {
    const p = props as IconCompProps
    const { tooltip, tooltipProps, component, ...other } = p
    ic = (
      <SvgIcon {...other} component={p.component}/>
    )

  }
  if (ic) {
    return props.tooltip ? <Tooltip title={props.tooltip} {...props.tooltipProps}><span>{ic}</span></Tooltip> : ic
  } else {
    return <div>Icon: property icon, svg or component must be provided</div>
  }

}

export default BaseIcon
