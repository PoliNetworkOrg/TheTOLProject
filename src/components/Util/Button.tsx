import React from 'react'
import { createStyle, cssLike } from '../../utils/style'

const textStyle = createStyle({
  fontFamily: ' Arial',
  fontSize: '9.5pt'
})

interface ButtonProps {
  label: string
  onClick: () => void
  style?: cssLike
  leftIcon?: () => React.Component
  rightIcon?: () => React.Component
}

export default function Button(props: ButtonProps) {
  return (
    <button onClick={props.onClick}>
      {props.leftIcon && props.leftIcon()}
      <span style={textStyle}>{props.label}</span>
      {props.rightIcon && props.rightIcon()}
    </button>
  )
}
