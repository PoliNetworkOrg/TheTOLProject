import React from 'react'
import { createStyle, theme } from '../utils/style'

const divStyle = createStyle({
  height: '15px',
  backgroundColor: theme.primary
})
const textStyle = createStyle({
  color: 'white',
  margin: 'auto .5em',
  fontSize: '9.5pt'
})

interface SeparatorProps {
  text?: string
}
export default function Separator(props: SeparatorProps) {
  return (
    <div style={divStyle}>
      <p style={textStyle}>{props.text || ''}</p>
    </div>
  )
}
