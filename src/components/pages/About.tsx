import React from 'react'
import { createStyle } from '../../utils/style'

const textStyle = createStyle()

export default function About() {
  return <p style={textStyle}>This is a paragraph about the project.</p>
}
