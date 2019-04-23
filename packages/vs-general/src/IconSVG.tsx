import * as React from 'react'
import Tooltip from './Tooltip'
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon'

export interface IIconSVGProps extends SvgIconProps {
  svg: string,
  tooltip?: string,
}

export const IconSVG: React.SFC<IIconSVGProps> = (props: IIconSVGProps) => {
  const { svg, tooltip, ...other } = props
  const ic = (
    <SvgIcon {...other}>
      <path d={svg} />
    </SvgIcon>
  )

  return tooltip ? <Tooltip tooltip={tooltip}><span>{ic}</span></Tooltip> : ic

}
