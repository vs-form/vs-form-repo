import * as React from 'react'
import Tooltip from '@material-ui/core/Tooltip'

const TooltipVs: React.SFC<any> = (props) => {
  return (
    <Tooltip title={props.tooltip}>
      {props.children}
    </Tooltip>
  )
}

export default TooltipVs