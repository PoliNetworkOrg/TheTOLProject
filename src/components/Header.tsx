import React from 'react'
import { createStyle } from '../utils/style'
import { statePair } from '../utils/types'
import { view } from './App'
import Button from './Util/Button'
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

const centeredText = createStyle(textStyle, {
  display: 'flex',
  justifyContent: 'center'
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

const buttonDivStyle = createStyle({
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-end'
})

interface HeaderProps {
  viewState: statePair<view>
}

export default function Header({ viewState }: HeaderProps) {
  return (
    <div style={divStyle}>
      <a
        style={logoLinkStyle}
        href="https://polinetwork.github.io"
        rel="noreferrer noopener"
        target="_blank"
      >
        <img src={logo} alt="logo" style={logoStyle} />
        <h1 style={textStyle}>PoliNetwork</h1>
      </a>
      <h1 style={centeredText}>The TOL Project</h1>
      <div style={buttonDivStyle}>
        <Button
          label="Toggle database view"
          onClick={() => {
            const [currentView, selectView] = viewState
            if (currentView == 'dbPreview') selectView('INFO-start')
            else selectView('dbPreview')
          }}
        />
      </div>
    </div>
  )
}
