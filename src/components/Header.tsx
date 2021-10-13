import React from 'react'
import { createStyle } from '../utils/style'

const divStyle = createStyle({
  height: '70px'
})

const textStyle = createStyle({
  fontSize: '18pt'
})

export default function Header() {
  return (
    <div style={divStyle}>
      <h1 style={textStyle}>
        PoliNetwork banner placeholder - The TOL Project
      </h1>
    </div>
  )
}
