import React from 'react'
import { StyleSheet } from '../utils/style'
import { statePair } from '../utils/types'
import { view } from './App'
import Button from './Util/Button'
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
    return StyleSheet.compose(this.text, {
      display: 'flex',
      justifyContent: 'center'
    })
  },
  logoDiv: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '5px'
  },
  logo: {
    height: '60px'
  },
  buttonDiv: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end'
  }
})

interface HeaderProps {
  viewState: statePair<view>
}

export default function Header({ viewState }: HeaderProps) {
  return (
    <div style={styles.div}>
      <div style={styles.logoDiv}>
        <img src={logo} alt="logo" style={styles.logo} />
        <h1 style={styles.text}>PoliNetwork</h1>
      </div>
      <h1 style={styles.centeredText}>The TOL Project</h1>
      <div style={styles.buttonDiv}>
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
