import React from 'react'
import { createStyle } from '../utils/style'
import { statePair } from '../utils/types'
import { view } from './App'
import logo from '../static/logo.webp'

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

const spacerStyle = createStyle({
  display: ' flex',
  flex: 1
})

const centeredText = createStyle(textStyle, spacerStyle, {
  justifyContent: 'center'
})

const logoLinkStyle = createStyle(spacerStyle, {
  alignItems: 'center',
  gap: '10px',
  margin: '5px',
  textDecoration: 'none'
})

const logoStyle = createStyle({
  height: '60px'
})

interface HeaderProps {
  viewState: statePair<view>
}

export default function Header({ viewState }: HeaderProps) {
  return (
    <div style={divStyle}>
      <a
        style={logoLinkStyle}
        {...(!viewState[0].startsWith('TOL')
          ? {
              rel: 'noreferrer noopener',
              target: '_blank',
              href: 'https://polinetwork.github.io'
            }
          : {})}
      >
        <img src={logo} alt="logo" style={logoStyle} />
        <h1 style={textStyle}>PoliNetwork</h1>
      </a>
      <h1 style={centeredText}>The TOL Project</h1>
      <div style={spacerStyle} />
    </div>
  )
}
