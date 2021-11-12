import React from 'react'
import { createStyle, cssLike } from '../../utils/style'

const buttonStyle = createStyle({
  display: 'flex',
  fontFamily: ' Arial',
  fontSize: '9.5pt',
  alignItems: 'center'
})

const pStyle = createStyle({
  display: 'inline-block',
  marginBlock: 0,
  margin: 0,
  fontFamily: 'Arial'
})

const iconStyle = createStyle({
  display: 'flex'
})
const leftIcon = createStyle(iconStyle, {
  float: 'left',
  marginRight: '2px'
})
const rightIcon = createStyle(iconStyle, {
  float: 'right',
  marginLeft: '2px'
})

interface ButtonProps {
  label: string
  onClick: () => void
  style?: cssLike
  leftIcon?: () => JSX.Element
  rightIcon?: () => JSX.Element
}

export default function Button(props: ButtonProps) {
  return (
    <button
      style={createStyle(buttonStyle, props.style || {})}
      onClick={props.onClick}
    >
      <span style={leftIcon}>{props.leftIcon && props.leftIcon()}</span>
      <p style={pStyle}>{props.label}</p>
      <span style={rightIcon}>{props.rightIcon && props.rightIcon()}</span>
    </button>
  )
}
