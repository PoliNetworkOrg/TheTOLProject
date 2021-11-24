import React from 'react'
import { createStyle } from '../../../utils/style'
import logo from '../../../static/logo.webp'

const divStyle = createStyle({
  height: '70px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
})

const textStyle = createStyle({
  flex: 1,
  fontSize: '18pt',
  display: 'inline-block'
})

const rightText = createStyle(textStyle, {
  textAlign: 'right'
})

const logoLinkStyle = createStyle({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  margin: '5px',
  textDecoration: 'none'
})

const logoStyle = createStyle({
  height: '60px'
})

export default function DocumentHeader() {
  return (
    <div style={divStyle}>
      <a
        style={logoLinkStyle}
        rel="noreferrer noopener"
        target="_blank"
        href="https://polinetwork.github.io"
      >
        <img src={logo} alt="logo" style={logoStyle} />
        <h1 style={textStyle}>PoliNetwork</h1>
      </a>
      <h1 style={rightText}>The TOL Project</h1>
    </div>
  )
}
