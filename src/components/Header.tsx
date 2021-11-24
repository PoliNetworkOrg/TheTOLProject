import React from 'react'
import { StyleSheet } from '../utils/style'
import { statePair } from '../utils/types'
import { view } from './App'
import logo from '../static/logo.webp'

const styles = StyleSheet.create({
  div: {
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    flex: 1,
    fontSize: '18pt',
    display: 'inline-block'
  },
  get centeredText() {
    return StyleSheet.compose(this.text, this.spacer, {
      justifyContent: 'center'
    })
  },
  get logoDiv() {
    return StyleSheet.compose(this.spacer, {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      margin: '5px'
    })
  },
  logo: {
    height: '60px'
  },
  buttonDiv: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end'
  },
  spacer: {
    display: ' flex',
    flex: 1
  }
})

interface HeaderProps {
  viewState: statePair<view>
}

export default function Header({ viewState }: HeaderProps) {
  return (
    <div style={styles.div}>
      <a
        style={styles.logoDiv}
        {...(!viewState[0].startsWith('TOL')
          ? {
              rel: 'noreferrer noopener',
              target: '_blank',
              href: 'https://polinetwork.github.io'
            }
          : {})}
      >
        <img src={logo} alt="logo" style={styles.logo} />
        <h1 style={styles.text}>PoliNetwork</h1>
      </a>
      <h1 style={styles.centeredText}>The TOL Project</h1>
      <div style={styles.spacer} />
    </div>
  )
}
