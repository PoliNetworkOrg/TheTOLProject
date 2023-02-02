import { useContext } from 'react'
import { StyleSheet } from '../utils/style'
import { statePair } from '../utils/types'
import { view } from './App'
import logo from '../static/logo3000.webp'
import { links } from '../utils/constants'
import { MobileContext } from '../utils/contexts'

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
  get rightText() {
    return StyleSheet.compose(this.text, this.spacer, {
      justifyContent: 'flex-end',
      marginRight: 8
    })
  },
  get logoDiv() {
    return StyleSheet.compose(this.spacer, {
      alignItems: 'center',
      gap: '10px',
      margin: '5px',
      textDecoration: 'none'
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
  const { mobile } = useContext(MobileContext)

  return (
    <div className="do-not-print" style={styles.div}>
      <a
        style={StyleSheet.compose(styles.logoDiv, { flex: mobile ? 0 : 1 })}
        {...(!viewState[0].startsWith('TOL')
          ? {
              rel: 'noreferrer noopener',
              target: '_blank',
              href: links.polinetwork
            }
          : {})}
      >
        <img src={logo} alt="logo" style={styles.logo} />
        {mobile ? undefined : <h1 style={styles.text}>PoliNetwork</h1>}
      </a>
      <h1 style={mobile ? styles.rightText : styles.centeredText}>
        The TOL Project
      </h1>
      {mobile ? undefined : <div style={styles.spacer} />}
    </div>
  )
}
