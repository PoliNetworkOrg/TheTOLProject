import React from 'react'
import { createStyle, cssLike } from '../../utils/style'

const textStyle = createStyle({
  fontFamily: ' Arial',
  fontSize: '9.5pt',
  alignItems: 'center'
})

const leftIcon = createStyle({
  float: 'left',
  marginRight: '2px'
})
const rightIcon = createStyle({
  float: 'right',
  marginLeft: '2px'
})

interface ButtonProps {
  label: string
  onClick?: () => void
  style?: cssLike
  leftIcon?: () => JSX.Element
  rightIcon?: () => JSX.Element
}

export default function Button(props: ButtonProps) {
  return (
    <button style={textStyle} onClick={props.onClick}>
      <span style={leftIcon}>{props.leftIcon && props.leftIcon()}</span>
      <span>{props.label}</span>
      <span style={rightIcon}>{props.rightIcon && props.rightIcon()}</span>
    </button>
  )
}
