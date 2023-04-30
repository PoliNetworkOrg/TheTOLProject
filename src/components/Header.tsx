import { useContext, useMemo, useState } from 'react'
import { StyleSheet } from '../utils/style'
import { statePair } from '../utils/types'
import logo from '../static/logo3000.webp'
import { links, View } from '../utils/constants'
import { MobileContext } from '../utils/contexts'
import { useTranslation } from 'react-i18next'
import { LocalStorage } from '../utils/storage'

const styles = StyleSheet.create({
  div: {
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: '18pt'
  },
  get centeredText() {
    return StyleSheet.compose(this.text, {
      textAlign: 'center',
      flex: 1
    })
  },
  logoDiv: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '5px',
    textDecoration: 'none'
  },
  logo: {
    height: '60px'
  },
  col: { flex: 1, display: 'flex' }
})

interface HeaderProps {
  viewState: statePair<View>
}

export default function Header({ viewState }: HeaderProps) {
  const { i18n } = useTranslation()
  const { mobile } = useContext(MobileContext)
  const [lang, setLang] = useState(i18n.resolvedLanguage)
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value
    i18n.changeLanguage(lang)
    LocalStorage.handleChange() // language saved to LocalStorage
    setLang(lang)
  }

  const isTestView = useMemo(
    () => viewState[0] === 'TOL-testing' || viewState[0] === 'TOL-secRecap',
    [viewState]
  )

  return (
    <div className="do-not-print" style={styles.div}>
      <div style={styles.col}>
        <a
          style={{
            ...styles.logoDiv,
            // disable logo link when doing the test
            pointerEvents: isTestView ? 'none' : 'all'
          }}
          rel="noreferrer noopener"
          target="_blank"
          href={links.polinetwork}
        >
          <img src={logo} alt="logo" style={styles.logo} />
          {!mobile && <h1 style={styles.text}>PoliNetwork</h1>}
        </a>
      </div>

      <div style={{ ...styles.col, flex: mobile ? 3 : 1 }}>
        <h1 style={styles.centeredText}>The TOL Project</h1>
      </div>

      <div style={{ ...styles.col, justifyContent: 'flex-end' }}>
        {!isTestView && (
          <select value={lang} onChange={handleLanguageChange}>
            <option value="it">IT</option>
            <option value="en">EN</option>
          </select>
        )}
      </div>
    </div>
  )
}
