import React from 'react'
import { StyleSheet } from '../../../utils/style'
import logo from '../../../static/logo.webp'

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
  get rightText() {
    return StyleSheet.compose(this.text, {
      textAlign: 'right'
    })
  },
  logoLink: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '5px',
    textDecoration: 'none'
  },
  logo: {
    height: '60px'
  }
})

export default function DocumentHeader() {
  return (
    <div style={styles.div}>
      <a
        style={styles.logoLink}
        rel="noreferrer noopener"
        target="_blank"
        href="https://polinetwork.github.io"
      >
        <img src={logo} alt="logo" style={styles.logo} />
        <h1 style={styles.text}>PoliNetwork</h1>
      </a>
      <h1 style={styles.rightText}>The TOL Project</h1>
    </div>
  )
}
