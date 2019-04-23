import * as React from 'react'
import Typography, { TypographyProps } from '@material-ui/core/Typography'

export interface ITextProps extends TypographyProps {
  text: string
}

const Text: React.SFC<ITextProps> = (props: ITextProps) => {
  const { text, ...other } = props
  return (
    <Typography {...other}>
      {text}
    </Typography>
  )
}

export default Text
